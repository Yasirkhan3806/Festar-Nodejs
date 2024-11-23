import React, { useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";

const VideoCall = ({ appId, channelName, uid }) => {
  const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [localTracks, setLocalTracks] = useState({ audioTrack: null, videoTrack: null });
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [inCall, setInCall] = useState(false);
  const [userId,setUserId] = useState(uid)
console.log(uid)
  // Fetch token from the backend
  const fetchToken = async (channelName, uid, role) => {
    try {
      const response = await axios.get(`https://9bff-61-5-153-161.ngrok-free.app/rtcToken`, {
        params: {
          channelName: channelName,
          uid: uid,
          role: role,
        },
      });
      return response.data.token;
    } catch (error) {
      console.error("Error fetching token:", error);
      throw error;
    }
  };
  
  

  // Start the video call
  const startCall = async () => {
    try {
      const token = await fetchToken(channelName,uid,1);
      await client.join(appId, channelName, token, uid);

      // Create local tracks (audio and video)
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      setLocalTracks({ audioTrack, videoTrack });

      // Publish local tracks
      await client.publish([audioTrack, videoTrack]);

      // Play local video
      videoTrack.play(`local-player`);

      // Subscribe to remote users
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log( `subscribed to user: ${user.uid}`)
        client.on(`${user.uid}-published`, async (user, mediaType) => {
          await client.subscribe(user, mediaType);
        });
        setRemoteUsers((prevUsers) => {
          if (!prevUsers.find((u) => u.uid === user.uid)) {
            return [...prevUsers, user];
          }
          return prevUsers;
        });

        if (mediaType === "video") {
          console.log(`${user.uid} video starting`)
          user.videoTrack?.play(`remote-player-${user.uid}`);
        }
        if (mediaType === "audio") {
          console.log(`${user.uid} audio starting`)
          user.audioTrack?.play();
        }
        
      });
      client.on("user-published", async (user, mediaType) => {
        console.log(`User ${user.uid} published ${mediaType}`);

      });
      

      client.on("user-unpublished", (user) => {
        setRemoteUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      });

      setInCall(true);
      console.log("Call started!");
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  // Leave the video call
  const leaveCall = async () => {
    try {
      const { audioTrack, videoTrack } = localTracks;

      // Stop local tracks
      if (audioTrack) audioTrack.close();
      if (videoTrack) videoTrack.close();

      // Unpublish and leave the channel
      await client.leave();

      // Reset state
      setLocalTracks({ audioTrack: null, videoTrack: null });
      setRemoteUsers([]);
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
      <p>{userId}</p>

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

export default VideoCall;
