import React, { useState,useRef } from "react";
// import Menu from "./Menu";
import Videos from "./Videos";
import Participant from "./Participant";
// import rand from 'uuid'



export default function Host() {
  const [host,setHost] = useState(false)
  const [participant,setParticipant] = useState(false)

  const appId = "c405190c3bca4842ab4b7964cb56177d"
  const channelName = "test"
  const uid = Math.floor(Math.random() * 1000000); // Random UID for the session


  return (
      <div className="app">
        <button onClick={()=>setHost(true)}>
          host
        </button>
        {host &&
  <Videos appId={appId} channelName={channelName} uid = {uid} />
        }
           <button onClick={()=>setParticipant(true)}>
          participant
        </button>{
          participant &&
<Participant appId={appId} channelName={channelName} uid = {uid} /> }

      </div>
  );
}

























// import React, { useState, useRef, useEffect } from 'react';
// import { db } from '../../../Config/firebase';
// import { doc, setDoc, onSnapshot } from 'firebase/firestore';
// import { v4 as uuidv4 } from 'uuid'; // Ensure uuidv4 is imported
// import { useLocation } from 'react-router-dom';

// const Host = ({name}) => {
//   const [callId, setCallId] = useState('');
//   const [meetingLink, setMeetingLink] = useState('');
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerConnection = useRef(
//     new RTCPeerConnection({
//       iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//     })
//   );
//   const localStream = useRef(null);
//   const location = useLocation();
//   const { meetingName } = location.state || {}; 

//   // Generate a unique meeting link (and set it as call ID)
//   useEffect(() => {
//     const generateMeetingLink = () => {
//       const uniqueId = uuidv4(); // Generate a unique UUID
//       const link = `https://${meetingName}.Festar-Meetup.com/${uniqueId}`; // Example base URL with UUID
//       setMeetingLink(link); // Set the generated link in state
//     };
//     generateMeetingLink(); // Generate the meeting link on component mount
//   }, []);

//   const startCall = async () => {
//     if (!meetingLink) {
//       console.error("Meeting link is not generated yet.");
//       return;
//     }

//     // Extract the UUID part of the link for Firestore document ID
//     const meetingId = meetingLink.split('/').pop(); // This extracts the UUID part

//     // Access local media
//     localStream.current = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//     localVideoRef.current.srcObject = localStream.current;

//     // Add local stream tracks to the connection
//     localStream.current.getTracks().forEach((track) => {
//       peerConnection.current.addTrack(track, localStream.current);
//     });

//     // Create an SDP offer
//     const offer = await peerConnection.current.createOffer();
//     await peerConnection.current.setLocalDescription(offer);

//     // Save offer to Firestore using the extracted meetingId
//     const callDoc = doc(db, 'calls', meetingId); // Use meetingId (UUID) as document ID
//     setCallId(callDoc.id); // Set the callId to the document ID
//     await setDoc(callDoc, { offer });

//     // Listen for answer
//     onSnapshot(callDoc, (snapshot) => {
//       const data = snapshot.data();
//       if (data?.answer) {
//         peerConnection.current.setRemoteDescription(data.answer);
//       }
//     });

//     // Handle ICE candidates
//     peerConnection.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         setDoc(callDoc, { candidates: event.candidate }, { merge: true });
//       }
//     };

//     // Add remote stream
//     peerConnection.current.ontrack = (event) => {
//       remoteVideoRef.current.srcObject = event.streams[0];
//     };
//   };

//   const endCall = () => {
//     // Close the peer connection
//     if (peerConnection.current) {
//       peerConnection.current.close();
//       peerConnection.current = null;
//     }

//     // Stop local media tracks
//     if (localStream.current) {
//       localStream.current.getTracks().forEach((track) => track.stop());
//       localStream.current = null;
//     }

//     // Clear video elements
//     if (localVideoRef.current) localVideoRef.current.srcObject = null;
//     if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

//     // Clear call ID
//     setCallId('');
//     setMeetingLink(''); // Optional: Clear meeting link if you want
//   };

//   return (
//     <div>
//       <video ref={localVideoRef} autoPlay muted style={{ width: '400px' }} />
//       <video ref={remoteVideoRef} autoPlay style={{ width: '400px' }} />
//       <button onClick={startCall}>Start Call</button>
//       <button onClick={endCall} disabled={!callId}>
//         End Call
//       </button>
//       {callId && <p>Call ID: {callId}</p>}
//       {meetingLink && <p>Meeting Link: <a href={meetingLink} target="_blank" rel="noopener noreferrer">{meetingLink}</a></p>}
//     </div>
//   );
// };

// export default Host;
