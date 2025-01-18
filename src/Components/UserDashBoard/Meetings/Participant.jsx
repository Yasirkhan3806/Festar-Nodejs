import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { removingParticipant } from "./MeetingRoomComponents/SettingParticipantData";
import removeParticipantByUserId from "./MeetingRoomComponents/deletingParticipantData";
import { settingMeetingDataParticipants } from "./MeetingRoomComponents/SettingParticipantData";
import { auth } from "../../../Config/firebase";

const Participant = ({ appId, channelName, uid, userStringId,mStartTime,meetingRName }) => {
  const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [localTracks, setLocalTracks] = useState({ audioTrack: null, videoTrack: null });
  const [remoteUsers, setRemoteUsersState] = useState([]); // Local state for remote users
  const [inCall, setInCall] = useState(false);
  const navigate = useNavigate()
  const [userId, setUserId] = useState("");
  const [retryCount, setRetryCount] = useState(0); // Track retries

  useEffect(() => {
    const setUid = (uid) => {
      const splitedUid = uid.split('-');
      console.log("UserId is:", splitedUid[2]);
      setUserId(+(splitedUid[2]));
    };
    setUid(userStringId);
  }, [userStringId]);

  // Fetch token from the backend
  const fetchToken = async (channelName, uid, role) => {
    try {
      console.log(`Fetching token for channel: ${channelName}, uid: ${uid}, role: ${role}`);
      const response = await axios.get(`http://localhost:3000/rtcToken`, {
        params: {
          channelName: channelName,
          uid: uid,
          role: role,
        },
        headers: {
          "ngrok-skip-browser-warning": "true", // Add the custom ngrok header
        },
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
      await settingMeetingDataParticipants(
        [
          {
            Name: auth.currentUser.displayName,
            Picture: auth.currentUser.photoURL,
            Role: 2,
            userId: auth.currentUser.uid,
          },
        ],
        userStringId
      );
      console.log("Starting video call...");
      const token = await fetchToken(channelName, uid, 1);
      console.log("Joining channel...");
      await client.join(appId, channelName, token, uid);
      console.log(`User ${uid} joined the channel: ${channelName}`);

      // Create local tracks (audio and video)
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      setLocalTracks({ audioTrack, videoTrack });
      console.log("Local tracks created:", { audioTrack, videoTrack });

      // Publish local tracks
      await client.publish([audioTrack, videoTrack]);
      console.log("Local tracks published");

      // Play local video
      videoTrack.play("local-player");
      console.log("Local video playing");

      // Subscribe to remote users
      client.on("user-published", async (user, mediaType) => {
        console.log(`User ${user.uid} published ${mediaType}`);
        if (user.uid.toString() == userId) {
          await client.subscribe(user, mediaType);
          console.log(`Subscribed to user: ${user.uid}`);
        }

        // Update remote users
        setRemoteUsersState((prevUsers) => {
          if (!prevUsers.find((u) => u.uid === user.uid)) {
            console.log(`New remote user: ${user.uid}`);
            return [...prevUsers, user];
          }
          return prevUsers;
        });

        // Call setRemoteUsers instead of setParticipants
        // setRemoteUsersState((prevUsers) => {
        //   if (!prevUsers.find((u) => u.uid === user.uid)) {
        //     return [...prevUsers, user];
        //   }
        //   return prevUsers;
        // });
 
        if (mediaType === "video") {
          console.log(`User ${user.uid} video starting`);
          user.videoTrack?.play(`remote-player-${user.uid}`);
        }

        if (mediaType === "audio") {
          console.log(`User ${user.uid} audio starting`);
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user) => {
        console.log(`User ${user.uid} unpublished`);
        setRemoteUsersState((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
        // setRemoteUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      });

      setInCall(true);
      console.log("Call started!");

      // Monitor remote video element
      // const checkRemoteVideo = async () => {
      //   // Check if the remote player div exists
      //   const remoteDiv = document.getElementById(`remote-player-${userId}`);
        
      //   if (remoteDiv) {
      //     const remoteVideoElements = remoteDiv.querySelectorAll('video'); 
          
      //     if (remoteVideoElements.length === 0 && retryCount < 3) {
      //       console.log(`Remote video element not found, retrying call...`);
      //       setRetryCount((prev) => prev + 1);
      //       await leaveCall();
      //       await startCall(); // Retry starting the call
      //     }
      //   } else {
      //     console.log(`Remote div not found for user ${userId}, retrying call...`);
      //     setRetryCount((prev) => prev + 1);
      //     await leaveCall();
      //     await startCall(); // Retry starting the call
      //   }
      // };
      

      // Set a timeout to check remote video availability after 3 seconds
      // setTimeout(checkRemoteVideo, 3000);

    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  // Leave the video call
  const leaveCall = async () => {
    try {
      
      console.log("Leaving the call...");
      const { audioTrack, videoTrack } = localTracks;
  
      // Stop and close local tracks properly
      if (audioTrack) {
        console.log("Stopping and closing audio track");
        await audioTrack.stop();
        audioTrack.close();
      }
      if (videoTrack) {
        console.log("Stopping and closing video track");
        await videoTrack.stop();
        videoTrack.close();
      }
  
      // Unpublish and leave the channel
      await client.leave();
      console.log("Left the channel");
  
      // Reset state
      setLocalTracks({ audioTrack: null, videoTrack: null });
      setRemoteUsersState([]); // Reset remote users
      console.log("Call ended and tracks stopped!");
    } catch (error) {
      console.error("Error leaving call:", error);
    }
  };
  
  const getGridClass = () => {
    const count = remoteUsers.length;

    if (count === 1) return "grid-cols-2 grid-rows-1";
    if (count === 2) return "grid-cols-2 grid-rows-1";
    if (count <= 4) return "grid-cols-2 grid-rows-2";
    if (count <= 6) return "grid-cols-3 grid-rows-2";

    return "grid-cols-4 grid-rows-auto"; // Default for more participants
  };
  

  return (
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
          onClick={async ()=>{
            await removingParticipant(auth.currentUser?.uid,userStringId,meetingRName,mStartTime[0])
            leaveCall();
            setInCall(false);
           removeParticipantByUserId(localStorage.getItem("participantUniqueId"), auth.currentUser.uid);
            navigate('/Join-Menu');
            window.location.reload();
          }
          }
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
             {/* {user.videoTrack ? " " : "Connecting please wait..."} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participant;



