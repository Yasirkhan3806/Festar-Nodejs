import React,{useState} from 'react';
import { BsPlus } from 'react-icons/bs';
import ReusableCalendar from './ReusableCalender';
import EventsDates from './eventsDates';
import RegisterEventForm from './RegisterEventForm';
import { useTheme } from '../../../ThemeContext';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer from React Toastify

export default function MainCalendar() {
  const [showForm, setShowForm] = useState(false);
  const {darkMode} = useTheme();
  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => { 
    setShowForm(false);
  };

  const notify = () => {
    toast.success('Meeting data is set up! Please refresh the page.',{
      className:'custom-toast'
    });
  };
  return (
    <div className="md:flex h-screen p-4">
      {/* Sidebar */}
      <div className={`flex flex-col h-96 ${darkMode?"dark-mode":"bg-blue-500"}`}>
      <ReusableCalendar
        selectedDate={new Date()} 
        weekLetterColor={"text-white"}
        width = {'w-[100%]'}
      />
            <button
        onClick={handleOpenForm}
        className={` ${darkMode?"dark-mode-btn":""} mt-6 flex w-[50%] ml-4 bg-white text-blue-500 font-bold py-2 px-4 rounded-full shadow-md`}
      >
       <BsPlus className="text-2xl mr-2" /> Add Event
      </button>

      {/* Popup Form */}
      {showForm && <RegisterEventForm onClose={handleCloseForm} notify={notify}  />}
      </div>

      {/* Main Calendar View */}
      <ToastContainer />
      <div className={` ${darkMode?"dark-mode":""} w-full md:w-3/4 bg-white p-4 rounded-lg md:ml-4 shadow-lg`}>
      <EventsDates/>
      </div>
    </div>
  );
};

