import React, { useState, useEffect } from 'react';
import { db } from '../../../Config/firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../../../Config/firebase';
import { useNavigate } from 'react-router-dom';

export default function CreateMenuOpt({ setIsOpen }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to get the current time in HH:MM:SS format
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }


  const userMeetingCollRef = collection(db, 'UserMeetingData');

  // Function to check if a meeting with the same name exists for the current user
  const checkMeetingExistence = async () => {
    const q = query(userMeetingCollRef, 
      where('Name', '==', name), 
      where('userId', '==', auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty; // Return true if no meeting exists with the same name, else false
  };

  // Function to send meeting data to Firestore
  const sendMeetData = async () => {
    if (!name) {
      setError('Meeting name is required!');
      return;
    }

    setError(''); // Clear previous errors
    setLoading(true); // Show loading state

    try {
      // Check if a meeting with the same name already exists for the current user
      const isMeetingExist = await checkMeetingExistence();
      if (!isMeetingExist) {
        setError('A meeting with the same name already exists.');
        setLoading(false);
        return;
      }

      // Proceed to create the meeting if it doesn't exist
      await addDoc(userMeetingCollRef, {
        Name: name,
        userId: auth.currentUser.uid,
        StartTime: getCurrentTime(),
        EndTime: '',
      });
      setLoading(false); // Hide loading state
      navigate('/MeetingRoom', { state: { meetingName: name } }); // Redirect to meeting room
    } catch (error) {
      setLoading(false); // Hide loading state
      setError('Failed to create meeting. Please try again.');
      console.error(error); // Log error for debugging
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Create New Meeting</h2>

          <button
            onClick={() => setIsOpen(false)}
            className="relative bottom-[3.5rem] left-[20.5rem] text-blue-500 font-bold"
            aria-label="Close"
          >
            X
          </button>

          {error && (
            <div className="text-red-500 text-sm mb-4">
              <p>{error}</p>
            </div>
          )}

          <input
            type="text"
            placeholder="Name of Meeting"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-end">
            <button
              onClick={sendMeetData}
              disabled={loading}
              className={`px-4 py-2 text-white rounded-lg focus:outline-none ${
                loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              aria-label="Create Meeting"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
