import React, { useEffect, useRef } from "react";
import { auth } from "../../../Config/firebase";
import DeleteMessage from "./DeleteChats/DeleteMessage";
import { useTheme } from "../../../ThemeContext";

export default function MainChat({ currentChat,chatId,isGroup }) {
  const messagesEndRef = useRef(null); // Reference to the end of the chat container
  const {darkMode} = useTheme();

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [currentChat]); // Trigger scrolling when currentChat changes (new messages)

  return (
    <div className="flex flex-col space-y-4 overflow-y-auto h-[98%] p-4 scroll-left">
      {currentChat && currentChat.length > 0 ? (
        currentChat.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start ${
              msg.senderId === auth.currentUser.uid
                ? "justify-end" // Align sent messages to the right
                : "justify-start" // Align received messages to the left
            }`}
          >
            <div
              className={`p-3 rounded-lg w-[48%] ${
                msg.senderId === auth.currentUser.uid
                  ? "bg-blue-500 text-white" // Styling for sent messages
                  : ` ${darkMode?"dark-mode border-2 border-white":"bg-gray-200"} ` // Styling for received messages
              }`}
              
            >
              <p className="text-xs">from {msg.senderName}</p>
              <span className="flex justify-between">
                <p className="font-bold">{msg.text}</p>
                <div>
                  {msg.senderId === auth.currentUser.uid &&
                  <DeleteMessage messageId = {msg.messageId} chatId={chatId} isGroupMessage={isGroup} />
                  }
                </div>
              </span>
              <span
                className={`text-xs ${
                  msg.senderId === auth.currentUser.uid
                    ? "text-white" // Styling for sent messages
                    : ` ${darkMode?"dark-mode":"text-black"} ` // Styling for received messages
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No messages</p>
      )}
      {/* The reference to automatically scroll to the bottom */}
      <div ref={messagesEndRef} />{" "}
      {/* This is the reference that you scroll to */}
    </div>
  );
}
