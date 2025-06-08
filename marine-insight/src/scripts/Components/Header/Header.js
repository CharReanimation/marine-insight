import React from 'react'; // React

// CSS
import './css/Header.css'

// Header
const Header = ({ HeaderText }) => {
    // Return
    return (
        <header className='page-header'>
            <h1>{HeaderText}</h1>
        </header>
    );
};

// Export
export default Header;