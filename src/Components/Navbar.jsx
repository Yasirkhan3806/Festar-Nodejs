 
import React, { useEffect, useState } from 'react';
import logo from '../assets/Pictures/logo_primary_V17oRtSd.png';

function Navbar() {
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const navbar = document.getElementById('nav-bar'); // Move this inside useEffect
    const handleScroll = () => {
      if (window.scrollY > 0) {
        navbar.classList.add('nav-box-shadow'); // Remove the dot '.'
      } else {
        navbar.classList.remove('nav-box-shadow'); // Remove the dot '.'
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 


  return (
    <>
      <nav id='nav-bar' className='flex flex-wrap justify-around items-center w-full sticky top-0 bg-white '>
        <img src={logo} alt="Logo" className='mt-1' />

        {/* Desktop Menu */}
        <ul className='hidden md:flex space-x-12 space-y-7'>
        <li></li>
          <li><a className='font-monts text-base' href="#">Services</a></li>
          <li><a className='font-monts text-base' href="#">About Us</a></li>
          <li><a className='font-monts text-base' href="#">Pricing</a></li>
          <li><a className='font-monts text-base' href="#">Contact Us</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className='md:hidden text-gray-600 focus:outline-none'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16'></path>
          </svg>
        </button>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-16 right-0 w-2/4 h-2/6 bg-white shadow-lg`}>
          <ul className='flex flex-col items-center space-y-4 '>
            <li><a className='font-monts text-base' href="#">Services</a></li>
            <li><a className='font-monts text-base' href="#">About Us</a></li>
            <li><a className='font-monts text-base' href="#">Pricing</a></li>
            <li><a className='font-monts text-base' href="#">Contact Us</a></li>
            <button className='bg-white hover:bg-blue-500 transition duration-300 pl-6 pr-6 pt-3 pb-3 border-2 border-black border-opacity-10 border-t-0 rounded-md h-12 mt-8 text-blue-400 hover:text-white leading-normal font-monts shadow-sm'>
            Get Started
          </button>
          <button className='bg-blue-500 hover:bg-white transition duration-300 pl-6 pr-6 pt-2 pb-2 border-2 rounded-md h-12 mt-0 text-white hover:text-blue-500 leading-normal font-monts shadow-sm'>
            Sign In
          </button>
          </ul>
        </div>

        {/* Buttons */}
        <ul className='hidden md:flex space-x-2 space-y-8'>
          <button className='bg-white hover:bg-blue-500 transition duration-300 pl-6 pr-6 pt-3 pb-3 border-2 border-black border-opacity-10 border-t-0 rounded-md h-12 mt-8 text-blue-400 hover:text-white leading-normal font-monts shadow-sm'>
            Get Started
          </button>
          <button className='bg-blue-500 hover:bg-white transition duration-300 pl-6 pr-6 pt-2 pb-2 border-2 rounded-md h-12 mt-0 text-white hover:text-blue-500 leading-normal font-monts shadow-sm'>
            Sign In
          </button>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

