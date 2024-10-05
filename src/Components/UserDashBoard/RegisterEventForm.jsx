import React, { useState } from 'react';

export default function PopupForm({ onClose }) {
  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-blue-500 p-6 rounded-lg w-80 text-white">
          <h2 className="text-lg font-semibold mb-4">Event Information</h2>
          
          <form>
            {/* Event Name */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 rounded-md text-black"
                placeholder="Event Name"
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <input
                type="date"
                className="w-full p-2 rounded-md text-black"
                placeholder="Date"
              />
            </div>

            {/* Start and End Time */}
            <div className="mb-4 flex space-x-2">
              <input
                type="time"
                className="w-1/2 p-2 rounded-md text-black"
                placeholder="Start time"
              />
              <input
                type="time"
                className="w-1/2 p-2 rounded-md text-black"
                placeholder="End time"
              />
            </div>

            {/* Notes */}
            <div className="mb-4">
              <textarea
                className="w-full p-2 rounded-md text-black"
                placeholder="Type notes here"
              />
            </div>

            {/* Save Button */}
            <div className="text-center">
              <button className="bg-white text-blue-500 py-2 px-6 rounded-md font-semibold">
                Save Event
              </button>
            </div>
          </form>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white font-bold text-lg"
          >
            &times;
          </button>
        </div>
      </div>
    </>
  );
}
