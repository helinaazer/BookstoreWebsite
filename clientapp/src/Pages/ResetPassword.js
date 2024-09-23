import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [passwordConstraintMessages, setPasswordConstraintMessages] = useState(
    []
  );
  const navigate = useNavigate(); // Initialize navigate hook

  // Function to validate password constraints and collect all unmet conditions
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errorMessages = [];

    if (password.length < minLength) {
      errorMessages.push("Password must be at least 8 characters long.");
    }
    if (!hasUpperCase) {
      errorMessages.push("Password must contain at least one capital letter.");
    }
    if (!hasSpecialChar) {
      errorMessages.push(
        "Password must contain at least one special character (e.g., !, @, #, $, %, &, *)."
      );
    }

    return errorMessages;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear the existing messages on button press
    setPasswordMatchMessage("");
    setPasswordConstraintMessages([]);

    // Validate the new password against constraints
    const constraintMessages = validatePassword(newPassword);
    if (constraintMessages.length > 0) {
      setPasswordConstraintMessages(constraintMessages);
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      setPasswordMatchMessage("Passwords do not match.");
    } else {
      // If passwords match and pass constraints, redirect to login page
      setPasswordMatchMessage("Passwords match.");
      navigate("/login");
    }
  };

  return (
    <div
      className="reset-password-container"
      style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}
    >
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        {passwordConstraintMessages.length > 0 && (
          <ul style={{ color: "red", marginTop: "5px" }}>
            {passwordConstraintMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        )}
        {passwordMatchMessage && (
          <p
            style={{
              color: newPassword === confirmNewPassword ? "green" : "red",
              marginTop: "5px",
            }}
          >
            {passwordMatchMessage}
          </p>
        )}
        <button type="submit" style={{ padding: "10px", width: "100%" }}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
