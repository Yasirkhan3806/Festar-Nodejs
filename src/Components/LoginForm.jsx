import React from "react";
import teamMember from '../assets/Pictures/L-companion.avif';
import google from '../assets/icons/google.svg';


export default function LoginForm() {
  return (
    <>
     <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-500 flex flex-col justify-center px-16 py-12">
     
      </div>
<div className="flex absolute top-20 left-[10.6rem] w-3/4 bg-white rounded-lg shadow-slate-600 shadow-xl">
    {/* left side */}
    <div className="w-2/4 flex flex-col justify-center items-center ">
    <div className="max-w-sm mx-auto">
          {/* Logo */}
          <h1 className="text-4xl font-bold text-blue-700 mb-6">Fester</h1>

          {/* Welcome Text */}
          <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>

          {/* Google Login Button */}
          <button className="w-full py-2 bg-gray-200 rounded-md text-sm font-medium mb-4">
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
            <span className="mx-2 text-sm text-gray-500">or log in with email</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Email and Password Inputs */}
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full py-2 px-4 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Your Password"
              className="w-full py-2 px-4 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600" />
                <span className="ml-2">Keep me logged in</span>
              </label>
              <a href="#" className="text-blue-600">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold"
            >
              Log in
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-sm text-center mt-4">
            Don't have an account? <a href="#" className="text-blue-600">Sign up</a>
          </p>
        </div>
    </div>
    {/* rightside */}
    <div className="w-2/4 h-full rounded-r-lg bg-blue-500 p-8">
  <img
    src={teamMember}
    alt="Illustration"
    className="w-full h-full object-cover rounded-lg"
  />
</div>

</div>
      {/* Right Side */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center text-white p-12">
        {/* <div className="max-w-xs text-center">
          <h3 className="text-xl font-semibold mb-4">New Update Available</h3>
          <p className="text-sm mb-4">
            You have updated new features in your account. Check them out now.
          </p>
          <button className="py-2 px-4 bg-white text-blue-900 rounded-md font-semibold">
            Learn More
          </button>
        </div> */}

        {/* Illustration (Insert Image URL below) */}
     
      </div>
    </div>
    </>
  );
}
