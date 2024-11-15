import React from 'react'

const meetings = [
  {
    id: 1,
    name: "Team Sync",
    date: "2024-11-01 10:00 AM",
  },
  {
    id: 2,
    name: "Project Kickoff",
    date: "2024-11-05 1:30 PM",
  },
  {
    id: 3,
    name: "Client Presentation",
    date: "2024-11-10 3:00 PM",
  },
  {
    id: 4,
    name: "Client Presentation",
    date: "2024-11-10 3:00 PM",
  },
  {
    id: 5,
    name: "Client Presentation",
    date: "2024-11-10 3:00 PM",
  },
  {
    id: 6,
    name: "Client Presentation",
    date: "2024-11-10 3:00 PM",
  },
];

export default function MeetingsHistory() {
  return (
    <div className="max-w-full h-[20rem] mx-auto p-6 bg-white shadow-lg rounded-lg ">
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Meetings History</h2>
      <div className="space-y-4 overflow-scroll h-[16rem] overflow-x-hidden">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-sm"
          >
            <div className="flex justify-between">
              <span className="text-lg font-medium text-blue-600">{meeting.name}</span>
              <span className="text-sm text-gray-500">{meeting.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
