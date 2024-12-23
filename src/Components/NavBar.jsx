import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Vector from "../Components/img/Vector.png";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/registration");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navbar">
      <img src={Vector} alt="" />
      <h1 className="logo">Home4</h1>
      <h1 className="logo-part">Paws</h1>

      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        HOME
      </NavLink>
      <NavLink
        to="/registration"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        REGISTRATION
      </NavLink>
      <NavLink
        to="/content"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        CONTENT
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? "active" : "inactive")}
      >
        PROFILE
      </NavLink>
      {user ? (
        <button className="login" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="login" onClick={handleLogin}>
          Login
        </button>
      )}
    </div>
  );
}

export default NavBar;
