import React, { createContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState([]);
  const [chatId, setChatId] = useState("");

  return (
    <ChatContext.Provider value={{ currentChat, setCurrentChat, chatId, setChatId }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;