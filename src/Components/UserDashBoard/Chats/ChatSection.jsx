import React, { useEffect } from 'react';
import ContactHeader from './ChatSectionNav';
import TypeChat from './TypeChat';
import MainChat from './MainChat';

export default function ChatSection({currentChat,chatId,navData,isGroup}) {
  // useEffect(() => {
  //   console.log("userData at chat section",userData)
  // }, [userData]);
  return (
    <>
    <div id='main' className='w-[99%] h-screen '>
        <div id='contact-header' className='h-[20%]'>
     <ContactHeader
        navData={navData}
      />
      </div>
      <div id='main-Chat' className='h-[68%]'>
        <MainChat currentChat={currentChat} chatId={chatId} isGroup={isGroup} />
      </div>
      <div id='Type-chat' className='h-[10%] ml-[2rem]'>
     <TypeChat chatId={chatId} isGroup={isGroup} />
     </div> 
     </div>
    </>
  )
}
