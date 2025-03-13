import React from "react";
import "../LoginRegister.css";

// this component lets the user enter the otp they received via email
const EnterOtpForm = ({
  otpData,
  handleOtpChange,
  handleOtpSubmit,
  errors,
  message,
  loading,
  changeView,
}) => {
  return (
    <div className="auth-container">
      <h2>Enter OTP</h2>
      <form onSubmit={handleOtpSubmit}>
        <div className="form-group">
          <label>OTP</label>
          <input
            type="text"
            name="otp"
            value={otpData.otp}
            onChange={handleOtpChange}
          />
          {errors.otp && <span className="error">{errors.otp}</span>}
        </div>
        <button type="submit">Verify otp</button>
        {loading && <div className="loader">Loading...</div>}
      </form>
      <p className="switch-auth" onClick={() => changeView("login")}>
        Back to login
      </p>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default EnterOtpForm;
