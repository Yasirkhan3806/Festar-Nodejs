import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateMenuOpt from './CreateMenuOpt';

export default function MeetingOpt() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='flex flex-col items-center gap-8 shadow-xl bg-blue-700 border-white rounded-lg border-2 w-2/4 h-44 mt-8'>
        <span className='text-white font-bold text-2xl p-4'>
          <h2>Join or Create a Meeting</h2>
        </span>
        <span className='flex gap-12'>
          <button
            onClick={() => setIsOpen(true)}
            className='bg-white hover:bg-blue-500 border-2 rounded-sm border-blue-500 p-2 text-blue-500 hover:text-white transition duration-500 font-semibold shadow-md'
          >
            Create Meeting
          </button>
          {isOpen && <CreateMenuOpt setIsOpen={setIsOpen} />}
          <Link className='bg-blue-500 hover:bg-white border-2 rounded-sm border-white p-2 text-white hover:text-blue-500 transition duration-500 font-semibold shadow-md' to="">
            Join Meeting
          </Link>
        </span>
      </div>
    </>
  );
}
