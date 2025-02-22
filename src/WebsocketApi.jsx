import axios from "axios";
import { createContext, useContext,useState,useEffect } from "react";
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

const EventContext = createContext();

export const useEvent = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [eventData, setEventData] = useState([]);

  // Fetch event data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/create-event/get-event-data", {
        withCredentials: true,
      });
      setEventData(response.data.eventData); 
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  useEffect(() => {
    // Join the room when the component mounts
    socket.emit("join-room");

    // Listen for event updates
    const handleEventUpdate = async () => {
      console.log("🔔 Event update received, fetching new data...");
      await fetchData();
    };

    socket.on("eventUpdated", handleEventUpdate);

    // Cleanup function to prevent memory leaks
    return () => {
      socket.off("eventUpdated", handleEventUpdate);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <EventContext.Provider value={{ eventData, fetchData }}>
      {children}
    </EventContext.Provider>
  );
};
