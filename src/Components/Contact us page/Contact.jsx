import React from 'react';
import Navbar from '../Navbar';
import email from '../Contact us page/icons/icons8-gmail.svg';
import call from '../Contact us page/icons/call.png';
import location from '../Contact us page/icons/location.png'
import Footer from '../Footer';

export default function Contact() {
  return (
    <>
      <Navbar/>
      <main className='mt-16 space-y-12'>
      <div>
      <h1 className='text-center font-bold text-[42px] leading-[52px]'>Contact Us</h1>
      <p className='text-center text-lg leading-[27px]'>Reach out to us for any inquiries or support. We’re here to help you plan and <br /> manage your meetings effortlessly. </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-8 items-start max-w-6xl mx-auto py-16 px-6">
      {/* Left Section - Contact Info */}
      <div className="md:w-1/2">
        <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
        <p className="text-lg mb-6">
          Reach out to us for any inquiries or support regarding our meeting planning services.
        </p>
        <div className="space-y-4">
          <p className="flex items-center space-x-2">
            <span className="text-blue-500">
              <img className='h-8' src={email} alt="" />
            </span>
            <span>info@festar.com</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="text-green-500">
            <img className='h-8' src={call} alt="" />
            </span>
            <span>(123) 456-7890</span>
          </p>
          <p className="flex items-center space-x-2">
            <span className="text-green-500">
            <img className='h-8' src={location} alt="" />
            </span>
            <span>123 Meeting St, Suite 100, City, State, 12345</span>
          </p>
        </div>
      </div>

      {/* Right Section - Contact Form */}
      <div className="md:w-1/2 mt-8 md:mt-0">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg text-blue-500">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg text-blue-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg text-blue-500">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Type your message"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-blue-500">
              I accept the Terms
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
      </main>
      <Footer/>
    </>
  )
}
