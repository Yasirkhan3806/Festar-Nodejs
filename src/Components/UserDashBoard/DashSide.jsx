import React, { useState } from "react";
import { Tooltip } from "react-tooltip"; // Import react-tooltip
import meetingIcon from "./icons/meetings.png";
import meetingLightIcon from "./icons/meeetingsIconLight.png";
import chatsIcon from "./icons/chatsIcon.png";
import chatsIconLight from "./icons/chatsLightIcon.png";
import registerEventsIcon from "./icons/registerEventsIcon.png";
import registerEventsLightIcon from "./icons/registerEventsLight.png";
import { useTheme } from "../../ThemeContext";
import SignoutButton from "./SignoutButton";
import DarkmodeToggler from "../DarkmodeToggler";
import UserName from "./settings/UserName";

export default function DashSide({ activeItem, setActiveItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useTheme();

  const sidebarItems = [
    {
      name: "RegisterEvents",
      icon: darkMode ? registerEventsIcon : registerEventsLightIcon,
    },
    { name: "Meetings", icon: darkMode ? meetingIcon : meetingLightIcon },
    { name: "Chats", icon: darkMode ? chatsIcon : chatsIconLight },
  ];

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <a
        className={`block mt-[1.3rem] ml-3 md:hidden p-2 ${
          darkMode ? "dark-mode" : "bg-blue-500"
        } w-[32px]`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-6 h-1 bg-white mb-1"></div>
        <div className="w-6 h-1 bg-white mb-1"></div>
        <div className="w-6 h-1 bg-white"></div>
      </a>

      {/* Sidebar */}
      <div
        className={` mt-[-2rem] md:mt-0 lg:mt-0 font-monts font-bold p-6 py-9 flex flex-col gap-7 md:gap-14 w-64 
          absolute top-0 left-0 h-screen transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:fixed md:top-16 md:translate-x-0 ${
          darkMode ? "bg-black text-black" : "bg-blue-500"
        } md:bg-transparent`}
      >
        {/* Close Button */}
        <a
          className="absolute top-4 right-4 text-white text-2xl md:hidden"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </a>
        <h1 className="text-white text-2xl block md:hidden lg:hidden">Menu</h1>
        <ul className="flex flex-col justify-center text-white gap-4 md:gap-5">
          <li className="blockmd:hidden lg:hidden">
            <UserName />
          </li>
          {sidebarItems.map((item) => (
            <li
              key={item.name}
              onClick={() => {
                setActiveItem(item.name);
                setIsOpen(false); // Close the menu on selection
              }}
              className="flex items-center gap-2 cursor-pointer p-2"
              // Add tooltip content
            >
              <img
                className="h-6"
                src={item.icon}
                alt={`${item.name} icon`}
                data-tooltip-id="sidebar-tooltip" // Add tooltip ID
                data-tooltip-content={item.name}
              />
              <p className="block md:hidden lg:hidden">{item.name}</p>
            </li>
          ))}
          <li className="flex">
            <SignoutButton /> <p className="md:hidden lg:hidden">Log Out</p>
          </li>
          <li className="block md:hidden">
            <DarkmodeToggler />
          </li>
        </ul>
      </div>

      {/* Tooltip Component */}
      <Tooltip
        id="sidebar-tooltip"
        place="right" // Position the tooltip to the right of the element
        offset={10} // Adjust the distance between the tooltip and the element
        className="bg-gray-800 text-white text-sm p-2 rounded shadow-lg relative top-0" // Custom styles
        style={{ zIndex: 1000 }} // Ensure the tooltip appears above other elements
      />
    </div>
  );
}
