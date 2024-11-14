import React, { useState } from 'react';
import { db } from '../../../Config/firebase'; // Adjust the import based on your Firebase setup
import { doc,setDoc,collection } from 'firebase/firestore';
import { auth } from '../../../Config/firebase'; // Import Firestore methods

export default function RegisterEventForm({  onClose }) {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Prepare data to be stored
        const eventData = {
            eventName,
            eventDate,
            startTime,
            endTime,
            notes,
            userId: auth.currentUser.uid, // Store user ID with the event
        };

        // Generate a unique document ID (you can use timestamp, or use Firestore's auto-ID)
        const eventDocRef = doc(collection(db, 'UserEvents'));

        // Store the event data in Firestore with a unique document ID
        await setDoc(eventDocRef, eventData);

        // Optionally, reset the form or close the modal
        onClose();
    } catch (error) {
        console.error("Error saving event data: ", error);
    }
};

  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
        <div className="relative bg-blue-500 p-6 rounded-lg w-80 text-white">
          <h2 className="text-lg font-semibold mb-4">Event Information</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Event Name */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 rounded-md text-black"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <input
                type="date"
                className="w-full p-2 rounded-md text-black"
                placeholder="Date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>

            {/* Start and End Time */}
            <div className="mb-4 flex space-x-2">
              <input
                type="time"
                className="w-1/2 p-2 rounded-md text-black"
                placeholder="Start time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
              <input
                type="time"
                className="w-1/2 p-2 rounded-md text-black"
                placeholder="End time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            {/* Notes */}
            <div className="mb-4">
              <textarea
                className="w-full p-2 rounded-md text-black"
                placeholder="Type notes here"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Save Button */}
            <div className="text-center">
              <button type="submit" className="bg-white text-blue-500 py-2 px-6 rounded-md font-semibold">
                Save Event
              </button>
            </div>
          </form>

          {/* Close Button (X Icon) */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white"
          >
            {/* SVG for Close Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
