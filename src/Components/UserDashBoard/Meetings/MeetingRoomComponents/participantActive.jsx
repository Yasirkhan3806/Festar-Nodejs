import React, { useState,useEffect } from 'react';
import micOnIcon from '../../icons/micOnIcon.png';
import micOffIcon from '../../icons/micOffIcon.png';
import videoOnIcon from '../../icons/videoOnIcon.png';
import videoOffIcon from '../../icons/videoOffIcon.png';
import participantsActiveIcon from '../../icons/participantsActiveIcon.png';
import { useParticipantActiveData } from '../../../../userContext';
import {useTheme} from "../../../../ThemeContext"
const ParticipantActive = ({setActiveOpen,uid}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {participantActive,setMeetingId} = useParticipantActiveData();
  const {darkMode} = useTheme()
  
  // console.log(uid[0])
  useEffect(() => {
    setMeetingId(uid[0]);
  }, [uid, setMeetingId]);
  
  useEffect(() => {
  // console.log("participants array",participantActive)
  }, [participantActive]);
  
  const toggleSidebar = () => {
    setActiveOpen(true)
    setIsSidebarOpen(!isSidebarOpen)}
;
  return (
    <div className="relative flex h-screen">
      {/* Toggle Button */}
      <a
        onClick={toggleSidebar}
        className={`${isSidebarOpen ? 'hidden' : 'block'} fixed top-[6rem] right-[-8px]   text-white px-4 py-2 z-10`}
      >
        <img className='h-[2.0rem]' src={participantsActiveIcon} alt="" />
      </a>

      {/* Sidebar */}
      <div
        className={` ${
          isSidebarOpen ? 'absolute' : 'fixed'
        } bottom-[0rem] right-0 md:bg-transparent lg:bg-transparent  ${darkMode?"dark-mode":"bg-blue-500"} transform transition-transform duration-300 
          ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } w-[23rem] h-[100%] `}
      >
        <span className='flex gap-10 bg-white border-b border-gray-300 p-2 shadow'>
        <button onClick={()=> {
          setActiveOpen(false)
          setIsSidebarOpen(false)}} className='text-blue-700 font-bold'>
          X
        </button>
        <h2 className="text-lg font-semibold p-4 ">Participants</h2>
        </span>
        
        <ul className={`p-4 space-y-4 ${participantActive && participantActive.length > 0 ?"overflow-y-auto h-[70%]":""} scrollbar-blue-500 shadow-none box-s ${darkMode?"dark-mode":""}`}>
        {participantActive && participantActive.length > 0 ? (
   participantActive.map((participant) => (
    <li key={participant.id} className="flex items-center gap-4 p-2 bg-white border-2 border-white rounded-md shadow">
      <img
        src={participant.Picture} // Correct
        alt="Participant Picture"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex gap-12">
        <p className="font-medium">{participant.Name}</p>
        <div className="flex justify-end gap-2 mt-1 text-gray-500">
          <span className={`w-6 h-4 ${participant.micOn ? 'text-blue-500' : 'text-red-500'}`}>
            <img src={participant.micOn ? micOnIcon : micOffIcon} alt="Mic Status" />
          </span>
          <span className={`w-6 h-4 ${participant.videoOn ? 'text-blue-500' : 'text-red-500'}`}>
            <img src={participant.videoOn ? videoOnIcon : videoOffIcon} alt="Video Status" />
          </span>
        </div>
      </div>
    </li>
  ))
  
  ) : (
    <p>No participant</p>
  )}
        </ul>
      </div>
    </div>
  );
};

export default ParticipantActive;
