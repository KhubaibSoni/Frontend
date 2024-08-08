import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">WorkOut Buddy</Link>
          <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <li className="navbar-item"><Link to="/" className="navbar-link">Home</Link></li>
            <li className="navbar-item"><Link to="/create" className="navbar-link">Create</Link></li>
          </ul>
          <div className="navbar-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
