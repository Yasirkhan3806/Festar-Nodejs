import React from 'react';
import picture1 from '../assets/Pictures/picture1.jpg';
import picture2 from '../assets/Pictures/picture2.jpg';
import picture3 from '../assets/Pictures/picture3.jpg';
import picture4 from '../assets/Pictures/picture4.jpg';
import picture5 from '../assets/Pictures/picture5.jpg';


export default function ReviewSection() {
    const reviews = [
        {
          rating: 5,
          review: "Festar has made organizing virtual meetings a breeze! The interface is user-friendly and efficient.",
          picture: picture1,
          UserName: "John Doe",
          company: "Event Coordinator at Tech Solutions"
        },
        {
          rating: 4,
          review: "The platform is great for hosting online events. The support team is also very responsive.",
          picture: picture2,
          UserName: "Jane Smith",
          company: "Marketing Manager at InnovateX"
        },
        {
          rating: 5,
          review: "Using Festar has significantly improved our team's collaboration. It's intuitive and reliable.",
          picture: picture2,
          UserName: "Michael Lee",
          company: "Product Manager at Alpha Corp"
        },
        {
          rating: 3,
          review: "Festar is good, but there's room for improvement in terms of integration with other tools.",
          picture: picture1,
          UserName: "Emily Zhang",
          company: "HR Manager at Nexus Enterprises"
        },
        {
          rating: 5,
          review: "This platform is a game-changer for virtual conferences! It's smooth and feature-packed.",
          picture: picture5,
          UserName: "David Wilson",
          company: "CEO at Horizon Ventures"
        },
        {
          rating: 4,
          review: "We use Festar for all our webinars. It's easy to set up and helps us engage with attendees effectively.",
          picture: picture1,
          UserName: "Sara Thompson",
          company: "Content Lead at Creative Minds"
        }
      ];
      
    return (
      <>
      <div className='mt-36'>
        <h1 className='text-center text-5xl font-bold'>What Our <span className='text-blue-500'>Users</span> Say</h1>
        <p className='text-center text-lg mt-2'><span className='font-bold'>Discover how Festar</span> has transformed the way people connect and collaborate through meetings.</p>
        <div className='flex flex-wrap justify-around gap-5 m-10'>
          {
            reviews.map((Element, index) => {
              return (
                <div key={index} className='w-[30%] h-56 bg-black p-6 rounded-lg hover-shadow'>
                        {[...Array(Element.rating)].map((_, starIndex) => (
                        <span key={starIndex} className='text-yellow-500 text-2xl'>★</span> // Display star
                      ))}
                    <p className='text-white'>{Element.review}</p>
                  <div className='flex gap-2 mt-4'>
                    <img className='h-11 rounded-[50%]' src={Element.picture} alt="" />
                    <div>
                    <h2 className='text-white font-bold'>{Element.UserName}</h2>
                    <p className='text-white'>{Element.company}</p>
                    </div>
                  </div>
                    
                </div>
              );
            })
          }
        </div>
        </div>
      </>
    );
}
