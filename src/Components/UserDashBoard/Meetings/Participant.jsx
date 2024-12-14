import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";

const Participant = ({ appId, channelName, uid, setRemoteUsers, userStringId }) => {
  const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [localTracks, setLocalTracks] = useState({ audioTrack: null, videoTrack: null });
  const [remoteUsers, setRemoteUsersState] = useState([]); // Local state for remote users
  const [inCall, setInCall] = useState(false);
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
      const checkRemoteVideo = async () => {
        // Check if the remote player div exists
        const remoteDiv = document.getElementById(`remote-player-${userId}`);
        
        if (remoteDiv) {
          const remoteVideoElements = remoteDiv.querySelectorAll('video'); 
          
          if (remoteVideoElements.length === 0 && retryCount < 3) {
            console.log(`Remote video element not found, retrying call...`);
            setRetryCount((prev) => prev + 1);
            await leaveCall();
            await startCall(); // Retry starting the call
          }
        } else {
          console.log(`Remote div not found for user ${userId}, retrying call...`);
          setRetryCount((prev) => prev + 1);
          await leaveCall();
          await startCall(); // Retry starting the call
        }
      };
      

      // Set a timeout to check remote video availability after 3 seconds
      setTimeout(checkRemoteVideo, 3000);

    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  // Leave the video call
  const leaveCall = async () => {
    try {
      console.log("Leaving the call...");
      const { audioTrack, videoTrack } = localTracks;

      // Stop local tracks
      if (audioTrack) {
        console.log("Stopping audio track");
        audioTrack.close();
      }
      if (videoTrack) {
        console.log("Stopping video track");
        videoTrack.close();
      }

      // Unpublish and leave the channel
      await client.leave();
      console.log("Left the channel");

      // Reset state
      setLocalTracks({ audioTrack: null, videoTrack: null });
      setRemoteUsersState([]); // Reset remote users
      setInCall(false);

      console.log("Call ended!");
    } catch (error) {
      console.error("Error leaving call:", error);
    }
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
          onClick={leaveCall}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          End Call
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Local Player */}
        <div
          id="local-player"
          className="w-full h-64 bg-gray-800 text-white flex items-center justify-center"
        >
          {localTracks.videoTrack ? "Local Stream" : "Waiting for Local Stream..."}
        </div>

        {/* Remote Players */}
        {remoteUsers.map((user) => (
          <div
            key={user.uid}
            id={`remote-player-${user.uid}`}
            className="w-full h-64 bg-gray-800 text-white flex items-center justify-center"
          >
            Remote Stream: {user.uid}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participant;




// import React, { useState,useEffect } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";
// import axios from "axios";

// const Participant = ({ appId, channelName, uid,setParticipants,userStringId }) => {
//   const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
//   const [localTracks, setLocalTracks] = useState({ audioTrack: null, videoTrack: null });
//   const [remoteUsers, setRemoteUsers] = useState([]);
//   const [inCall, setInCall] = useState(false);
//   const [userId, setUserId] = useState("");

//   console.log("Component Rendered: UID", uid);
//   useEffect(() => {
//       // console.log("Video state changed:", videoOn);
//      const setUid = (uid)=>{
//       const spilitedUid = uid.split('-')
//       console.log("userid is :",spilitedUid[2])
//       setUserId(+(spilitedUid[2]))
//      }
//     //  Yasir Khan-1734163921098-698728-v3kzrnFester-Meetup
//     //  Yasir Khan-1734161024197-759034-zs6j2wFester-Meetup
//     // Yasir Khan-1734162151569-100040-x7z297Fester-Meetup
//       setUid(userStringId);
//     }, [userStringId]);
  
//   // Fetch token from the backend
//   const fetchToken = async (channelName, uid, role) => {
//     try {
//       console.log(`Fetching token for channel: ${channelName}, uid: ${uid}, role: ${role}`);
//       const response = await axios.get(`http://localhost:3000/rtcToken`, {
//         params: {
//           channelName: channelName,
//           uid: uid,
//           role: role,
//         },
//         headers: {
//           "ngrok-skip-browser-warning": "true", // Add the custom ngrok header
//         },
//       });
//       console.log("Token fetched successfully:", response.data.token);
//       return response.data.token;
//     } catch (error) {
//       console.error("Error fetching token:", error);
//       throw error;
//     }
//   };

//   // Start the video call
//   const startCall = async () => {
//     try {
//       console.log("Starting video call...");
//       const token = await fetchToken(channelName, uid, 1);
//       console.log("Joining channel...");
//       await client.join(appId, channelName, token, uid);
//       console.log(`User ${uid} joined the channel: ${channelName}`);

//       // Create local tracks (audio and video)
//       const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//       const videoTrack = await AgoraRTC.createCameraVideoTrack();
//       setLocalTracks({ audioTrack, videoTrack });
//       console.log("Local tracks created:", { audioTrack, videoTrack });

//       // Publish local tracks
//       await client.publish([audioTrack, videoTrack]);
//       console.log("Local tracks published");

//       // Play local video
//       videoTrack.play("local-player");
//       console.log("Local video playing");

//       // Subscribe to remote users
//       client.on("user-published", async (user, mediaType) => {
//         console.log(`User ${user.uid} published ${mediaType}`);
//         console.log(user.uid.toString());
//         if (user.uid.toString() == userId) {
//           await client.subscribe(user, mediaType);
//           console.log(`Subscribed to user: ${user.uid}`);
//         }
//         else{
//           console.log("i am fucked")
//         }

//         setParticipants((prevUsers) => {
//           if (!prevUsers.find((u) => u.uid === user.uid)) {
//             console.log(`New remote user: ${user.uid}`);
//             return [...prevUsers, user];
//           }
//           return prevUsers;
//         });

//         if (mediaType === "video") {
//           console.log(`User ${user.uid} video starting`);
//           user.videoTrack?.play(`remote-player-${user.uid}`);
//         }
//         if (mediaType === "audio") {
//           console.log(`User ${user.uid} audio starting`);
//           user.audioTrack?.play();
//         }
//       });

//       client.on("user-unpublished", (user) => {
//         console.log(`User ${user.uid} unpublished`);
//         setParticipants((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
//       });

//       setInCall(true);
//       console.log("Call started!");
//     } catch (error) {
//       console.error("Error starting call:", error);
//     }
//   };

//   // Leave the video call
//   const leaveCall = async () => {
//     try {
//       console.log("Leaving the call...");
//       const { audioTrack, videoTrack } = localTracks;

//       // Stop local tracks
//       if (audioTrack) {
//         console.log("Stopping audio track");
//         audioTrack.close();
//       }
//       if (videoTrack) {
//         console.log("Stopping video track");
//         videoTrack.close();
//       }

//       // Unpublish and leave the channel
//       await client.leave();
//       console.log("Left the channel");

//       // Reset state
//       setLocalTracks({ audioTrack: null, videoTrack: null });
//       setParticipants([]);
//       setInCall(false);

//       console.log("Call ended!");
//     } catch (error) {
//       console.error("Error leaving call:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       {/* <input type="text" placeholder="enter the uid" onChange={(e) => setUserId(e.target.value)} /> */}
//       {!inCall ? (
//         <button
//           onClick={startCall}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Start Video Call
//         </button>
//       ) : (
//         <button
//           onClick={leaveCall}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           End Call
//         </button>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         {/* Local Player */}
//         <div
//           id="local-player"
//           className="w-full h-64 bg-gray-800 text-white flex items-center justify-center"
//         >
//           {localTracks.videoTrack ? "Local Stream" : "Waiting for Local Stream..."}
//         </div>

//         {/* Remote Players */}
//         {/* {remoteUsers.map((user) => (
//           <div
//             key={user.uid}
//             id={`remote-player-${user.uid}`}
//             className="w-full h-64 bg-gray-800 text-white flex items-center justify-center"
//           >
//             Remote Stream: {user.uid}
//           </div>
//         ))} */}
//       </div>
//     </div>
//   );
// };

// export default Participant;
