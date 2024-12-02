
import { useContext, useState } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import React from "react";
import NavBar from "../Components/NavBar";
import "../Components/Navbar.css";
import VideoBG from "../Components/img/puppy.mp4";
import { useNavigate } from "react-router-dom";

function Home() {
  const contextValue = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (!contextValue.user) {
      setShowPopup(true);
      console.log('not a user');
    } else {
      navigate('/content')
      console.log('user');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const handleButtonRegister = () => {
    navigate('/registration')
  }

  return (
    <>
      <div className="video-bg">
        <video src={VideoBG} autoPlay muted loop></video>
        <NavBar />
        <div className="info-container">
          <div className="titleButton">
            <h2 className="title-for-button">Your New Best </h2>
            <h2 className="titleforbutton">Friend Awaits</h2>
          </div>
          <div className="container">
            <a href="#" className="btn" onClick={handleButtonClick}>
              FIND
            </a>
          </div>
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={closePopup}>
                  &times;
                </span>
                <p>Please, register first.</p>
                <button onClick={handleButtonRegister}>register</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
