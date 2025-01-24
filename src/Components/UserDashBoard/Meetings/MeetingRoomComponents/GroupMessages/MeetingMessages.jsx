import React, { useState, useEffect } from "react";
import messageIcon from "../../../icons/messageIcon.png";
import { useUserData } from "../../../../../userContext";
import { sendVMessages} from "./sendVideoMessage";
import { auth } from "../../../../../Config/firebase";
import { gettingVMessages } from "./sendVideoMessage";
import {useTheme} from "../../../../../ThemeContext"


const MessageSidebar = ({ activeOpen,host }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [uniqueId, setUniqueId] = useState(null);
  const [messages, setMessages] = useState([]);
  const { userName } = useUserData();
  const {darkMode} = useTheme()

  useEffect(() => {
    let storedUniqueId = null
    if(host){
       storedUniqueId = localStorage.getItem("uniqueId");
    }else{
     storedUniqueId = localStorage.getItem("participantUniqueId");
    }
    setUniqueId(storedUniqueId);
  }, []);


  useEffect(() => {
    try{
        gettingVMessages(uniqueId,setMessages)
    }catch(E){
      console.log("error getting messages: ",E)
    }

  }, [messages]);




  const sendMessages = async () => {
    if (!message.trim()) return;

    const messageText = {
      text: message.trim(),
      timestamp: new Date().getTime(),
      senderName: auth.currentUser?.displayName || userName || "guest",
    };

    try {
      const sent = await sendVMessages(uniqueId, messageText);
      if (sent) setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Formats to a readable string
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const bottomPosition = activeOpen ? "bottom-[3rem]" : "bottom-[15.5rem]";

  return (
    <div className="relative flex h-screen">
      <a
        onClick={toggleSidebar}
        className={`${
          isSidebarOpen ? "hidden" : "block"
        } fixed top-[8rem] right-[-8px] text-white px-4 py-2 z-10`}
      >
        <img className="h-[2.0rem]" src={messageIcon} alt="Message Icon" />
      </a>

      <div
        className={`${isSidebarOpen ? "absolute" : "fixed"} ${bottomPosition} right-0 h-full bg-white shadow-md transform transition-transform duration-300 
          ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} w-[23rem] ${darkMode?"dark-mode":"bg-blue-500"}`}
      >
        <span className={`flex justify-between ${darkMode?"dark-mode":"bg-white"} border-b border-gray-300 p-2`}>
          <a
            onClick={() => setIsSidebarOpen(false)}
            className="text-blue-700 font-bold"
          >
            X
          </a>
          <h2 className={`${darkMode?"dark-mode":""} text-lg font-semibold p-4`}>Messages</h2>
        </span>
        <ul className={`p-4 space-y-4 overflow-y-scroll md:h-[73%] lg:h-[73%] h-full`}>
        {messages && messages.length > 0 ? (
  messages[0].map((msg, index) => (
    <li
      key={index}
      className="flex items-start gap-4 p-2 bg-white rounded-md shadow dark-mode border-2 border-white"
    >
      <div className="flex flex-col">
        <p className="font-medium">{msg.senderName}</p>
        <p className="text-gray-500 text-sm">{msg.text}</p>
        <span className="text-xs text-gray-400">
          {formatTimestamp(msg.timestamp)}
        </span>
      </div>
    </li>
  ))
) : (
  <p>No Messages</p>
)}

         
        </ul>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter") await sendMessages();
          }}
          className={`${darkMode?"dark-mode":""} w-[20rem] h-[2.5rem] border-2 border-blue-400 ml-[1rem] mt-[2rem] p-[0.5rem] focus:border-blue-500 focus:outline-none !focus:border-blue-400 rounded-lg`}
        />
      </div>
    </div>
  );
};

export default MessageSidebar;
