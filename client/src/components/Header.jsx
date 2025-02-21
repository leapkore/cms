import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="navbar">
        {/* Logo */}
        <div className="header-logo">
          <Link to="/">CMS</Link>
        </div>

        {/* Navigation Menu */}
        <ul className="header-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/event">Event</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Header Buttons */}
        <div className="header-button">
          <Link to="/signin" className="signin-button">
            Log In
          </Link>
          <Link to="/signup" className="signup-button">
            Register Now
          </Link>
        </div>

        {/* Toggle Menu for Mobile */}
        <div className="toggle-menu" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`fas ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </div>

        {/* Dropdown Menu (Visible on Mobile) */}
        <ul className={`header-dropdown-menu ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          </li>
          <li>
            <Link to="/event" onClick={() => setMenuOpen(false)}>Event</Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
          <li>
            <Link to="/signin" className="dropdown-signin-button" onClick={() => setMenuOpen(false)}>
              Log In
            </Link>
          </li>
          <li>
            <Link to="/signup" className="dropdown-signup-button" onClick={() => setMenuOpen(false)}>
              Register Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
