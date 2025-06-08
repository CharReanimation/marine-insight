import React from "react"; // React
import { Link } from "react-router-dom";

// Components

// Header & Footer
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

// CSS
import "./css/About.css";

// About
const About = () => {
    // Return
    return (
        <div id="About">
            <Header HeaderText="ABOUT" />
            <Footer />
        </div>
    );
}

// Export 
export default About;