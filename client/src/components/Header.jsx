import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
  
    return (
      <header className="navbar">
        <div className="header-logo">
          <Link to="/">CMS</Link>
        </div>
  
        {/* Navigation Menu */}
        <nav className={`header-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/event" onClick={() => setMenuOpen(false)}>Event</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
  
            {/* Sign In & Sign Up inside the mobile menu */}
            <li className="mobile-buttons">
              <Link to="/signin" onClick={() => setMenuOpen(false)} className="signin-button">Sign In</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="signup-button">Sign Up</Link>
            </li>
          </ul>
        </nav>
  
        {/* Desktop Buttons (Visible in Desktop Only) */}
        <div className="header-buttons">
          <Link to="/signin" className="signin-button">Sign In</Link>
          <Link to="/signup" className="signup-button">Sign Up</Link>
        </div>
  
        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </header>
    );
  }