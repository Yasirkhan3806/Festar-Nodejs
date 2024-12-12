import React, { useState,useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useMeetingData } from "../../../../userContext";

const StartMeetingPopup = ({ setOpen }) => {
  const { setUniqueIdFilter, userMeetingData } = useMeetingData();
const navigate = useNavigate()
  const [meetingName, setMeetingName] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [host,setHost] = useState(false)
  const db = getFirestore();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const userName = auth.currentUser?.displayName;
  const handleOnClose = () => setOpen(false)

  // Function to format time in 12-hour format
  const formatTime12Hour = (time) => {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert "0" to "12" for midnight
    return `${formattedHours}:${minutes} ${period}`;
  };

  /**
 * Generates a random unique ID.
 * @param {string} prefix - Optional prefix for the ID.
 * @param {string} suffix - Optional suffix for the ID.
 * @returns {string} A random unique ID.
 */
function generateUniqueId(prefix = '', suffix = '') {
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomNumber = Math.floor(Math.random() * 1_000_000); // Random number up to 999,999
  const randomString = Math.random().toString(36).substring(2, 8); // Random alphanumeric string
  return `${prefix}-${timestamp}-${randomNumber}-${randomString}${suffix}`;
}

// Example usage:
const uniqueId = generateUniqueId(`${userName}`, 'Fester-Meetup');
// console.log(uniqueId); // Example output: user_1696164698367-854382-z4hrxf_end

// console.log(userMeetingData)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!meetingName || !startDateTime) {
      alert("Please fill in all fields.");
      return;
    }

    // Extract date and time separately from the datetime-local input
    const [date, time] = startDateTime.split("T");
    const formattedTime = formatTime12Hour(time);

    try {
      await addDoc(collection(db, "UserMeetingData"), {
        meetingName,
        meetingDate: date,
        meetingTime: formattedTime,
        endTime: "",
        userId,
        uniqueId,
      });
    
      // console.log("Document written with uniqueId:", uniqueId);
    
      // Wait until the uniqueId is set in the provider
      setUniqueIdFilter(uniqueId);
      localStorage.setItem("uniqueId", uniqueId);
      alert("Meeting saved successfully!");
      setHost(true)
      navigate('/MeetingRoom',{
        state: { host,setHost }
      });
    } catch (error) {
      console.error("Error saving meeting:", error);
      alert("Failed to save meeting. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Create a Meeting</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Name
            </label>
            <input
              type="text"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Enter meeting name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleOnClose}
              className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Meeting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartMeetingPopup;
