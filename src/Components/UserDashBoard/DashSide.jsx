import React, { useState } from "react";
import eventIcon from "./icons/eventIcon2.png";
import meetingIcon from "./icons/meetings.png";
import goalsIcon from "./icons/goalsIcon.png";
import chatsIcon from "./icons/chatsIcon.png";
import callsIcon from "./icons/callsIcon.png";
import registerEventsIcon from "./icons/registerEventsIcon.png";
import notificationsIcon from "./icons/notificationsIcon.png";
import settingsIcon from "./icons/settingsIcon.png";
import userIcon from "./icons/sideUserIcon.png";
import { useUser } from "../../userContext";
import { useUserData } from "../../userContext";

export default function DashSide({ activeItem, setActiveItem }) {
  const { userName } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const {userData}  = useUserData()
  const getProfilePhoto = () => {
    // Assuming userData is an array and we're getting the first user's profile photo
    if (userData.length > 0 && userData[0].profilePicture) {
      return userData[0].profilePicture; // Return the profile picture URL
    } else {
      return userIcon; // Default user icon if no profile photo is available
    }
  };

  const sidebarItems = [
    { name: "RegisterEvents", icon: registerEventsIcon },
    { name: "Meetings", icon: meetingIcon },
    { name: "Goals", icon: goalsIcon },
    { name: "Chats", icon: chatsIcon },
    { name: "Calls", icon: callsIcon },
    { name: "Notifications", icon: notificationsIcon },
    { name: "Settings", icon: settingsIcon },
  ];

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        className="block mt-[1.3rem] ml-3 md:hidden p-2 text-white bg-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-1 bg-white mb-1"></div>
        <div className="w-6 h-1 bg-white mb-1"></div>
        <div className="w-6 h-1 bg-white"></div>
      </button>

      {/* Sidebar */}
      <div
        className={`bg-blue-500 mt-[-2rem] md:mt-0 lg:mt-0 font-monts font-bold p-6 py-9 flex flex-col gap-7 md:gap-14 w-64 absolute top-0 left-0 h-screen transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl md:hidden"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </button>

        <h1 className="text-white font-bold hover:border-b-2 text-2xl">
          Dashboard
        </h1>
        <ul className="flex flex-col justify-center text-white gap-4 md:gap-5">
          {sidebarItems.map((item) => (
            <li
              key={item.name}
              onClick={() => {
                setActiveItem(item.name);
                setIsOpen(false); // Close the menu on selection
              }}
              className="flex items-center gap-2 cursor-pointer p-2"
            >
              <img className="h-6" src={item.icon} alt={`${item.name} icon`} />
              <p
                className={`hover:border-b-2 ${
                  activeItem === item.name ? "border-b-2 border-white" : ""
                }`}
              >
                {item.name}
              </p>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 cursor-pointer p-1">
          <img className="h-8 rounded-full" src={getProfilePhoto()} alt="User Icon" />
          <h3 className="text-white font-bold hover:border-b-2 text-lg">
            {userName}
          </h3>
        </div>
      </div>
    </div>
  );
}
