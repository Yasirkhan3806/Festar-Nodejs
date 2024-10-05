import React from 'react';

// Utility function to generate the correct dates for the week
const getWeekDates = (startDate) => {
  const weekDates = [];
  const start = new Date(startDate); // Starting from the given date
  
  for (let i = 0; i < 7; i++) {
    // Create new date objects and add to the array
    const current = new Date(start);
    current.setDate(start.getDate() + i); // Increment by i days
    weekDates.push(current.getDate()); // Only push the day of the month
  }
  return weekDates;
};

const CalendarWeek = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Define the starting date (2nd October, 2024, in this case)
  const startingDate = new Date(); // Month is 0-indexed, so October is 9
  
  // Get the correct dates for the week starting from 2nd October
  const weekDates = getWeekDates(startingDate);
  
  return (
    <div className="grid grid-cols-7 gap-1 border-t border-gray-200">
      {daysOfWeek.map((day, index) => (
        <div key={day} className="text-center p-2 border-r border-b">
          {day} <br />
          <span className="text-sm text-gray-500">{weekDates[index]}</span>
        </div>
      ))}
    </div>
  );
};

export default CalendarWeek;
