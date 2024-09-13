import React from "react";
import missionpic from '../assets/Pictures/colleagues-having-video-conference-coronavirus-pandemic.jpg';
import foundingYear from "../assets/icons/icons8-year-2024-48.png";
import usersPic from "../assets/icons/icons8-users-30.png";
import teamMembers from "../assets/icons/icons8-team-30.png";
import meetingPic from "../assets/icons/icons8-meeting-50.png";
// import meetingPic from "../assets/Pictures/meetingPic.webp";
// import teamMembers from "../assets/Pictures/teamMembers.jpg";
// import foundingYear from "../assets/Pictures/2024.jpg";

export default function MissionVisionSec() {
 const data = [
    {
      title: "200 Users",
      description: "Since our inception in 2024, we have empowered over 1000 users to connect seamlessly through our platform, enhancing their meeting experiences.",
      image: usersPic,
    },
    {
      title: "200  Meetings",
      description: "Our platform has facilitated over 500 meetings in just the first year, proving our commitment to efficiency and user satisfaction",
      image: meetingPic,
    },
    {
      title: "50 Team Members",
      description: "Our dedicated team of 10 professionals works tirelessly to innovate and improve our services, ensuring that we meet the evolving needs of our users",
      image: teamMembers,
    },
    {
      title: "Founding Year",
      description: "Founded in 2024, Festar is committed to continuous improvement and user-centric development, ensuring our platform remains at the forefront of meeting planning technology. ",
      image: foundingYear,
    },
  ]
  return (
    <>
    <div className="flex h-full gap-6 p-4">
      <div className="w-2/4 h-3/4 mt-14 flex justify-center align-middle ">
        <img data-aos ="fade-right"  className="" src={missionpic} alt="" />
      </div>
      <div className="w-2/4 flex flex-col gap-6 ">
      <div>
        <h1 data-aos = "fade-up" className="text-6xl font-bold leading-snug ">Our Mission <span className="text-blue-500">&</span> Vision</h1>
        <p data-aos = "fade-up" className="mb-3">At Festar, we strive to simplify virtual meeting arrangements making them accessible for everyone. Our vision is to create engaging and productive online gatherings that foster collaboration across borders.</p>
        </div>
        {/* <img className="max-h-2/4" src={missionpic} alt="" /> */}
        <div className="flex flex-row flex-wrap gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col gap-3 w-[45%] m-1">
              <div className="flex gap-1">
                <img data-aos = "fade-up" data-aos-delay = "300" className="h-7 m-1" src={item.image} alt="" />
              <h2 data-aos = "fade-up" data-aos-delay = "300" className="text-2xl font-bold">{item.title}</h2>
              </div>
              <p data-aos = "fade-up" data-aos-delay = "500" className="text-sm">{item.description}</p>
              {/* <img className="max-h-2/4" src={item.image} alt="" /> */}
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}
