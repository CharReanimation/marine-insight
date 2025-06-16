import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import NavBar from "./scripts/Public/General/NavBar"; // Nav

// General Pages
import Error from "./scripts/Public/General/Error";
import Home from "./scripts/Public/General/Home";
import About from "./scripts/Public/General/About";

// Main Pages
import Map from "./scripts/Public/Main/Map/Map";

// CSS
import './App.css';

const App = () => {

  // Return
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* NavBar */}
        <Routes>
          {/* General Pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* 404 Page */}
          <Route path="*" element={<Error />} />

          {/* Map */}
          <Route path="/map" element={<Map />} />

        </Routes>
      </div>
    </Router>
  );
}

// Export
export default App;
