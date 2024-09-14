import React from 'react'

export default function FAQ() {
  return (
    <>
    <div className='ml-12 mt-20'>
    <h1 className='text-5xl font-bold my-2 font-monts '>Frequently Asked Questions</h1>
    <p className='text-lg font-monts my-3'>Find answers to your questions about our meeting planning services. We aim to provide clarity and support for all users.</p>
      <ul className='my-[10px]  w-[96%] accordion '>
      <li className='list-none w-full m-0 p-[6px] border-y-2 border-black border-opacity-50 bg-white '>
          <input className='hidden' type="radio" name="accordion" id="first" />
          <label className='flex items-center p-[10px] cursor-pointer font-bold text-2xl acc-before font-monts' htmlFor="first">What is Fester?</label>
          <div className='py-0 px-[10px] content leading-6'>
            <p className='text-sm font-monts text-black mt-4'>
            Festar is a platform that allows users to arrange and manage online meetings seamlessly.
            </p>
          </div>
        </li>
        <li className='list-none w-full my-3 p-[10px] border-y-2 border-black bg-white '>
          <input className='hidden' type="radio" name="accordion" id="second" />
          <label className='flex items-center p-[10px] cursor-pointer font-bold text-2xl acc-before font-monts' htmlFor="second">How do I schedule a meeting?</label>
          <div className='py-0 px-[10px]  content leading-6'>
            <p className='text-sm font-monts text-black mt-4'>
            You can schedule a meeting by selecting a date and time on our platform and inviting participants.
            </p>
          </div>
        </li>
        <li className='list-none w-full my-3 p-[10px] border-y-2 border-black bg-white '>
          <input className='hidden' type="radio" name="accordion" id="third" />
          <label className='flex items-center p-[10px] cursor-pointer font-bold text-2xl font-monts acc-before' htmlFor="third">Is there a mobile app?</label>
          <div className='py-0 px-[10px] text-black text-opacity-50 content leading-6'>
            <p className='text-sm font-monts text-black mt-4'>
            Currently, we offer a web-based service, but a mobile app is in development for future release
            </p>
          </div>
        </li>
        <li className='list-none w-full my-3 p-[10px] border-y-2 border-black bg-white '>
          <input className='hidden' type="radio" name="accordion" id="fourth" />
          <label className='flex items-center p-[10px] cursor-pointer font-bold text-2xl font-monts acc-before' htmlFor="fourth">What are the pricing plans?</label>
          <div className='py-0 px-[10px] text-black text-opacity-50 content leading-6'>
            <p className='text-sm font-monts text-black mt-4'>
            We offer various pricing plans tailored to different needs, which you can view on our Pricing page.
            </p>
          </div>
        </li>
        <li className='list-none w-full my-3 p-[10px] border-y-2 border-black bg-white '>
          <input className='hidden' type="radio" name="accordion" id="fifth" />
          <label className='flex items-center p-[10px] cursor-pointer font-bold text-2xl font-monts acc-before' htmlFor="fifth">How can I contact support?</label>
          <div className='py-0 px-[10px] text-black text-opacity-50 content leading-6'>
            <p className='text-sm font-monts text-black mt-4'>
            You can reach our support team through the Contact Us page for any inquiries or assistance.
            </p>
          </div>
        </li>
      </ul>
      <h2 className='text-4xl font-bold mt-28'>Need More Help?</h2>
      <p className='mt-2 mb-3'>If you have further questions, feel free to reach out to our support team.</p>
      <button className="bg-blue-500 hover:bg-white transition duration-300 pl-6 pr-6 pt-2 pb-2 border-2 rounded-md h-12 mt-0 text-white hover:text-blue-500 leading-normal font-monts shadow-sm">
            Contact Us
          </button>
      </div>
    </>
  )
}
