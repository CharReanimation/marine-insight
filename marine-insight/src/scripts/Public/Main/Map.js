import React from "react"; // React
import { Link } from "react-router-dom";

// Components

// Header & Footer
import Header from "../../Components/Header/Header";

// CSS
import "./css/Map.css";

// Map
const Map = () => {
    // Return
    return (
        <div id="Map">
            <Header HeaderText="MAP" />
        </div>
    );
}

// Export 
export default Map;