import { db } from "../../../../Config/firebase";
import { collection, doc,setDoc, where, query,updateDoc} from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { getDocs } from "firebase/firestore";
import { useMeetingData } from "../../../../userContext";

// Create the context
const ParticipantStateContext = createContext();
export const useParticipantState = ()=> useContext(ParticipantStateContext);

// Create the provider component
export function ParticipantStateProvider({ children }) {
  const [Participants, setParticipants] = useState([]); // Initial state can be an object, array, etc.

  return (
    <ParticipantStateContext.Provider value={{Participants,setParticipants }}>
      {children}
    </ParticipantStateContext.Provider>
  );
}

// using this for host and to avoid hurdle i am creating a separate function for participant joining call
export const settingMeetingDataHost = async(meetingName,participants,uniqueId)=>{
    // Specify a collection and document name
    const docRef = doc(collection(db, "ParticipantsData"), uniqueId); 
await setDoc(docRef, {
    meetingName: meetingName,
    uniqueId,
    participants:participants
  });
  

}
export const settingMeetingDataParticipants = async (participants, uniqueId) => {
    const collectionRef = collection(db, "ParticipantsData");
  
    // Query to find documents where uniqueId matches
    const q = query(collectionRef, where("uniqueId", "==", uniqueId));
    const querySnapshot = await getDocs(q);
  
    // If there is at least one document, update the participants in all matching documents
    if (!querySnapshot.empty) {
      const updatePromises = [];
  
      querySnapshot.forEach((docSnapshot) => {
        const docRef = doc(db, "ParticipantsData", docSnapshot.id);
        const existingParticipants = docSnapshot.data().participants || [];
        const updatedParticipants = [...existingParticipants, ...participants];
  
        // Add the updateDoc call to the array of promises
        updatePromises.push(updateDoc(docRef, { participants: updatedParticipants }));
      });
  
      // Wait for all update operations to finish
      await Promise.all(updatePromises);
  
      console.log("Documents updated successfully!");
    } else {
      console.log("No document found with this uniqueId.");
    }
  };



  export const removingParticipant = async(userId,uniqueId)=>{
    storingParticipantData(userId)
    const collectionRef = collection(db,"ParticipantsData")
    const q = query(collectionRef, where("uniqueId", "==", uniqueId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const updatePromises = [];
  
      querySnapshot.forEach((docSnapshot) => {
        const docRef = doc(db, "ParticipantsData", docSnapshot.id);
        const Participants = docSnapshot.data().participants || [];
      }
    )
    }
  }

  const storingParticipantData = async (userId) => {
   const { setUniqueIdFilter, userMeetingData } = useMeetingData();
    useEffect(() => {
       // const storedUniqueId = localStorage.getItem("uniqueId");
   
       if (storedUniqueId) {
         // console.log("stored ID",storedUniqueId)
         setUniqueIdFilter(storedUniqueId);
       } else {
         console.error("No uniqueId found in localStorage");
       }
     }, [setUniqueIdFilter]);
     console.log(userMeetingData)
    const secCollectionRef = collection(db, "UserMeetingData");
    const q = query(secCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const meetingData = querySnapshot.docs[0].data().meetingData || [];
        const updatedMeetingData = [...meetingData, ...setMeetingData];
        
        await updateDoc(docRef, { meetingData: updatedMeetingData });
    }
};



