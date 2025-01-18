import { query, collection, getDocs, updateDoc, where, addDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../../../Config/firebase";

export const sendVMessages = async (uniqueId, message) => {
    try {
        // Query the "meetingMessages" collection for the matching document
        const collectionRef = collection(db, "meetingMessages");
        const q = query(collectionRef, where("uniqueId", "==", uniqueId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            // If no document exists, create a new document with the uniqueId and initial message
            try {
                await addDoc(collectionRef, {
                    uniqueId,
                    messages: [message], // Use an array to initialize messages
                });
                console.log("Successfully created new document for:", uniqueId);
            } catch (e) {
                console.error("Error adding document:", e);
                throw e; // Re-throw error to propagate failure
            }
        } else {
            // If a document exists, update its "messages" field
            const docRef = querySnapshot.docs[0].ref;
            try {
                await updateDoc(docRef, {
                    messages: arrayUnion(message), // Ensure arrayUnion is imported
                });
                console.log("Message updated successfully for:", uniqueId);
            } catch (e) {
                console.error("Error updating document:", e);
                throw e; // Re-throw error to propagate failure
            }
        }

        return true; // Return true if operation is successful
    } catch (error) {
        console.error("Error in sendVMessages:", error);
        return false; // Return false in case of any error
    }
};

export const gettingVMessages = async (uniqueId,callback) => {
  const q = query(collection(db, "meetingMessages"), where("uniqueId", "==", uniqueId));
  const docs = await getDocs(q);
  callback( docs.docs.map((doc) => doc.data().messages));
};

