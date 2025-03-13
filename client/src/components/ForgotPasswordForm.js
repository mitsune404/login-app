import React from "react";
import "../LoginRegister.css";

// this component shows the form to enter email/username for forgot password
const ForgotPasswordForm = ({
  forgotData,
  handleForgotChange,
  handleForgotSubmit,
  errors,
  message,
  changeView,
}) => {
  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotSubmit}>
        <div className="form-group">
          <label>Enter your email or username</label>
          <input
            type="text"
            name="identifier"
            value={forgotData.identifier}
            onChange={handleForgotChange}
          />
          {errors.identifier && (
            <span className="error">{errors.identifier}</span>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
      <p className="switch-auth" onClick={() => changeView("login")}>
        Back to login
      </p>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotPasswordForm;
