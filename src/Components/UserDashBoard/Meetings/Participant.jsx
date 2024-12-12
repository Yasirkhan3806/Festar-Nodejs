import React, { useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";

const Participant = ({ appId, channelName, uid }) => {
  const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [localTracks, setLocalTracks] = useState({ audioTrack: null, videoTrack: null });
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [inCall, setInCall] = useState(false);
  const [userId, setUserId] = useState("");

  console.log("Component Rendered: UID", uid);
  
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
        if (user.uid.toString() === userId) {
          await client.subscribe(user, mediaType);
          console.log(`Subscribed to user: ${user.uid}`);
        }

        setRemoteUsers((prevUsers) => {
          if (!prevUsers.find((u) => u.uid === user.uid)) {
            console.log(`New remote user: ${user.uid}`);
            return [...prevUsers, user];
          }
          return prevUsers;
        });

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
      setRemoteUsers([]);
      setInCall(false);

      console.log("Call ended!");
    } catch (error) {
      console.error("Error leaving call:", error);
    }
  };

  return (
    <div className="p-4">
      <input type="text" placeholder="enter the uid" onChange={(e) => setUserId(e.target.value)} />
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
