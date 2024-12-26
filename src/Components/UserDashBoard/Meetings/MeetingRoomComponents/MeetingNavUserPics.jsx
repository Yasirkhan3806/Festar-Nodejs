import React,{useEffect} from "react";
import { useParticipantActiveData } from '../../../../userContext';

const AvatarGroup = ({ avatars, extraCount }) => {
  
  return (
    <div className="flex items-center space-x-[-12px]">
      {avatars.slice(0, 4).map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`User ${index + 1}`}
          className="w-12 h-12 rounded-full border-2 border-white"
        />
      ))}
      {extraCount > 0 && (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-200 text-blue-600 font-bold border-2 border-white">
          +{extraCount}
        </div>
      )}
    </div>
  );
};

// Example Usage
export default function MNUP() {
  const {participantActive,setMeetingId} = useParticipantActiveData();
  
  useEffect(() => {
    setMeetingId(localStorage.getItem('uniqueId'));
    // console.log("participants array",participantActive)
  }, []);
  const userAvatars = participantActive.map((item) => item.Picture);

  return (
    <div className="flex ">
      <AvatarGroup avatars={userAvatars} extraCount={userAvatars.length - 4} />
    </div>
  );
}
