import React from 'react';
import dashboard from '../assets/Pictures/dashboard.jpg';
import integration from '../assets/Pictures/integration.jpg';
import security from '../assets/Pictures/security.jpg';
import { useTheme } from '../ThemeContext';


export default function KeyFeatures() {
  const {darkMode} = useTheme()
    const data = [
        {
            title: 'User-Friendly Dashboard',
            description: 'Our intuitive dashboard allows you to easily schedule, manage, and join meetings with just a few clicks.',
            image: dashboard
        },
        {
            title: 'Seamless Integration',
            description: 'Festar integrates effortlessly with your favorite calendar apps, ensuring you never miss a meeting.',
            image: integration,
        },
        {
            title: 'Robust Security',
            description: 'We prioritize your privacy and security with top-notch encryption and multi-factor authentication.',
            image: security,
        },
    ]

    
  return (
    <>
      <h2 className='text-5xl font-bold text-center' data-aos = "fade-up" data-aos-duration = "1000">Key <span className='text-blue-500'>Features</span> of Festar</h2>
      <p data-aos = "fade-up" data-aos-duration = "1000" className='text-center mb-12 p-4 md:pl-32 md:pr-32 '>	
Discover the unique features that make Festar the ideal choice for your meeting planning needs. Our platform offers seamless integration, user-friendly interfaces, and robust security to ensure your meetings are efficient and secure.
</p>
      <div className='flex flex-col justify-around mb-16 md:flex-row'>
      {data.map((item, index) => (
            <div key={index} className={`flex flex-col gap-3 w-[100%] md:w-[30%] m-1 ${darkMode?"dark-mode-shadow":"div-shadow "}rounded-3xl p-2 cursor-pointer ${darkMode?"dark-mode dark-mode-shadow":""}`}>
                <img  className="h-2/3 w-full rounded-lg" src={item.image} alt="" />
              <h2  className="text-2xl font-bold">{item.title}</h2>

              <p className="text-sm">{item.description}</p>
              {/* <img className="max-h-2/4" src={item.image} alt="" /> */}
        <button className='w-2/4 md:w-[65%] lg:w-2/5 self-center  bg-white hover:bg-blue-500 font-semibold transition duration-300  pl-6 pr-6 pt-2 pb-2 border-2 border-black border-opacity-10 border-t-0 rounded-md h-12  text-blue-400 hover:text-white leading-normal font-monts shadow-lg mt-4 '>Learn More</button>
              
            </div>
          ))}
      </div>
    </>
  )
}
