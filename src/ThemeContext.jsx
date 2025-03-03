import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  // Initialize darkMode state synchronously with localStorage value
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true"; // Convert string to boolean
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Apply the theme classes based on dark mode
  useEffect(() => {
    const rootElement = document.documentElement;
    const buttons = document.querySelectorAll("button");

    if (darkMode) {
      rootElement.classList.add("dark-mode");
      buttons.forEach((button) => button.classList.add("dark-mode-btn"));
    } else {
      rootElement.classList.remove("dark-mode");
      buttons.forEach((button) => button.classList.remove("dark-mode-btn"));
    }
  }, [darkMode]); // Run this effect whenever darkMode changes

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);