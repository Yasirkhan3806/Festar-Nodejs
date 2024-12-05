import React, { useState } from 'react';
import messageIcon from '../../icons/messageIcon.png'; // You can replace with your own icon// You can replace with your own icon

const MessageSidebar = ({activeOpen}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const messages = [
    { id: 1, sender: 'Dianne Russell', text: 'Hey, how’s it going?', time: '12:45 PM' },
    { id: 2, sender: 'Guy Hawkins', text: 'Let’s catch up later.', time: '1:00 PM' },
    { id: 3, sender: 'Kathryn Murphy', text: 'What’s the plan for tonight?', time: '1:15 PM' },
    { id: 4, sender: 'Kathryn Murphy', text: 'What’s the plan for tonight?', time: '1:15 PM' },
    { id: 5, sender: 'Kathryn Murphy', text: 'What’s the plan for tonight?', time: '1:15 PM' },
    { id: 6, sender: 'Kathryn Murphy', text: 'What’s the plan for tonight?', time: '1:15 PM' },
    { id: 7, sender: 'Kathryn Murphy', text: 'What’s the plan for tonight?', time: '1:15 PM' },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative flex h-screen">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`${isSidebarOpen ? 'hidden' : 'block'} fixed top-[8rem] right-[-8px] text-white px-4 py-2 z-10`}
      >
        <img className="h-[2.0rem]" src={messageIcon} alt="Message Icon" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'absolute' : 'fixed'
        } ${activeOpen ? 'bottom-[13rem]' : 'bottom-[37.5rem]'} right-0 h-full bg-white shadow-md transform transition-transform duration-300 
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} w-[23rem]`}
      >
        <span className="flex justify-between bg-white border-b border-gray-300 p-2">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-blue-700 font-bold"
          >
            X
          </button>
          <h2 className="text-lg font-semibold p-4">Messages</h2>
        </span>
        <ul className="p-4 space-y-4 overflow-y-scroll h-[60%]">
          {messages.map((message) => (
            <li key={message.id} className="flex items-start gap-4 p-2 bg-white rounded-md shadow">
              <div className="flex flex-col">
                <p className="font-medium">{message.sender}</p>
                <p className="text-gray-500 text-sm">{message.text}</p>
                <span className="text-xs text-gray-400">{message.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageSidebar;
