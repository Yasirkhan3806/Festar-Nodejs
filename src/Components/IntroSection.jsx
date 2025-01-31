import React from 'react';
import introPicture from '../assets/Pictures/introPicture.avif';
import introPictureJpg from '../assets/Pictures/introPicture.jpg';
import bgReIntroPicture from "../assets/Pictures/bgReIntroPicture.avif";
import bgReIntroPicturePng from "../assets/Pictures/bgReIntroPicture.png";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { useTheme } from '../ThemeContext';
import LearnMoreButton from './LearnMoreSection';
import { Link } from 'react-router-dom';

export default function IntroSection() {

  const { darkMode } = useTheme();
  const [text] = useTypewriter({
    words: ['Meetings', 'Calls', 'Collabs'],
    loop: true,
  });

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="w-full flex justify-center flex-col gap-2 md:w-2/4">
          <h1 className="text-4xl w-full text-center font-bold font-monts md:text-6xl">
            Plan Your <span className="text-blue-500">{text}</span> <Cursor /> <br />
            with Festar
          </h1>

          {/* Image for small screens */}
          <div className="w-full block md:hidden">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet={darkMode ? bgReIntroPicture : introPicture}
                type="image/avif"
              />
              <source
                media="(max-width: 767px)"
                srcSet={darkMode ? bgReIntroPicturePng : introPictureJpg}
                type="image/jpeg"
              />
              <img
                data-aos="fade-left"
                data-aos-delay="100"
                data-aos-duration="2000"
                className="max-h-25"
                src={darkMode ? bgReIntroPicturePng : introPictureJpg}
                alt="Meeting illustration"
              />
            </picture>
          </div>

          <p className="text-lg text-center">
            Welcome to Festar, your ultimate solution for seamless and efficient meeting planning.
            Experience the ease of organizing meetings just like Zoom or Google Meet.
          </p>

          <ul className="flex space-x-3 space-y-8 w-90 justify-center">
           <LearnMoreButton buttonFor={"mainIntro"}/>
            <Link to="/Log-In"
               className="bg-blue-500 hover:bg-white transition duration-300 pl-6 pr-6 pt-2 pb-2 border-2 border-black border-opacity-10 border-t-0 rounded-md h-12 text-white hover:text-blue-500 leading-normal font-monts shadow-sm">
              Get Started
            </Link>
          </ul>
        </div>

        {/* Image for larger screens */}
        <div className="hidden md:block w-2/4">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={darkMode ? bgReIntroPicture : introPicture}
              type="image/avif"
            />
            <source
              media="(min-width: 768px)"
              srcSet={darkMode ? bgReIntroPicturePng : introPictureJpg}
              type="image/jpeg"
            />
            <img
              data-aos="fade-left"
              data-aos-delay="100"
              data-aos-duration="2000"
              className="max-h-25"
              src={darkMode ? bgReIntroPicturePng : introPictureJpg}
              alt="Meeting illustration"
            />
          </picture>
        </div>
      </div>
    </>
  );
}
