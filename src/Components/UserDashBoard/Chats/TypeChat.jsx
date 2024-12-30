import React, { useState } from "react";
import { sendMessage } from "./sendingMessages";
import { auth } from "../../../Config/firebase";

export default function TypeChat({ chatId }) {
  const [messageText, setMessageText] = useState("");

  const sendMessages = async () => {
    const message = {
      text: messageText,
      senderId: auth.currentUser.uid,
      timestamp: new Date().getTime(),
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
