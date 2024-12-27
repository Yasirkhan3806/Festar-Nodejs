import React from 'react';

export default function ChatsSearch() {
  return (
    <div className="flex items-center max-w-md mx-auto border-[2.5px] border-b-4 border-blue-400 rounded-full shadow-md px-4 py-2 focus-within:border-blue-500 focus-within:shadow-lg transition-all">
      <svg
        className="h-5 w-5 text-gray-400 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 19a8 8 0 100-16 8 8 0 000 16zm6-6l4 4"
        />
      </svg>
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}
