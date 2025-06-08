import React from "react"; // React
import { Link } from "react-router-dom";

// CSS
import "./css/Error.css";

// Error
const Error = () => {
    // Return
    return (
        <div id="Error">
            <div id="error-body">
                <div id="error-body-container">
                    <h1 className="error-code">ERROR</h1>
                    <p className="error-message">Page not found!</p>
                    <a href="/home" className="home-link">Go back home</a>
                </div>
            </div>
        </div>
    );
}

// Export 
export default Error;