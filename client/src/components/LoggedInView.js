import React from "react";
import "../LoginRegister.css";

// this component displays the logged in user's details along with options to change password or logout
const LoggedInView = ({ user, changeView, handleLogout }) => {
  return (
    <div className="logged-in-view">
      <h2>Welcome, {user.username || user.email}</h2>
      <div className="user-details">
        <h3>User Details</h3>
        <ul>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          <li>
            <strong>Username:</strong> {user.username}
          </li>
          <li>
            <strong>Company name:</strong> {user.companyName || "n/a"}
          </li>
          <li>
            <strong>Website:</strong> {user.website || "n/a"}
          </li>
          <li>
            <strong>Age:</strong> {user.age || "n/a"}
          </li>
        </ul>
      </div>
      <button onClick={() => changeView("changePassword")}>
        Change Password
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LoggedInView;
