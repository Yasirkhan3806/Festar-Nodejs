import React from 'react';

export default function GrpChats() {
  const groups = [
    {
      id: 1,
      name: "Team Forever",
      message: "Hahahahah!",
      time: "Today, 9:52pm",
      avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
      unreadCount: 4,
    },
    {
      id: 2,
      name: "Expertesee",
      message: "Kyuuuuu???",
      time: "Yesterday, 12:31pm",
      avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
      unreadCount: 0,
    },
    {
      id: 3,
      name: "Solution makers",
      message: "It's not going to happen",
      time: "Wednesday, 9:12am",
      avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
      unreadCount: 0,
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-4 border-[2.5px] border-b-4 border-blue-400">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Groups</h2>
      <div className="space-y-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 border-b-2 border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <img
                src={group.avatar}
                alt={group.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  {group.name}
                </h3>
                <p className="text-xs text-gray-500">{group.message}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">{group.time}</span>
              {group.unreadCount > 0 && (
                <span className="text-xs text-white bg-blue-500 rounded-full h-5 w-5 flex items-center justify-center">
                  {group.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
