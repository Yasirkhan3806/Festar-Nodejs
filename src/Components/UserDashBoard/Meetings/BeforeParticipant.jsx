import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Link } from "react-router-dom";
import Participant from "./Participant";
// import { useMeeting } from "../../../userContext";

export default function BeforeParticipant() {
  const [participantUid, setParticipantUid] = useState(null);
  // const { setAudioTrack, setVideoTrack } = useMeeting();

  // useEffect(() => {
  //   if (participantUid) {
  //     const startLocalVideo = async () => {
  //       const audio = await AgoraRTC.createMicrophoneAudioTrack();
  //       const video = await AgoraRTC.createCameraVideoTrack();
  //       setAudioTrack(audio);  // Save the audioTrack in state
  //       setVideoTrack(video);   // Save the videoTrack in state
  //       video.play("local-player");  // Play the local video
  //       // audio.play(); // You can play the audio track if necessary
  //     };
  //     startLocalVideo();
  //   }
  // }, [participantUid]); // Effect runs only when uid is set (not null)

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-500">
      <div className="w-[60%] h-[60%] bg-white flex rounded-lg shadow-md">
        <div
          id="local-player"
          className="w-1/2 h-full bg-gray-800 text-white flex items-center justify-center"
        >
          {/* Local video will be displayed here */}
        </div>
        <div className="flex flex-col justify-around w-1/2 h-full border-2 border-blue-500 p-4">
          <p className="text-lg font-bold mb-4">Join Meeting</p>
          <p className="text-gray-600 mb-2">
            Please enter the meeting ID or link you received to join the meeting.
          </p>
          <input
            type="text"
            className="outline-blue-500 border-2 border-blue-400 text-blue-700 w-full p-2 mb-4"
            placeholder="Meeting ID or Link"
            onChange={(e) => setParticipantUid(e.target.value)}
          />
          <Link
            to="/MeetingRoom"
            state={{ participantUid }}  // Pass state to MeetingRoom
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-500"
          >
            Join Meeting
          </Link>
        </div>
      </div>
    </div>
  );
}
