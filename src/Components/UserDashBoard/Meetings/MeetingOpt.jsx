import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function MeetingOpt() {
  const [isOpen, setIsOpen] = useState(false);
  const [joinIt, setjoinIt] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center gap-8 shadow-xl bg-blue-700 border-white rounded-lg border-2 w-[94%] md:w-2/4 h-44 mt-8">
        <span className="text-white font-bold text-2xl p-4">
          <h2>Join or Create a Meeting</h2>
        </span>
        <span className="flex gap-4 md:gap-12">
          <Link
            to="/Create-menu"
            className="bg-white hover:bg-blue-500 border-2 rounded-sm border-blue-500 p-2 text-blue-500 hover:text-white transition duration-500 font-semibold shadow-md"
          >
            Create Meeting
          </Link>
          <Link
            to="/Join-Menu"
            className="bg-blue-500 hover:bg-white border-2 rounded-sm border-white p-2 text-white hover:text-blue-500 transition duration-500 font-semibold shadow-md"
          >
            Join Meeting
          </Link>
        </span>
      </div>
    </>
  );
}
