import { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "./Config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Create a context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

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
    <UserContext.Provider value={{ userName }}>{children}</UserContext.Provider>
  );
};
