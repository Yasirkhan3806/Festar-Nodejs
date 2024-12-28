import React from 'react';
import ChatsSearch from './ChatsSearch';
import GrpChats from './GrpChats';
import PeopleChats from './PeopleChats';
import CreateChat from './CreateChat';

export default function Chats() {
  return (
    <>
<div>
  
  <div id='main' className='flex w-[99%] h-screen '>
    <div id='chats' className='flex flex-col w-1/2 h-full border-r-2  gap-2 overflow-y-auto scroll-left'>
    <div id='navbar' className='mt-2'>
      <ChatsSearch />
    </div>
    <div id='chats-section' >
      <div id='create-chat' >
        <CreateChat />
      </div>
      <div id='chats-box' className='flex flex-col gap-2'>
      <div id='grp-chats'>
        <GrpChats />
      </div>
      <div id='indiv-chats'>
        <PeopleChats />
      </div>
      </div>
      </div>
    </div>
    <div id='chat-in'></div>
  </div>
</div>
    </>
  )
}
