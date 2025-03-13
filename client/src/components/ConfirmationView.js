import React from "react";
import "../LoginRegister.css";

// this component shows a confirmation message (eg otp sent) and a button to go back to login
const ConfirmationView = ({ message, changeView }) => {
  return (
    <div className="auth-container">
      <h2>OTP sent</h2>
      <p>{message}</p>
      <button onClick={() => changeView("login")}>Back to login</button>
    </div>
  );
};

export default ConfirmationView;
