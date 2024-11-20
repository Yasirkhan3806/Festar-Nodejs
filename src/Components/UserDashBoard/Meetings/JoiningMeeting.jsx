import React, { useState, useRef } from "react";
import { db } from "../../../Config/firebase";
import { doc, collection, getDoc, onSnapshot } from "firebase/firestore";

const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};

function JoinMeeting() {
    const [callId, setCallId] = useState("");
    const [joining, setJoining] = useState(false);
    const localRef = useRef(null);
    const remoteRef = useRef(null);
    const pc = useRef(new RTCPeerConnection(servers));

    const handleJoinMeeting = async () => {
        if (!callId) {
            alert("Please enter a valid meeting ID.");
            return;
        }

        setJoining(true);
        try {
            // Retrieve the call document
            const callDoc = doc(db, "Calls", callId);
            const offerCandidates = collection(callDoc, "offerCandidates");
            const answerCandidates = collection(callDoc, "answerCandidates");

            const callData = (await getDoc(callDoc)).data();
            if (!callData) {
                alert("Meeting not found. Please check the meeting ID.");
                setJoining(false);
                return;
            }

            // Set up local and remote streams
            const localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            const remoteStream = new MediaStream();

            localStream.getTracks().forEach((track) => pc.current.addTrack(track, localStream));

            pc.current.ontrack = (event) => {
                event.streams[0].getTracks().forEach((track) => {
                    remoteStream.addTrack(track);
                });
            };

            if (localRef.current) localRef.current.srcObject = localStream;
            if (remoteRef.current) remoteRef.current.srcObject = remoteStream;

            // Set up ICE candidate handling
            pc.current.onicecandidate = (event) => {
                if (event.candidate) {
                    answerCandidates.add(event.candidate.toJSON());
                }
            };

            // Handle offer from the host
            const offerDescription = callData.offer;
            await pc.current.setRemoteDescription(new RTCSessionDescription(offerDescription));

            // Create and send answer
            const answerDescription = await pc.current.createAnswer();
            await pc.current.setLocalDescription(answerDescription);

            const answer = {
                type: answerDescription.type,
                sdp: answerDescription.sdp,
            };

            await callDoc.update({ answer });

            // Listen for host's ICE candidates
            onSnapshot(offerCandidates, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        const candidate = new RTCIceCandidate(change.doc.data());
                        pc.current.addIceCandidate(candidate);
                    }
                });
            });
        } catch (error) {
            console.error("Error joining meeting:", error);
            alert("An error occurred while joining the meeting. Please try again.");
        } finally {
            setJoining(false);
        }
    };

    return (
        <div className="join-meeting">
            <h2>Join a Meeting</h2>
            <input
                type="text"
                placeholder="Enter Meeting ID"
                value={callId}
                onChange={(e) => setCallId(e.target.value)}
                disabled={joining}
            />
            <button onClick={handleJoinMeeting} disabled={joining || !callId}>
                {joining ? "Joining..." : "Join Meeting"}
            </button>

            <div className="videos">
                <video ref={localRef} autoPlay playsInline muted className="local" />
                <video ref={remoteRef} autoPlay playsInline className="remote" />
            </div>
        </div>
    );
}

export default JoinMeeting;
