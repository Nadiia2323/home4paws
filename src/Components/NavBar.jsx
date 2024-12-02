import React, { useContext } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Vector from '../Components/img/Vector.png'; 

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/registration')
  };

  const handleLogout = () => {
    logout(); 
  };

  return (
    <div className='navbar'>
      
      <img src={Vector} alt="" />
      <h1 className='logo'>Home4</h1>
      <h1 className='logo-part'>Paws</h1>
       
      
      <NavLink to="/" activeClassName="active" className="nav-link">
        HOME
      </NavLink>
      <NavLink to="/registration" activeClassName="active" className="nav-link">
        REGISTRATION
      </NavLink>
      <NavLink to='/content' activeClassName='active' className='nav-link'>
        CONTENT
      </NavLink>
      <NavLink to="/profile" activeClassName="active" className="nav-link">
        PROFILE
      </NavLink>
      {user ? (
        <button className='login' onClick={ handleLogout}>Logout</button>
      ) : (
        <button className='login' onClick={handleLogin}>Login</button>
        )}
        </div>
    
  );
}

export default NavBar;









