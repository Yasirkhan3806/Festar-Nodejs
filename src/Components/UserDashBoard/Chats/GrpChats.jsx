import React, { useEffect, useState } from 'react';
import { gettingChatsData, gettingChats } from './gettingChatsData';

export default function GrpChats({setCurrentChat,setChatId}) {
  const [groups, setGroups] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const grpData = await gettingChatsData(); // Fetch group data
        console.log('grpData:', grpData);
        setGroups(grpData); // Set the resolved data to the state
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  const getChats = async (chatId) => {
    try {
      console.log('Fetching chat data for chatId:', chatId);
      const chatData = await gettingChats(chatId); // Fetch chat data
      setCurrentChat(chatData); // Set the chat data to the state
      setChatId(chatId); // Set the chatId to the state
      console.log('chatData:', chatData);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-4 border-[2.5px] border-b-4 border-blue-400">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Groups</h2>
      <div className="space-y-4">
        {groups.length > 0 ? (
          groups.map((group) => (
            <div
              key={group.chatid}
              onClick={() => getChats(group.chatid)} // Wrap in an arrow function
              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 border-b-2 border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={group.groupPicture || '/default-avatar.png'} // Ensure fallback works
                  alt={group.chatName}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {group.chatName || 'Untitled Group'}
                  </h3>
                  <p className="text-xs text-gray-500">{group.message || 'No recent messages'}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400">{group.time || 'N/A'}</span>
                {group.unreadCount > 0 && (
                  <span className="text-xs text-white bg-blue-500 rounded-full h-5 w-5 flex items-center justify-center">
                    {group.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No groups available</p>
        )}
      </div>
    </div>
  );
}
