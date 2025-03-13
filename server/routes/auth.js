const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const crypto = require("crypto");
const os = require("os");

// helper to get local ip address if needed for reset flows
function getLocalIPAddress() {
  const ifaces = os.networkInterfaces();
  let candidate = null;
  for (let iface in ifaces) {
    for (let alias of ifaces[iface]) {
      if (alias.family === "IPv4" && !alias.internal) {
        // we prefer addresses starting with 192.168
        if (alias.address.startsWith("192.168")) {
          return alias.address;
        }
        if (!candidate) {
          candidate = alias.address;
        }
      }
    }
  }
  return candidate || "localhost";
}

// helper to generate a 6-digit OTP as a string
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// helper to verify captcha with google api
const verifyCaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
  const response = await axios.post(verificationURL);
  return response.data.success;
};

// registration endpoint
router.post("/register", async (req, res) => {
  const {
    email,
    username,
    password,
    recaptchaToken,
    companyName,
    website,
    age,
    securityAnswer1,
    securityAnswer2,
    securityAnswer3,
  } = req.body;

  // bypass captcha for mobile apps
  let captchaValid = false;
  if (recaptchaToken === "mobile-app") {
    captchaValid = true;
  } else {
    try {
      captchaValid = await verifyCaptcha(recaptchaToken);
    } catch (err) {
      return res.status(500).json({ message: "Captcha verification error." });
    }
  }

  if (!captchaValid) {
    return res.status(400).json({ message: "Captcha verification failed." });
  }

  if (
    !email ||
    !username ||
    !password ||
    !age ||
    !securityAnswer1 ||
    !securityAnswer2 ||
    !securityAnswer3
  ) {
    return res.status(400).json({ message: "Required fields are missing." });
  }

  try {
    let userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res
        .status(400)
        .json({
          message: "A user with the provided email or username already exists.",
        });
    }
    const user = new User({
      email,
      username,
      password,
      companyName,
      website,
      age,
      securityAnswer1,
      securityAnswer2,
      securityAnswer3,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// login endpoint
router.post("/login", async (req, res) => {
  const { identifier, password, recaptchaToken } = req.body;

  let captchaValid = false;
  if (recaptchaToken === "mobile-app") {
    captchaValid = true;
  } else {
    try {
      captchaValid = await verifyCaptcha(recaptchaToken);
    } catch (err) {
      return res.status(500).json({ message: "Captcha verification error." });
    }
  }

  if (!captchaValid) {
    return res.status(400).json({ message: "Captcha verification failed." });
  }

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: "Email or username and password are required." });
  }

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    res.json({
      message: "Login successful.",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        companyName: user.companyName,
        website: user.website,
        age: user.age,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
});

// forgot password flow
// step 1 - check if account exists
router.post("/forgot-password", async (req, res) => {
  const { identifier } = req.body;
  if (!identifier)
    return res.status(400).json({ message: "Email or username is required." });
  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user)
      return res
        .status(400)
        .json({ message: "No account found with that identifier." });
    return res.json({
      message: "Account found. Please answer your security questions.",
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error." });
  }
});

// forgot password flow
// step 2 - verify security answers and generate OTP
router.post("/verify-security-answers", async (req, res) => {
  const { identifier, answer1, answer2, answer3 } = req.body;
  if (!identifier || !answer1 || !answer2 || !answer3) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user)
      return res
        .status(400)
        .json({ message: "No account found with that identifier." });
    if (
      user.securityAnswer1.toLowerCase() !== answer1.toLowerCase() ||
      user.securityAnswer2.toLowerCase() !== answer2.toLowerCase() ||
      user.securityAnswer3.toLowerCase() !== answer3.toLowerCase()
    ) {
      return res
        .status(400)
        .json({ message: "Security answers do not match." });
    }
    // generate OTP valid for 10 minutes
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    user.otpAttempts = 0;
    user.otpVerified = false;
    await user.save();
    try {
      const emailResponse = await axios.post(
        "http://localhost:9001/departments/sendemail",
        {
          email: user.email,
          context: `Your OTP for password reset is: ${otp}. It is valid for the next 10 minutes.`,
        }
      );
      if (emailResponse.status === 200) {
        return res.json({
          message: "OTP sent successfully! Please check your email.",
        });
      } else {
        return res.status(500).json({ message: "Error sending OTP." });
      }
    } catch (emailError) {
      return res.status(500).json({ message: "Error sending OTP." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error." });
  }
});

// change password flow for logged in users
// generate OTP and send email
router.post("/change-password-request", async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ message: "User ID is required." });
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found." });
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    user.otpAttempts = 0;
    user.otpVerified = false;
    await user.save();
    try {
      const emailResponse = await axios.post(
        "http://localhost:9001/departments/sendemail",
        {
          email: user.email,
          context: `Your OTP for password change is: ${otp}. It is valid for the next 10 minutes.`,
        }
      );
      if (emailResponse.status === 200) {
        return res.json({
          message: "OTP sent successfully! Please check your email.",
        });
      } else {
        return res.status(500).json({ message: "Error sending OTP." });
      }
    } catch (emailError) {
      return res.status(500).json({ message: "Error sending OTP." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error." });
  }
});

// OTP verification endpoint common for both flows
router.post("/verify-otp", async (req, res) => {
  const { identifier, otp, userId } = req.body;
  if (!otp || (!identifier && !userId)) {
    return res
      .status(400)
      .json({ message: "OTP and identifier or User ID are required." });
  }
  try {
    let user;
    if (userId) {
      user = await User.findById(userId);
    } else {
      user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });
    }
    if (!user) return res.status(400).json({ message: "User not found." });
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired." });
    }
    if (user.otpAttempts >= 5) {
      return res
        .status(400)
        .json({ message: "Maximum OTP verification attempts exceeded." });
    }
    if (user.otp !== otp) {
      user.otpAttempts += 1;
      await user.save();
      return res.status(400).json({ message: "Incorrect OTP." });
    }
    user.otpVerified = true;
    await user.save();
    return res.json({
      message: "OTP verified. Please enter your new password.",
      userId: user._id,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error." });
  }
});

// update password after OTP verification
router.post("/update-password", async (req, res) => {
  const { userId, newPassword, confirmPassword } = req.body;
  if (!userId || !newPassword || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "User ID and both password fields are required." });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found." });
    if (!user.otpVerified) {
      return res
        .status(400)
        .json({ message: "OTP not verified. Cannot update password." });
    }
    user.password = newPassword; // pre-save hook will hash the password
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.otpAttempts = 0;
    user.otpVerified = false;
    await user.save();
    return res.json({ message: "Password updated successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
