import { createContext, useContext } from "react";
import { io } from "socket.io-client";

// Initialize socket connection (Make sure to use your actual WebSocket server URL)
const socket = io("http://localhost:4000", {
  autoConnect: false,   // Do not connect automatically
  withCredentials: true // Ensure cookies (including HTTP-only cookies) are sent
});

// Create Context
const SocketContext = createContext();

// Custom Hook to use the socket
export const useSocket = () => useContext(SocketContext);

// Context Provider Component
export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
