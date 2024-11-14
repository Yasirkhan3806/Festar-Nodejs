import React from 'react';
import Calendar from './Calender';
import Notification from "./Notification";


export default function RegEventsOption() {
  return (
    <>
         <div className="flex">
            <div className="w-[50%]">
          <Calendar />
          </div>
          <div className="w-[50%] pr-6" >
        <Notification
          message={'You have a new event scheduled!'}
          type={"info"}
          // onClose={handleShowNotification}
        />
        </div>
        </div> 
    </>
  )
}

