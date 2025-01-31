import React, { useState } from "react";
import { Link } from "react-router-dom";
import {useTheme} from "../../../ThemeContext"
import BackgroundAnimation from "../../BoxMoveAnimations";

export default function BeforeParticipant() {
  const [participantUid, setParticipantUid] = useState(null);
  const {darkMode} = useTheme()


  return (
    <div className="relative">
    <BackgroundAnimation />
    <div className="absolute inset-0 flex items-center justify-center">
    <div className={`w-[60%] h-[60%] ${darkMode?"dark-mode border-2 border-white":"bg-white"} flex flex-col md:flex-row lg:flex-row rounded-2xl shadow-md`}>
        <div
          id="local-player"
          className="w-full h-1/2 md:h-full lg:w-1/2 lg:h-full bg-gray-800 text-white flex items-center justify-center"
        >
        </div>
        <div className="flex flex-col justify-around lg:w-1/2 h-full lg:border-2 lg:border-blue-500 p-4">
          <p className="text-lg font-bold mb-4">Join Meeting</p>
          <p className={`${darkMode?"text-white":"text-gray-500"} mb-2`}>
            Please enter the meeting ID or link you received to join the
            meeting.
          </p>
          <input
            type="text"
            className={`${darkMode?"dark-mode":""} outline-blue-500 border-2 border-blue-400 text-blue-700 w-full p-2 mb-4`}
            placeholder="Meeting ID or Link"
            onChange={(e) => setParticipantUid(e.target.value)}
          />
          <Link
            to="#"
            onClick={async (e) => {
              e.preventDefault(); // Prevent the default navigation
              try {
                localStorage.setItem("participantUniqueId", participantUid);
                // Navigate to the MeetingRoom page manually after setting data
                window.location.href = `/MeetingRoom`;
              } catch (error) {
                console.error("Uid setting failed", error);
              }
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-500 w-[143px]"
          >
            Join Meeting
          </Link>
        </div>
      </div>
      </div>
      </div>
  );
}
