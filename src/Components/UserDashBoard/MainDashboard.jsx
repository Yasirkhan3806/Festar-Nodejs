import React, { useEffect, useState } from "react";
import { auth } from "../../Config/firebase";
import DashNav from "./DashNav";
import DashSide from "./DashSide";
import Calendar from "./Calender";

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

  return (
    <>
      <UserProfile setUser={setUser} />
      <div className="flex">
        <div className="w-[15%] h-[100%]">
<DashSide/>
        </div>
        <div className="flex flex-col w-full">
      <DashNav userEmail = {user}/>
      <Calendar/>
      </div>
      </div>
    </>
  );
}
