import React from "react";
import MeetingOpt from "./MeetingOpt";
import MeetingsHistory from "../meetings-History/MeetingsHistory.jsx";

export default function Mettings() {
 return(
  <>
  <div className="flex flex-col gap-2">
    <div className="h-2/4 flex justify-center items-center"><MeetingOpt/></div>
    <div className="h-2/4">
    <MeetingsHistory/>
    </div>
  </div>
  
  </>
  );
}


