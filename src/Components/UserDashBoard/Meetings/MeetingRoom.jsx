import React, { useState, useRef } from "react";
import MeetingRoomNav from "./MeetingRoomComponents/MeetingRoomNav";
import ParticipantActive from "./MeetingRoomComponents/participantActive";
import MessageSidebar from "./MeetingRoomComponents/MeetingMessages";
import checkingVideo from "../pictures/checkingVideo.webm";
import VideoCall from "./Videos";
import Participant from "./Participant";
import VideoSettingBar from "./MeetingRoomComponents/VideoSettingBar";
import { useLocation } from "react-router-dom";

export default function Host() {
  const [activeOpen, setActiveOpen] = useState(false);
  const [participants, setParticipants] = useState([checkingVideo]); // Example participant IDs
  const [uid, setUID] = useState("");
  const [inCall, setInCall] = useState(false);
  const [startCall, setStartCall] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const videoCallRef = useRef();
  const location = useLocation();
  const { participantUid } = location.state || {};
  const {host} = location.state ||{}
  const appId = "c405190c3bca4842ab4b7964cb56177d";
  const channelName = "test";


  console.log(host)
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
  // const generateNumericUID = (stringUID) => {
  //   if (typeof stringUID === "string") {
  //     // Extract the first numeric part of the UID or use a random number
  //     const numericUID = parseInt(stringUID.replace(/\D/g, "").slice(0, 5)); // Remove non-numeric characters, then slice to fit range
  //     return numericUID >= 0 && numericUID <= 10000
  //       ? numericUID
  //       : Math.floor(Math.random() * 10000); // Ensure it's in the valid range
  //   }
  //   // If stringUID is not a string, return a random UID within range
  //   return Math.floor(Math.random() * 10000);
  // };



  const handleEndCall = () => {
    videoCallRef.current.leaveCall(); // Calling the exposed leaveCall function
    setStartCall(false);
    setInCall(false);
  };

  return (
    <>
      <div>
        <MeetingRoomNav setUID={setUID} />

        <div className="flex h-[504px]">
          <div className="w-[95%] flex flex-wrap h-[32rem] gap-2">
            {/* Dynamic Grid Layout */}
            <div className={`grid gap-2 w-full h-[81vh] ${getGridClass()} p-3`}>
            {startCall && (
  host ? (
    <VideoCall
      ref={videoCallRef}
      appId={appId}
      channelName={channelName}
      setParticipants={setParticipants}
      uid={uid}
      setInCall={setInCall}
      audioOn={audioOn}
      videoOn={videoOn}
    />
  ) : (
    <Participant
    ref={videoCallRef}
    appId={appId}
    channelName={channelName}
    setParticipants={setParticipants}
    uid={144}
    setInCall={setInCall}
    audioOn={audioOn}
    videoOn={videoOn} />
  )
)}


              {participants.map((user, index) => (
                <div
                  key={user.uid}
                  id={`remote-player-${user.uid}`}
                  className={`flex items-center justify-center border-[4px] border-blue-500 rounded-lg`}
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
            <ParticipantActive setActiveOpen={setActiveOpen} uid={uid} />
            <MessageSidebar activeOpen={activeOpen} />
          </div>
        </div>
        <VideoSettingBar
          inCall={inCall}
          setStartCall={setStartCall}
          handleEndCall={handleEndCall}
          setAudioOn={setAudioOn}
          setVideoOn={setVideoOn}
          audioOn={audioOn}
          videoOn={videoOn}
        />
      </div>
    </>
  );
}
