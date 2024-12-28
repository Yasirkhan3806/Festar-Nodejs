import React, { useState } from 'react';

const IndividualChat = () => {
    const [receiverEmail, setReceiverEmail] = useState("");
    const [initialMessage, setInitialMessage] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission (e.g., send to Firebase)
      console.log("Receiver Email:", receiverEmail);
      console.log("Initial Message:", initialMessage);
    };
  
    return (
      <div className="mb-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Receiver Email</label>
            <input
              type="email"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter receiver's email"
              required
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Initial Message</label>
            <textarea
              value={initialMessage}
              onChange={(e) => setInitialMessage(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your initial message"
              required
            />
          </div>
  
          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg">
              Start Chat
            </button>
          </div>
        </form>
      </div>
    );
};

export default IndividualChat;