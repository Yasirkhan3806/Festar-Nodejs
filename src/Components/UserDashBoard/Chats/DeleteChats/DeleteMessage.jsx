import { collection,deleteDoc,getDoc,getDocs,query, updateDoc, where } from 'firebase/firestore'
import React, { useState,useEffect, useRef } from 'react';
import threeDotsWhite from '../icons/threeDotsWhite.png';
import { db } from '../../../../Config/firebase';

export default function DeleteMessage({messageId,chatId,isGroupMessage}) {
    const [open,setOpen] = useState(false)
    const menuRef = useRef(null)
    // console.log(chatId)
   
const deleteMessage = async (messageId, chatId,isGroupMessage) => {
    try {
      let q  = null;
      if(isGroupMessage){
        q = query(collection(db, "GroupMessages"), where("chatid", "==", chatId));
      } else{
        q = query(collection(db, "IndividualMessages"), where("chatId", "==", chatId));
      }
      // Create a query to find the chat document
      
      // Fetch the documents
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log("No messages found for this chat.");
        return;
      }
  
      // Get the first document reference (assuming there's only one chat with this chatId)
      const doc = querySnapshot.docs[0]; // You may want to handle multiple docs or select the correct one
  
      // Get the existing messages array from the document
      const messages = doc.data().messages;
  
      // Update the messages array
      const updatedMessages = messages.map(msg => 
        msg.messageId === messageId 
          ? { ...msg, text: "This message was deleted" } 
          : msg
      );
  
      // Update the document with the new messages array
      await updateDoc(doc.ref, { messages: updatedMessages });
  
      console.log("Message deleted successfully");
    } catch (err) {
      console.log("Error deleting message", err);
    }
  };
     useEffect(() => {
        const handleClick = (event) => {
          if (open && menuRef.current && !menuRef.current.contains(event.target)) {
            setOpen(false);
          }
        };
    
        document.addEventListener("click", handleClick);
    
        return () => {
          document.removeEventListener("click", handleClick);
        };
      }, [open]); //
    
      return (
        <>
        <div className='relative mr-2'>
         <button
         className='w-[24px]'
            onClick={(event) => {
              event.stopPropagation(); // Stops the click from propagating to the document listener
              setOpen((prev) => !prev); // Toggle the menu state
            }}
          >
            <img src={threeDotsWhite} alt="" className="h-[24px]" />
          </button>
          {open && (
            <div
              ref={menuRef}
              className="absolute bg-white p-2 rounded-lg shadow-md text-xs z-10"
            >
              <button
                onClick={() => {
                  deleteMessage(messageId,chatId,isGroupMessage);
                  setOpen(false);
                }}
                className='text-black'
              >
                Delete message
              </button>
            </div>
          )}
          </div>
        </>
  )
}
