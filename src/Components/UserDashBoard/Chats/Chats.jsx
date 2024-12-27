import React from 'react';
import ChatsSearch from './ChatsSearch';
import GrpChats from './GrpChats';
import PeopleChats from './PeopleChats';

export default function Chats() {
  return (
    <>
<div>
  
  <div id='main' className='flex w-[99%] h-screen '>
    <div id='chats' className='flex flex-col w-1/2 h-full border-r-2  gap-2 overflow-y-auto scroll-left'>
    <div id='navbar' className='mt-2'>
      <ChatsSearch />
    </div>
      <div id='grp-chats'>
        <GrpChats />
      </div>
      <div id='indiv-chats'>
        <PeopleChats />
      </div>
    </div>
    <div id='chat-in'></div>
  </div>
</div>
    </>
  )
}
