import React, { useState,useEffect } from "react";
import { useUser } from "../../../userContext";
import { useUserData } from "../../../userContext";
import { editName } from "./EditingData";
import userIcon from "../icons/userIcon.png";
import editIcon from "../icons/EditIcon.png";
import editIconDark from '../icons/editIconDark.png'
import doneIcon from "../icons/doneIcon.png";
import doneIconDark from "../icons/doneIconDark.png"
import { useTheme } from "../../../ThemeContext";
import axios from "axios";


export default function UserName() {
  const { userData } = useUserData();
  const [userName,setUserName] = useState("Guest");
  const [email,setEmail] = useState("");
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

  useEffect(() => {
    const fetchUserProfile = async()=>{
      try {
        const response = await axios.get("http://localhost:4000/user-data/get-user-data", {withCredentials:true});
        setUserName(response.data.response.name)
        setEmail(response.data.response.email)
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfile()
  }, []);

  const updateName2 = (updatedName)=>{
    axios.post("http://localhost:4000/user-data/update-user-name", {
      name: updatedName,
    }, {withCredentials:true})
   .then((response) => {
      console.log(response.data);
      setUserName(updatedName);
    })
  }

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
              {email}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
      
        </div>
      </div>
    </>
  );
}
