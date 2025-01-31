import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import removeParticipantByUserId from "./MeetingRoomComponents/deletingParticipantData";
import { settingMeetingDataHost } from "./MeetingRoomComponents/SettingParticipantData";
import { auth } from "../../../Config/firebase";
import { removingParticipant } from "./MeetingRoomComponents/SettingParticipantData";
AgoraRTC.setLogLevel(0);


const VideoCall = ({ appId, channelName, uid, meetingRName, mStartTime, mMeetingDate }) => {
  const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [localTracks, setLocalTracks] = useState({ audioTrack: null, videoTrack: null });
  const [inCall, setInCall] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const navigate = useNavigate();

  const spilitedUid = uid[0].split("-");
  const agoraUID = +(spilitedUid[2]);
  console.log("Initialized with Agora UID:", agoraUID);

  const fetchToken = async (channelName, uid, role) => {
    try {
      const response = await axios.get("https://token-generator-rest-api.vercel.app/rtcToken", {
        params: { channelName, uid, role },
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      return response.data.token;
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  };

  const startCall = async () => {
    try {
      settingMeetingDataHost(meetingRName[0], [{
        Name: auth.currentUser.displayName,
        Picture: auth.currentUser.photoURL,
        Role: 1,
        userId: auth.currentUser.uid,
      }], uid[0]);

      const token = await fetchToken(channelName, agoraUID, 1);
      await client.join(appId, channelName, token, agoraUID);

      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      setLocalTracks({ audioTrack, videoTrack });

      await client.publish([audioTrack, videoTrack]);
      videoTrack.play("local-player");

      client.on("user-published", async (user, mediaType) => {
        console.log(`User published: ${user.uid}, Media Type: ${mediaType}`);
        await client.subscribe(user, mediaType);

        setRemoteUsers((prevUsers) => {
          const userExists = prevUsers.find((u) => u.uid === user.uid);
          if (!userExists) {
            return [...prevUsers, user];
          }
          return prevUsers;
        });

        let remotePlayerContainer = document.getElementById(`remote-player-${user.uid}`);
        if (!remotePlayerContainer) {
          remotePlayerContainer = document.createElement("div");
          remotePlayerContainer.id = `remote-player-${user.uid}`;
          remotePlayerContainer.className = "flex items-center justify-center border-[4px] border-blue-500 rounded-lg";

          const gridContainer = document.querySelector(".grid");
          if (gridContainer) {
            gridContainer.appendChild(remotePlayerContainer);
          }
        }

        if (mediaType === "video") {
          user.videoTrack?.play(`remote-player-${user.uid}`);
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user) => {
        setRemoteUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      });

      setInCall(true);
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const leaveCall = async () => {
    try {
      const { audioTrack, videoTrack } = localTracks;
      if (audioTrack) audioTrack.close();
      if (videoTrack) videoTrack.close();
      await client.leave();
      setLocalTracks({ audioTrack: null, videoTrack: null });
      setRemoteUsers([]);
      setInCall(false);
      removeParticipantByUserId(localStorage.getItem("uniqueId"), auth.currentUser.uid);
      window.location.href = "/Create-menu";
    } catch (error) {
      console.error("Error leaving call:", error);
    }
  };

  const getGridClass = () => {
    const count = remoteUsers.length + 1;
    if (count === 1) return "grid-cols-1 grid-rows-1";
    if (count === 2) return "grid-cols-2 grid-rows-1";
    if (count <= 4) return "grid-cols-2 grid-rows-2";
    if (count <= 6) return "grid-cols-3 grid-rows-2";
    return "grid-cols-4 grid-rows-auto";
  };

  return (
    <div className="p-4">
      {!inCall ? (
        <button onClick={startCall} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Start Video Call
        </button>
      ) : (
        <button
          onClick={() => {
            removingParticipant(auth.currentUser?.uid, uid, meetingRName, mStartTime[0], mMeetingDate)
              .then(() => leaveCall())
              .catch((error) => console.error("Error removing participant:", error));
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          End Call
        </button>
      )}

      <div className={`grid gap-2 w-[80vw] h-[60vh] ${getGridClass()} p-3`}>
        <div id="local-player" className="flex items-center justify-center border-[4px] border-blue-500 rounded-lg">
          {localTracks.videoTrack ? "" : "Connecting please wait..."}
        </div>
        {remoteUsers.map((user) => (
          <div
            key={user.uid}
            id={`remote-player-${user.uid}`}
            className="flex items-center justify-center border-[4px] border-blue-500 rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default VideoCall;

