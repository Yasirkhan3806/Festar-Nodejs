import React from 'react';
import { useTheme } from "../ThemeContext";

export default function DarkmodeToggler() {
      const { darkMode, toggleDarkMode } = useTheme();
  return (
    <>
    <div className={`flex items-center gap-2 ${darkMode ? "bg-black text-white" : " text-blue-500"}`}>
      <p>{darkMode ? "Dark Mode" : "Light Mode"}</p>
      <button
        onClick={toggleDarkMode}
        className={`w-10 h-5 rounded-full p-1 flex items-center transition-colors ${
          darkMode ? "bg-white" : "bg-gray-200"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full transition-transform ${
            darkMode ? "transform translate-x-5 bg-black" : "bg-blue-500"
          }`}
        ></div>
      </button>
    </div>

    </>
  )
}
