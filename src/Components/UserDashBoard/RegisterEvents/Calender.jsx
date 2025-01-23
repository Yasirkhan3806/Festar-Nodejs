import React, { useState,useEffect } from 'react';
import { BsPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ReusableCalendar from './ReusableCalender';
import { auth } from '../../../Config/firebase';
import { useTheme } from '../../../ThemeContext';

export function UserProfile({ setUser }) {
  
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUser(user.displayName || "User"); // Set the user name or default to "User"
    }
  }, [setUser]);

  return null; // Or you can return some loading indicator if needed
}


export default function Calendar() {
  const {darkMode} = useTheme();
  const handleDateClick = (date) => {
    console.log('Date clicked:', date);
  };
 
  const [User,setUser] = useState('Guest')
  return (
    <>
    <UserProfile setUser={setUser} />
    <div className="flex flex-col p-6">
      <h1 className='font-bold mb-3 font-monts text-2xl w-[129%]'>Welcome to <span className='text-blue-500'>Festar</span></h1>
      {/* Calendar Container */}
      <ReusableCalendar
        selectedDate={new Date()} // For initial selection, if any
        highlightDate={14} // Example of highlighting a specific date
        onDateClick={handleDateClick}
        backgroundColor={"bg-blue-200"}
        width = {"w-[164]"}
      />

      {/* Create Event Button */}
      <Link to="/Register-event" className={` ${darkMode?"dark-mode-btn":""} mt-6 flex w-[100%] md:w-[40%] bg-blue-500 hover:bg-white  text-white hover:text-blue-500 font-bold py-2 px-4 rounded-full shadow-md transition duration-500`}>
        <BsPlus className="text-2xl mr-2" /> Create Event
      </Link>
    </div>
    </>
  );
}

