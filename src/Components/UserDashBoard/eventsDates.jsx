import React, { useState,useEffect } from 'react';
import { CalendarHeader } from './ReusableCalender';
import { db } from '../../Config/firebase'; // Ensure you import your Firebase config properly
import { collection, getDocs } from 'firebase/firestore'; // Make sure to use getDocs instead of getDoc

export default function EventsDates() {
  const [events, setEvents] = useState([]); // State to store fetched events
   // Fetch events from Firestore
   const fetchEvents = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'UserEvents')); // Use getDocs to get all documents
        const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Include doc ID if needed
        setEvents(eventsData); // Set events state
    } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]); // Set to empty array on error
    }
};

useEffect(() => {
    fetchEvents(); // Fetch events when the component mounts
}, []);
    // Calendar Grid Component
    const CalendarGrid = ({ dates, onDateClick }) => (
        <>
          <div className="flex flex-col overflow-x-hidden overflow-y-auto h-[92%] mt-[-2%] text-gray-800">
          {dates.map((date, index) => {
  // Find events that match the current date
  const eventsForDate = events.filter(event => new Date(event.eventDate).getDate() === date);
  return (
      <div
          key={index}
          onClick={() => date && onDateClick(date)}
          className={`p-2 mt-1 border-blue-400 border-2 rounded-lg ${
            !date ? 'text-gray-400' : 'cursor-pointer'
          } ${events} flex gap-2`}
      >
          {date || ""}
          {/* Display events next to the date */}
          {eventsForDate.map(event => (
              <div key={event.id} className="text-[15px] font-semibold font-monts text-blue-500">
                  {`${event.eventName} (${event.startTime} - ${event.endTime})`}
              </div>
          ))}
      </div>
  );
})}

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
