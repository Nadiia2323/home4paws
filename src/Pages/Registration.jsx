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
  const [errorMessage, setErrorMessage] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const heading = !hasAccount ? "Register" : "Login";

  const buttonLabel = !hasAccount
    ? "already got an account? sign in instead"
    : "No account? sign up";
  const registerButton = !hasAccount ? "Register" : "Login";

  const validatePassword = (password, repeatPassword) => {
    return password === repeatPassword;
  };

  function toggleHasAccount() {
    setHasAccount(!hasAccount);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasAccount) {
      const validPassword = validatePassword(password, repeatPassword);
      if (validPassword) {
        console.log("Attempting to sign up with: ", email, password);
        signup(email, password);
      } else {
        setErrorMessage("Passwords do not match");
      }
    } else {
      signin(email, password);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/content");
    }
  }, [user, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <div className="registration-bg">
      <NavBar />
      <p className="text">“Bringing Happiness Home, One Paw at a Time”</p>
      <div className="container-form">
        <div className="registration-form">
          <h3>{heading}</h3>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleEmailChange} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handlePasswordChange}
          />
          {!hasAccount && (
            <>
              <label htmlFor="repeatPass">Repeat Password</label>
              <input
                type="password"
                id="repeatPass"
                onChange={handleRepeatPasswordChange}
              />
            </>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
