import React from "react"; // React
import { Link } from "react-router-dom";

// Components

// Header & Footer
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

// CSS
import "./css/Home.css";

// Home
const Home = () => {
    // Return
    return (
        <div id="Home">
            <Header HeaderText="HOME" />
            <Footer />
        </div>
    );
}

// Export 
export default Home;