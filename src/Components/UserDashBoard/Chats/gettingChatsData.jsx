
import {auth, db} from '../../../Config/firebase';
import { collection, getDocs, where,query,onSnapshot } from 'firebase/firestore';


export const gettingChatsData = (callback) => {
    try {
      const qAdmin = query(
        collection(db, "GroupMessages"),
        where("adminId", "==", auth.currentUser.uid)
      );
      const qMember = query(
        collection(db, "GroupMessages"),
        where("chatMembers", "array-contains", auth.currentUser.uid)
      );

  
      // Real-time listener for admin chats
      const unsubscribeAdmin = onSnapshot(qAdmin, (snapshot) => {
        const adminData = snapshot.docs.map((doc) => doc.data());
  
        // Real-time listener for member chats
        const unsubscribeMember = onSnapshot(qMember, (snapshot) => {
          const memberData = snapshot.docs.map((doc) => doc.data());
      
  
          // Combine both admin and member data
          const combinedData = [...adminData, ...memberData];
  
          // Pass the updated data to the callback
          callback(combinedData);
        });
  
        // Return a cleanup function for member listener
        return unsubscribeMember;
      });
  
      // Return a cleanup function for admin listener
      return () => {
        unsubscribeAdmin();
      };
    } catch (err) {
      console.error("Error fetching chats data: ", err);
    }
  };

 
 export const gettingChats = (chatsId, callback,group) => {
   try {
     // Query the "GroupMessages" collection where "chatId" matches the provided chatsId
     let q = null;
     if(group){
       q = query(
        collection(db, "GroupMessages"),
        where("chatid", "==", chatsId)
      );}
      else{
         q = query(
          collection(db, "IndividualMessages"),
          where("chatId", "==", chatsId)
        );
      }
 
     // Listen to real-time updates
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
       let messagesdata = [];
 
       // Process the documents in the snapshot
       querySnapshot.forEach((doc) => {
        messagesdata.push(...doc.data().messages); // Assuming "messages" is an array
       });
       callback(messagesdata); // Pass the data to the provided callback
     });
 
     // Return the unsubscribe function so the listener can be stopped when needed
     return unsubscribe;
   } catch (error) {
     console.error("Error setting up real-time chat listener: ", error);
     return null; // Return null if an error occurs
   }
 };

 export const gettingChatsDataIndividual = (callback)=>{
  try {
    const qSender = query(
      collection(db, "IndividualMessages"),
      where("senderId", "==", auth.currentUser.uid)
    );
    const qReceiver = query(
      collection(db, "IndividualMessages"),
      where("receiverId", "==", auth.currentUser.uid)
    );


    // Real-time listener for admin chats
    const unsubscribeSender = onSnapshot(qSender, (snapshot) => {
      const senderData = snapshot.docs.map((doc) => doc.data());

      // Real-time listener for member chats
      const unsubscribeReceiver = onSnapshot(qReceiver, (snapshot) => {
        const receiverData = snapshot.docs.map((doc) => doc.data());
    

        // Combine both admin and member data
        const combinedData = [...senderData, ...receiverData];

        // Pass the updated data to the callback
        callback(combinedData);
      });

      // Return a cleanup function for member listener
      return unsubscribeReceiver;
    });

    // Return a cleanup function for admin listener
    return () => {
      unsubscribeSender();
    };
  } catch (err) {
    console.error("Error fetching chats data: ", err);
  }
 }
 
 