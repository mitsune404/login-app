import React from "react";
import "../LoginRegister.css";
import config from "../config";

// this component shows the new password form after otp is verified
const UpdatePasswordForm = ({
  updatePasswordData,
  handleUpdatePasswordChange,
  handleUpdatePasswordSubmit,
  errors,
  message,
  changeView,
  showPasswordTooltip,
  setShowPasswordTooltip,
}) => {
  return (
    <div className="auth-container">
      <h2>Update Your Password</h2>
      <form onSubmit={handleUpdatePasswordSubmit}>
        <div className="form-group">
          <label>New password</label>
          <input
            type="password"
            name="newPassword"
            value={updatePasswordData.newPassword}
            onChange={handleUpdatePasswordChange}
            onFocus={() => setShowPasswordTooltip(true)}
            onBlur={() => setShowPasswordTooltip(false)}
          />
          {showPasswordTooltip && (
            <div className="tooltip">{config.labels.passwordTooltip}</div>
          )}
          {errors.newPassword && (
            <span className="error">{errors.newPassword}</span>
          )}
        </div>
        <div className="form-group">
          <label>Confirm new password</label>
          <input
            type="password"
            name="confirmPassword"
            value={updatePasswordData.confirmPassword}
            onChange={handleUpdatePasswordChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit">Update password</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UpdatePasswordForm;
