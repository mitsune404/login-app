// components/LoginRegister.js
import React, { useState, useEffect, useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import config from "../config";

// import our components
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ForgotSecurityForm from "./ForgotSecurityForm";
import EnterOtpForm from "./EnterOtpForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import ChangePasswordForm from "./ChangePasswordForm";
// import ConfirmationView from "./ConfirmationView";
import LoggedInView from "./LoggedInView";

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

  // in react native we bypass recaptcha by sending "mobile-app" as token
  const recaptchaToken = "mobile-app";
  // dummy ref for compatibility
  const recaptchaRef = useRef(null);

  // tooltip states for password and username fields
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);
  const [showUsernameTooltip, setShowUsernameTooltip] = useState(false);

  // loading state for visual feedback
  const [loading, setLoading] = useState(false);

  // no need to check url for token here

  // input change handlers
  const handleLoginChange = (name, value) => {
    setLoginData({ ...loginData, [name]: value });
  };
  const handleRegisterChange = (name, value) => {
    setRegisterData({ ...registerData, [name]: value });
  };
  const handleForgotChange = (name, value) => {
    setForgotData({ ...forgotData, [name]: value });
  };
  const handleForgotSecurityChange = (name, value) => {
    setForgotSecurityData({ ...forgotSecurityData, [name]: value });
  };
  const handleOtpChange = (name, value) => {
    setOtpData({ ...otpData, [name]: value });
  };
  const handleUpdatePasswordChange = (name, value) => {
    setUpdatePasswordData({ ...updatePasswordData, [name]: value });
  };

  // validator functions
  const validateLogin = () => {
    const tempErrors = {};
    if (!loginData.identifier)
      tempErrors.identifier = config.labels.identifierRequired;
    if (!loginData.password)
      tempErrors.password = config.labels.passwordRequired;
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const validateRegister = () => {
    const tempErrors = {};
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
    const tempErrors = {};
    if (!forgotData.identifier)
      tempErrors.identifier = config.labels.identifierRequired;
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const validateForgotSecurity = () => {
    const tempErrors = {};
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
    const tempErrors = {};
    if (!otpData.otp) tempErrors.otp = "OTP is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const validateUpdatePassword = () => {
    const tempErrors = {};
    if (!updatePasswordData.newPassword)
      tempErrors.newPassword = config.labels.passwordRequired;
    if (updatePasswordData.newPassword !== updatePasswordData.confirmPassword)
      tempErrors.confirmPassword = config.labels.passwordMismatch;
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // submission handlers

  const handleLoginSubmit = async () => {
    setMessage("");
    if (!validateLogin()) return;
    try {
      const res = await axios.post(`${config.apiUrl}/login`, {
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
    }
  };

  const handleRegisterSubmit = async () => {
    setMessage("");
    if (!validateRegister()) return;
    try {
      const res = await axios.post(`${config.apiUrl}/register`, {
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
    }
  };

  const handleForgotSubmit = async () => {
    setMessage("");
    if (!validateForgot()) return;
    try {
      const res = await axios.post(
        `${config.apiUrl}/forgot-password`,
        forgotData
      );
      setMessage(res.data.message);
      changeView("forgotSecurity");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred.");
    }
  };

  const handleForgotSecuritySubmit = async () => {
    setMessage("");
    if (!validateForgotSecurity()) return;
    setLoading(true);
    try {
      const payload = {
        identifier: forgotData.identifier,
        ...forgotSecurityData,
      };
      const res = await axios.post(
        `${config.apiUrl}/verify-security-answers`,
        payload
      );
      setMessage(res.data.message);
      if (
        res.data.message === "OTP sent successfully! Please check your email."
      ) {
        setUserForOTP(null);
        changeView("enterOTP");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setMessage("");
    if (!validateOtp()) return;
    setLoading(true);
    try {
      const payload = userForOTP
        ? { userId: userForOTP, otp: otpData.otp }
        : { identifier: forgotData.identifier, otp: otpData.otp };
      const res = await axios.post(`${config.apiUrl}/verify-otp`, payload);
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

  const handleChangePasswordRequest = async () => {
    setMessage("");
    setLoading(true);
    try {
      const payload = { userId: user.id };
      const res = await axios.post(
        `${config.apiUrl}/change-password-request`,
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

  const handleUpdatePasswordSubmit = async () => {
    setMessage("");
    if (!validateUpdatePassword()) return;
    try {
      const payload = {
        userId: userForOTP,
        newPassword: updatePasswordData.newPassword,
        confirmPassword: updatePasswordData.confirmPassword,
      };
      const res = await axios.post(`${config.apiUrl}/update-password`, payload);
      setMessage(res.data.message);
      if (res.data.message === "Password updated successfully.") {
        changeView("login");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    changeView("login");
  };

  // render views using a ScrollView to align vertically
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loggedIn && currentView === "loggedIn" && (
        <LoggedInView
          user={user}
          changeView={changeView}
          handleLogout={handleLogout}
        />
      )}
      {/* {currentView === "confirmation" && (
        <ConfirmationView message={message} changeView={changeView} />
      )} */}
      {currentView === "enterOTP" && (
        <EnterOtpForm
          otpData={otpData}
          handleOtpChange={handleOtpChange}
          handleOtpSubmit={handleOtpSubmit}
          errors={errors}
          message={message}
          loading={loading}
          changeView={changeView}
        />
      )}
      {currentView === "updatePassword" && (
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
      )}
      {currentView === "changePassword" && (
        <ChangePasswordForm
          handleChangePasswordRequest={handleChangePasswordRequest}
          loading={loading}
          changeView={changeView}
          message={message}
        />
      )}
      {currentView === "forgot" && (
        <ForgotPasswordForm
          forgotData={forgotData}
          handleForgotChange={handleForgotChange}
          handleForgotSubmit={handleForgotSubmit}
          errors={errors}
          message={message}
          changeView={changeView}
        />
      )}
      {currentView === "forgotSecurity" && (
        <ForgotSecurityForm
          forgotSecurityData={forgotSecurityData}
          handleForgotSecurityChange={handleForgotSecurityChange}
          handleForgotSecuritySubmit={handleForgotSecuritySubmit}
          errors={errors}
          message={message}
          changeView={changeView}
          loading={loading}
        />
      )}
      {currentView === "register" && (
        <RegisterForm
          registerData={registerData}
          handleRegisterChange={handleRegisterChange}
          handleRegisterSubmit={handleRegisterSubmit}
          errors={errors}
          message={message}
          changeView={changeView}
          showPasswordTooltip={showPasswordTooltip}
          setShowPasswordTooltip={setShowPasswordTooltip}
          showUsernameTooltip={showUsernameTooltip}
          setShowUsernameTooltip={setShowUsernameTooltip}
        />
      )}
      {currentView === "login" && (
        <LoginForm
          loginData={loginData}
          handleLoginChange={handleLoginChange}
          handleLoginSubmit={handleLoginSubmit}
          errors={errors}
          message={message}
          changeView={changeView}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default LoginRegister;
