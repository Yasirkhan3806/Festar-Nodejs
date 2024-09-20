import React, { useEffect } from "react";
import { auth } from "../../Config/firebase";
import { signOut } from "firebase/auth";

function UserProfile() {
  const currentUser = auth.currentUser;
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      console.log("User Email:", user.email);
      console.log("User Display Name:", user.displayName);
    }
  }, []);
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };
}
console.log(currentUser);

export default function MainDashboard() {
  return (
    <>
      <h1>Hellow World</h1>
      <button onClick={logout}></button>
    </>
  );
}
