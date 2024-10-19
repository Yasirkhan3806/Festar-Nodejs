import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import teamMember from "../assets/Pictures/L-companion.avif";
import google from "../assets/icons/google.svg";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  getRedirectResult,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../Config/firebase";
import { db } from "../Config/firebase";
import { collection, addDoc, doc, getDoc,setDoc } from "firebase/firestore";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const userCollectionRef = collection(db, "userData");
  const navigate = useNavigate();

 useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          // User logged in via redirect
          const userId = result.user.uid;
          await fetchUserData(userId); // Fetch user data
          navigate("/Dashboard"); // Navigate after fetching user data
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRedirectResult();
  }, [navigate]); 

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userId = userCredential.user.uid;

      // Create a document for the user in Firestore
      await addDoc(userCollectionRef, {
        userId: userId,
        email: userCredential.user.email,
        userName: userName,
      });

      // console.log("User created successfully:", user.displayName);
      navigate("/Dashboard"); // Redirect after successful sign-up
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userId = result.user.uid;
  
      // Reference to the user's document in Firestore
      const userDocRef = doc(db, "userData", userId);
      
      // Check if the document already exists
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        // If it doesn't exist, create a new document
        await setDoc(userDocRef, {
          userId: userId,
          email: result.user.email,
          userName: result.user.displayName || "", // You can update this field accordingly
        });
        console.log("User created successfully:", result.user.displayName);
      } else {
        console.log("User already exists:", userDoc.data());
      }
  
      // Fetch user data
      await fetchUserData(userId);
  
      navigate("/Dashboard"); // Redirect after successful Google sign-in
    } catch (error) {
      console.error("Error with Google sign-in:", error);
    }
  };
  
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
  
      // Reference to the user's document in Firestore
      const userDocRef = doc(db, "userData", userId);
      
      // Check if the document already exists
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // If the document doesn't exist, create it
        await setDoc(userDocRef, {
          userId: userId,
          email: userCredential.user.email,
          userName: userCredential.user.displayName || "", // You can update this field accordingly
        });
        console.log("User document created for:", userCredential.user.displayName);
      } else {
        console.log("User already exists:", userDoc.data());
      }
  
      await fetchUserData(userId); // Fetch user data after signing in
      navigate("/Dashboard"); // Redirect after successful sign-in
    } catch (error) {
      console.error("Error during email sign-in:", error);
    }
  };
  
  // Animation handlers for sliding
  const slidingLeft = () => {
    document.getElementById("Login-Picture").classList.add("L-animation-left");
    document.getElementById("sign-up").classList.remove("hidden");
  };

  const slidingRight = () => {
    document
      .getElementById("Login-Picture")
      .classList.remove("L-animation-left");
    setTimeout(function () {
      document.getElementById("sign-up").classList.add("hidden");
    }, 1500);
    document.getElementById("L-m-cont").classList.add("L-D-animation");
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* Left Side */}
        <div className="w-1/2 bg-blue-500 flex flex-col justify-center px-16 py-12"></div>
        <div
          id="Login-Picture"
          className="w-[514px] h-[506px] z-[2] rounded-r-lg bg-blue-500  L-animation "
        >
          <img
            src={teamMember}
            alt="Illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div
          id="L-m-cont"
          className="flex absolute top-20 left-[10.6rem]  bg-white rounded-lg shadow-slate-600 shadow-xl L-D-animation"
        >
          {/* left side */}
          <div className="w-2/4 flex flex-col justify-center items-center L-F-animation">
            <div className="max-w-sm mx-auto">
              {/* Logo */}
              <h1 className="text-4xl font-bold text-blue-700 mb-6">Fester</h1>

              {/* Welcome Text */}
              <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>

              {/* Google Login Button */}
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

              {/* Email and Password Inputs */}
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

              {/* Sign Up Link */}
              <p className="text-sm text-center mt-4">
                Don't have an account?{" "}
                <button onClick={slidingLeft} className="text-blue-600">
                  Sign up
                </button>
              </p>
            </div>
          </div>

          {/* Right Side - Sign up */}
          <div
            id="sign-up"
            className="w-2/4 bg-white flex flex-col justify-center items-center p-16 hidden"
          >
            <h1 className="text-4xl font-bold mb-2 text-blue-800">Fester</h1>
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
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your Name"
                className="border-2 border-gray-300 rounded-lg w-full py-2 px-4 mb-4"
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
    </>
  );
}
