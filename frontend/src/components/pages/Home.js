import React from 'react';
import { useTheme } from '../../contexts/ThemeContext'; // Import useTheme

function Home() {
    const { theme } = useTheme(); // Access the theme value

    return (
        <div className={`home ${theme}`}>
            <h2>Home</h2>
            {/* Rest of your Home component content */}
        </div>
    );
}

export default Home;
