import React from 'react';
import facebook from '../assets/icons/facebook.png';
import logo from '../assets/Pictures/logo-inverted-color.png';
import instagram from '../assets/icons/instagram.png';
import twitter from '../assets/icons/twitter.png';
import Linkedin from '../assets/icons/Linkedin.png';

export default function Footer() {
  return (
    <footer className="bg-blue-500 text-white py-6 mt-12 h-80 lg:h-60 md:h-60">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="" />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-14 text-sm">
        <a href="#about" className="transition-all duration-2000 hover:underline text-[16px] ">Services</a>
          <a href="#about" className="transition-all duration-2000 hover:underline text-[16px] ">About Us</a>
          <a href="#contact" className="hover:underline text-[16px]">Contact Us</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="text-white hover:text-blue-600">
            <img className='h-6 s-icon-scale' src={facebook} alt="" />
          </a>
          <a href="https://instagram.com" className="text-white hover:text-pink-600">
          <img className='h-6' src={instagram} alt="" />
          </a>
          <a href="https://linkedin.com" className="text-white hover:text-blue-400">
          <img className='h-6' src={Linkedin} alt="" />
          </a>
          <a href="https://twitter.com" className="text-white hover:text-blue-400">
          <img className='h-6' src={twitter} alt="" />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-4 border-t border-gray-600 pt-4 text-center">
        <p className="text-sm">&copy; 2024 Festar. All rights reserved. Plan your meetings effortlessly with Festar.</p>
        <div className="flex justify-center space-x-4 mt-2 text-sm">
          <a href="#terms" className="hover:underline">Terms Of Service</a>
          <a href="#privacy" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
