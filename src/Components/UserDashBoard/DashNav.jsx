import React, { useEffect, useState } from "react";
import logo from "../../assets/Pictures/logo_primary_V17oRtSd.png";
import logoWhite from "../../assets/Pictures/logo-inverted-color.png"
import userIcon from "./icons/userIcon2.png";
import { useUser } from "../../userContext"; // Import the custom hook
import { useUserData } from "../../userContext";
import { useTheme } from "../../ThemeContext";
import UserName from "./settings/UserName";
import DarkmodeToggler from "../DarkmodeToggler";
import useWindowSize from "./WindowSize";


export default function DashNav() {
  const { userName } = useUser(); // Access userName from context
  const {userData}  = useUserData()
  const {darkMode} = useTheme();
  const [width] = useWindowSize();
  const [mobWindow,setMobWindow] = useState(false)
 
  const renderDarkModeToggle = ()=>{
    if(width <= 768){
      setMobWindow(false)
    }else{
      setMobWindow(true)
    }
  }
  
  useEffect(()=>{
    renderDarkModeToggle()
  },[width])


  const getProfilePhoto = () => {
    // Assuming userData is an array and we're getting the first user's profile photo
    if (userData.length > 0 && userData[0].profilePicture) {
      return userData[0].profilePicture; // Return the profile picture URL
    } else {
      return userIcon; // Default user icon if no profile photo is available
    }
  };
  return (
    <nav className="w-[100%]">
      <ul className="flex justify-between border-b-2 border-b-blue-500 pl-14 pr-6 sm:px-6 lg:px-6 ">
        <li>
          <img className="h-20" src={darkMode?logoWhite:logo} alt="" />
        </li>
        <li className="flex mt-6 gap-8">
          {mobWindow && <DarkmodeToggler/>}
          <UserName/>
        </li>
      </ul>
    </nav>
  );
}
