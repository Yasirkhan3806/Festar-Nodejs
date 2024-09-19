import React from 'react';
import Navbar from '../Navbar';
import MissionVisionSec from '../MissionVisionSec';
import ReviewSection from '../ReviewSection';
import Robustsecurity from './Robustsecurity';
import Footer from '../Footer';

export default function About() {
  return (
    <>
      <Navbar/>
      <main className='mt-16'>
      <h1 className='text-center font-bold text-[42px] leading-[52px]'>Welcome To Fester</h1>
      <p className='text-center text-lg leading-[27px]'>At Festar, we simplify virtual meeting planning, integrating the best features of <br />  Zoom and Google Meet. Our mission is to make virtual meetings accessible and <br />user-friendly for everyone. </p>
      <Robustsecurity/>
      <MissionVisionSec/>
      <ReviewSection/>
      <div className='ml-11'>
      <h2 className='text-4xl font-bold mt-28'>Need More Help?</h2>
      <p className='mt-2 mb-3'>If you have further questions, feel free to reach out to our support team.</p>
      <button className="bg-blue-500 hover:bg-white transition duration-300 pl-6 pr-6 pt-2 pb-2 border-2 rounded-md h-12 mt-0 text-white hover:text-blue-500 leading-normal font-monts shadow-sm">
            Contact Us
          </button>
          </div>
      </main>
      <Footer/>
    </>
  )
}
