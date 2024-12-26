import React, { useState, useRef,useEffect } from "react";
import MeetingRoomNav from "./MeetingRoomComponents/MeetingRoomNav";
import ParticipantActive from "./MeetingRoomComponents/participantActive";
import MessageSidebar from "./MeetingRoomComponents/MeetingMessages";
import VideoCall from "./Videos";
import Participant from "./Participant";
import { useLocation } from "react-router-dom";
import removeParticipantByUserId from "./MeetingRoomComponents/deletingParticipantData";
import { auth } from "../../../Config/firebase";

export default function Host() {
  const [activeOpen, setActiveOpen] = useState(false);
  const [uid, setUID] = useState("");
  const videoCallRef = useRef();
  const location = useLocation();
  const participantUid = localStorage.getItem("participantUniqueId");
  const { host } = location.state || {};
  const [meetingRName, setMeetingRName] = useState("");
  const appId = "c405190c3bca4842ab4b7964cb56177d";
  const channelName = "test";
  const storedUniqueId = host
    ? localStorage.getItem("uniqueId")
    : participantUid;
  // console.log("stored Unique ID: ", storedUniqueId);

 

  
 // Re-run the effect when `host` value changes

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

  const participantTokenUid = generateNumericUID(participantUid);
  // console.log("participant UiD: ",participantUid);

  return (
    <>
      <div>
        {host ? (
          <MeetingRoomNav setUID={setUID} storedUniqueId={storedUniqueId} setMeetingRName={setMeetingRName} />
        ) : (
          <MeetingRoomNav setUID={setUID} storedUniqueId={storedUniqueId} setMeetingRName={setMeetingRName} />
        )}

        <div className="flex h-[504px]">
          <div className="w-[95%] flex flex-wrap h-[32rem] gap-2">
            {/* Dynamic Grid Layout */}
            <div className={`grid gap-2 w-full h-[81vh]  p-3`}>
              {uid ? (
                host ? (
                  <>
                    <VideoCall
                      appId={appId}
                      channelName={channelName}
                      // setParticipants={setHostParticipants}
                      uid={uid}
                      meetingRName={meetingRName}
                    />
                  </>
                ) : (
                  <Participant
                    ref={videoCallRef}
                    appId={appId}
                    channelName={channelName}
                    userStringId={participantUid}
                    uid={participantTokenUid}
                  />
                )
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>

          <div className="flex flex-col w-[5%] items-end">
            <ParticipantActive setActiveOpen={setActiveOpen} uid={uid} />
            <MessageSidebar activeOpen={activeOpen} />
          </div>
        </div>
      </div>
    </>
  );
}
