import React from 'react';
import introPicture from '../assets/Pictures/4814043.jpg';
import {useTypewriter, Cursor} from 'react-simple-typewriter'

export default function IntroSection() {
    const [text] = useTypewriter(
        {
            words:['Meetings','Calls','Collabs'],
            loop:[],
        }
    ) 
  return (
    <>
    <div className='flex flex-col sm:flex-row '>
        <div className='w-2/4 flex justify-center align-middle flex-col gap-2 sm:w-3/4'>
            <h1 className='text-6xl text-center font-bold font-monts'>
            Plan Your <span className='text-blue-500'>{text}</span> <br />
            with Festar
            </h1>
            <p className='text-xl font- text-center'>
            Welcome to Festar, your ultimate solution for seamless and efficient meeting planning. Experience the ease of organizing meetings just like Zoom or Google Meet. 
            </p>
            <ul className='flex space-x-3 space-y-8 w-90 justify-center'>
        <button className='bg-blue-500  hover:bg-white transition duration-300 pl-6 pr-6 pt-2 pb-2 border-2 rounded-md h-12  text-white hover:text-blue-500 leading-normal font-monts shadow-sm mt-8 '>Learn More</button>
        <button className='bg-white hover:bg-blue-500 transition duration-300  pl-6 pr-6 pt-3 pb-3 border-2 border-black border-opacity-10 border-t-0 rounded-md h-12  text-blue-400 hover:text-white leading-normal font-monts shadow-sm '>Get Started</button>
        </ul>
        </div>
        <div className='w-2/4'>
        <img className='max-h-25' src={introPicture} alt="" />
        </div>
    </div>
      
    </>
  )
}
