import { query,collection,getDocs,where,updateDoc } from "firebase/firestore";
import { db,auth } from "../../../Config/firebase";
import { arrayUnion } from "firebase/firestore";


export const sendMessage = async (message, chatId,isGroup) => {
    try {
        console.log("Sending message:", message);
        // Query the "GroupMessages" collection where "chatId" matches the provided chatId
        let q  = null;
        if(isGroup){
            q = query(
                collection(db, "GroupMessages"),
                where("chatid", "==", chatId)
            );
        }else{
            q = query(
                collection(db, "IndividualMessages"),
                where("chatId", "==", chatId)
            );
        }

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.error("No matching chat document found for chatId:", chatId);
            return false; // Return false if no matching document is found
        }

        // Assuming only one matching document (chatId is unique)
        const docRef = querySnapshot.docs[0].ref;

        // Update the messages array with the new message object
        await updateDoc(docRef, {
            messages: arrayUnion(message),
        });

        console.log("Message sent successfully:", message);
        return true;
    } catch (error) {
        console.error("Error sending message: ", error);
        return false; // Return false in case of an error
    }
};

export const settingRead = async (chatId) => {
    try {
        const q = query(
            collection(db, "GroupMessages"),
            where("chatid", "==", chatId)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.error("No matching chat document found for chatId:", chatId);
            return false;
        }

        const docRef = querySnapshot.docs[0].ref;

        await updateDoc(docRef, {
            messages: querySnapshot.docs[0].data().messages.map((msg) => {
                if (msg.senderId !== auth.currentUser.uid) {
                    return { ...msg, read: true };
                }
                return msg;
            }),
        });

        console.log("Messages marked as read successfully");
        return true;
    } catch (error) {
        console.error("Error marking messages as read: ", error);
        return false;
    }
}
