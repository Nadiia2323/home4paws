import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import "./PasswordReset.css";
import { auth } from "../firebaseConfig";

export default function PasswordReset() {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      await resetPassword(email, auth);
      setMessage(
        "A password reset email has been sent. Please check your inbox."
      );
    } catch (error) {
      setError("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="password-reset-bg">
      <div className="container-form">
        <h3>Reset Password</h3>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <label htmlFor="email">Email</label>
        <input
          className="input-reset"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="button-reset" onClick={handlePasswordReset}>
          Send Reset Email
        </button>

        <button
          className="back-button"
          onClick={() => navigate("/registration")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
