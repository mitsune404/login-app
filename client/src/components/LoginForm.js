import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import config from "../config";
import "../LoginRegister.css";

// this is the login form component
const LoginForm = ({
  loginData,
  handleLoginChange,
  handleLoginSubmit,
  recaptchaRef,
  onCaptchaChange,
  errors,
  message,
  changeView,
}) => {
  return (
    <div className="auth-container">
      <h2>{config.labels.loginTitle}</h2>
      <form onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <label>Email or username</label>
          <input
            type="text"
            name="identifier"
            value={loginData.identifier}
            onChange={handleLoginChange}
          />
          {errors.identifier && (
            <span className="error">{errors.identifier}</span>
          )}
        </div>
        <div className="form-group">
          <label>{config.labels.passwordLabel}</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
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
        <button type="submit">{config.labels.loginButton}</button>
      </form>
      <p className="switch-auth" onClick={() => changeView("register")}>
        {config.labels.switchToRegister}
      </p>
      <p className="switch-auth" onClick={() => changeView("forgot")}>
        Forgot password?
      </p>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoginForm;
