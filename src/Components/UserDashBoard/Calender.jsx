import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ReusableCalendar from './ReusableCalender';

export default function Calendar() {
  const handleDateClick = (date) => {
    console.log('Date clicked:', date);
  };

  return (
    <div className="flex flex-col p-6">
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
  );
}

