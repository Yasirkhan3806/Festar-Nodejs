import React from "react";
import { useTheme } from "../ThemeContext";

const BackgroundAnimation = () => {
  const {darkMode} = useTheme()
  return (
    <div className={`relative w-full h-screen overflow-hidden ${darkMode?"dark-mode":"bg-gradient-to-br from-blue-500 to-indigo-500"}`}>
      {/* White Boxes */}
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="absolute w-12 h-12 bg-white bg-opacity-10 border-2 border-white border-opacity-20 rounded-lg"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `moveBox ${10 + Math.random() * 10}s infinite ease-in-out`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default BackgroundAnimation;