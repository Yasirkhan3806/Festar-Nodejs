import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';

// Utility function to get the number of days in a month
const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

// Utility function to get the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

// CalendarHeader Component for Month and Year navigation
export const CalendarHeader = ({ currentMonth, currentYear, onPrev, onNext }) => (
  <div className="flex justify-between items-center mb-4">
    <FiChevronLeft
      className="text-2xl cursor-pointer"
      onClick={onPrev}
    />
    <h2 className="text-xl font-bold">
      {currentMonth} {currentYear}
    </h2>
    <FiChevronRight
      className="text-2xl cursor-pointer"
      onClick={onNext}
    />
  </div>
);

// CalendarGrid Component for displaying the days and dates
const CalendarGrid = ({ days, dates, highlightDate, onDateClick,weekLetterColor }) => (
  <>
    {/* Days of the Week */}
    <div className={`grid grid-cols-7 text-center ${weekLetterColor} mb-2`}>
      {days.map((day, index) => (
        <div key={index} className="font-bold">{day}</div>
      ))}
    </div>

    {/* Dates */}
    <div className="grid grid-cols-7 text-center text-gray-800">
      {dates.map((date, index) => (
        <div
          key={index}
          onClick={() => date && onDateClick(date)}
          className={`p-2 rounded-full ${
            date === highlightDate ? '' : ''
          } ${!date ? 'text-gray-400' : 'cursor-pointer'}`}
        >
          {date || ""}
        </div>
      ))}
    </div>
  </>
);
// Reusable Calendar Component
const ReusableCalendar = ({ selectedDate, highlightDate, onDateClick,backgroundColor,weekLetterColor }) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Function to handle month change
  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      if (currentMonthIndex === 0) {
        setCurrentMonthIndex(11);
        setCurrentYear((prevYear) => prevYear - 1);
      } else {
        setCurrentMonthIndex((prevIndex) => prevIndex - 1);
      }
    } else if (direction === 'next') {
      if (currentMonthIndex === 11) {
        setCurrentMonthIndex(0);
        setCurrentYear((prevYear) => prevYear + 1);
      } else {
        setCurrentMonthIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  // Generate calendar dates
  const generateCalendarDates = () => {
    const daysInMonth = getDaysInMonth(currentMonthIndex, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonthIndex, currentYear);

    const datesArray = [];
    // Fill blank spaces for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      datesArray.push(null);
    }
    // Fill in actual dates
    for (let day = 1; day <= daysInMonth; day++) {
      datesArray.push(day);
    }
    return datesArray;
  };

  const calendarDates = generateCalendarDates();

  return (
    <div className={`${backgroundColor} p-2 rounded-xl shadow-md w-96`}>
      {/* CalendarHeader Component */}
      <CalendarHeader
        currentMonth={months[currentMonthIndex]}
        currentYear={currentYear}
        onPrev={() => handleMonthChange('prev')}
        onNext={() => handleMonthChange('next')}
      />

      {/* CalendarGrid Component */}
      <CalendarGrid
        days={days}
        dates={calendarDates}
        highlightDate={highlightDate}
        onDateClick={onDateClick}
        weekLetterColor={weekLetterColor} // Change to your desired color here if needed  // for example: letterColor="text-red-500" for red color  // for example: letterColor="text-green-500" for green color  // for example: letterColor="text-blue-500" for blue color  // for example: letterColor="text-yellow-500" for yellow color  // for example
      />
    </div>
  );
};
export default  ReusableCalendar;