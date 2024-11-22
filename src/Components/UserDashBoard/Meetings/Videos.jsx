import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";

const Videos = ({ role, uid }) => {
  const rtc = {
    localAudioTrack: null,
    localVideoTrack: null,
  };

  const options = {
    appId: "c405190c3bca4842ab4b7964cb56177d",
    channel: "test",
    role: role, // "host" or "audience"
  };

  // Fetch token from backend
  function fetchToken(uid, channelName, tokenRole) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:3000/rtcToken", {
          params: {
            channelName: channelName,
            uid: uid,
            role: tokenRole,
          },
        })
        .then((response) => {
          resolve(response.data.token);
        })
        .catch((error) => {
          console.error("Error fetching token:", error);
          reject(error);
        });
    });
  }

  // Function for the Host to publish their video
  async function startHost() {
    const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    client.setClientRole("host"); // Set the client as host

    // Fetch token for the host (role = 1)
    const token = await fetchToken(uid, options.channel, 1);

    // Join the channel
    await client.join(options.appId, options.channel, token, uid);

    // Create and publish audio and video tracks
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    await client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

    // Play local video
    const localPlayerContainer = document.createElement("div");
    localPlayerContainer.id = uid;
    localPlayerContainer.style.width = "640px";
    localPlayerContainer.style.height = "480px";
    document.body.append(localPlayerContainer);
    rtc.localVideoTrack.play(localPlayerContainer);

    console.log("Host is live!");
  }

  // Function for the Participant to view host's video
  async function startParticipant() {
    const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    client.setClientRole("audience"); // Set the client as audience

    // Fetch token for the participant (role = 2)
    const token = await fetchToken(uid, options.channel, 2);

    // Join the channel
    await client.join(options.appId, options.channel, token, uid);

    // Subscribe to host's streams
    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      console.log("Subscribed to", user.uid);

      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        const remotePlayerContainer = document.createElement("div");
        remotePlayerContainer.id = user.uid;
        remotePlayerContainer.style.width = "640px";
        remotePlayerContainer.style.height = "480px";
        document.body.append(remotePlayerContainer);
        remoteVideoTrack.play(remotePlayerContainer);
      }

      if (mediaType === "audio") {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
      }
    });

    console.log("Participant joined!");
  }

  return (
    <>
      {role === "host" ? (
        <button onClick={startHost}>Start as Host</button>
      ) : (
        <button onClick={startParticipant}>Join as Audience</button>
      )}
    </>
  );
};

export default Videos;
