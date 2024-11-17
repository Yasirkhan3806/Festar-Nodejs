import React,{useState,useRef} from 'react';
// import { ReactComponent as HangupIcon } from "./icons/hangup.svg";
// import { ReactComponent as MoreIcon } from "./icons/more-vertical.svg";
// import { ReactComponent as CopyIcon } from "./icons/copy.svg";
import { doc, collection, getDocs, setDoc,deleteDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from '../../../Config/firebase';



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

function Videos({ mode, callId, setPage }) {
    const [webcamActive, setWebcamActive] = useState(false);
    const [roomId, setRoomId] = useState(callId);

    const localRef = useRef();
    const remoteRef = useRef();

    const setupSources = async () => {
            const localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            // rest of the code...
       
        const remoteStream = new MediaStream();

        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
        };

        localRef.current.srcObject = localStream;
        remoteRef.current.srcObject = remoteStream;

        setWebcamActive(true);

        if (mode === "create") {
            const callDoc = doc(collection(db, "calls")); // Create a new document in 'calls' collection
            const offerCandidates = collection(callDoc, "offerCandidates");
            const answerCandidates = collection(callDoc, "answerCandidates");
            setRoomId(callDoc.id);

            pc.onicecandidate = (event) => {
                event.candidate &&
                   setDoc(doc(offerCandidates), event.candidate.toJSON());

            };

            const offerDescription = await pc.createOffer();
            await pc.setLocalDescription(offerDescription);

            const offer = {
                sdp: offerDescription.sdp,
                type: offerDescription.type,
            };

            await setDoc(callDoc, { offer });


            onSnapshot(callDoc,(snapshot) => {
                const data = snapshot.data();
                if (!pc.currentRemoteDescription && data?.answer) {
                    const answerDescription = new RTCSessionDescription(
                        data.answer
                    );
                    pc.setRemoteDescription(answerDescription);
                }
            });
            

            onSnapshot(answerCandidates,(snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        const candidate = new RTCIceCandidate(
                            change.doc.data()
                        );
                        pc.addIceCandidate(candidate);
                    }
                });
            });
        } else if (mode === "join") {
            const callDoc = doc(db, "calls", callId); // Reference the specific document by callId
            const offerCandidates = collection(callDoc, "offerCandidates");
            const answerCandidates = collection(callDoc, "answerCandidates");
        
            // Get the call document data
            const callSnapshot = await getDoc(callDoc);
            if (!callSnapshot.exists()) {
                console.error("Call document does not exist!");
                alert("The call you are trying to join does not exist.");
                return;
            }
        
            const callData = callSnapshot.data();
            if (!callData?.offer) {
                console.error("No offer found in the call document!");
                alert("This call does not have a valid offer to join.");
                return;
            }
        
            // Set remote description using the offer from the call document
            const offerDescription = callData.offer;
            await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
        
            // Create and set the local answer
            const answerDescription = await pc.createAnswer();
            await pc.setLocalDescription(answerDescription);
        
            // Update the call document with the answer
            await updateDoc(callDoc, {
                answer: {
                    type: answerDescription.type,
                    sdp: answerDescription.sdp,
                },
            });
        
            // Add ICE candidates to the answerCandidates collection
            pc.onicecandidate = async (event) => {
                if (event.candidate) {
                    await setDoc(doc(answerCandidates), event.candidate.toJSON());
                }
            };
        
            // Listen for new ICE candidates in the offerCandidates collection
            onSnapshot(offerCandidates, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        const candidate = new RTCIceCandidate(change.doc.data());
                        pc.addIceCandidate(candidate);
                    }
                });
            });
        }
        
        pc.onconnectionstatechange = (event) => {
            if (pc.connectionState === "disconnected") {
                hangUp();
            }
        };
    };

    const hangUp = async () => {
        pc.close();
    
        if (roomId) {
            const roomRef = doc(db, 'calls', roomId); // Corrected roomRef initialization
            const offerCandidates = collection(roomRef, "offerCandidates");
            const answerCandidates = collection(roomRef, "answerCandidates");
    
            // Delete offer candidates
            const offerSnapshot = await getDocs(offerCandidates);
            offerSnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
    
            // Delete answer candidates
            const answerSnapshot = await getDocs(answerCandidates);
            answerSnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
    
            // Delete the room document itself
            await deleteDoc(roomRef);
        }
    
        window.location.reload();
    };
    

    return (
        <div className="videos">
            <video
                ref={localRef}
                autoPlay
                playsInline
                className="local"
                muted
            />
            <video ref={remoteRef} autoPlay playsInline className="remote" />

            <div className="buttonsContainer">
                <button
                    onClick={hangUp}
                    disabled={!webcamActive}
                    className="hangup button"
                >
                    {/* <HangupIcon /> */}
                    hangup
                </button>
                <div tabIndex={0} role="button" className="more button">
                    {/* <MoreIcon /> */}
                    <div className="popover">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(roomId);
                            }}
                        >
                            Copy joining code
                        </button>
                    </div>
                </div>
            </div>

            {!webcamActive && (
                <div className="modalContainer">
                    <div className="modal">
                        <h3>
                            Turn on your camera and microphone and start the
                            call
                        </h3>
                        <div className="container">
                            <button
                                onClick={() => setPage("home")}
                                className="secondary"
                            >
                                Cancel
                            </button>
                            <button onClick={setupSources}>Start</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Videos;