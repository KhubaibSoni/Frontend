import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Navbar.css';
import { UserUseContext } from '../Hook/useUserContext';
import { useWorkoutsContext } from '../Hook/WorkoutContext';

function Navbar() {
  const {  status, dispatch: Userdispatch} = UserUseContext();
  const {dispatch} = useWorkoutsContext()

  const handleLogout = () => {
    Userdispatch({ type: "Logout" });
    dispatch({type:'SET_WORKOUTS', payload:[]})
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return status ? (
    <>
      <nav className="navbar">
        <div className="navbar-container">
<<<<<<< HEAD
          <Link to="/" className="navbar-logo">WorkOut Buddy</Link>
=======
          <Link to="/" className="navbar-logo">WorkOut Buddies</Link>
          <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
            <li className="navbar-item"><Link to="/create" className="navbar-link">Create</Link></li>
          </ul>
>>>>>>> 7b0134b1484b9ade4dc518ac578d137c2643ebcb
          <div className="navbar-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
            <li className="navbar-item"><Link to="/create" className="navbar-link">Create</Link></li>
            <li className="navbar-item" onClick={handleLogout}><Link to="/Login" className="navbar-link logout-button">LogOut</Link></li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  ) : (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">WorkOut Buddy</Link>
          <div className="navbar-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <li className="navbar-item"><Link to="/Login" className="navbar-link">Login</Link></li>
            <li className="navbar-item"><Link to="/SignUp" className="navbar-link">Signup</Link></li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
