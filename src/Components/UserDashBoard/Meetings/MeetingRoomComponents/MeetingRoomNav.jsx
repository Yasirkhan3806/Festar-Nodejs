import React, { useState, useEffect } from "react";
import MNUP from "./MeetingNavUserPics";
import videoCallIcon from "../../icons/videoCallIcon.png";
import { useMeetingData } from "../../../../userContext";
import userIcon from "../../icons/hostIcon.png";
import copyLinkIcon from "../../icons/copyLinkIcon.png";
import menuIcon from "../../icons/menuIcon.png"; // Add an icon for the hamburger menu
import closeIcon from "../../icons/crossIcon.png"; // Add an icon for closing the menu

export default function MeetingRoomNav({setUID}) {
  const { setUniqueIdFilter, userMeetingData } = useMeetingData();
  const [showPopup, setShowPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for opening/closing the menu

  useEffect(() => {
    const storedUniqueId = localStorage.getItem("uniqueId");

    if (storedUniqueId) {
      setUniqueIdFilter(storedUniqueId);
    } else {
      console.error("No uniqueId found in localStorage");
    }
  }, [setUniqueIdFilter]);

  const [meetingNames, setMeetingNames] = useState([]);
  const [meetingDates, setMeetingDates] = useState([]);
  const [meetingTimes, setMeetingTimes] = useState([]);
  const [uid, setUid] = useState([]);

  useEffect(() => {
    if (userMeetingData && userMeetingData.length > 0) {
      const names = userMeetingData.map((meeting) => meeting.meetingName);
      const dates = userMeetingData.map((meeting) => meeting.meetingDate);
      const times = userMeetingData.map((meeting) => meeting.meetingTime);
      const uid = userMeetingData.map((meeting) => meeting.uniqueId);

      setMeetingNames(names);
      setMeetingDates(dates);
      setMeetingTimes(times);
      setUid(uid);
      setUID(uid)
    }
  }, [userMeetingData]);
console.log(uid)
  let hostName = "";
  if (uid && uid.length > 0) {
    const uidParts = uid[0].split("-");
    hostName = uidParts[0];
  }


  const handleCopy = () => {
    if (uid && uid.length > 0) {
      navigator.clipboard.writeText(uid[0]);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <>
      <div className="flex bg-blue-400 gap-4 md:gap-6 relative p-4 md:p-2">
        {/* Hamburger Menu Icon */}
        <button
          className="block md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img
            src={menuOpen ? closeIcon : menuIcon}
            alt="Menu Icon"
            className="h-6 w-6"
          />
        </button>

        {/* Sidebar Menu */}
        {menuOpen && (
          <div className="absolute pl-[2%] top-0 left-0 h-full w-2/3 bg-blue-500 shadow-lg z-50 flex flex-col items-start p-6 gap-4 md:hidden">
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end mb-4"
            >
              <img src={closeIcon} alt="Close Menu" className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold">Menu</h2>
            <a href="#details" className="text-blue-400">
              Meeting Details
            </a>
            <a href="#participants" className="text-blue-400">
              Participants
            </a>
            <a href="#settings" className="text-blue-400">
              Settings
            </a>
            <a href="#help" className="text-blue-400">
              Help
            </a>
          </div>
        )}

        {/* Main Meeting Room Navigation */}
        <div className="hidden md:flex justify-center items-center w-[11%] pr-[0.3rem] md:pr-0 md:w-[8%] border-r-2 border-white">
          <img className = "hidden md:block" src={videoCallIcon} alt="" />
        </div>
        <div className=" p-2 md:p-4 text-white w-[47%] md:w-[37%] ">
          <h2 className="font-bold text-lg md:text-2xl">{meetingNames[0]}</h2>
          <p className="text-xs">
            {meetingDates[0]} | {meetingTimes[0]}
          </p>
        </div>
        <span className="p-4 hidden md:block">
          <MNUP uid = {uid} /> {/*passing uid as a meetingId*/}
        </span>
        <button
          className="flex justify-center items-center text-white gap-1 w-1/2 md:w-[12%] bg-blue-300 rounded-3xl h-[50px] mt-4"
          onClick={handleCopy}
        >
          <img src={copyLinkIcon} alt="Copy Icon" /> | <strong className="text-sm">Joining Link</strong>
        </button>
        <div className="hidden md:flex w-[20%] h-[50px] mt-4 bg-blue-300 gap-2 rounded-3xl pl-6 items-center">
          <img className="h-[40px]" src={userIcon} alt="" />
          <span className="flex flex-col text-white">
            <p className="text-lg font-semibold">{hostName}</p>
            <p className="text-sm pl-3">Host</p>
          </span>
        </div>

        {/* Popup for "Link copied" */}
        {showPopup && (
          <div className="absolute top-16 right-4 bg-black text-white text-sm px-4 py-2 rounded shadow-lg animate-fade-in-out">
            Link copied!
          </div>
        )}
      </div>
    </>
  );
}
