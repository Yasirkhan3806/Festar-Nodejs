import React from "react";
import teamMember from "../pictures/conferenceImage.png";
import { Link } from "react-router-dom";
import { BsPlus } from "react-icons/bs";

export default function CreateMenuOpt() {
  return (
    <div className="flex flex-col justify-center items-center bg-blue-500 min-h-screen py-8 px-4">
      {/* Card Container */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-xl">
        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center bg-blue-100 rounded-lg overflow-hidden">
          <img
            src={teamMember}
            alt="Team members in a virtual conference"
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-monts font-bold text-2xl text-blue-600 mb-4">
            Instructions
          </h3>
          <ul className="flex flex-col gap-4 text-gray-700">
            <li>
              <p>
                After clicking the <strong>Start Meeting</strong> button, your
                meeting will begin, and a unique meeting code will be displayed
                below the meeting interface. This code acts as the identifier
                for your meeting.
              </p>
            </li>
            <li>
              <p>
                Share this meeting code with the participants you want to
                invite. You can do this via chat, email, or any communication
                platform you prefer.
              </p>
            </li>
            <li>
              <p>
                Once participants receive the code, they can navigate to the{" "}
                <strong>Join Meeting</strong> page and enter the code in the
                provided input field. After entering the code, they will be able
                to join your meeting seamlessly.
              </p>
            </li>
            <li>
              <p>
                It’s that simple! You’re all set to start the meeting. Ensure
                you have everything prepared, enjoy the session, and make the
                most out of your time together.
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Start Meeting Button */}
      <Link
        to="/MeetingRoom"
        className="mt-6 flex items-center justify-center bg-white hover:bg-blue-600 text-blue-500 hover:text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 focus:outline-none focus:ring focus:ring-blue-300"
        aria-label="Start Meeting"
      >
        <BsPlus className="text-2xl mr-2" /> Start Meeting
      </Link>
    </div>
  );
}
