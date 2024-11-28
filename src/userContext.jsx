import { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "./Config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

// Create contexts
const UserContext = createContext();
const EventsContext = createContext();
const userDataContext = createContext();

// Custom hooks for accessing contexts
export const useUser = () => useContext(UserContext);
export const useEvents = () => useContext(EventsContext);
export const useUserData = () => useContext(userDataContext);

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);

  // Function to get userData from Firestore

  const getUserData = async (userId) => {
    try {
      // Reference to the 'userData' collection
      const collectionRef = collection(db, "userData");

      // Query to filter by logged-in user UID
      const q = query(collectionRef, where("userId", "==", userId));

      // Fetch the documents matching the UID
      const querySnapshot = await getDocs(q);

      // Extract data from the querySnapshot and set state
      const data = querySnapshot.docs.map((doc) => doc.data());
      setUserData(data);
    } catch (e) {
      console.log("Error fetching user data:", e);
      setUserData([]); // Handle error by setting empty array
    }
  };

  // Use the onAuthStateChanged listener to detect user login
  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, fetch their data
        getUserData(user.uid);
      } else {
        // No user is logged in
        setUserData([]); // Clear user data if no user is logged in
      } 
    });
      // Cleanup the listener when component unmounts
      return () => unsubscribe();
    }, []);

  return (
    <userDataContext.Provider value={{ userData }}>
      {children}
    </userDataContext.Provider>
  );
};

 


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
