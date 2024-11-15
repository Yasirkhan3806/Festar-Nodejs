import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library

export default function MeetingLinkGenerator({setMeetingLink}) {
  // State to store the generated meeting link
 

  // Function to generate a meeting link with a unique ID using UUID
  const generateMeetingLink = () => {
    const uniqueId = uuidv4(); // Generate a unique UUID
    const link = `https://meetings.example.com/${uniqueId}`; // Example base URL with UUID
    setMeetingLink(link); // Set the generated link in state
  };
  useEffect(() => {
        generateMeetingLink()
    }, []);

  // Function to copy the meeting link to the clipboard
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(meetingLink) // Copy the link to clipboard
      .then(() => {
        alert('Meeting link copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy the meeting link.');
      });
  };

  return (
   <></>
  );
}
