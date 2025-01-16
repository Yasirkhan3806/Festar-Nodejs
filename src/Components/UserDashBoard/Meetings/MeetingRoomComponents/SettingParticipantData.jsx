import { auth, db } from "../../../../Config/firebase";
import {
  collection,
  doc,
  setDoc,
  where,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getDocs } from "firebase/firestore";
import { useMeetingData } from "../../../../userContext";
import { name } from "@cloudinary/url-gen/actions/namedTransformation";

// Create the context
const ParticipantStateContext = createContext();
export const useParticipantState = () => useContext(ParticipantStateContext);

// Create the provider component
export function ParticipantStateProvider({ children }) {
  const [Participants, setParticipants] = useState([]); // Initial state can be an object, array, etc.

  return (
    <ParticipantStateContext.Provider value={{ Participants, setParticipants }}>
      {children}
    </ParticipantStateContext.Provider>
  );
}

// using this for host and to avoid hurdle i am creating a separate function for participant joining call
export const settingMeetingDataHost = async (
  meetingName,
  participants,
  uniqueId
) => {
  // Specify a collection and document name
  const docRef = doc(collection(db, "ParticipantsData"), uniqueId);
  await setDoc(docRef, {
    meetingName: meetingName,
    uniqueId,
    participants: participants,
  });
};
export const settingMeetingDataParticipants = async (
  participants,
  uniqueId
) => {
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
      updatePromises.push(
        updateDoc(docRef, { participants: updatedParticipants })
      );
    });

    // Wait for all update operations to finish
    await Promise.all(updatePromises);

    console.log("Documents updated successfully!");
  } else {
    console.log("No document found with this uniqueId.");
  }
};

export const removingParticipant = async (userId, uniqueId,meetingName,meetingTime) => {
  console.log(userId)
  console.log(uniqueId)
  console.log(meetingName)
  console.log(meetingTime)
  storingParticipantData(userId,meetingName,meetingTime,uniqueId);
  const collectionRef = collection(db, "ParticipantsData");
  console.log(uniqueId)
  const q = query(collectionRef, where("uniqueId", "==", uniqueId[0]));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const updatePromises = [];

    querySnapshot.forEach((docSnapshot) => {
      const docRef = doc(db, "ParticipantsData", docSnapshot.id);
      const participants = docSnapshot.data().participants || [];
      const filteredParticipants = participants.filter(
        (participant) => participant.userId !== auth.currentUser?.uid
      );      
      updatePromises.push(
        updateDoc(docRef, { participants: filteredParticipants })
      );
    });

    // Wait for all update operations to finish
    await Promise.all(updatePromises);

    console.log("Documents updated successfully!");
  }
};

const calculateTimeDifference = (givenTime) => {
  if (givenTime) {
    const [time, modifier] = givenTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    const givenTotalMinutes = hours * 60 + minutes;
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    let differenceInMinutes = currentTotalMinutes - givenTotalMinutes;

    if (differenceInMinutes < 0) {
      differenceInMinutes += 24 * 60;
    }

    const diffHours = Math.floor(differenceInMinutes / 60);
    const diffMinutes = differenceInMinutes % 60;

    return { hours: diffHours, minutes: diffMinutes };
  } else {
    console.log("No time given", givenTime);
    return { hours: 0, minutes: 0 };
  }
};

const storingParticipantData = async (userId,meetingName,meetingTime,meetingId) => {
  const secCollectionRef = collection(db, "UserMeetingData");
  const q = query(secCollectionRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const totalMeetingTime = meetingTime
  ? calculateTimeDifference(meetingTime)
  : { hours: 0, minutes: 0 };

  const setMeetingData = [{
    meetingName:meetingName[0],
    userId,
    totalTime:totalMeetingTime,
    meetingId:meetingId[0],
  }]

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref;
    const meetingData = querySnapshot.docs[0].data().meetingData || [];
    if (meetingData.filter((data) => data.meetingId === meetingId[0]).length === 0) {
      const updatedMeetingData = [...meetingData, ...setMeetingData];
    
      try {
        await updateDoc(docRef, { meetingData: updatedMeetingData });
        console.log("Document updated successfully!");
      } catch (error) {
        console.error("Error updating document:", error);
      }
    } else {
      console.log("MeetingData already exists for meetingId:", meetingId);
    }
    
  } else{
    try {
      const docRef = await addDoc(secCollectionRef, {
        userId:auth.currentUser?.uid,
        meetingsData:setMeetingData,
        note:"Stores meetingData",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  
  }
};
