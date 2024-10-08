import React, { useState,useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ReusableCalendar from './ReusableCalender';
import { auth } from '../../Config/firebase';

export function UserProfile({ setUser }) {

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      console.log("User Email:", user.email);
      console.log("User Display Name:", user.displayName);
      setUser(user.displayName || "User"); // Set the user name or default to "User"
    }
  }, [setUser]);

  return null; // Or you can return some loading indicator if needed
}


export default function Calendar() {
  const handleDateClick = (date) => {
    console.log('Date clicked:', date);
  };
 
  const [User,setUser] = useState('Guest')
  return (
    <>
    <UserProfile setUser={setUser} />
    <div className="flex flex-col p-6">
      <h1 className='font-bold mb-3 font-monts text-2xl'>Welcome, <span className='text-blue-500'>{User}</span></h1>
      {/* Calendar Container */}
      <ReusableCalendar
        selectedDate={new Date()} // For initial selection, if any
        highlightDate={14} // Example of highlighting a specific date
        onDateClick={handleDateClick}
        backgroundColor={"bg-blue-200"}
      />

      {/* Create Event Button */}
      <Link to="/Register-event" className="mt-6 flex w-[20%] bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md">
        <BsPlus className="text-2xl mr-2" /> Create Event
      </Link>
    </div>
    </>
  );
}

