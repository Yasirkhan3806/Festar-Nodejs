import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";

export default function LearnMoreButton() {
  const [open, setOpen] = useState(false);
  const {darkMode} = useTheme()

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(!open)} className="bg-blue-500 hover:bg-white transition duration-300 pl-6 pr-6 pt-2 pb-2 border-2 rounded-md h-12 text-white hover:text-blue-500 leading-normal font-monts shadow-sm mt-8">
        Learn More
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute right-0 mt-2 w-64 ${darkMode?"dark-mode":"bg-white"} border border-gray-200 rounded-lg shadow-lg p-4`}
        >
          <h3 className="text-lg font-semibold">About Fester Meetup</h3>
          <p className={`text-sm ${darkMode?"text-white":"text-gray-500"} mt-2`}>
            <strong>Fester Meetup</strong> is a virtual hosting platform that allows users to create and join meetings seamlessly. Built with cutting-edge technology, it ensures smooth communication and collaboration.
          </p>
          <h3 className="text-lg font-semibold mt-3">Privacy & Policies</h3>
          <ul className={`text-sm ${darkMode?"text-white":"text-gray-500"} list-disc pl-5`}>
            <li>We do not store your conversations or meeting data.</li>
            <li>Your personal information remains confidential and is not shared with third parties.</li>
            <li>All communication is encrypted to maintain security and privacy.</li>
            <li>Users must adhere to community guidelines and respectful communication.</li>
          </ul>
          <button onClick={() => setOpen(false)} className="mt-3 px-3 py-1 bg-blue-500 rounded-md text-sm">
            Close
          </button>
        </motion.div>
      )}
    </div>
  );
}