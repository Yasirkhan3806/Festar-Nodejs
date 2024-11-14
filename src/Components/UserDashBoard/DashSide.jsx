import React from "react";
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

export default function DashSide({ activeItem, setActiveItem }) {
  const { userName } = useUser();

  const sidebarItems = [
    { name: "Events", icon: eventIcon },
    { name: "Meetings", icon: meetingIcon },
    { name: "Goals", icon: goalsIcon },
    { name: "Chats", icon: chatsIcon },
    { name: "Calls", icon: callsIcon },
    { name: "RegisterEvents", icon: registerEventsIcon },
    { name: "Notifications", icon: notificationsIcon },
    { name: "Settings", icon: settingsIcon },
  ];

  return (
    <div className="bg-blue-500 font-monts font-bold p-6 py-9 flex flex-col gap-16 w-full">
      <h1 className="text-white font-bold hover:border-b-2 text-2xl">
        Dashboard
      </h1>
      <ul className="flex flex-col justify-center text-white gap-2">
        {sidebarItems.map((item) => (
          <li
            key={item.name}
            onClick={() => setActiveItem(item.name)}
            className='flex items-center gap-2 cursor-pointer p-2'
          >
            <img className="h-6" src={item.icon} alt={`${item.name} icon`} />
            <p className={`hover:border-b-2 ${activeItem === item.name ? "border-b-2 border-white" : ""}`}>{item.name}</p>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 cursor-pointer p-1">
        <img className="h-8" src={userIcon} alt="User Icon" />
        <h3 className="text-white font-bold hover:border-b-2 text-lg">
          {userName}
        </h3>
      </div>
    </div>
  );
}
