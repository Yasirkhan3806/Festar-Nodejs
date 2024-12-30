import React from 'react';
import { useEffect, useState } from 'react';
import { auth } from '../../../Config/firebase';

export default function MainChat({ currentChat }) {
  // useEffect(() => {
  //   console.log("currentChat at mainchat: ", currentChat);
  // }, [currentChat]);

  return (
    <>
      <div className="flex flex-col space-y-4 overflow-y-auto scroll-left h-[98%] p-2">
        {currentChat && currentChat.length > 0 ? (
          currentChat?.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start ${
                msg.senderId === auth.currentUser.uid
                  ? 'justify-end' // Align sent messages to the right
                  : 'justify-start' // Align received messages to the left
              }`}
            >
              <div
                className={`p-3 rounded-lg w-[36%] ${
                  msg.senderId === auth.currentUser.uid
                    ? 'bg-blue-500 text-white' // Styling for sent messages
                    : 'bg-gray-200' // Styling for received messages
                }`}
              >
                <p>{msg.text}</p>
                <span className={`text-xs  ${
                  msg.senderId === auth.currentUser.uid
                    ? ' text-white' // Styling for sent messages
                    : 'text-black' // Styling for received messages
                } `}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No messages</p>
        )}
      </div>
    </>
  );
}