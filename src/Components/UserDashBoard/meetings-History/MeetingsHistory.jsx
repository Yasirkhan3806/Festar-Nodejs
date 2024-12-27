import React, { useState, useEffect } from 'react';
import { fetchMeetings } from './callingMeetingData';

export default function MeetingsHistory() {
  const [meetingData, setMeetingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const meetings = await fetchMeetings();
      setMeetingData(meetings);
      console.log(meetings);
    };

    fetchData();
  }, []); // Empty array means this effect will run only once when the component mounts

  return (
    <div className="max-w-full h-[20rem] mx-auto p-6 bg-white shadow-lg rounded-lg ">
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Meetings History</h2>
      <div className="space-y-4 overflow-scroll h-[16rem] overflow-x-hidden">
        {meetingData.map((meeting) => (
          <div
            key={meeting.id}
            className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-sm"
          >
            <div className="flex justify-between">
              <span className="text-lg font-medium text-blue-600">{meeting.meetingName}</span>
              <span className="text-sm text-gray-500">{meeting.meetingDate}  {meeting.meetingTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
