import React from "react";

export default function VideoSettingBar({
  inCall,
  setStartCall,
  handleEndCall,
  setAudioOn,
  setVideoOn,
  audioOn,
  videoOn
}) {
  return (
    <>
      <div className=" flex border-2 border-blue-500 gap-4">
        <button onClick={() =>{ videoOn?setVideoOn(false):setVideoOn(true)}}>
            {videoOn?"videoOn":"videoOff"}
        </button>
        <button onClick={() =>{ audioOn?setAudioOn(false):setAudioOn(true)}}>
            {audioOn?"audioOn":"audioOff"}
        </button>
        {!inCall ? (
          <button
            onClick={() => setStartCall(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Start Video Call
          </button>
        ) : (
          <button
            onClick={handleEndCall}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            End Call
          </button>
        )}
      </div>
    </>
  );
}
