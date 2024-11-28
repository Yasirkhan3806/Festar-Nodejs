// Import necessary modules and dependencies
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../Config/firebase";
import useWindowSize from "./UserDashBoard/WindowSize";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  getRedirectResult,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

// Import assets
import teamMember from "../assets/Pictures/L-companion.avif";
import google from "../assets/icons/google.svg";

export default function LoginForm() {
  // State variables to manage form inputs and user data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const userCollectionRef = collection(db, "userData");

  // Navigation hook
  const navigate = useNavigate();

  // Effect to handle redirect sign-in results (e.g., from Google)
  useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const userId = result.user.uid;
          await fetchUserData(userId); // Retrieve user data after login
          navigate("/Dashboard"); // Redirect to Dashboard
        }
      } catch (error) {
        console.error("Error fetching redirect result:", error);
      }
    };
    fetchRedirectResult();
  }, [navigate]);

  // Fetch user data from Firestore
  const fetchUserData = async (userId) => {
    const userDocRef = doc(db, "userData", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setUserName(userData.userName || "Guest");
      console.log("User data fetched:", userData);
    } else {
      console.log("No user data found for this user ID.");
    }
  };

  // Handle sign-up with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Create new user document in Firestore
      await addDoc(userCollectionRef, {
        userId,
        email: userCredential.user.email,
        userName,
      });

      navigate("/Dashboard"); // Redirect after successful sign-up
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  // Handle Google sign-in (popup)
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

      await fetchUserData(userId); // Fetch user data
      navigate("/Dashboard"); // Redirect after Google sign-in
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  // Handle sign-in with email and password
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Check if user document exists, create if not
      const userDocRef = doc(db, "userData", userId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          userId,
          email: userCredential.user.email,
          userName: userCredential.user.displayName || "",
        });
        console.log(
          "User document created for:",
          userCredential.user.displayName
        );
      } else {
        console.log("User already exists:", userDoc.data());
      }

      await fetchUserData(userId); // Fetch user data
      navigate("/Dashboard"); // Redirect after successful sign-in
    } catch (error) {
      console.error("Error during email sign-in:", error);
    }
  };

  const [width] = useWindowSize();

  // Other existing code...

  // Handle the animation for sliding left (Login to Sign-Up)
  const slidingLeft = () => {
    if (width < 768) {
      // For mobile: Show a different transition (like sliding up/down)
      document.getElementById("Login-Picture").classList.add("L-animation-left");
      setTimeout(() => {
        document.getElementById("sign-up").classList.remove("hidden");
        document.getElementById("login-form").classList.add("hidden");
      }, 1000);
    } else {
      // For larger screens (tablet/desktop): Use the original sliding effect
      document.getElementById("Login-Picture").classList.add("L-animation-left");
      setTimeout(() => {
        document.getElementById("sign-up").classList.remove("hidden");
        // document.getElementById("login-form").classList.add("hidden");
      }, 1500);
    }
  };

  // Handle the animation for sliding right (Sign-Up to Login)
  const slidingRight = () => {
    if (width < 768) {
      // For mobile: Show a different transition (like sliding down/up)
      document.getElementById("Login-Picture").classList.remove("L-animation-left");
      setTimeout(() => {
        document.getElementById("sign-up").classList.add("hidden");
        document.getElementById("login-form").classList.remove("hidden");
      }, 600);
      document.getElementById("L-m-cont").classList.add("L-D-animation");
    } else {
      // For larger screens: Use the original sliding effect
      document.getElementById("Login-Picture").classList.remove("L-animation-left");
      setTimeout(() => {
        document.getElementById("sign-up").classList.add("hidden");
        document.getElementById("login-form").classList.remove("hidden");
      }, 600);
      document.getElementById("L-m-cont").classList.add("L-D-animation");
    }
  };
  return (
    <div className="flex min-h-screen">
      {/* Left Side Image and Background */}
      <div className="w-1/2 bg-blue-500 flex flex-col justify-center px-16 py-12"></div>
      <div
        id="Login-Picture"
        className="w-[354px] md:w-[514px] h-[506px] z-[2] rounded-r-lg bg-blue-500 L-animation"
      >
        <img
          src={teamMember}
          alt="Illustration"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Main Container for Login and Sign-up forms */}
      <div
        id="L-m-cont"
        className="flex absolute top-20 md:left-[10.6rem] bg-white rounded-lg shadow-slate-600 shadow-xl L-D-animation"
      >
        {/* Left side - Login Form */}
        <div className="p-2 md:w-2/4 lg:w-2/4 flex flex-col justify-center items-center L-F-animation" id="login-form">
          <div className="max-w-sm mx-auto">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">Festar</h1>
            <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>

            {/* Google Sign-In Button */}
            <button
              className="w-full py-2 bg-gray-200 rounded-md text-sm font-medium mb-4"
              onClick={handleGoogleSignIn}
            >
              <img
                src={google}
                alt="Google Logo"
                className="inline-block h-6 mr-2"
              />
              Log in with Google
            </button>

            {/* Divider */}
            <div className="flex items-center mb-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-sm text-gray-500">
                or log in with email
              </span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            {/* Email and Password Login */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full py-2 px-4 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Your Password"
                className="w-full py-2 px-4 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2">Keep me logged in</span>
                </label>
                <a href="#" className="text-blue-600">
                  Forgot password?
                </a>
              </div>
              <button
                onClick={handleEmailSignIn}
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-white text-white hover:text-blue-500 transition duration-500 rounded-md font-semibold"
              >
                Log in
              </button>
            </form>

            {/* Sign-Up Link */}
            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <button onClick={slidingLeft} className="text-blue-600">
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Right side - Sign-up Form */}
        <div
          id="sign-up"
          className="w-full md:w-2/4 bg-white flex flex-col justify-center items-center p-4 md:p-8 hidden md:block lg:block"
        >
          <h1 className="text-4xl font-bold mb-2 text-blue-800">Festar</h1>
          <h2 className="text-2xl font-semibold mb-2">Create an Account</h2>
          <button
            className="bg-gray-100 text-black border-2 border-gray-200 rounded-lg py-2 px-4 w-full mb-4 flex items-center justify-center"
            onClick={handleGoogleSignIn}
          >
            <img src={google} alt="Google" className="w-6 h-6 mr-2" />
            Sign up with Google
          </button>
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              className="border-2 border-gray-300 rounded-lg w-full py-2 px-4 mb-4"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border-2 border-gray-300 rounded-lg w-full py-2 px-4 mb-4"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Your Password"
              className="border-2 border-gray-300 rounded-lg w-full py-2 px-4 mb-4"
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
            >
              Sign up
            </button>
          </form>
          <p className="text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              onClick={slidingRight}
              className="text-blue-600 font-semibold"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
