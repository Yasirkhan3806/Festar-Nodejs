import React, { useState, useRef, useEffect } from "react";
import messageIcon from "../../../icons/messageIcon.png";
import { useUserData } from "../../../../../userContext";
import { sendVMessages } from "./sendVideoMessage";
import { auth } from "../../../../../Config/firebase";

const MessageSidebar = ({ activeOpen }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [uniqueId, setUniqueId] = useState(null);
  const { userName } = useUserData();

  useEffect(() => {
    setUniqueId(localStorage.getItem("uniqueId"));
  }, []);

  const sendMessages = async () => {
    if (!message.trim()) return;
    const messageText = {
      text: message.trim(),
      timestamp: new Date().getTime(),
      senderName: auth.currentUser?.displayName || userName || "guest",
    };
    try {
      const sent = await sendVMessages(uniqueId, messageText);
      if (sent) {
        console.log("Message sent successfully");
        setMessage("");
      } else {
        console.error("Error sending message");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const bottomPosition = activeOpen ? "bottom-[3rem]" : "bottom-[15.5rem]";
  const messages = [
    {
      id: 1,
      sender: "Dianne Russell",
      text: "Hey, how’s it going?",
      time: "12:45 PM",
    },
    {
      id: 2,
      sender: "Guy Hawkins",
      text: "Let’s catch up later.",
      time: "1:00 PM",
    },
  ];

  return (
    <div className="relative flex h-screen">
      <button
        onClick={toggleSidebar}
        className={`${
          isSidebarOpen ? "hidden" : "block"
        } fixed top-[8rem] right-[-8px] text-white px-4 py-2 z-10`}
      >
        <img className="h-[2.0rem]" src={messageIcon} alt="Message Icon" />
      </button>

      <div
        className={`${isSidebarOpen ? "absolute" : "fixed"} ${bottomPosition} right-0 h-full bg-white shadow-md transform transition-transform duration-300 
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} w-[23rem]`}
      >
        <span className="flex justify-between bg-white border-b border-gray-300 p-2">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-blue-700 font-bold"
          >
            X
          </button>
          <h2 className="text-lg font-semibold p-4">Messages</h2>
        </span>
        <ul className="p-4 space-y-4 overflow-y-scroll h-[73%]">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className="flex items-start gap-4 p-2 bg-white rounded-md shadow"
            >
              <div className="flex flex-col">
                <p className="font-medium">{msg.sender}</p>
                <p className="text-gray-500 text-sm">{msg.text}</p>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") await sendMessages();
          }}
          className="w-[20rem] h-[2.5rem] border-2 border-blue-400 ml-[1rem] mt-[2rem] p-[0.5rem] focus:border-blue-500 focus:outline-none !focus:border-blue-400 rounded-lg"
        />
      </div>
    </div>
  );
};

export default MessageSidebar;
