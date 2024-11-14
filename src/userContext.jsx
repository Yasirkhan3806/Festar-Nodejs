import { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "./Config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Create contexts
const UserContext = createContext();
const EventsContext = createContext();

// Custom hooks for accessing contexts
export const useUser = () => useContext(UserContext);
export const useEvents = () => useContext(EventsContext);

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("Guest");

  // Function to get userName from Firestore
  const getUserNameForLoggedInUser = async (userId, collectionName) => {
    try {
      const collectionRef = collection(db, collectionName);
      const userQuery = query(collectionRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(userQuery);
      const userNames = querySnapshot.docs.map((doc) => doc.data().userName);
      setUserName(userNames[0] || "Guest");
      console.log("UserName updated:", userNames[0]);
    } catch (error) {
      console.error("Error fetching userName from Firestore:", error);
    }
  };

  // Add an authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserNameForLoggedInUser(user.uid, "userData");
      } else {
        setUserName("Guest");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userName }}>
      {children}
    </UserContext.Provider>
  );
};

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  // Function to fetch events
  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "UserEvents"));
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events }}>
      {children}
    </EventsContext.Provider>
  );
};
