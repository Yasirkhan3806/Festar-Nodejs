import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const VideoCall = forwardRef(({ appId, channelName, uid, audioOn, videoOn }, ref) => {
  const [client] = useState(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const [localTracks, setLocalTracks] = useState({ audioTrack: null, videoTrack: null });

  // Start local audio and video tracks
  const startLocalTracks = async () => {
    try {
      // Create local tracks (audio and video)
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      setLocalTracks({ audioTrack, videoTrack });

      // Play local video
      videoTrack.play("local-player");

      // Optionally, mute audio/video based on initial props
      if (!audioOn) audioTrack.setEnabled(false);
      if (!videoOn) videoTrack.setEnabled(false);
    } catch (error) {
      console.error("Error starting local tracks:", error);
    }
  };

  // Handle toggling video
  useEffect(() => {
    const toggleVideo = async () => {
      if (localTracks.videoTrack) {
        await localTracks.videoTrack.setEnabled(videoOn);
        if (videoOn) {
          localTracks.videoTrack.play("local-player");
        }
      }
    };
    toggleVideo();
  }, [videoOn, localTracks]);

  // Handle toggling audio
  useEffect(() => {
    const toggleAudio = async () => {
      if (localTracks.audioTrack) {
        await localTracks.audioTrack.setEnabled(audioOn);
      }
    };
    toggleAudio();
  }, [audioOn, localTracks]);

  // Start local tracks once component is mounted
  useEffect(() => {
    startLocalTracks();
  }, []);

  // Expose method to stop local tracks and leave the call to the parent
  useImperativeHandle(ref, () => ({
    stopLocalTracks: () => {
      if (localTracks.audioTrack) localTracks.audioTrack.close();
      if (localTracks.videoTrack) localTracks.videoTrack.close();
      setLocalTracks({ audioTrack: null, videoTrack: null });
    },
  }));

  return (
    <>
      {/* Local Video Player */}
      <div
        id="local-player"
        className="flex items-center justify-center border-[4px] border-blue-500 rounded-lg"
      >
        {localTracks.videoTrack ? "" : "Waiting for Local Stream..."}
      </div>
    </>
  );
});

export default VideoCall;
