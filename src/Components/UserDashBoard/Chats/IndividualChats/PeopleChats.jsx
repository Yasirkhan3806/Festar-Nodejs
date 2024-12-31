import React, { useEffect, useState } from "react";
import { gettingChatsDataIndividual } from "../gettingChatsData";
import personIcon from '../icons/personIcon.png';
import { gettingChats } from "../gettingChatsData";
import { auth } from "../../../../Config/firebase";
import { useUser } from "../../../../userContext";

export default function PeopleChats({setCurrentChat,setNavData,setChatId,setIsGroup}) {
  const [people,setPeople] = useState([])
//   const [receiver,setReceiver] = useState([])
const {userName} = useUser()
useEffect(()=>{
gettingChatsDataIndividual(setPeople)

// console.log(r)
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
  }catch(error){
    console.log("error in getting chats",error)
  }
};

// useEffect(()=>{
//   let r = null;
// people.forEach((person)=>{
// person.receiverData.forEach((p)=>{
//   if(p.userId !== auth.currentUser.uid){
//     r = p
//   }
// });
// // console.log("receier",r)
// setReceiver([r])
// });
  
//   // console.log(r)
  // },[people])
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 border-[2.5px] border-b-4 border-blue-400">
      <h2 className="text-xl font-bold text-gray-800 mb-4">People</h2>
      <div className="space-y-4">
        {people.map((person) => (
          <div
            key={person.chatId}
            onClick={()=>{
              const receiverName = person.receiverName === auth.currentUser.displayName || userName?person.senderName:person.receiverName
              const receiverPicture = person.receiverPicture === auth.currentUser.photoURL?person.senderPicture:person.receiverPicture
              getChats(person.chatId,receiverPicture,receiverName)
                // console.log("I am clicked")
              }}
            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <img
                src={person.receiverPicture === auth.currentUser.photoURL?person.senderPicture:person.receiverPicture  || personIcon}
                alt={person.receiverPicture || "guest"}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                {person.receiverName === auth.currentUser.displayName || userName?person.senderName:person.receiverName  || "guest"}
                </h3>
                <p className="text-xs text-gray-500 truncate">{person.message}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">{person.time}</span>
              {person.readStatus === "unread" ? (
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
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
