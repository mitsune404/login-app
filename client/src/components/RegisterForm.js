// components/RegisterForm.js
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import config from "../config";
import "../LoginRegister.css";

// this component renders the registration form with security questions
const RegisterForm = ({
  registerData,
  handleRegisterChange,
  handleRegisterSubmit,
  recaptchaRef,
  onCaptchaChange,
  errors,
  message,
  changeView,
  showPasswordTooltip,
  setShowPasswordTooltip,
  showUsernameTooltip,
  setShowUsernameTooltip,
}) => {
  return (
    <div className="auth-container">
      <h2>{config.labels.registerTitle}</h2>
      <form onSubmit={handleRegisterSubmit}>
        <div className="form-group">
          <label>{config.labels.emailLabel}</label>
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleRegisterChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>{config.labels.usernameLabel}</label>
          <input
            type="text"
            name="username"
            value={registerData.username}
            onChange={handleRegisterChange}
            onFocus={() => setShowUsernameTooltip(true)}
            onBlur={() => setShowUsernameTooltip(false)}
          />
          {showUsernameTooltip && (
            <div className="tooltip">{config.labels.usernameTooltip}</div>
          )}
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label>{config.labels.passwordLabel}</label>
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleRegisterChange}
            onFocus={() => setShowPasswordTooltip(true)}
            onBlur={() => setShowPasswordTooltip(false)}
          />
          {showPasswordTooltip && (
            <div className="tooltip">{config.labels.passwordTooltip}</div>
          )}
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>{config.labels.confirmPasswordLabel}</label>
          <input
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleRegisterChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
        <div className="form-group">
          <label>{config.labels.companyName}</label>
          <input
            type="text"
            name="companyName"
            value={registerData.companyName}
            onChange={handleRegisterChange}
          />
        </div>
        <div className="form-group">
          <label>{config.labels.website}</label>
          <input
            type="text"
            name="website"
            value={registerData.website}
            onChange={handleRegisterChange}
          />
          {errors.website && <span className="error">{errors.website}</span>}
        </div>
        <div className="form-group">
          <label>age (in years)</label>
          <input
            type="number"
            name="age"
            value={registerData.age}
            onChange={handleRegisterChange}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <div className="form-group">
          <label>{config.labels.security1}</label>
          <input
            type="text"
            name="securityAnswer1"
            value={registerData.securityAnswer1}
            onChange={handleRegisterChange}
          />
          {errors.securityAnswer1 && (
            <span className="error">{errors.securityAnswer1}</span>
          )}
        </div>
        <div className="form-group">
          <label>{config.labels.security2}</label>
          <input
            type="text"
            name="securityAnswer2"
            value={registerData.securityAnswer2}
            onChange={handleRegisterChange}
          />
          {errors.securityAnswer2 && (
            <span className="error">{errors.securityAnswer2}</span>
          )}
        </div>
        <div className="form-group">
          <label>{config.labels.security3}</label>
          <input
            type="text"
            name="securityAnswer3"
            value={registerData.securityAnswer3}
            onChange={handleRegisterChange}
          />
          {errors.securityAnswer3 && (
            <span className="error">{errors.securityAnswer3}</span>
          )}
        </div>
        <div className="form-group">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={config.recaptchaSiteKey}
            onChange={onCaptchaChange}
          />
          {errors.recaptcha && (
            <span className="error">{errors.recaptcha}</span>
          )}
        </div>
        <button type="submit">{config.labels.registerButton}</button>
      </form>
      <p className="switch-auth" onClick={() => changeView("login")}>
        {config.labels.switchToLogin}
      </p>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RegisterForm;
