import React, { useEffect, useState, useRef } from "react";
import { sendMessage } from "./sendingMessages";
import sendMessagesIcon from "../Chats/icons/sendMessagesIcon (2).png";
import emojiIcon from "../Chats/icons/emojiIcon.png"; // Add your emoji icon here
import { auth } from "../../../Config/firebase";
import { useUser } from "../../../userContext";
import { v4 as uuidv4 } from "uuid";
import Picker from '@emoji-mart/react';
// import "@emoji-mart/css/emoji-mart.css"; // Import emoji-mart styles
import { useTheme } from "../../../ThemeContext";

export default function TypeChat({ chatId, isGroup }) {
  const [messageText, setMessageText] = useState("");
  const emojiRef = useRef("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for toggling emoji picker
  const inputRef = useRef(null);
  const { userName } = useUser();
  const {darkMode} = useTheme();

  const sendMessages = async () => {
    if (!messageText.trim()) return;
    const message = {
      messageId: uuidv4(),
      text: messageText.trim(),
      senderId: auth.currentUser.uid,
      timestamp: new Date().getTime(),
      senderName: auth.currentUser.displayName || userName || "guest",
      read: false,
    };
    const sent = await sendMessage(message, chatId, isGroup);
    if (sent) {
      console.log("Message sent successfully");
      setMessageText("");
    } else {
      console.log("Error sending message");
    }
  };

  useEffect(() => {
    const handleKeyDown = async (event) => {
      if (event.key === "Enter") {
        await sendMessages();
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [messageText]);

  // Function to handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setMessageText((prevText) => prevText + emoji.native); // Append selected emoji to the text
  };
  useEffect(() => {
          const handleClick = (event) => {
            if (showEmojiPicker && emojiRef.current && !emojiRef.current.contains(event.target)) {
              setShowEmojiPicker(false);
            }
          };
      
          document.addEventListener("click", handleClick);
      
          return () => {
            document.removeEventListener("click", handleClick);
          };
        }, [showEmojiPicker]); //

  return (
    <div className={` ${darkMode?"dark-mode border-2 border-white":""} flex items-center gap-4 bg-white p-2 rounded-2xl`}>
      {/* Emoji Icon */}
      <div className="relative dark-mode">
        <img
          src={emojiIcon}
          alt="Emoji"
          className="h-[24px] cursor-pointer"
          onClick={(event) =>{ 
            event.stopPropagation()
            setShowEmojiPicker((prev) => !prev)}} // Toggle emoji picker
        />
        {showEmojiPicker && (
          <div ref={emojiRef} className="absolute bottom-[3rem] mt-2 z-10">
            <Picker
              onEmojiSelect={handleEmojiSelect}
              theme="light" // Choose between 'light' or 'dark'
            />
          </div>
        )}
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        className={` ${darkMode?"dark-mode":""} border-2 border-blue-500 focus:outline-none focus:border-blue-700 p-2 w-[81%] h-[50px] rounded-lg dark-mode`}
      />

      {/* Send Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          sendMessages();
        }}
        className={` ${darkMode?"dark-mode":""} p-1 bg-white rounded-lg text-white dark-mode`}
      >
        <img className="h-[32px] " src={sendMessagesIcon} alt="Send" />
      </button>
    </div>
  );
}
