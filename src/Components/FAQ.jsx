import React from "react";
import { useTheme } from "../ThemeContext";

export default function FAQ() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`ml-12 mt-20 ${darkMode ? "dark-mode" : ""}`}>
        <h1
          className={`text-5xl font-bold my-2 font-monts ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Frequently Asked Questions
        </h1>
        <p
          className={`text-lg font-monts my-3 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Find answers to your questions about our meeting planning services. We
          aim to provide clarity and support for all users.
        </p>
        <ul className={`my-[10px] w-[96%] accordion`}>
          {[
            {
              id: "first",
              question: "What is Fester?",
              answer:
                "Fester is a platform that allows users to arrange and manage online meetings seamlessly.",
            },
            {
              id: "second",
              question: "How do I schedule a meeting?",
              answer:
                "You can schedule a meeting by selecting a date and time on our platform and inviting participants.",
            },
            {
              id: "third",
              question: "Is there a mobile app?",
              answer:
                "Currently, we offer a web-based service, but a mobile app is in development for future release.",
            },
            {
              id: "fourth",
              question: "What are the pricing plans?",
              answer:
                "We offer various pricing plans tailored to different needs, which you can view on our Pricing page.",
            },
            {
              id: "fifth",
              question: "How can I contact support?",
              answer:
                "You can reach our support team through the Contact Us page for any inquiries or assistance.",
            },
          ].map((item) => (
            <li
              key={item.id}
              className={`list-none w-full my-3 p-[10px] border-y-2 ${
                darkMode
                  ? "border-gray-600 bg-gray-800 text-gray-200"
                  : "border-black bg-white text-black"
              }`}
            >
              <input className="hidden" type="radio" name="accordion" id={item.id} />
              <label
                className={`flex items-center p-[10px] cursor-pointer font-bold text-2xl acc-before font-monts ${
                  darkMode ? "text-gray-300" : "text-black"
                }`}
                htmlFor={item.id}
              >
                {item.question}
              </label>
              <div className="py-0 px-[10px] content leading-6">
                <p
                  className={`text-sm font-monts mt-4 ${
                    darkMode ? "text-gray-400" : "text-black"
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <h2
          className={`text-4xl font-bold mt-28 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Need More Help?
        </h2>
        <p
          className={`mt-2 mb-3 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          If you have further questions, feel free to reach out to our support
          team.
        </p>
        <button
          className={`${
            darkMode
              ? "bg-gray-800 hover:bg-gray-600 text-white"
              : "bg-blue-500 hover:bg-white text-white hover:text-blue-500"
          } transition duration-300 pl-6 pr-6 pt-2 pb-2 border-2 rounded-md h-12 mt-0 leading-normal font-monts shadow-sm`}
        >
          Contact Us
        </button>
      </div>
    </>
  );
}
