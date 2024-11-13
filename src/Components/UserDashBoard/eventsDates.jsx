import React, { useState, useEffect } from "react";
import { CalendarHeader } from "./ReusableCalender";
import { db } from "../../Config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchEvents = async (setEvents) => {
  try {
    const snapshot = await getDocs(collection(db, "UserEvents")); // Use getDocs to get all documents
    const eventsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })); // Include doc ID if needed
    setEvents(eventsData); // Set events state
  } catch (error) {
    console.error("Error fetching events:", error);
    setEvents([]); // Set to empty array on error
  }
};

export default function EventsDates() {
  const [events, setEvents] = useState([]); // State to store fetched events

  // Fetch events from Firestore
  useEffect(() => {
    fetchEvents(setEvents); // Fetch events when the component mounts
  }, []);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calendar Grid Component
  const CalendarGrid = ({ dates, onDateClick }) => (
    <>
      <div className="flex flex-col overflow-x-hidden overflow-y-auto h-[92%] mt-[-2%] text-gray-800">
        <div className="flex flex-col gap-1">
          {dates.map((dateObj, index) => {
            // Find events that match the current date
            const eventsForDate = events.filter((event) => {
              const eventDate = new Date(event.eventDate); // Convert event date string to a Date object
              return (
                eventDate.getDate() === dateObj.date && // Match the day
                eventDate.getMonth() === currentMonthIndex && // Match the month
                eventDate.getFullYear() === currentYear // Match the year
              );
            });

            return (
              <div
                key={index}
                onClick={() => dateObj.date && onDateClick(dateObj.date)}
                className={`p-2 mt-1  border-b-2 ${
                  !dateObj.date ? "text-gray-400" : "cursor-pointer"
                } flex gap-3 `}
              >
                {/* Display day name and date */}
                <div className="ml-2">
                  <div className="flex justify-center font-semibold text-xl">
                    {" "}
                    {` ${dateObj.date}` || ""}{" "}
                  </div>
                  <div className="font-bold">
                    {" "}
                    {dateObj.day && `${dateObj.day}`}
                  </div>
                </div>

                {/* Display events next to the date */}
                {eventsForDate.map((event) => (
                  <div
                    key={event.id}
                    className="text-[15px] font-semibold font-monts text-blue-500 flex items-end"
                  >
                    {`${event.eventName}`}
                    <br />
                    {`(${event.startTime} - ${event.endTime})`}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDateClick = (date) => {
    console.log("Date clicked:", date);
  };

  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleMonthChange = (direction) => {
    if (direction === "prev") {
      if (currentMonthIndex === 0) {
        setCurrentMonthIndex(11);
        setCurrentYear((prevYear) => prevYear - 1);
      } else {
        setCurrentMonthIndex((prevIndex) => prevIndex - 1);
      }
    } else if (direction === "next") {
      if (currentMonthIndex === 11) {
        setCurrentMonthIndex(0);
        setCurrentYear((prevYear) => prevYear + 1);
      } else {
        setCurrentMonthIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  // Function to generate calendar dates
  // Function to generate calendar dates
  const generateCalendarDates = () => {
    const daysInMonth = getDaysInMonth(currentMonthIndex, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonthIndex, currentYear);

    const datesArray = [];

    // Fill in actual dates with day names (no empty slots)
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = (firstDayOfMonth + day - 1) % 7; // Get day of the week
      datesArray.push({ day: daysOfWeek[dayOfWeek], date: day });
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
        onPrev={() => handleMonthChange("prev")}
        onNext={() => handleMonthChange("next")}
      />

      {/* Calendar Grid */}
      <CalendarGrid dates={calendarDates} onDateClick={handleDateClick} />
    </>
  );
}
