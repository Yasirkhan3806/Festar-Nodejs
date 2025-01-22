import React from "react";
import logo from "../../assets/Pictures/logo_primary_V17oRtSd.png";
import userIcon from "./icons/userIcon2.png";
import { useUser } from "../../userContext"; // Import the custom hook
import { useUserData } from "../../userContext";
import UserName from "./settings/UserName";

export default function DashNav() {
  const { userName } = useUser(); // Access userName from context
  const {userData}  = useUserData()
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
          <img className="h-20" src={logo} alt="" />
        </li>
        <li className="flex mt-6 gap-2">
          <UserName/>
        {/* <img src={getProfilePhoto()} className="h-8 rounded-full" alt="user icon" />
          <p className="mt-1">
            <b>{userName}</b>
          </p> */}
        </li>
      </ul>
    </nav>
  );
}
