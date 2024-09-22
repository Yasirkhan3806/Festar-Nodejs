import React, { useEffect, useState } from "react";
import { auth } from "../../Config/firebase";
import { signOut } from "firebase/auth";

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
      <h1>Hello {user}</h1>
    </>
  );
}
