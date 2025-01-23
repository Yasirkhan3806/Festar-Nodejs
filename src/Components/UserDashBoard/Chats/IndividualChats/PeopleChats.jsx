import React, { useEffect, useState } from "react";
import { gettingChatsDataIndividual } from "../gettingChatsData";
import { settingRead } from "../sendingMessages";
import DeleteGroup from "../DeleteChats/deleteGroup";
import personIcon from '../icons/personIcon.png';
import { gettingChats } from "../gettingChatsData";
import { auth } from "../../../../Config/firebase";
import { useUser } from "../../../../userContext";
import { useTheme } from "../../../../ThemeContext";

export default function PeopleChats({setCurrentChat,setNavData,setChatId,setIsGroup}) {
  const [people,setPeople] = useState([])
  const [unreadMessages, setUnreadMessages] = useState({ count: 0, messages: [] }); // Store unread messages and their count
   const {darkMode} = useTheme();
useEffect(()=>{
gettingChatsDataIndividual(setPeople)

},[])
 
const getChats = (chatId,receiverPicture,receiverName) => {
  try{
  // console.log("receiverPicture",receiverPicture)
gettingChats(chatId,setCurrentChat,false)
setNavData({
  groupPicture: receiverPicture,
        groupName: receiverName,
});
setChatId(chatId)
setIsGroup(false)
settingRead(chatId,false); // Mark messages as read
  }catch(error){
    console.log("error in getting chats",error)
  }
};

useEffect(() => {
    const newUnreadMessages = []; // Array to hold unread message detail

    if(people){
    // Loop through the groups
    people.forEach((person) => {
      // Loop through the messages in each group
      person.messages.forEach((message) => {
        if (!message.read && message.senderId !== auth.currentUser.uid) {
          // Add message details to the unreadMessages array
          newUnreadMessages.push({
            message: message.text,
            time: new Date(message.timestamp).toLocaleTimeString(),
            chatId: person.chatId,
          });
        }
      });
    });
  }

    // Update the unreadMessages state with both the count and message details
    setUnreadMessages({
      messages: newUnreadMessages,
    });

    // console.log('Unread messages:', newUnreadMessages);
  }, [people]); // Run when groups or the current user changes

  return (
    <div className={`max-w-md mx-auto bg-white rounded-lg shadow-md p-4 border-[2.5px] border-b-4 border-blue-400  ${darkMode?"dark-mode":""}`}>
      <h2 className={` ${darkMode?"dark-mode":""} text-xl font-bold text-gray-800 mb-4 dark-mode`}>People</h2>
      <div className="space-y-4">
        {people.map((person) => {
           const recentMessage = unreadMessages.messages.find(
            (unread) => unread.chatId === person.chatId
          );

          // Find the unread count for this specific group
          const unreadCount = unreadMessages.messages.filter(
            (unread) => unread.chatId === person.chatId
          ).length;
        return(
          <div
            key={person.chatId}
            onClick={()=>{
              const receiverName = person.receiverName === auth.currentUser.displayName?person.senderName:person.receiverName
              const receiverPicture = person.receiverPicture === auth.currentUser.photoURL?person.senderPicture:person.receiverPicture
              getChats(person.chatId,receiverPicture,receiverName)
                // console.log("I am clicked")
              }}
            className="flex items-center justify-between p-2 rounded-md "
          >
            <div className="flex items-center space-x-4">
              <img
                src={person.receiverPicture === auth.currentUser.photoURL?person.senderPicture:person.receiverPicture  || personIcon}
                alt={person.receiverPicture || "guest"}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className={` ${darkMode?"dark-mode":""} text-sm font-semibold text-gray-800 dark-mode`}>
                {person.receiverName === auth.currentUser.displayName ?person.senderName:person.receiverName  || "guest"}
                </h3>
                <p className="text-xs text-gray-500 truncate">{recentMessage? recentMessage.message:"No Recent Messages"}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">{recentMessage? recentMessage.time:"N/A"}</span>
              {unreadCount > 0 && (
                    <span className="text-xs text-white bg-blue-500 rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
              {/* {person.readStatus === "unread" ? (
                <span className="text-xs text-white bg-blue-500 rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              ) : (
                <svg
                  className="h-4 w-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )} */}
            </div>
            <div>
              <DeleteGroup chatId={person.chatId} isGroup={false}/>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}
