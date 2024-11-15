import React, { useEffect, useState } from "react";
import { auth } from "../../Config/firebase";
import DashNav from "./DashNav";
import DashSide from "./DashSide";
import RegEventsOption from "./RegisterEvents/RegEventsOption";
import Meetings from "./Meetings/MainMeetings";
import Goals from "./Goals";
import Chats from "./Chats/Chats";
import Events from "../UserDashBoard/RegisterEvents/EventsComing/Events";
import CallsHistory from "./CallsHistory";
import NotificationsMain from "./NotificationsMain";
import Settings from "./settings/Settings";

function UserProfile({ setUser }) {
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      console.log("User Email:", user.email);
      console.log("User Display Name:", user.displayName);
      setUser(user.email || "User"); // Set the user name or default to "User"
    }
  }, [setUser]);

  return null; // Or you can return some loading indicator if needed
}

export default function MainDashboard() {
  const [user, setUser] = useState("Guest");
  const [activeItem, setActiveItem] = useState("RegisterEvents"); // Track the active item

  // Function to render content based on active item
  const renderContent = () => {
    switch (activeItem) {
      case "Meetings":
        return <Meetings />;
      case "Goals":
        return <Goals />;
      case "Chats":
        return <Chats />;
      case "Calls":
        return <CallsHistory />;
      case "RegisterEvents":
        return <RegEventsOption />;
      case "Notifications":
        return <NotificationsMain />;
      case "Settings":
        return <Settings />;
      default:
        return <RegEventsOption />;
    }
  };

  return (
    <>
      <UserProfile setUser={setUser} />
      <div className="flex overflow-hidden">
        <div className="w-[25%] h-[100%] z-10">
          <DashSide activeItem={activeItem}  setActiveItem={setActiveItem} />
        </div>
        
        <div className="flex flex-col w-full overflow-hidden">
          <DashNav userEmail={user} />
          <div className="w-full">
          {renderContent()}
            {/* <div className="w-[50%]">
          <Calendar />
          </div>
          <div className="w-[50%] pr-6" >
        <Notification
          message={'You have a new event scheduled!'}
          type={"info"}
          // onClose={handleShowNotification}
        /> */}
        {/* </div> */}
        </div>
      
        </div>
      </div>
    </>
  );
}
