import React from 'react';
import logo from '../../assets/Pictures/logo_primary_V17oRtSd.png';
import userIcon from './icons/userIcon2.png';
import { useUser } from '../../userContext'; // Import the custom hook

export default function DashNav() {
  const { userName } = useUser(); // Access userName from context

  return (
    <nav className='w-[100%]'>
      <ul className='flex justify-between border-b-2 border-b-blue-500 px-6'>
        <li><img className='h-20' src={logo} alt="" /></li>
        <li className='flex mt-6 gap-2'>
          <img src={userIcon} className='h-8' alt="user icon" />
          <p className='mt-1'><b>{userName}</b></p>
        </li>
      </ul>
    </nav>
  );
}
