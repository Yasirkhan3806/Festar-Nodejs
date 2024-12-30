import React from 'react';
import ContactHeader from './ChatSectionNav';
import TypeChat from './TypeChat';
import MainChat from './MainChat';

export default function ChatSection({currentChat,chatId,navData}) {
  return (
    <>
    <div id='main' className='w-[99%] h-screen '>
        <div id='contact-header' className='h-[20%]'>
     <ContactHeader
        navData={navData}
      />
      </div>
      <div id='main-Chat' className='h-[68%]'>
        <MainChat currentChat={currentChat}  />
      </div>
      <div id='Type-chat' className='h-[10%] ml-[2rem]'>
     <TypeChat chatId={chatId} />
     </div> 
     </div>
    </>
  )
}
