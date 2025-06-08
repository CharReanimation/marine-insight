import React from "react"; // React
import { Link } from "react-router-dom";

// CSS
import "./css/NavBar.css";


// NavBar
const NavBar = () => {
  const Nav =
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src="./img/webPageLogo.png" alt="Logo" className="navbar-logo-image" />{" "}
      </Link>
      <h1 className="navbar-title">MARINE-INSIGHT</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/home" className="navbar-link">
            HOME
          </Link>
        </li>
        <li>
          <Link to="/map" className="navbar-link">
            MAP
          </Link>
        </li>
        <li>
          <Link to="/about" className="navbar-link">
            ABOUT
          </Link>
        </li>
      </ul>
    </nav>;


  // Return
  return (
    Nav
  );
}

export default NavBar;
