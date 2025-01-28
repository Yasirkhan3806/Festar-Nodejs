import React, { useState } from "react";
import { useUser } from "../../../userContext";
import { useUserData } from "../../../userContext";
import { editName } from "./EditingData";
import userIcon from "../icons/userIcon.png";
import editIcon from "../icons/EditIcon.png";
import editIconDark from '../icons/editIconDark.png'
import doneIcon from "../icons/doneIcon.png";
import doneIconDark from "../icons/doneIconDark.png"
import { useTheme } from "../../../ThemeContext";


export default function UserName() {
  const { userName } = useUser();
  const { userData } = useUserData();
  const [newUserName, setNewUserName] = useState(userName);
  const [showInput, setShowInput] = useState(false);
  const {darkMode} = useTheme();

  const getProfilePhoto = () => {
    // Assuming userData is an array and we're getting the first user's profile photo
    if (userData.length > 0 && userData[0].profilePicture) {
      return userData[0].profilePicture; // Return the profile picture URL
    } else {
      return userIcon; // Default user icon if no profile photo is available
    }
  };

  const updateName = () => {
    if (showInput) {
      editName(newUserName);
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="flex gap-3">
          <div>
            <img
              src={getProfilePhoto()}
              className="h-8 rounded-full"
              alt="user icon"
            />
          </div>
          <div className="">
            <span className="flex gap-2">
            <h1
              className={`font-bold ${showInput ? "hidden" : "block"}`}
            >
              {userName}
            </h1>
            <input
              className={`outline-blue-500 w-1/2 border-b-2 ${darkMode?"dark-mode":""} border-blue-500 ${showInput ? "block" : "hidden"}`}
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <button className={`${darkMode?"dark-mode":""}`} onClick={updateName}>
            {showInput ? (
              <img
                src={darkMode?doneIconDark:doneIcon}
                className="h-4 rounded-full"
                alt="user icon"
              />
            ) : (
              <img
                src={darkMode?editIconDark:editIcon}
                className="h-4 rounded-full"
                alt="user icon"
              />
            )}
          </button>


          
            </span>
            <p className="text-xs text-gray-600">
              {userData.length > 0 
                ? userData[0].email
                : "No Email given"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
      
        </div>
      </div>
    </>
  );
}
