import React, { useState } from 'react';
import { CalendarHeader } from './ReusableCalender';

export default function EventsDates() {
    // Calendar Grid Component
    const CalendarGrid = ({ dates, onDateClick }) => (
        <>
          <div className="flex flex-col overflow-x-hidden overflow-y-auto h-[92%] mt-[-2%] text-gray-800">
            {dates.map((date, index) => (
              <div
                key={index}
                onClick={() => date && onDateClick(date)}
                className={`p-2 mt-1 border-blue-400 border-2 rounded-lg ${
                  !date ? 'text-gray-400' : 'cursor-pointer'
                }`}
              >
                {date || ""}
              </div>
            ))}
          </div>
        </>
      );
  // Helper function to get the number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper function to get the first day of the month (0 for Sunday, 1 for Monday, etc.)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleDateClick = (date) => {
    console.log('Date clicked:', date);
  };

  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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

  // Function to generate calendar dates
  const generateCalendarDates = () => {
    const daysInMonth = getDaysInMonth(currentMonthIndex, currentYear);
    const datesArray = [];
  
    // Fill in actual dates
    for (let day = 1; day <= daysInMonth; day++) {
      datesArray.push(day);
    }
  
    return datesArray;
  };
  

  const calendarDates = generateCalendarDates(); // Call generateCalendarDates on every render

  return (
    <>
      {/* Month Navigation */}
      <CalendarHeader
        currentMonth={months[currentMonthIndex]}
        currentYear={currentYear}
        onPrev={() => handleMonthChange('prev')}
        onNext={() => handleMonthChange('next')}
      />

      {/* Calendar Grid */}
      <CalendarGrid
        dates={calendarDates}
        onDateClick={handleDateClick} // Just an example
      />
    </>
  );
}
