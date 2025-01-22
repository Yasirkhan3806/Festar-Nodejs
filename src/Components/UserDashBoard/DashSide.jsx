import React, { useState } from "react";
import meetingIcon from "./icons/meetings.png";
import chatsIcon from "./icons/chatsIcon.png";
import registerEventsIcon from "./icons/registerEventsIcon.png";

export default function DashSide({ activeItem, setActiveItem }) {
  const [isOpen, setIsOpen] = useState(false);


  const sidebarItems = [
    { name: "RegisterEvents", icon: registerEventsIcon },
    { name: "Meetings", icon: meetingIcon },
    { name: "Chats", icon: chatsIcon },
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
      </div>
    </div>
  );
}
