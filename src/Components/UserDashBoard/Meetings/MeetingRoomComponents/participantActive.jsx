import React, { useState } from 'react';
import micOnIcon from '../../icons/micOnIcon.png';
import micOffIcon from '../../icons/micOffIcon.png';
import videoOnIcon from '../../icons/videoOnIcon.png';
import videoOffIcon from '../../icons/videoOffIcon.png';
const ParticipantActive = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const participants = [
    { id: 1, name: 'Dianne Russell', image: 'https://randomuser.me/api/portraits/women/1.jpg', micOn: false, videoOn: false },
    { id: 2, name: 'Guy Hawkins', image: 'https://randomuser.me/api/portraits/women/1.jpg', micOn: false, videoOn: false },
    { id: 3, name: 'Kathryn Murphy', image: 'https://randomuser.me/api/portraits/women/1.jpg', micOn: true, videoOn: true },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative flex h-screen">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`${isSidebarOpen ? 'hidden' : 'block'} fixed top-28 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg z-10`}
      >
        show
      </button>

      {/* Sidebar */}
      <div
        className={`sticky top-24 right-0 h-full bg-none shadow-md transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } w-[23rem]`}
      >
        <span className='flex gap-10 bg-white border-b border-gray-300 p-2'>
        <button onClick={()=> setIsSidebarOpen(false)} className='text-blue-700 font-bold'>
          X
        </button>
        <h2 className="text-lg font-semibold p-4 ">Participants</h2>
        </span>
        <ul className="p-4 space-y-4">
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
