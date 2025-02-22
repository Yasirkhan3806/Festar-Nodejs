import React, { useState, useEffect } from 'react';
import crossIcon from '../icons/crossIcon.png';
import notificationIcon from '../icons/notificationsIcon.png';
import conferenceImage from '../pictures/conferenceImage.png';
import bgReIntroPicture from "../../../assets/Pictures/bgReIntroPicture.avif"
import { useTheme } from '../../../ThemeContext';
import { useEvent } from '../../../WebsocketApi';

export default function Notification() {
  const [eventNotifications, setEventNotifications] = useState([]);
  const {eventData,fetchData} = useEvent();
  const {darkMode} = useTheme();


  useEffect(() => {
    fetchData()
   
  }, [])



  // Filter and set notifications for events within the next 24 hours
  useEffect(() => {
    const currentDate = new Date();
    const upcomingEvents = eventData.map(event => {
      const eventDate = new Date(event.eventDate); // Initial event date without time

      // Check if startTime is defined before trying to split it
      if (event.startTime) {
        const [startHour, startMinute] = event.startTime.split(":");
        eventDate.setHours(parseInt(startHour, 10), parseInt(startMinute, 10)); // Set time on the eventDate
      } else {
        console.warn(`Event ${event.eventName} is missing startTime.`);
      }

      const timeDiff = eventDate - currentDate; // Time difference in milliseconds
      const hoursDiff = timeDiff / (1000 * 60 * 60); // Convert to hours
      if (hoursDiff > 0 && hoursDiff <= 24) {
        let alertLevel = 'yellow'; // Medium alert within 24 hours
        if (hoursDiff <= 1) {
          alertLevel = 'red'; // High alert within 1 hour
        }
        return { ...event, alertLevel };
      }
      return null; // Exclude events outside the 24-hour window
    }).filter(event => event !== null); // Filter out null values

    setEventNotifications(upcomingEvents);
  }, [eventData]);

  // Format the event date without the time (default 00:00:00)
  const formatEventDate = (date) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString("en-US", { timeZone: "Asia/Karachi" });
  };

  const onClose = ()=>{
    setEventNotifications([])
  }

  return (
    <div >
      {eventNotifications.map((event, index) => (
        <div
          key={index}
          className={`notification p-2 rounded-lg mr-6 ml-2  mt-6`}
          style={{
            backgroundColor:'rgba(255, 0, 0, 0.6)',
            color:'white',
          }}
        >
          {/* <span className="font-semibold">{event.eventName}</span> */}
          <span className='flex justify-between'>
            
          <span className='flex gap-1'>
          <img className='h-[24px]' src={notificationIcon} alt="" />
            {/* Format the event date to exclude the default time (00:00:00) */}
            {`You have event today at (${event.startTime} - ${event.endTime})`}
          </span>
          <a onClick={onClose} className="">
            <img src={crossIcon} alt="" />
          </a>
          </span>
        </div>
      ))}
      <div>
        <img className='w-full hidden md:block ' src={darkMode?bgReIntroPicture:conferenceImage} alt="" />
      </div>
    </div>
  );
}
