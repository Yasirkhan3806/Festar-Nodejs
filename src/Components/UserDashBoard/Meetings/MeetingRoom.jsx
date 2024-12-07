import React, { useState, useRef } from "react";
import MeetingRoomNav from "./MeetingRoomComponents/MeetingRoomNav";
import ParticipantActive from "./MeetingRoomComponents/participantActive";
import MessageSidebar from "./MeetingRoomComponents/MeetingMessages";
import checkingVideo from "../pictures/checkingVideo.webm";
import VideoCall from "./Videos";

export default function Host() {
  const [activeOpen, setActiveOpen] = useState(false);
  const [participants, setParticipants] = useState([checkingVideo]); // Example participant IDs
  const [uid, setUID] = useState("");
  const [inCall, setInCall] = useState(false);
  const [startCall, setStartCall] = useState(false);
  const videoCallRef = useRef();
  const appId = "c405190c3bca4842ab4b7964cb56177d";
  const channelName = "test";

  // Function to dynamically calculate grid classes based on the number of participants
  const getGridClass = () => {
    const count = participants.length;

    if (count === 1) return "grid-cols-2 grid-rows-1";
    if (count === 2) return "grid-cols-2 grid-rows-1";
    if (count <= 4) return "grid-cols-2 grid-rows-2";
    if (count <= 6) return "grid-cols-3 grid-rows-2";

    return "grid-cols-4 grid-rows-auto"; // Default for more participants
  };

  // Shorten UID for AgoraRTC: Ensure it's numeric and within the valid range
  const generateNumericUID = (stringUID) => {
    if (typeof stringUID === "string") {
      // Extract the first numeric part of the UID or use a random number
      const numericUID = parseInt(stringUID.replace(/\D/g, "").slice(0, 5)); // Remove non-numeric characters, then slice to fit range
      return numericUID >= 0 && numericUID <= 10000
        ? numericUID
        : Math.floor(Math.random() * 10000); // Ensure it's in the valid range
    }
    // If stringUID is not a string, return a random UID within range
    return Math.floor(Math.random() * 10000);
  };

  const agoraUID = generateNumericUID(uid);

  const handleEndCall = () => {
    videoCallRef.current.leaveCall(); // Calling the exposed leaveCall function
    setStartCall(false);
    setInCall(false);
  };

  return (
    <>
      <div>
        <MeetingRoomNav setUID={setUID} />
        {!inCall ? (
          <button
            onClick={() => setStartCall(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Start Video Call
          </button>
        ) : (
          <button
            onClick={handleEndCall}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            End Call
          </button>
        )}
        <div className="flex">
          <div className="w-[95%] flex flex-wrap border-2 h-[32rem] gap-2">
            {/* Dynamic Grid Layout */}
            <div className={`grid gap-2 w-full h-[81vh] ${getGridClass()}`}>
              {startCall && (
                <VideoCall
                  ref={videoCallRef}
                  appId={appId}
                  channelName={channelName}
                  setParticipants={setParticipants}
                  uid={agoraUID}
                  setInCall={setInCall}
                />
              )}

              {participants.map((user, index) => (
                <div
                  key={user.uid}
                  id={`remote-player-${user.uid}`}
                  className={`bg-gray-500 flex items-center justify-center`}
                  // style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }} // Dynamic colors
                >
                  {/* Remote Stream: {user.uid} */}
                  {/* <video
                    src={participant}
                    className="w-full h-full object-cover"
                  /> */}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-[5%] border-2 items-end">
            <ParticipantActive setActiveOpen={setActiveOpen} />
            <MessageSidebar activeOpen={activeOpen} />
          </div>
        </div>
      </div>
    </>
  );
}
