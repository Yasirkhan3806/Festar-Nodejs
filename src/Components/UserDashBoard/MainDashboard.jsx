import React, { useEffect, useState } from "react";
import DashNav from "./DashNav";
import DashSide from "./DashSide";
import RegEventsOption from "./RegisterEvents/RegEventsOption";
import Meetings from "./Meetings/MainMeetings";
import Chats from "./Chats/Chats";


export default function MainDashboard() {
  const [user, setUser] = useState("Guest");
  const [activeItem, setActiveItem] = useState("RegisterEvents"); // Track the active item

  // Function to render content based on active item
  const renderContent = () => {
    switch (activeItem) {
      case "Meetings":
        return <Meetings />;
      case "Chats":
        return <Chats />;
      case "RegisterEvents":
        return <RegEventsOption />;
      default:
        return <RegEventsOption />;
    }
  };

  return (
    <>
      {/* <UserProfile setUser={setUser} /> */}
      <div className="flex overflow-hidden">
        <div className="w-0 md:w-[5%] lg:w-[5%] h-[100%] z-10">
          <DashSide activeItem={activeItem}  setActiveItem={setActiveItem} />
        </div>
        
        <div className="flex flex-col w-full overflow-hidden">
        {activeItem !== "Chats" && <DashNav userEmail={user} />}

          <div className="w-full">
          {renderContent()}
        </div>
      
        </div>
      </div>
    </>
  );
}
