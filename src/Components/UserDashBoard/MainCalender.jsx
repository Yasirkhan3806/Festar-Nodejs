import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsPlus } from 'react-icons/bs';
import generateCalendarDates from '../UserDashBoard/Calender'
import ReusableCalendar from './ReusableCalender';
import { CalendarHeader } from './ReusableCalender';
import CalendarWeek from './MainCalWeekView';
import EventsDates from './eventsDates';
import RegisterEventForm from './RegisterEventForm';

export default function MainCalendar() {
  const [showForm, setShowForm] = useState(false);
  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };
  return (
    <div className="flex h-screen p-4">
      {/* Sidebar */}
      <div className='flex flex-col bg-blue-500'>
      <ReusableCalendar
        selectedDate={new Date()} // For initial selection, if any
        highlightDate={14} // Example of highlighting a specific date
        // onDateClick={handleDateClick}
        // backgroundColor={"bg-blue-500"}
        weekLetterColor={"text-white"}
      />
            <button
        onClick={handleOpenForm}
        className="mt-6 flex w-[50%] bg-white text-blue-500 font-bold py-2 px-4 rounded-full shadow-md"
      >
       <BsPlus className="text-2xl mr-2" /> Add Event
      </button>

      {/* Popup Form */}
      {showForm && <RegisterEventForm onClose={handleCloseForm} />}
      </div>

      {/* Main Calendar View */}
      <div className="w-3/4 bg-white p-4 rounded-lg ml-4 shadow-lg">
      <EventsDates/>
      </div>
    </div>
  );
};

