import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../APIContext";
import axios from "axios";
import { auth, googleProvider, db } from "../Config/firebase";
import { useTheme } from "../ThemeContext";
import {
  signInWithPopup,
  getRedirectResult,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import google from "../assets/icons/google.svg";

export default function LoginForm1({ setSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const navigate = useNavigate();
  const api = useApi();
  const login = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear any previous error messages
  
    try {
      const response = await api.post(
        "/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      console.log("Login response:", response); // Log the response for debugging
  
      if (response.status === 200) {
        navigate("/Dashboard"); // Navigate to the Dashboard on success
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx (e.g., 400, 401, 500, etc.)
        console.error("Login failed:", error.response.data); // Log the error response data
  
        // Set an error message based on the status code or response data
        if (error.response.status === 400) {
          setError("Incorrect Credientials, Try Again");
        } else if (error.response.status === 401) {
          setError("Invalid email or password. Please try again.");
        } else if (error.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        setError("No response from the server. Please check your connection.");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error setting up the request:", error.message);
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };
  



  // Effect to handle redirect sign-in results (e.g., from Google)
  // useEffect(() => {
  //   const fetchRedirectResult = async () => {
  //     try {
  //       const result = await getRedirectResult(auth);
  //       if (result?.user) {
  //         const userId = result.user.uid;
  //         await fetchUserData(userId); // Retrieve user data after login
  //         navigate("/Dashboard"); // Redirect to Dashboard
  //       }
  //     } catch (error) {
  //       console.error("Error fetching redirect result:", error);
  //     }
  //   };
  //   fetchRedirectResult();
  // }, [navigate]);

  // // Fetch user data from Firestore
  // const fetchUserData = async (userId) => {
  //   const userDocRef = doc(db, "userData", userId);
  //   const userDoc = await getDoc(userDocRef);
  //   if (userDoc.exists()) {
  //     const userData = userDoc.data();
  //     console.log("User data fetched:", userData);
  //   } else {
  //     console.log("No user data found for this user ID.");
  //   }
  // };

  // const handleEmailSignIn = async (e) => {
  //   e.preventDefault();
  //   setLoading(true); // Start loading
  //   setError(""); // Clear any previous error messages

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const userId = userCredential.user.uid;

  //     // Check if user document exists, create if not
  //     const userDocRef = doc(db, "userData", userId);
  //     const userDoc = await getDoc(userDocRef);
  //     if (!userDoc.exists()) {
  //       await setDoc(userDocRef, {
  //         userId,
  //         email: userCredential.user.email,
  //         userName: userCredential.user.displayName || "",
  //       });
  //       console.log(
  //         "User document created for:",
  //         userCredential.user.displayName
  //       );
  //     } else {
  //       console.log("User already exists:", userDoc.data());
  //     }

  //     await fetchUserData(userId); // Fetch user data
  //     navigate("/Dashboard"); // Redirect after successful sign-in
  //   } catch (error) {
  //     console.error("Error during email sign-in:", error);
  //     if (error.code === "auth/invalid-credential") {
  //       setError("Incorrect Email/password. Please try again.");
  //     } else if (error.code === "auth/user-not-found") {
  //       setError("No account found with this email.");
  //     } else {
  //       setError("An error occurred during sign-in. Please try again.");
  //     }
  //   } finally {
  //     setLoading(false); // Stop loading
  //   }
  // };

  // const handleGoogleSignIn = async () => {
  //   setLoading(true); // Start loading
  //   setError(""); // Clear any previous error messages
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     // const userId = result.user.uid;

  //     // // Check if user document exists in Firestore, create if not
  //     // const userDocRef = doc(db, "userData", userId);
  //     // const userDoc = await getDoc(userDocRef);
  //     // if (!userDoc.exists()) {
  //     //   await setDoc(userDocRef, {
  //     //     userId,
  //     //     email: result.user.email,
  //     //     userName: result.user.displayName || "",
  //     //     profilePicture: result.user.photoURL,
  //     //   });
  //     //   console.log("User document created:", result.user.displayName);
  //     // } else {
  //     //   console.log("User already exists:", userDoc.data());
  //     // }

  //     // await fetchUserData(userId); // Fetch user data
  //     navigate("/Dashboard"); // Redirect after Google sign-in
  //   } catch (error) {
  //     console.error("Error during Google sign-in:", error);
  //     setError("An error occurred during Google sign-in. Please try again.");
  //   } finally {
  //     setLoading(false); // Stop loading
  //   }
  // };

  return (
    <>
      <div
        className={`p-2 w-[82%] h-[68%] [@media(min-width:535px)]:w-[31rem] md:w-[31rem] lg:w-[32rem] lg:h-[31rem] shadow-lg flex flex-wrap flex-col justify-center items-center 
        ${
          darkMode ? "dark-mode" : "bg-white"
        } border-2 border-white rounded-lg `}
        id="login-form"
      >
        <div className="mx-auto">
          <h1 className="text-4xl font-bold text-blue-700 mb-6">Festar</h1>
          <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>

          {/* Google Sign-In Button
          <button
            className={`w-full py-2 bg-gray-200 rounded-md text-sm font-medium mb-4 ${
              darkMode ? "dark-mode border-2 border-white" : ""
            }`}
            onClick={handleGoogleSignIn}
            disabled={loading} // Disable Google Sign-In while loading
          >
            <img
              src={google}
              alt="Google Logo"
              className="inline-block h-6 mr-2"
            />
            Log in with Google
          </button> */}

          {/* Divider */}
          <div className="flex items-center mb-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-sm text-gray-500">
              or log in with email
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Email and Password Login */}
          <form className="space-y-4" onSubmit={login}>
            <input
              type="email"
              placeholder="Your Email"
              className={`w-full py-2 px-4 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                darkMode ? "dark-mode" : ""
              }`}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Your Password"
              className={`w-full py-2 px-4 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                darkMode ? "dark-mode" : ""
              }`}
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

            {/* Display error message */}
            {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

            {/* Loading Spinner */}
            {loading && (
              <div className="flex justify-center mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-white text-white hover:text-blue-500 transition duration-500 rounded-md font-semibold"
              disabled={loading} // Disable login button while loading
            >
              Log in
            </button>
          </form>

          {/* Sign-Up Link */}
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <button onClick={() => setSignup(true)} className="text-blue-600">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
