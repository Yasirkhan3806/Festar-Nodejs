import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsPlus } from 'react-icons/bs';

export default function Calendar() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [currentMonthIndex, setCurrentMonthIndex] = useState(9); // Start with October

  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dates = [
    [27, 28, 29, 30, 31, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30]
  ];

  // Function to handle the month change
  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      setCurrentMonthIndex((prevIndex) => (prevIndex === 0 ? 11 : prevIndex - 1));
    } else if (direction === 'next') {
      setCurrentMonthIndex((prevIndex) => (prevIndex === 11 ? 0 : prevIndex + 1));
    }
  };

  return (
    <div className="flex flex-col p-6">
      {/* Calendar Container */}
      <div className="bg-blue-200 p-2 rounded-xl shadow-md w-96">
        {/* Month and Navigation */}
        <div className="flex justify-between items-center mb-4">
          <FiChevronLeft
            className="text-2xl cursor-pointer"
            onClick={() => handleMonthChange('prev')}
          />
          <h2 className="text-xl font-bold">{months[currentMonthIndex]}</h2>
          <FiChevronRight
            className="text-2xl cursor-pointer"
            onClick={() => handleMonthChange('next')}
          />
        </div>

        {/* Days of the Week */}
        <div className="grid grid-cols-7 text-center text-gray-600 mb-2">
          {days.map((day, index) => (
            <div key={index} className="font-bold">{day}</div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 text-center text-gray-800">
          {dates.flat().map((date, index) => (
            <div
              key={index}
              className={`p-2 rounded-full ${
                date === 14 && currentMonthIndex === 9 ? 'bg-blue-500 text-white font-bold' : ''
              } ${date > 31 ? 'text-gray-400' : 'cursor-pointer'}`}
            >
              {date}
            </div>
          ))}
        </div>
      </div>

      {/* Create Event Button */}
      <button className="mt-6 flex w-[20%] bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-md">
        <BsPlus className="text-2xl mr-2" /> Create Event
      </button>
    </div>
  );
}
