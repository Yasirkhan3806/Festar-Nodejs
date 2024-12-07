import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";

const VideoCall = forwardRef(({ appId, channelName, uid, setParticipants, setInCall }, ref) => {
  const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [localTracks, setLocalTracks] = useState({ audioTrack: null, videoTrack: null });

  // Fetch token from the backend
  const fetchToken = async (channelName, uid, role) => {
    try {
      const response = await axios.get(`http://localhost:3000/rtcToken`, {
        params: {
          channelName: channelName,
          uid: uid,
          role: role,
        },
        headers: {
          "ngrok-skip-browser-warning": "true",
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
      const token = await fetchToken(channelName, uid, 1);
      await client.join(appId, channelName, token, uid);

      // Create local tracks (audio and video)
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      setLocalTracks({ audioTrack, videoTrack });

      // Publish local tracks
      await client.publish([audioTrack, videoTrack]);

      // Play local video
      videoTrack.play("local-player");

      // Subscribe to remote users
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log(`subscribed to user: ${user.uid}`);

        setParticipants((prevUsers) => {
          if (!prevUsers.find((u) => u.uid === user.uid)) {
            return [...prevUsers, user];
          }
          return prevUsers;
        });

        if (mediaType === "video") {
          console.log(`${user.uid} video starting`);
          user.videoTrack?.play(`remote-player-${user.uid}`);
        }
        if (mediaType === "audio") {
          console.log(`${user.uid} audio starting`);
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user) => {
        setParticipants((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      });

      setInCall(true);
      console.log("Call started!");
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

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
      setParticipants([]);
      setInCall(false);

      console.log("Call ended!");
    } catch (error) {
      console.error("Error leaving call:", error);
    }
  };

  // Expose leaveCall function to parent using useImperativeHandle
  useImperativeHandle(ref, () => ({
    leaveCall,
  }));

  useEffect(() => {
    startCall();
  }, []);

  return (
    <>
      {/* Local Player */}
      <div
        id="local-player"
        className="bg-gray-500 flex items-center justify-center"
      >
        {localTracks.videoTrack ? "Local Stream" : "Waiting for Local Stream..."}
      </div>

      {/* Remote Players */}
      {/* {participants.map((user) => (
        <div
          key={user.uid}
          id={`remote-player-${user.uid}`}
          className="w-full h-64 bg-gray-800 text-white flex items-center justify-center"
        >
          Remote Stream: {user.uid}
        </div>
      ))} */}
    </>
  );
});

export default VideoCall;
