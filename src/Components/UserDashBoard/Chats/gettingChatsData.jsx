
import {auth, db} from '../../../Config/firebase';
import { collection, getDocs, where,query } from 'firebase/firestore';


export const gettingChatsData = async () => {
    try{
    const qAdmin = query(collection(db, "GroupMessages"),where("adminId", "==", auth.currentUser.uid ));
    const qMember = query(
        collection(db, "GroupMessages"),
        where("members", "array-contains", auth.currentUser.uid)
      );
      const adminData = await getDocs(qAdmin);
      const memberData = await getDocs(qMember);
        let data = [];
        adminData.forEach((doc) => {
            data.push(doc.data());
        });
        memberData.forEach((doc) => {
            data.push(doc.data());
        });

        return data;
    }catch(err){
        console.log("error fetching data: ",err);
    }
 };


 export const gettingChats = async (chatsId) => {
     try {
         // Query the "GroupMessages" collection where "chatId" matches the provided chatsId
         const q = query(
             collection(db, "GroupMessages"),
             where("chatid", "==", chatsId)
         );
 
         const querySnapshot = await getDocs(q);
         let data = [];
 
       data.push(querySnapshot.docs[0].data().messages);
         console.log("Data: ", data); // Log the messages collected
 
         return data; // Return the messages collected
     } catch (error) {
         console.error("Error getting chats: ", error);
         return []; // Return empty array in case of an error
     }
 };
 