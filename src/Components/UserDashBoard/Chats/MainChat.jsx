import React from 'react'
import { useEffect,useState } from 'react'
import { auth } from '../../../Config/firebase'

export default function MainChat({currentChat}) {
  useEffect(() => {
    console.log("currentChat at mainchat: ",currentChat);
  }, [currentChat])
      
  return (
    <>
        <div>
      {currentChat && currentChat.length >0 ?(currentChat[0].map((msg) => (
        <div key={msg.id} className={msg.senderId === auth.currentUser.uid ? "sent" : "received"}>
          <p>{msg.text}</p>
          <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
        </div>
      ))):(
        p=> <p>No messages</p>
      )}
    </div>
    </>
  )
}
