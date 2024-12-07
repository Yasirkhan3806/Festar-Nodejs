import React, { useState,useEffect } from 'react';
import micOnIcon from '../../icons/micOnIcon.png';
import micOffIcon from '../../icons/micOffIcon.png';
import videoOnIcon from '../../icons/videoOnIcon.png';
import videoOffIcon from '../../icons/videoOffIcon.png';
import participantsActiveIcon from '../../icons/participantsActiveIcon.png';
const ParticipantActive = ({setActiveOpen}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const participants = [
    { id: 1, name: 'Dianne Russell', image: 'https://randomuser.me/api/portraits/women/1.jpg', micOn: false, videoOn: false },
    { id: 2, name: 'Guy Hawkins', image: 'https://randomuser.me/api/portraits/women/1.jpg', micOn: false, videoOn: false },
    { id: 3, name: 'Kathryn Murphy', image: 'https://randomuser.me/api/portraits/women/1.jpg', micOn: true, videoOn: true },
    { id: 4, name: 'Kathryn Murphy', image: 'https://randomuser.me/api/portraits/women/1.jpg', micOn: true, videoOn: true },
    { id: 5, name: 'Kathryn Murphy', image: 'https://randomuser.me/api/portraits/women/1.jpg', micOn: true, videoOn: true },
    { id: 6, name: 'Kathryn Murphy', image: 'https://randomuser.me/api/portraits/women/1.jpg', micOn: true, videoOn: true },
    { id: 7, name: 'Kathryn Murphy', image: 'https://randomuser.me/api/portraits/women/1.jpg', micOn: true, videoOn: true },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

useEffect(() => {
  // Logic for updating state, not directly inside the render
  setActiveOpen(true); // or setActiveOpen(false)
}, [/* dependencies, if needed */]);

  return (
    <div className="relative flex h-screen">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`${isSidebarOpen ? 'hidden' : 'block'} fixed top-[6rem] right-[-8px]   text-white px-4 py-2 z-10`}
      >
        <img className='h-[2.0rem]' src={participantsActiveIcon} alt="" />
      </button>

      {/* Sidebar */}
      <div
        className={` ${
          isSidebarOpen ? 'absolute' : 'fixed'
        } bottom-[15rem] right-0 bg-none shadow-md transform transition-transform duration-300 
          ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } w-[23rem] h-[60%] `}
      >
        <span className='flex gap-10 bg-white border-b border-gray-300 p-2'>
        <button onClick={()=> setIsSidebarOpen(false)} className='text-blue-700 font-bold'>
          X
        </button>
        <h2 className="text-lg font-semibold p-4 ">Participants</h2>
        </span>
        <ul className="p-4 space-y-4 overflow-y-scroll h-[70%] scrollbar-blue-500">
          {participants.map((participant) => (
            <li key={participant.id} className="flex items-center gap-4 p-2 bg-white rounded-md shadow">
              <img
                src={participant.image}
                alt={participant.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex gap-12">
                <p className="font-medium">{participant.name}</p>
                <div className="flex justify-end gap-2 mt-1 text-gray-500">
                  <span
                    className={`w-6 h-4 ${participant.micOn ? 'text-blue-500' : 'text-red-500'}`}
                  >
                  <img src={micOnIcon} alt="" />
                  </span>
                  <span
                    className={`w-6 h-4 ${participant.videoOn ? 'text-blue-500' : 'text-red-500'}`}
                  >
                    <img src={videoOnIcon} alt="" />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ParticipantActive;
