import React from "react";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase Auth methods
import { useNavigate } from "react-router-dom"; // Optional: For redirecting after logout
import logoutIconDark from "./icons/logoutIcon.png";
import logoutIconWhite from "./icons/logoutIconWhite.png";
import { useTheme } from "../../ThemeContext";
import { Tooltip } from "react-tooltip"; // Import react-tooltip

export default function SignoutButton() {
  const auth = getAuth(); // Get the Firebase Auth instance
  const navigate = useNavigate(); // Optional: For redirecting after logout
  const { darkMode } = useTheme();

  // Logout function
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        console.log("User signed out successfully");
        navigate("/"); // Optional: Redirect to login page after logout
      })
      .catch((error) => {
        // An error occurred
        console.error("Error signing out:", error);
      });
  };

  return (
    <div>
      {/* Logout Button with Tailwind CSS */}
      <img
       data-tooltip-id="sidebar-tooltip" // Add tooltip ID
       data-tooltip-content={"Log Out"}
        onClick={handleSignOut}
        className="px-3 cursor-pointer"
        src={darkMode ? logoutIconDark : logoutIconWhite}
        alt=""
      />
        <Tooltip
        id="sidebar-tooltip"
        place="right" // Position the tooltip to the right of the element
        offset={10} // Adjust the distance between the tooltip and the element
        className="bg-gray-800 text-white text-sm p-2 rounded shadow-lg" // Custom styles
        style={{ zIndex: 1000 }} // Ensure the tooltip appears above other elements
      />
    </div>
  );
}
