import { createContext, useContext, useState, useEffect } from "react";
import { db,auth } from "./Config/firebase"; // Update the path to firebase config
import { collection, getDocs, query, where } from "firebase/firestore";

// Create a context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("Guest");

  // Function to get userName from Firestore
  async function getUserNameForLoggedInUser(collectionName) {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const collectionRef = collection(db, collectionName);
        const userQuery = query(collectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(userQuery);
        const userNames = querySnapshot.docs.map((doc) => doc.data().userName);
        setUserName(userNames[0] || "Guest");
      } else {
        console.log("No user is logged in.");
      }
    } catch (error) {
      console.error("Error fetching userName from Firestore:", error);
    }
  }

  // Run the function when the component mounts
  useEffect(() => {
    getUserNameForLoggedInUser("userData"); // Replace "userData" with your collection name
  }, []);

  return (
    <UserContext.Provider value={{ userName }}>
      {children}
    </UserContext.Provider>
  );
};
