import React from "react";
import "../LoginRegister.css";

// this component is for the logged-in user to request an otp for changing password
const ChangePasswordForm = ({
  handleChangePasswordRequest,
  loading,
  changeView,
  message,
}) => {
  return (
    <div className="auth-container">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePasswordRequest}>
        <button type="submit">Generate OTP</button>
        {loading && <div className="loader">Loading...</div>}
      </form>
      <p className="switch-auth" onClick={() => changeView("loggedIn")}>
        cancel
      </p>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ChangePasswordForm;
