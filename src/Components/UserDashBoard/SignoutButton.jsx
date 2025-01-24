import React from "react";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase Auth methods
import { useNavigate } from "react-router-dom"; // Optional: For redirecting after logout
import logoutIconDark from "./icons/logoutIcon.png"
import logoutIconWhite from "./icons/logoutIconWhite.png"
import { useTheme } from "../../ThemeContext";
import DarkmodeToggler from "../DarkmodeToggler";

export default function SignoutButton() {
  const auth = getAuth(); // Get the Firebase Auth instance
  const navigate = useNavigate(); // Optional: For redirecting after logout
  const {darkMode} = useTheme()

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
      <button
        onClick={handleSignOut}
        className="px-3"
      >
        <img src={darkMode?logoutIconDark:logoutIconWhite} alt="" />
      </button>
    </div>
  );
}