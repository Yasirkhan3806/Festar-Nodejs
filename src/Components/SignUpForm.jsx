import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../Config/firebase";
import { useTheme } from "../ThemeContext";
import { signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  doc, getDoc, setDoc } from "firebase/firestore";

import google from "../assets/icons/google.svg";
export default function SignUpForm({ setSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const settingUserData = async (userId) => {
    try {
      const userDocRef = doc(db, "userData", userId);
      await setDoc(userDocRef, {
        email,
        userName: userName || "Guest",
        userId
      });
      console.log("User data set successfully!");
      return true;
    } catch (e) {
      console.error("Cannot set data:", e);
      return false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
  
      // Set user data in Firestore
      const success = await settingUserData(userId);
      if (success) {
        console.log("User created and data stored successfully!");
        navigate("/Dashboard");
      } else {
        console.error("Failed to store user data.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };


    const handleGoogleSignIn = async () => {
            try {
              const result = await signInWithPopup(auth, googleProvider);
              const userId = result.user.uid;
        
              // Check if user document exists in Firestore, create if not
              const userDocRef = doc(db, "userData", userId);
              const userDoc = await getDoc(userDocRef);
              if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                  userId,
                  email: result.user.email,
                  userName: result.user.displayName || "",
                  profilePicture:result.user.photoURL,
                });
                console.log("User document created:", result.user.displayName);
              } else {
                console.log("User already exists:", userDoc.data());
              }
              navigate("/Dashboard"); // Redirect after Google sign-in
            } catch (error) {
              console.error("Error during Google sign-in:", error);
            }
          };

  return (
      <div
        id="sign-up"
        className={`w-[82%] h-[72%] [@media(min-width:535px)]:w-[31rem] md:w-[31rem] lg:w-[32rem] lg:h-[31rem]  ${
          darkMode ? "dark-mode" : "bg-white"
        } flex flex-col justify-center  p-4 md:p-8 rounded-lg shadow-lg border-2 border-white`}
      >
        <h1 className="text-4xl font-bold mb-2 text-blue-800">Festar</h1>
        <h2 className="text-2xl font-semibold mb-2">Create an Account</h2>
        <button
          className={` ${darkMode ? "dark-mode" : "bg-gray-200"} text-black border-2 border-gray-200 rounded-lg py-2 px-4 w-full mb-4 flex items-center justify-center`}
          onClick={handleGoogleSignIn}
        >
          <img src={google} alt="Google" className="w-6 h-6 mr-2" />
          Sign up with Google
        </button>
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className={`border-2 border-gray-300 rounded-lg w-full py-2 px-4 mb-4 ${darkMode?"dark-mode":""}`}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className={`border-2 border-gray-300 rounded-lg w-full py-2 px-4 mb-4 ${darkMode?"dark-mode":""}`}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Your Password"
            className={`border-2 border-gray-300 rounded-lg w-full py-2 px-4 mb-4 ${darkMode?"dark-mode":""}`}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <span>Keep me logged in</span>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-white text-white hover:text-blue-500 font-semibold rounded-lg py-2 px-4 w-full transition duration-500"
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </form>
        <p className="text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => setSignUp(false)}
            className="text-blue-600 font-semibold"
          >
            Log in
          </button>
        </p>
      </div>
  );
}
