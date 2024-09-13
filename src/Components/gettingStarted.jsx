import React from 'react';
import signin from '../assets/icons/icons8-add-user-male-50.png';
import schedule from '../assets/icons/icons8-schedule-50.png';
import host from '../assets/icons/icons8-video-call-50.png';
export default function GettingStarted() {
  return (
    <>
      <div className='flex justify-around mb-24'>
        <div className='w-[30%] flex flex-col justify-center items-center gap-2'>
            <img className = 'h-2/6' src={signin} alt="" />
            <h2 className='font-bold text-3xl'>Sign Up</h2>
            <p className='text-sm text-center'>Create your account on Festar to get started with planning your meetings. </p>
        </div>
        <div className='w-[30%] flex flex-col justify-center items-center gap-2'>
            <img className = 'h-2/4' src={schedule} alt="" />
            <h2 className='font-bold text-3xl'>Schedule</h2>
            <p className='text-sm text-center'>Choose a date and time for your meeting and send out invitations to participants.  </p>
        </div>
        <div className='w-[30%] flex flex-col justify-center items-center gap-2'>
            <img className = 'h-2/4' src={host} alt="" />
            <h2 className='font-bold text-3xl'>Host</h2>
            <p className='text-sm text-center'>Start your meeting with a single click and enjoy seamless video conferencing.   </p>
        </div>
      </div>
    </>
  )
}
