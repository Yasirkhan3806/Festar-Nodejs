
import React, { useState } from "react";

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
const pc = new RTCPeerConnection(servers);

export default function Participant() {
 const [joinCode, setJoinCode] = useState("")
  return(
    <>
    </>
  )
}
























// import React, { useState, useRef, useEffect } from 'react';
// import { db } from '../../../Config/firebase';
// import { doc, getDoc, updateDoc } from 'firebase/firestore';

// const Participant = ({ setjoinIt }) => {
//   const [meetingLink, setMeetingLink] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // Loading state for joining call
//   const [componentReady, setComponentReady] = useState(false); // Loading state for component readiness
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerConnection = useRef(
//     new RTCPeerConnection({
//       iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//     })
//   );

//   // Ensure refs are assigned once component mounts
//   useEffect(() => {
//     if (localVideoRef.current && remoteVideoRef.current) {
//       console.log('Video elements are ready!');
//       setComponentReady(true);
//     } else {
//       console.error('Video elements are not ready!');
//     }
//   }, []); // Runs once after the initial render

//   const joinCall = async () => {
//     if (!meetingLink) {
//       alert('Please enter a valid meeting link!');
//       return;
//     }
  
//     setIsLoading(true);
  
//     try {
//       const localStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
  
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = localStream;
//       } else {
//         console.error('Local video element not found!');
//         alert('Local video element not found!');
//         setIsLoading(false);
//         return;
//       }
  
//       // Add local stream tracks to the peer connection
//       localStream.getTracks().forEach((track) => {
//         peerConnection.current.addTrack(track, localStream);
//       });
  
//       const callDoc = doc(db, 'calls', meetingLink);
//       const callData = await getDoc(callDoc);
  
//       if (!callData.exists()) {
//         alert('Call not found!');
//         setIsLoading(false);
//         return;
//       }
  
//       const { offer } = callData.data();
  
//       // Debugging signaling state
//       console.log('Current Signaling State:', peerConnection.current.signalingState);
  
//       // Ensure the remote description is set only if the signaling state is "stable"
//       if (peerConnection.current.signalingState === 'stable') {
//         await peerConnection.current.setRemoteDescription(offer);
//       } else {
//         console.error('Cannot set remote description: invalid signaling state.');
//         setIsLoading(false);
//         return;
//       }
  
//       const answer = await peerConnection.current.createAnswer();
//       await peerConnection.current.setLocalDescription(answer);
//       await updateDoc(callDoc, { answer });
  
//       peerConnection.current.onicecandidate = (event) => {
//         if (event.candidate) {
//           updateDoc(callDoc, { candidates: event.candidate }, { merge: true });
//         }
//       };
  
//       peerConnection.current.ontrack = (event) => {
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = event.streams[0];
//           setIsLoading(false); // Stop loading once the remote stream is received
//         } else {
//           console.error('Remote video element not found!');
//           setIsLoading(false);
//         }
//       };
//     } catch (error) {
//       console.error('Error joining call:', error);
//       alert('An error occurred while joining the call.');
//       setIsLoading(false);
//     }
//   };
  

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-semibold text-blue-500 mb-4">Join Meeting</h2>

//         <div className="flex justify-end">
//           <button
//             onClick={() => setjoinIt(false)}
//             className="text-blue-500 font-bold mt-[-5rem]"
//             aria-label="Close"
//           >
//             X
//           </button>
//         </div>

//         <input
//           type="text"
//           placeholder="Enter Meeting Link"
//           value={meetingLink}
//           onChange={(e) => setMeetingLink(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <div className="flex justify-end">
//           <button
//             onClick={joinCall}
//             className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg focus:outline-none"
//             disabled={!componentReady} // Disable until video elements are ready
//           >
//             Join Call
//           </button>
//         </div>

//         {isLoading && (
//           <div className="flex justify-center items-center mt-4">
//             <div className="animate-spin border-t-4 border-blue-500 rounded-full w-12 h-12 border-solid"></div>
//             <p className="text-blue-500 ml-4">Connecting to the meeting...</p>
//           </div>
//         )}

//         <div className="mt-4">
//           {/* Always render video elements to ensure refs are assigned */}
//           <video ref={localVideoRef} autoPlay muted style={{ width: '400px' }} />
//           <video ref={remoteVideoRef} autoPlay style={{ width: '400px' }} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Participant;
