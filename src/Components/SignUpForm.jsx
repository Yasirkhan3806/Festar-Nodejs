import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider, db } from "../Config/firebase";
import { useTheme } from "../ThemeContext";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import google from "../assets/icons/google.svg";

export default function SignUpForm({ setSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const settingUserData = async (userId, email, userName, profilePicture = null) => {
    try {
      const userDocRef = doc(db, "userData", userId);
      await setDoc(userDocRef, {
        email,
        userName: userName || "Guest",
        userId,
        profilePicture,
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
    setLoading(true); // Start loading
    setError(""); // Clear any previous errors

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      const success = await settingUserData(userId, email, userName);

      if (success) {
        console.log("User created and data stored successfully!");
        navigate("/Dashboard");
      } else {
        console.error("Failed to store user data.");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in instead.");
      } else {
        console.error("Error during sign-up:", error);
        setError("An error occurred during sign-up. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true); // Start loading
    setError(""); // Clear any previous errors

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userId = result.user.uid;

      const userDocRef = doc(db, "userData", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await settingUserData(
          userId,
          result.user.email,
          result.user.displayName,
          result.user.photoURL
        );
        console.log("User document created:", result.user.displayName);
      } else {
        console.log("User already exists:", userDoc.data());
      }

      navigate("/Dashboard"); // Redirect after Google sign-in
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError("An error occurred during sign-in. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      id="sign-up"
      className={`w-[82%] h-[72%] [@media(min-width:535px)]:w-[31rem] md:w-[31rem] lg:w-[32rem] lg:h-[31rem] ${
        darkMode ? "dark-mode" : "bg-white"
      } flex flex-col justify-center p-4 md:p-8 rounded-lg shadow-lg border-2 border-white`}
    >
      <h1 className="text-4xl font-bold mb-2 text-blue-800">Festar</h1>
      <h2 className="text-2xl font-semibold mb-2">Create an Account</h2>

      {loading && (
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="text-red-600 text-sm mb-4">
          {error}
        </div>
      )}

      <button
        className={`${
          darkMode ? "dark-mode" : "bg-gray-200"
        } text-black border-2 border-gray-200 rounded-lg py-2 px-4 w-full mb-4 flex items-center justify-center ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleGoogleSignIn}
        disabled={loading} // Disable during loading
      >
        <img src={google} alt="Google" className="w-6 h-6 mr-2" />
        Sign up with Google
      </button>

      <form className="w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          className={`border-2 border-gray-300 rounded-lg w-full py-2 px-4 mb-4 ${
            darkMode ? "dark-mode" : ""
          }`}
          onChange={(e) => setUserName(e.target.value)}
          required
          disabled={loading} // Disable during loading
        />
        <input
          type="email"
          placeholder="Your Email"
          className={`border-2 border-gray-300 rounded-lg w-full py-2 px-4 mb-4 ${
            darkMode ? "dark-mode" : ""
          }`}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading} // Disable during loading
        />
        <input
          type="password"
          placeholder="Your Password"
          className={`border-2 border-gray-300 rounded-lg w-full py-2 px-4 mb-4 ${
            darkMode ? "dark-mode" : ""
          }`}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading} // Disable during loading
        />
        <div className="flex items-center mb-4">
          <input type="checkbox" className="mr-2" disabled={loading} />
          <span>Keep me logged in</span>
        </div>
        <button
          type="submit"
          className={`bg-blue-600 hover:bg-white text-white hover:text-blue-500 font-semibold rounded-lg py-2 px-4 w-full transition duration-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading} // Disable during loading
        >
          Sign up
        </button>
      </form>

      <p className="text-gray-600 mt-4">
        Already have an account?{" "}
        <button
          onClick={() => setSignUp(false)}
          className="text-blue-600 font-semibold"
          disabled={loading} // Disable during loading
        >
          Log in
        </button>
      </p>
    </div>
  );
}
