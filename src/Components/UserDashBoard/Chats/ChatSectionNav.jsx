import React, { useEffect } from 'react';
import callIconBlue from './icons/callIconBlue.png';
import threeDotsIcon from './icons/threeDotsIcon.png';
import groupIcon from './icons/groupIcon.png';

const ContactHeader = ({ navData }) => {

  
  return (
    <div className="flex flex-col">
      {/* Left Section: Avatar and Name */}
      <div className="flex items-center justify-between p-3 px-9 pr-14   bg-white w-[100%] gap-44">
      <div className="flex items-center gap-4 w-[80%] ">
        {/* Avatar */}
        <img
          src={navData.groupPicture || groupIcon}
          alt={`${navData.groupName}'s avatar`}
          className="h-12 w-12 rounded-full object-cover"
        />
        {/* Name and Last Seen */}
        <div>
          <h3 className="text-lg font-bold text-gray-800">{navData.groupName || "Chat Name"}</h3>
          {/* <p className="text-[0.7rem] text-gray-500">
            Online - Last seen, {lastSeen || "unknown"}
          </p> */}
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4 text-blue-500 ">
        {/* Call Icon */}
        <button
          title="Call"
          className="hover:text-blue-600 transition duration-200 "
        >
         <img src={callIconBlue} alt="" className='h-[70%]'/>
        </button>

        {/* Options Icon */}
        <button
          title="More options"
          className="hover:text-blue-600 transition duration-200"
        >
          <img src={threeDotsIcon} alt="" className='h-[70%]' />
        </button>
      </div>
      </div>
      <div className='border-[1px] border-blue-300 w-[27rem] ml-14 '></div>
    </div>
  );
};

export default ContactHeader;
