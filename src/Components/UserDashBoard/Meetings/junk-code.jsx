    // const [host,setHost] = useState(false)
  // const [participant,setParticipant] = useState(false)

 
  // const uid = Math.floor(Math.random() * 1000000); // Random UID for the session
   
   
   {/* <button onClick={()=>setHost(true)}>
          host
        </button>
        {host &&
  <Videos appId={appId} channelName={channelName} uid = {uid} />
        }
           <button onClick={()=>setParticipant(true)}>
          participant
        </button>{
          participant &&
<Participant appId={appId} channelName={channelName} uid = {uid} /> } */}


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
























// import React,{useState,useRef} from 'react';
// // import { ReactComponent as HangupIcon } from "./icons/hangup.svg";
// // import { ReactComponent as MoreIcon } from "./icons/more-vertical.svg";
// // import { ReactComponent as CopyIcon } from "./icons/copy.svg";
// import { doc, collection, getDocs, setDoc,deleteDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
// import { db } from '../../../Config/firebase';



// const servers = {
//     iceServers: [
//         {
//                 urls: 'turn:festermeetup.ddns.net:3478',
//                 username: 'Yasir-Khan',
//                 credential: '033690'
            
//         },
//     ],
//     iceCandidatePoolSize: 10,
//   };
  
//   const pc = new RTCPeerConnection(servers);

// function Videos({ mode, callId, setPage }) {
//     const [webcamActive, setWebcamActive] = useState(false);
//     const [roomId, setRoomId] = useState(callId);

//     const localRef = useRef();
//     const remoteRef = useRef();

//     const setupSources = async () => {
//             const localStream = await navigator.mediaDevices.getUserMedia({
//                 video: true,
//                 audio: true,
//             });
//             // rest of the code...
       
//         const remoteStream = new MediaStream();

//         localStream.getTracks().forEach((track) => {
//             pc.addTrack(track, localStream);
//         });

//         pc.ontrack = (event) => {
//             event.streams[0].getTracks().forEach((track) => {
//                 remoteStream.addTrack(track);
//             });
//         };

//         localRef.current.srcObject = localStream;
//         remoteRef.current.srcObject = remoteStream;

//         setWebcamActive(true);

//         if (mode === "create") {
//             const callDoc = doc(collection(db, "calls")); // Create a new document in 'calls' collection
//             const offerCandidates = collection(callDoc, "offerCandidates");
//             const answerCandidates = collection(callDoc, "answerCandidates");
//             setRoomId(callDoc.id);

//             pc.onicecandidate = (event) => {
//                 event.candidate &&
//                    setDoc(doc(offerCandidates), event.candidate.toJSON());

//             };

//             const offerDescription = await pc.createOffer();
//             await pc.setLocalDescription(offerDescription);

//             const offer = {
//                 sdp: offerDescription.sdp,
//                 type: offerDescription.type,
//             };

//             await setDoc(callDoc, { offer });


//             onSnapshot(callDoc,(snapshot) => {
//                 const data = snapshot.data();
//                 if (!pc.currentRemoteDescription && data?.answer) {
//                     const answerDescription = new RTCSessionDescription(
//                         data.answer
//                     );
//                     pc.setRemoteDescription(answerDescription);
//                 }
//             });
            

//             onSnapshot(answerCandidates,(snapshot) => {
//                 snapshot.docChanges().forEach((change) => {
//                     if (change.type === "added") {
//                         const candidate = new RTCIceCandidate(
//                             change.doc.data()
//                         );
//                         pc.addIceCandidate(candidate);
//                     }
//                 });
//             });
//         } else if (mode === "join") {
//             const callDoc = doc(db, "calls", callId); // Reference the specific document by callId
//             const offerCandidates = collection(callDoc, "offerCandidates");
//             const answerCandidates = collection(callDoc, "answerCandidates");
        
//             // Get the call document data
//             const callSnapshot = await getDoc(callDoc);
//             if (!callSnapshot.exists()) {
//                 console.error("Call document does not exist!");
//                 alert("The call you are trying to join does not exist.");
//                 return;
//             }
        
//             const callData = callSnapshot.data();
//             if (!callData?.offer) {
//                 console.error("No offer found in the call document!");
//                 alert("This call does not have a valid offer to join.");
//                 return;
//             }
        
//             // Set remote description using the offer from the call document
//             const offerDescription = callData.offer;
//             await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
        
//             // Create and set the local answer
//             const answerDescription = await pc.createAnswer();
//             await pc.setLocalDescription(answerDescription);
        
//             // Update the call document with the answer
//             await updateDoc(callDoc, {
//                 answer: {
//                     type: answerDescription.type,
//                     sdp: answerDescription.sdp,
//                 },
//             });
        
//             // Add ICE candidates to the answerCandidates collection
//             pc.onicecandidate = async (event) => {
//                 if (event.candidate) {
//                     await setDoc(doc(answerCandidates), event.candidate.toJSON());
//                 }
//             };
        
//             // Listen for new ICE candidates in the offerCandidates collection
//             onSnapshot(offerCandidates, (snapshot) => {
//                 snapshot.docChanges().forEach((change) => {
//                     if (change.type === "added") {
//                         const candidate = new RTCIceCandidate(change.doc.data());
//                         pc.addIceCandidate(candidate);
//                     }
//                 });
//             });
//         }
        
//         pc.onconnectionstatechange = (event) => {
//             if (pc.connectionState === "disconnected") {
//                 hangUp();
//             }
//         };
//     };

//     const hangUp = async () => {
//         pc.close();
    
//         if (roomId) {
//             const roomRef = doc(db, 'calls', roomId); // Corrected roomRef initialization
//             const offerCandidates = collection(roomRef, "offerCandidates");
//             const answerCandidates = collection(roomRef, "answerCandidates");
    
//             // Delete offer candidates
//             const offerSnapshot = await getDocs(offerCandidates);
//             offerSnapshot.forEach(async (doc) => {
//                 await deleteDoc(doc.ref);
//             });
    
//             // Delete answer candidates
//             const answerSnapshot = await getDocs(answerCandidates);
//             answerSnapshot.forEach(async (doc) => {
//                 await deleteDoc(doc.ref);
//             });
    
//             // Delete the room document itself
//             await deleteDoc(roomRef);
//         }
    
//         window.location.reload();
//     };
    

//     return (
//         <div className="videos">
//             <video
//                 ref={localRef}
//                 autoPlay
//                 playsInline
//                 className="local"
//                 muted
//             />
//             <video ref={remoteRef} autoPlay playsInline className="remote" />

//             <div className="buttonsContainer">
//                 <button
//                     onClick={hangUp}
//                     disabled={!webcamActive}
//                     className="hangup button"
//                 >
//                     {/* <HangupIcon /> */}
//                     hangup
//                 </button>
//                 <div tabIndex={0} role="button" className="more button">
//                     {/* <MoreIcon /> */}
//                     <div className="popover">
//                         <button
//                             onClick={() => {
//                                 navigator.clipboard.writeText(roomId);
//                             }}
//                         >
//                             Copy joining code
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {!webcamActive && (
//                 <div className="modalContainer">
//                     <div className="modal">
//                         <h3>
//                             Turn on your camera and microphone and start the
//                             call
//                         </h3>
//                         <div className="container">
//                             <button
//                                 onClick={() => setPage("home")}
//                                 className="secondary"
//                             >
//                                 Cancel
//                             </button>
//                             <button onClick={setupSources}>Start</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
// export default Videos;