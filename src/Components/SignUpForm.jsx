import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../APIContext";
import { useTheme } from "../ThemeContext";
import { useSocket } from "../WebsocketApi";

export default function SignUpForm({ setSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const api = useApi();
  const socket = useSocket()



  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(" ");
    try {
      const response = await api.post(
        "/auth/signUp",
        {
          name: userName,
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        // socket.connect()
        navigate("/Dashboard");
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        console.error("Login failed:", error.response.data); // Log the error response data

        // Set an error message based on the status code or response data
        if (error.response.status === 401) {
          setError("User Already Exists, Please Login");
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

      <form className="w-full" onSubmit={signUp}>
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
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
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
