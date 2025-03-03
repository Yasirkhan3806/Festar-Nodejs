import React, { useState, useEffect } from 'react';
import { fetchMeetings } from './callingMeetingData';
import { useTheme } from '../../../ThemeContext';

export default function MeetingsHistory() {
  const [meetingData, setMeetingData] = useState([]);
  const {darkMode} = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const meetings = await fetchMeetings();
      setMeetingData(meetings);
    };

    fetchData();
  }, []); // Empty array means this effect will run only once when the component mounts

  return (
    <div className={`max-w-full h-[20rem] mx-auto p-6 bg-white shadow-lg rounded-lg border-2 border-white  ${darkMode?"dark-mode":""}`}>
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Meetings History</h2>
      <div className="space-y-4 overflow-y-auto h-[15rem] overflow-x-hidden hide-scrollbar">
        {meetingData && meetingData.length > 0 ?(meetingData.map((meeting) => (
          <div
            key={meeting.id}
            className={`p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-sm  ${darkMode?"dark-mode":""}
            `}
          >
            <div className="flex justify-between ">
              <span className={`text-lg font-medium text-blue-600  ${darkMode?"dark-mode":""}`}>{meeting.meetingName}</span>
              <span className="text-sm text-gray-500">`<b>Date:</b> {meeting.meetingDate} <b>Total Time:</b> {meeting.totalTime.hours} Hours {meeting.totalTime.minutes} Minutes`</span>
            </div>
          </div>
        ))):("No Meeting Data Available, Please create or join a meeting")}
      </div>
    </div>
  );
}
