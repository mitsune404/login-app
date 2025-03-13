import React from "react";
import "../LoginRegister.css";

// this component asks the security questions for forgot password flow
const ForgotSecurityForm = ({
  forgotSecurityData,
  handleForgotSecurityChange,
  handleForgotSecuritySubmit,
  errors,
  message,
  changeView,
  loading,
}) => {
  return (
    <div className="auth-container">
      <h2>Security Questions</h2>
      <form onSubmit={handleForgotSecuritySubmit}>
        <div className="form-group">
          <label>Security Question 1: What is your first pet's name?</label>
          <input
            type="text"
            name="answer1"
            value={forgotSecurityData.answer1}
            onChange={handleForgotSecurityChange}
          />
          {errors.answer1 && <span className="error">{errors.answer1}</span>}
        </div>
        <div className="form-group">
          <label>Security Question 2: What is your first city's name?</label>
          <input
            type="text"
            name="answer2"
            value={forgotSecurityData.answer2}
            onChange={handleForgotSecurityChange}
          />
          {errors.answer2 && <span className="error">{errors.answer2}</span>}
        </div>
        <div className="form-group">
          <label>Security Question 3: What is your first school's name?</label>
          <input
            type="text"
            name="answer3"
            value={forgotSecurityData.answer3}
            onChange={handleForgotSecurityChange}
          />
          {errors.answer3 && <span className="error">{errors.answer3}</span>}
        </div>
        <button type="submit">verify answers</button>
        {loading && <div className="loader">Loading...</div>}
      </form>
      <p className="switch-auth" onClick={() => changeView("forgot")}>
        Back
      </p>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgotSecurityForm;
