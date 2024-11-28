import React from "react";

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
  const userAvatars = [
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <AvatarGroup avatars={userAvatars} extraCount={userAvatars.length - 4} />
    </div>
  );
}
