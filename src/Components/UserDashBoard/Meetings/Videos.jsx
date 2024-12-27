import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import removeParticipantByUserId from "./MeetingRoomComponents/deletingParticipantData";
import { settingMeetingDataHost } from "./MeetingRoomComponents/SettingParticipantData";
import { auth } from "../../../Config/firebase";
AgoraRTC.setLogLevel(0);
const VideoCall = ({ appId, channelName, uid,meetingRName}) => {

  const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  AgoraRTC.setLogLevel(0);
  const [localTracks, setLocalTracks] = useState({ audioTrack: null, videoTrack: null });
  const [inCall, setInCall] = useState(false);
  const [remoteUsers,setRemoteUsers] = useState([]);
  const navigate = useNavigate();

  const spilitedUid = uid[0].split("-");
  const agoraUID = +(spilitedUid[2]);
  console.log("Initialized with Agora UID:", agoraUID);  // Debugging UID

  // Fetch token from the backend
  const fetchToken = async (channelName, uid, role) => {
    try {
      console.log(`Fetching token for channel: ${channelName}, UID: ${uid}, Role: ${role}`);
      const response = await axios.get("http://localhost:3000/rtcToken", {
        params: { channelName, uid, role },
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      console.log("Token fetched successfully:", response.data.token);
      return response.data.token;
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  };

  // Start the video call
  const startCall = async () => {
    try {
      // Call settingMeetingData with the updated participants
        settingMeetingDataHost(meetingRName[0], [ {
          Name: auth.currentUser.displayName,
          Picture: auth.currentUser.photoURL,
          Role: 1,
          userId: auth.currentUser.uid,
        }], uid[0]);
    
      console.log("Starting call...");
      // Check if the client is already connected or connecting
      if (client.connectionState === "CONNECTED" || client.connectionState === "CONNECTING") {
        console.log("Client is already connected or connecting. Skipping join.");
        return; // Don't attempt to join again
      }
      
      if (client.connectionState === "DISCONNECTED") {
        console.log("Client is disconnected. Joining again.");
      }

      const token = await fetchToken(channelName, agoraUID, 1);
      await client.join(appId, channelName, token, agoraUID);
      console.log("Client joined the channel:", channelName);

      // Create local tracks (audio and video)
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      setLocalTracks({ audioTrack, videoTrack });

      // Publish local tracks
      await client.publish([audioTrack, videoTrack]);
      console.log(videoTrack)
      console.log("Published local tracks");

      // Play local video
      videoTrack.play("local-player");
      console.log("Local video is playing");

      // Subscribe to remote users
      client.on("user-published", async (user, mediaType) => {
        console.log(`User published: ${user.uid}, Media Type: ${mediaType}`);
        await client.subscribe(user, mediaType);
        console.log(`Subscribed to user: ${user.uid}`);

        setRemoteUsers((prevUsers) => {
          if (!prevUsers.find((u) => u.uid === user.uid)) {
            return [...prevUsers, user];
          }
          return prevUsers;
        });

        // Ensure the container exists
        let remotePlayerContainer = document.getElementById(`remote-player-${user.uid}`);
        if (!remotePlayerContainer) {
          remotePlayerContainer = document.createElement("div");
          remotePlayerContainer.id = `remote-player-${user.uid}`;
          remotePlayerContainer.className = "w-full h-64 bg-gray-800 text-white flex items-center justify-center";
          document.body.appendChild(remotePlayerContainer); // Append to desired parent element
          console.log(`Created remote player container for user ${user.uid}`);
        }

        if (mediaType === "video") {
          console.log(`${user.uid} video starting`);
          user.videoTrack?.play(`remote-player-${user.uid}`); // Play video
        }
        if (mediaType === "audio") {
          console.log(`${user.uid} audio starting`);
          user.audioTrack?.play(); // Play audio
        }
      });

      client.on("user-unpublished", (user) => {
        console.log(`User unpublished: ${user.uid}`);
        setRemoteUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));

        // Remove the video container
        // const remotePlayerContainer = document.getElementById(`remote-player-${user.uid}`);
        // if (remotePlayerContainer) {
        //   remotePlayerContainer.remove();
        //   console.log(`Removed remote player container for user ${user.uid}`);
        // }
      });

      setInCall(true);
      console.log("Call started!");
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const leaveCall = async () => {
    try {
      console.log("Leaving call...");
      const { audioTrack, videoTrack } = localTracks;

      // Stop local tracks
      if (audioTrack) {
        console.log("Stopping audio track...");
        audioTrack.close();
      }
      if (videoTrack) {
        console.log("Stopping video track...");
        videoTrack.close();
      }

      // Unpublish and leave the channel
      await client.leave();
      console.log("Client left the channel");

      // Reset state
      setLocalTracks({ audioTrack: null, videoTrack: null });
      setRemoteUsers([]);
      setInCall(false);
      removeParticipantByUserId(localStorage.getItem("uniqueId"), auth.currentUser.uid);

      console.log("Call ended!");
      window.location.href = "/Create-menu";

      
    } catch (error) {
      console.error("Error leaving call:", error);
    }
  };

  // Expose leaveCall function to parent using useImperativeHandle
  // useImperativeHandle(ref, () => ({
  //   leaveCall,
  // }));

  // useEffect(() => {
  //   console.log("Video state changed:", videoOn);
  //   const toggleVideo = async () => {
  //     if (localTracks.videoTrack) {
  //       if (videoOn) {
  //         console.log("Enabling video...");
  //         await client.unpublish([localTracks.videoTrack]); // Unpublish first
  //         await localTracks.videoTrack.setEnabled(true); // Re-enable video
  //         await client.publish([localTracks.videoTrack]); // Republish
  //         localTracks.videoTrack.play("local-player"); // Play locally
  //         console.log("Video enabled and republished.");
  //       } else {
  //         console.log("Disabling video...");
  //         await client.unpublish([localTracks.videoTrack]); // Unpublish the track
  //         await localTracks.videoTrack.setEnabled(false); // Disable video
  //         console.log("Video disabled.");
  //       }
  //     }
  //   };
  //   toggleVideo();
  // }, [videoOn, client, localTracks]);

  // useEffect(() => {
  //   console.log("Audio state changed:", audioOn);
  //   const toggleAudio = async () => {
  //     if (localTracks.audioTrack) {
  //       console.log(`Setting audio to ${audioOn ? "enabled" : "disabled"}`);
  //       await localTracks.audioTrack.setEnabled(audioOn);
  //     }
  //   };
  //   toggleAudio();
  // }, [audioOn, localTracks]);

  // useEffect(() => {
  //   console.log("Starting call in useEffect...");
  //   startCall();
  // }, []);
  const getGridClass = () => {
    const count = remoteUsers.length;

    if (count === 1) return "grid-cols-2 grid-rows-1";
    if (count === 2) return "grid-cols-2 grid-rows-1";
    if (count <= 4) return "grid-cols-2 grid-rows-2";
    if (count <= 6) return "grid-cols-3 grid-rows-2";

    return "grid-cols-4 grid-rows-auto"; // Default for more participants
  };
  

  return (
    <>
      <div className="p-4">
      {!inCall ? (
        <button
          onClick={startCall}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Start Video Call
        </button>
      ) : (
        <button
          onClick={leaveCall}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          End Call
        </button>
      )}

      <div className={`grid gap-2 w-[80vw] h-[60vh] ${getGridClass()} p-3`}>
        {/* Local Player */}
        <div
          id="local-player"
          className="flex items-center justify-center border-[4px] border-blue-500 rounded-lg"
        >
          {localTracks.videoTrack ? "" : "Connecting please wait..."}
        </div>

        {/* Remote Players */}
        {remoteUsers.map((user) => (
          <div
            key={user.uid}
            id={`remote-player-${user.uid}`}
            className="flex items-center justify-center border-[4px] border-blue-500 rounded-lg"
          >
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default VideoCall;
