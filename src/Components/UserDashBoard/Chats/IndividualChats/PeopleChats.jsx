import React, { useEffect, useState } from "react";
import { gettingChatsDataIndividual } from "../gettingChatsData";
import personIcon from '../icons/personIcon.png'

export default function PeopleChats() {
  const [people,setPeople] = useState([])
useEffect(()=>{
gettingChatsDataIndividual(setPeople)
// console.log("chats",chats)
},[])
  // const people = [
  //   {
  //     id: 1,
  //     name: "Ali",
  //     message: "April fool's day",
  //     time: "Today, 9:52pm",
  //     avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
  //     readStatus: "read", // Can be "read" or "unread"
  //   },
  //   {
  //     id: 2,
  //     name: "Tallal",
  //     message: "Baag",
  //     time: "Today, 12:11pm",
  //     avatar: "https://via.placeholder.com/50",
  //     readStatus: "unread",
  //   },
  //   {
  //     id: 3,
  //     name: "Mariy",
  //     message: "You have to report it...",
  //     time: "Today, 2:40pm",
  //     avatar: "https://via.placeholder.com/50",
  //     readStatus: "unread",
  //   },
  //   {
  //     id: 4,
  //     name: "Boss",
  //     message: "Nevermind bro",
  //     time: "Yesterday, 12:31pm",
  //     avatar: "https://via.placeholder.com/50",
  //     readStatus: "unread",
  //   },
  //   {
  //     id: 5,
  //     name: "shiza",
  //     message: "Okay, brother. let's see...",
  //     time: "Wednesday, 11:12am",
  //     avatar: "https://via.placeholder.com/50",
  //     readStatus: "read",
  //   },
  // ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 border-[2.5px] border-b-4 border-blue-400">
      <h2 className="text-xl font-bold text-gray-800 mb-4">People</h2>
      <div className="space-y-4">
        {people.map((person) => (
          <div
            key={person.ChatId}
            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              <img
                src={person.receiverData[0].profilePicture || personIcon}
                alt={person.receiverData[0].userName || "guest"}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {person.receiverData[0].userName || "guest"}
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
