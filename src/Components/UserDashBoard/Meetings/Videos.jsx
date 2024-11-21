import React, { useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

export default function Videos() {
  const [channelName, setChannelName] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [uid, setUid] = useState("");
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

  const rtc = {
    localAudioTrack: null,
    localVideoTrack: null,
    client: AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }),
  };

  const options = {
    appId: "c405190c3bca4842ab4b7964cb56177d",
    token: null,
  };

  const startCall = async () => {
    if (!channelName) {
      alert("Please enter a Channel Name.");
      return;
    }

    setLoading(true);

    try {
      if (isHost) {
        // Generate a unique UID for the host
        const generatedUid = `${Math.floor(Math.random() * 1_000_000)}`;
        setUid(generatedUid);
      }

      await rtc.client.join(options.appId, channelName, options.token, uid);
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

      rtc.localVideoTrack.play(localStreamRef.current);
      console.log("Host video published!");

      rtc.client.on("user-published", async (user, mediaType) => {
        await rtc.client.subscribe(user, mediaType);
        console.log("Subscribed to remote user:", user.uid);

        if (mediaType === "video") {
        console.log("Remote video track:", user.videoTrack);
      user.videoTrack.play(remoteStreamRef.current);
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      rtc.client.on("user-unpublished", (user) => {
        console.log(`User unpublished: ${user.uid}`);
        const remotePlayerContainer = document.getElementById(user.uid);
        if (remotePlayerContainer) {
            remotePlayerContainer.remove();
        }
      });

      setIsCallStarted(true);
    } catch (error) {
      console.error("Error starting the call:", error);
    } finally {
      setLoading(false);
    }
  };

  const endCall = async () => {
    rtc.localAudioTrack?.close();
    rtc.localVideoTrack?.close();
    await rtc.client.leave();
    setIsCallStarted(false);
  };

  const copyUid = () => {
    navigator.clipboard.writeText(uid);
    alert("UID copied to clipboard!");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Agora Video Call</h2>

      {!isCallStarted && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <button
            onClick={() => setIsHost(true)}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Host a Call
          </button>
          <button
            onClick={() => setIsHost(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Join as Participant
          </button>
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Channel Name:</label>
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Enter channel name"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />
      </div>

      {isHost && uid && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <p style={{ fontWeight: "bold", color: "#333" }}>Your UID: {uid}</p>
          <button
            onClick={copyUid}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ffc107",
              color: "#333",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Copy UID
          </button>
        </div>
      )}

      {!isHost && (
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Enter UID:</label>
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="Enter shared UID"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>
      )}

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {!isCallStarted ? (
          <button
            onClick={startCall}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {loading ? "Starting..." : "Start Call"}
          </button>
        ) : (
          <button
            onClick={endCall}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            End Call
          </button>
        )}
      </div>

      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <div className="spinner" style={{ border: "4px solid #ccc", borderTop: "4px solid #007bff", borderRadius: "50%", width: "30px", height: "30px", animation: "spin 1s linear infinite" }} />
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
        <div
          ref={localStreamRef}
          style={{
            width: "48%",
            height: "300px",
            backgroundColor: "#ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          <p style={{ color: "#666" }}>Local Stream</p>
        </div>
        <div
          ref={remoteStreamRef}
          style={{
            width: "48%",
            height: "300px",
            backgroundColor: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
          }}
        >
          <p style={{ color: "#666" }}>Remote Stream</p>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

