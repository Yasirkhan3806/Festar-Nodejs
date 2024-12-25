import {collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../Config/firebase";

const removeParticipantByUserId = async (uniqueId, userId) => {
  try {
    // Query the collection for the document with the matching uniqueId
    const q = query(collection(db, "ParticipantsData"), where("uniqueId", "==", uniqueId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No document found with the given uniqueId.");
      return;
    }

    // Loop through matching documents (should ideally be one if uniqueId is unique)
    querySnapshot.forEach(async (docSnapshot) => {
      const docRef = doc(db, "ParticipantsData", docSnapshot.id);
      const docData = docSnapshot.data();

      // Get the current participants array
      const participants = docData.participants || [];

      // Filter out the participant with the specified userId
      const updatedParticipants = participants.filter(participant => participant.userId !== userId);

      // Update the participants array in Firestore
      await updateDoc(docRef, { participants: updatedParticipants });
      console.log(`Participant with userId ${userId} removed successfully.`);
    });
  } catch (error) {
    console.error("Error removing participant:", error);
  }
};

export default removeParticipantByUserId;
