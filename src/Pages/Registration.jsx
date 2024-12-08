import React, { useContext, useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/Context/AuthContext";
import "./Registration.css";

export default function Registration() {
  const { user, signup, signin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [hasAccount, setHasAccount] = useState(false);

  const heading = !hasAccount ? "Register" : "Login";
  const buttonLabel = !hasAccount
    ? "Already got an account? Sign in instead"
    : "No account? Sign up";
  const registerButton = !hasAccount ? "Register" : "Login";

  const toggleHasAccount = () => {
    setHasAccount(!hasAccount);
    setErrorMessage([]);
  };

  // const validatePassword = (password, repeatPassword) =>
  //   password === repeatPassword;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      if (!errorMessage.includes("Invalid email address.")) {
        setErrorMessage((prevErrors) => [
          ...prevErrors,
          "Invalid email address.",
        ]);
      }
    } else {
      setErrorMessage((prevErrors) =>
        prevErrors.filter((err) => err !== "Invalid email address.")
      );
    }

    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;

    if (value.length < 6) {
      if (!errorMessage.includes("Password must be at least 6 characters.")) {
        setErrorMessage((prevErrors) => [
          ...prevErrors,
          "Password must be at least 6 characters.",
        ]);
      }
    } else {
      setErrorMessage((prevErrors) =>
        prevErrors.filter(
          (err) => err !== "Password must be at least 6 characters."
        )
      );
    }

    setPassword(value);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.push("Invalid email address.");
    }
    if (password.length < 6) {
      newErrors.push("Password must be at least 6 characters.");
    }
    if (!hasAccount && password !== repeatPassword) {
      newErrors.push("Passwords do not match.");
    }

    setErrorMessage(newErrors);

    if (newErrors.length === 0) {
      try {
        if (hasAccount) {
          await signin(email, password);
        } else {
          await signup(email, password);
        }
      } catch (error) {
        setErrorMessage((prevErrors) => [
          ...prevErrors,
          "Authentication failed: " + error.message,
        ]);
      }
    }
  };

  console.log("errorMessage :>> ", errorMessage);

  useEffect(() => {
    if (user) {
      navigate("/content");
    }
  }, [user, navigate]);

  return (
    <div className="registration-bg">
      <NavBar />
      <p className="text">“Bringing Happiness Home, One Paw at a Time”</p>
      <div className="container-form">
        <div className="registration-form">
          <h3>{heading}</h3>

          {errorMessage.length > 0 && (
            <div className="error-message">
              {errorMessage.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <label className="reg-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />

          <label className="reg-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />

          {!hasAccount && (
            <>
              <label className="reg-label" htmlFor="repeatPass">
                Repeat Password
              </label>
              <input
                type="password"
                id="repeatPass"
                value={repeatPassword}
                onChange={handleRepeatPasswordChange}
              />
            </>
          )}
          <button
            className="forgot-password-link"
            onClick={() => navigate("/password-reset")}
          >
            Forgot Password?
          </button>

          <button className="button-register" onClick={handleSubmit}>
            {registerButton}
          </button>
          <button className="login-register" onClick={toggleHasAccount}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
