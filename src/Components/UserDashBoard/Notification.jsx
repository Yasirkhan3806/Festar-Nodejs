import React, { useState, useEffect } from 'react';
import { db } from '../../Config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { fetchEvents } from './eventsDates';

export default function Notification({ onClose }) {
  const [events, setEvents] = useState([]);
  const [eventNotifications, setEventNotifications] = useState([]);

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents(setEvents);
  }, []);

  // Calculate time difference and set alert level
  useEffect(() => {
    const currentDate = new Date();

    const notifications = events.map(event => {
      const eventDate = new Date(event.eventDate);
      const timeDiff = eventDate - currentDate; // Time difference in milliseconds
      const hoursDiff = timeDiff / (1000 * 60 * 60); // Convert to hours

      // Determine alert level based on time difference
      let alertLevel = 'green'; // Default to low alert (green)
      if (hoursDiff <= 1) {
        alertLevel = 'red'; // High alert if less than 1 hour
      } else if (hoursDiff <= 24) {
        alertLevel = 'yellow'; // Medium alert if within 24 hours
      }

      return {
        ...event,
        alertLevel, // Add alert level to event object
      };
    });

    setEventNotifications(notifications);
  }, [events]);

  return (
    <div>
      {eventNotifications.map((event, index) => (
        <div
  key={index}
  className={`notification ${event.alertLevel} p-2 mb-2 rounded-lg`}
  style={{
    backgroundColor:
      event.alertLevel === 'red'
        ? 'rgba(255, 0, 0, 0.75)' // Red with 75% opacity
        : event.alertLevel === 'yellow'
        ? 'rgba(255, 255, 0, 0.75)' // Yellow with 75% opacity
        : 'rgba(0, 128, 0, 0.75)', // Green with 75% opacity
    color: event.alertLevel === 'red' ? 'white' : 'black',
  }}
>      <span className="font-semibold">{event.eventName}</span>
          <button onClick={onClose} className="mt-2 bg-gray-300 p-1 rounded">
            Close
          </button>
          <br />
          <span>
            {`Time: ${new Date(event.eventDate).toLocaleString()} (${event.startTime} - ${event.endTime})`}
          </span>
          <br />
     
        </div>
      ))}
    </div>
  );
}
