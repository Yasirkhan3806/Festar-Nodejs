import React from 'react';
import Calendar from './Calender';
import Notification from "./Notification";
import Events from './EventsComing/Events';


export default function RegEventsOption() {
  return (
    <>
    <div className='overflow-y-auto'>
         <div className="flex">
            <div className="w-full md:w-[50%]">
          <Calendar />
          </div>
          <div className=" w-0 md:w-[50%] lg:w-[50%] md:pr-6 lg:pr-6" >
        <Notification
          message={'You have a new event scheduled!'}
          type={"info"}
          // onClose={handleShowNotification}
        />
        </div>

        </div> 
        <div>
          <Events/>
        </div>
        </div>
    </>
  )
}

