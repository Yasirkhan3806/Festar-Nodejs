import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useMeetingData } from "../../../../userContext";
import { useTheme } from "../../../../ThemeContext";

const StartMeetingPopup = ({ setOpen }) => {
  const { setUniqueIdFilter } = useMeetingData();
  const navigate = useNavigate();
  const [meetingName, setMeetingName] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [host, setHost] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const db = getFirestore();
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const userName = auth.currentUser?.displayName;
  const handleOnClose = () => setOpen(false);
  const { darkMode } = useTheme();

  // Function to format time in 12-hour format
  const formatTime12Hour = (time) => {
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert "0" to "12" for midnight
    return `${formattedHours}:${minutes} ${period}`;
  };

  function generateUniqueId(prefix = "", suffix = "") {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomNumber = Math.floor(Math.random() * 1_000_000); // Random number up to 999,999
    const randomString = Math.random().toString(36).substring(2, 8); // Random alphanumeric string
    return `${prefix}-${timestamp}-${randomNumber}-${randomString}${suffix}`;
  }

  const uniqueId = generateUniqueId(`${userName}`, "Fester-Meetup");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!meetingName || !startDateTime) {
      alert("Please fill in all fields.");
      return;
    }

    const [date, time] = startDateTime.split("T");
    const formattedTime = formatTime12Hour(time);

    setLoading(true); // Set loading to true when the button is clicked

    try {
      await addDoc(collection(db, "UserMeetingData"), {
        meetingName,
        meetingDate: date,
        meetingTime: formattedTime,
        endTime: "",
        userId,
        uniqueId,
      });

      setUniqueIdFilter(uniqueId);
      localStorage.setItem("uniqueId", uniqueId);
      setHost(true);
      navigate("/MeetingRoom", { state: { host: true } });
    } catch (error) {
      console.error("Error saving meeting:", error);
      alert("Failed to save meeting. Please try again.");
    } finally {
      setLoading(false); // Set loading back to false after the operation completes
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className={`bg-white rounded-lg p-6 shadow-lg w-96 ${darkMode ? "dark-mode" : ""}`}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "dark-mode" : ""}`}>Create a Meeting</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${darkMode ? "dark-mode" : ""}`}>
              Meeting Name
            </label>
            <input
              type="text"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
              className={`w-full border border-gray-300 rounded px-3 py-2 ${darkMode ? "dark-mode" : ""}`}
              placeholder="Enter meeting name"
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${darkMode ? "dark-mode" : ""}`}>
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              className={`w-full border border-gray-300 rounded px-3 py-2 ${darkMode ? "dark-mode" : ""}`}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleOnClose}
              className={`px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400 ${darkMode ? "dark-mode-btn" : ""}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${darkMode ? "dark-mode-btn" : ""}`}
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <span className="flex justify-center items-center space-x-1">
                  <span className={`${darkMode?"dark-mode":"bg-white"} dot animate-pulse w-2.5 h-2.5 rounded-full`}></span>
                  <span className={`${darkMode?"dark-mode":"bg-white"} dot animate-pulse w-2.5 h-2.5 rounded-full`}></span>
                  <span className={`${darkMode?"dark-mode":"bg-white"} dot animate-pulse w-2.5 h-2.5 rounded-full`}></span>
                </span>
              ) : (
                "Save Meeting"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartMeetingPopup;
