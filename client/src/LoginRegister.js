import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import config from "./config";
import "./LoginRegister.css";

// import components
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ForgotSecurityForm from "./components/ForgotSecurityForm";
import EnterOtpForm from "./components/EnterOtpForm";
import UpdatePasswordForm from "./components/UpdatePasswordForm";
import ChangePasswordForm from "./components/ChangePasswordForm";
import ConfirmationView from "./components/ConfirmationView";
import LoggedInView from "./components/LoggedInView";

// main container component for our auth flows
const LoginRegister = () => {
  // allowed views: login, register, forgot, forgotSecurity, enterOTP, updatePassword, changePassword, confirmation, loggedIn
  const [currentView, setCurrentView] = useState("login");

  // helper to change view and clear message and errors
  const changeView = (view) => {
    setCurrentView(view);
    setMessage("");
    setErrors({});
  };

  // form state objects
  const [loginData, setLoginData] = useState({ identifier: "", password: "" });
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    website: "",
    age: "",
    securityAnswer1: "",
    securityAnswer2: "",
    securityAnswer3: "",
  });
  const [forgotData, setForgotData] = useState({ identifier: "" });
  const [forgotSecurityData, setForgotSecurityData] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
  });
  const [otpData, setOtpData] = useState({ otp: "" });
  const [updatePasswordData, setUpdatePasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  // store verified user id after OTP verification
  const [userForOTP, setUserForOTP] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // recaptcha state for login and register forms
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  // tooltip states for password and username fields
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const [showUsernameTooltip, setShowUsernameTooltip] = useState(false);

  // loading state for visual feedback
  const [loading, setLoading] = useState(false);

  // check url for token (if any - not used in otp flow)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      // in otp based flow we do not use link resets so do nothing
    }
  }, []);

  // input change handlers
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };
  const handleForgotChange = (e) => {
    setForgotData({ ...forgotData, [e.target.name]: e.target.value });
  };
  const handleForgotSecurityChange = (e) => {
    setForgotSecurityData({
      ...forgotSecurityData,
      [e.target.name]: e.target.value,
    });
  };
  const handleOtpChange = (e) => {
    setOtpData({ ...otpData, [e.target.name]: e.target.value });
  };
  const handleUpdatePasswordChange = (e) => {
    setUpdatePasswordData({
      ...updatePasswordData,
      [e.target.name]: e.target.value,
    });
  };

  // recaptcha change handler
  const onCaptchaChange = (token) => {
    setRecaptchaToken(token);
    setErrors({ ...errors, recaptcha: "" });
  };

  // validator functions
  const validateLogin = () => {
    let tempErrors = {};
    if (!loginData.identifier)
      tempErrors.identifier = config.labels.identifierRequired;
    if (!loginData.password)
      tempErrors.password = config.labels.passwordRequired;
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const validateRegister = () => {
    let tempErrors = {};
    if (!registerData.email) tempErrors.email = config.labels.emailRequired;
    if (!registerData.username)
      tempErrors.username = config.labels.usernameRequired;
    if (!registerData.password)
      tempErrors.password = config.labels.passwordRequired;
    if (registerData.password !== registerData.confirmPassword)
      tempErrors.confirmPassword = config.labels.passwordMismatch;
    if (!registerData.securityAnswer1)
      tempErrors.securityAnswer1 = "Security answer 1 is required.";
    if (!registerData.securityAnswer2)
      tempErrors.securityAnswer2 = "Security answer 2 is required.";
    if (!registerData.securityAnswer3)
      tempErrors.securityAnswer3 = "Security answer 3 is required.";
    if (!registerData.age) tempErrors.age = config.labels.ageRequired;
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const validateForgot = () => {
    let tempErrors = {};
    if (!forgotData.identifier)
      tempErrors.identifier = config.labels.identifierRequired;
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const validateForgotSecurity = () => {
    let tempErrors = {};
    if (!forgotSecurityData.answer1)
      tempErrors.answer1 = "Answer 1 is required.";
    if (!forgotSecurityData.answer2)
      tempErrors.answer2 = "Answer 2 is required.";
    if (!forgotSecurityData.answer3)
      tempErrors.answer3 = "Answer 3 is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const validateOtp = () => {
    let tempErrors = {};
    if (!otpData.otp) tempErrors.otp = "OTP is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const validateUpdatePassword = () => {
    let tempErrors = {};
    if (!updatePasswordData.newPassword)
      tempErrors.newPassword = config.labels.passwordRequired;
    if (updatePasswordData.newPassword !== updatePasswordData.confirmPassword)
      tempErrors.confirmPassword = config.labels.passwordMismatch;
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // form submission handlers

  // login handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validateLogin()) return;
    if (!recaptchaToken) {
      setErrors({ ...errors, recaptcha: config.labels.captchaRequired });
      return;
    }
    try {
      const res = await axios.post("/api/auth/login", {
        ...loginData,
        recaptchaToken,
      });
      setMessage(res.data.message);
      if (res.status === 200) {
        setUser(res.data.user);
        setLoggedIn(true);
        changeView("loggedIn");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred.");
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setRecaptchaToken(null);
      }
    }
  };

  // registration handler
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validateRegister()) return;
    if (!recaptchaToken) {
      setErrors({ ...errors, recaptcha: config.labels.captchaRequired });
      return;
    }
    try {
      const res = await axios.post("/api/auth/register", {
        ...registerData,
        recaptchaToken,
        age: Number(registerData.age),
      });
      setMessage(res.data.message);
      if (res.status === 201) {
        setUser({
          email: registerData.email,
          username: registerData.username,
          companyName: registerData.companyName,
          website: registerData.website,
          age: registerData.age,
        });
        setLoggedIn(true);
        changeView("loggedIn");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred.");
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setRecaptchaToken(null);
      }
    }
  };

  // forgot password: step 1 - check account exists
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validateForgot()) return;
    try {
      const res = await axios.post("/api/auth/forgot-password", forgotData);
      setMessage(res.data.message);
      changeView("forgotSecurity");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred.");
    }
  };

  // forgot password: step 2 - verify security answers and generate OTP
  const handleForgotSecuritySubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validateForgotSecurity()) return;
    setLoading(true);
    try {
      const payload = {
        identifier: forgotData.identifier,
        ...forgotSecurityData,
      };
      const res = await axios.post(
        "/api/auth/verify-security-answers",
        payload
      );
      setMessage(res.data.message);
      if (
        res.data.message === "OTP sent successfully! Please check your email."
      ) {
        // for forgot flow, we use identifier so userForOTP remains null
        setUserForOTP(null);
        changeView("enterOTP");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // OTP verification handler (common for both flows)
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validateOtp()) return;
    setLoading(true);
    try {
      // for forgot password, send identifier; for change password, send userId
      const payload = userForOTP
        ? { userId: userForOTP, otp: otpData.otp }
        : { identifier: forgotData.identifier, otp: otpData.otp };
      const res = await axios.post("/api/auth/verify-otp", payload);
      setMessage(res.data.message);
      if (
        res.data.message === "OTP verified. Please enter your new password."
      ) {
        setUserForOTP(res.data.userId);
        changeView("updatePassword");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // logged in change password: generate OTP
  const handleChangePasswordRequest = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const payload = { userId: user.id };
      const res = await axios.post(
        "/api/auth/change-password-request",
        payload
      );
      setMessage(res.data.message);
      if (
        res.data.message === "OTP sent successfully! Please check your email."
      ) {
        setUserForOTP(user.id);
        changeView("enterOTP");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // update password after OTP verification
  const handleUpdatePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validateUpdatePassword()) return;
    try {
      const payload = {
        userId: userForOTP,
        newPassword: updatePasswordData.newPassword,
        confirmPassword: updatePasswordData.confirmPassword,
      };
      const res = await axios.post("/api/auth/update-password", payload);
      setMessage(res.data.message);
      if (res.data.message === "Password updated successfully.") {
        changeView("login");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred.");
    }
  };

  // logout handler
  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    changeView("login");
  };

  // render views based on currentView
  if (loggedIn && currentView === "loggedIn") {
    return (
      <LoggedInView
        user={user}
        changeView={changeView}
        handleLogout={handleLogout}
      />
    );
  }

  if (currentView === "confirmation") {
    return <ConfirmationView message={message} changeView={changeView} />;
  }

  if (currentView === "enterOTP") {
    return (
      <EnterOtpForm
        otpData={otpData}
        handleOtpChange={handleOtpChange}
        handleOtpSubmit={handleOtpSubmit}
        errors={errors}
        message={message}
        loading={loading}
        changeView={changeView}
      />
    );
  }

  if (currentView === "updatePassword") {
    return (
      <UpdatePasswordForm
        updatePasswordData={updatePasswordData}
        handleUpdatePasswordChange={handleUpdatePasswordChange}
        handleUpdatePasswordSubmit={handleUpdatePasswordSubmit}
        errors={errors}
        message={message}
        changeView={changeView}
        showPasswordTooltip={showPasswordTooltip}
        setShowPasswordTooltip={setShowPasswordTooltip}
      />
    );
  }

  if (currentView === "changePassword") {
    return (
      <ChangePasswordForm
        handleChangePasswordRequest={handleChangePasswordRequest}
        loading={loading}
        changeView={changeView}
        message={message}
      />
    );
  }

  if (currentView === "forgot") {
    return (
      <ForgotPasswordForm
        forgotData={forgotData}
        handleForgotChange={handleForgotChange}
        handleForgotSubmit={handleForgotSubmit}
        errors={errors}
        message={message}
        changeView={changeView}
      />
    );
  }

  if (currentView === "forgotSecurity") {
    return (
      <ForgotSecurityForm
        forgotSecurityData={forgotSecurityData}
        handleForgotSecurityChange={handleForgotSecurityChange}
        handleForgotSecuritySubmit={handleForgotSecuritySubmit}
        errors={errors}
        message={message}
        changeView={changeView}
        loading={loading}
      />
    );
  }

  if (currentView === "register") {
    return (
      <RegisterForm
        registerData={registerData}
        handleRegisterChange={handleRegisterChange}
        handleRegisterSubmit={handleRegisterSubmit}
        recaptchaRef={recaptchaRef}
        onCaptchaChange={onCaptchaChange}
        errors={errors}
        message={message}
        changeView={changeView}
        showPasswordTooltip={showPasswordTooltip}
        setShowPasswordTooltip={setShowPasswordTooltip}
        showUsernameTooltip={showUsernameTooltip}
        setShowUsernameTooltip={setShowUsernameTooltip}
      />
    );
  }

  // default to login view
  return (
    <LoginForm
      loginData={loginData}
      handleLoginChange={handleLoginChange}
      handleLoginSubmit={handleLoginSubmit}
      recaptchaRef={recaptchaRef}
      onCaptchaChange={onCaptchaChange}
      errors={errors}
      message={message}
      changeView={changeView}
    />
  );
};

export default LoginRegister;
