import React, { useEffect, useState, useRef } from "react";
import { sendMessage } from "./sendingMessages";
import { auth } from "../../../Config/firebase";
import { useUser } from "../../../userContext";
import { v4 as uuidv4 } from "uuid";

export default function TypeChat({ chatId, isGroup }) {
  const [messageText, setMessageText] = useState("");
  const inputRef = useRef(null); // Create a ref for the input field
  const { userName } = useUser(); // Access userName from context

  const sendMessages = async () => {
    if (!messageText.trim()) return; // Prevent sending empty messages
    const message = {
      messageId: uuidv4(),
      text: messageText.trim(),
      senderId: auth.currentUser.uid,
      timestamp: new Date().getTime(),
      senderName: auth.currentUser.displayName || userName || "guest", // Use the user's name from context
      read: false,
    };
    const sent = await sendMessage(message, chatId, isGroup);
    if (sent) {
      console.log("Message sent successfully");
      setMessageText(""); // Clear the input field
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
  }, [messageText]); // Dependency array ensures latest state

  return (
    <div className="flex gap-2 bg-white">
      <input
        ref={inputRef} // Attach the ref to the input field
        type="text"
        placeholder="Type your message"
        value={messageText} // Bind value to state
        onChange={(e) => setMessageText(e.target.value)}
        className="border-2 border-blue-500 focus:outline-none focus:border-blue-700 p-2 w-[85%] h-[50px] rounded-lg"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          sendMessages();
        }}
        className="p-3 bg-blue-500 rounded-lg text-white"
      >
        Send
      </button>
    </div>
  );
}
