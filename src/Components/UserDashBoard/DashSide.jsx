import React from 'react';
import eventIcon from './icons/eventIcon2.png';
import meetingIcon from './icons/meetings.png';
import groupChatsIcon from './icons/groupChatsiIcon.png';
import chatsIcon from './icons/chatsIcon.png';
import callsIcon from './icons/callsIcon.png';
import registerEventsIcon from './icons/registerEventsIcon.png';
import notificationsIcon from './icons/notificationsIcon.png';
import settingsIcon from './icons/settingsIcon.png';
import userIcon from './icons/sideUserIcon.png';
import { useUser } from '../../userContext';
import { Cursor } from 'react-simple-typewriter';

export default function DashSide() {
    const { userName } = useUser();
    const style = {
        display:'flex',
        gap : '0.5rem',
        Cursor:'pointer'
    }
  return (
    <>
    <style>
        
    </style>
    <div className='bg-blue-500 p-6 py-9 flex flex-col gap-16'>
        <h1 className='text-white font-bold hover:border-b-2 text-2xl'>DashBoard</h1>
     <ul  className='flex flex-col justify-center  text-white gap-4'>
        <li className='flex-gap-pointer '><img className='h-6' src={eventIcon} alt="" /><p className = "font-bold hover:border-b-2">Events</p></li>
        <li className='flex-gap-pointer '> <img className='h-6' src = {meetingIcon} alt = ""/><p className = "font-bold hover:border-b-2">Meetings</p></li>
        <li className='flex-gap-pointer '> <img className='h-6' src = {groupChatsIcon} alt = ""/><p className = "font-bold hover:border-b-2">GroupChats</p></li>
        <li className='flex-gap-pointer '> <img className='h-6' src = {chatsIcon} alt = ""/><p className = "font-bold hover:border-b-2">Chats</p></li>
        <li className='flex-gap-pointer '> <img className='h-6' src = {callsIcon} alt = ""/><p className = "font-bold hover:border-b-2">Calls</p></li>
        <li className='flex-gap-pointer  w-[12.3rem]'> <img className='h-6' src = {registerEventsIcon} alt = ""/><p className = "font-bold hover:border-b-2">Register Events</p></li>
        <li className='flex-gap-pointer '> <img className='h-6' src = {notificationsIcon} alt = ""/><p className = "font-bold hover:border-b-2">Notifications</p></li>
        <li className='flex-gap-pointer '> <img className='h-6' src = {settingsIcon} alt = ""/><p className = "font-bold hover:border-b-2">Settings</p></li>
        <li></li>
     </ul>
     <div className='flex-gap-pointer '>
        <img className='h-8' src={userIcon} alt="" />
        <h3 className='text-white font-bold hover:border-b-2 text-lg mt-1'>{userName}</h3>
     </div>
     </div>
    </>
  )
}
