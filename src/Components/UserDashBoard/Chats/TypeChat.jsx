import React, { useState } from "react";
import { sendMessage } from "./sendingMessages";
import { auth } from "../../../Config/firebase";
import { useUser } from "../../../userContext";
import { v4 as uuidv4 } from 'uuid';

export default function TypeChat({ chatId }) {
  const [messageText, setMessageText] = useState("");
  const {userName } = useUser(); // Access userName from context

  const sendMessages = async () => {
    const message = {
      messageId :  uuidv4(),
      text: messageText,
      senderId: auth.currentUser.uid,
      timestamp: new Date().getTime(),
      senderName: auth.currentUser.displayName || userName || "guest", // Use the user's name from context
      read:false,
    };
    const sent = await sendMessage(message, chatId);
    if (sent) {
      console.log("Message sent successfully");
      setMessageText(""); // Clear the input field
    } else {
      console.log("Error sending message");
    }
  };

  return (
    <div className="flex gap-2 bg-white">
      <input
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
