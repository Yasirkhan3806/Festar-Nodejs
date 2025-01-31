import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeContext";

export default function LearnMoreButton({buttonFor}) {
  const [open, setOpen] = useState(false);
  const [data,setData] = useState([])
  const {darkMode} = useTheme();
  const privacyData = [
    {
      mainHeading: "Privacy & Policies",
      items: [
        "We do not store your conversations or meeting data.",
        "Your personal information remains confidential and is not shared with third parties.",
        "All communication is encrypted to maintain security and privacy.",
        "Users must adhere to community guidelines and respectful communication."
      ]
    }
  ];

  const dashboardData = [
    {
      mainHeading: "User-Friendliness",
      items: [
        "Clean and minimalistic design, ensuring ease of navigation.",
        "Intuitive layout with clearly labeled sections and actions.",
        "Interactive elements such as tooltips and hover effects to guide users.",
        "Quick access to key metrics and tasks with customizable widgets.",
        "Responsive design that adapts seamlessly across all devices.",
      ]
    }
  ];

  const seamlessIntegration = [
    {
      mainHeading: "Seamless Integration",
      items: [
        "Supports single sign-on (SSO) for a smooth user authentication experience.",
        "Syncs data across multiple platforms in real time, ensuring consistency.",
        "Automated backups and updates to minimize manual intervention.",
        "Supports integration with various data visualization tools for enhanced reporting.",
        "Customizable dashboard elements allow users to integrate their preferred tools.",
      ]
    }
  ];
  
  const security = [
    {
      mainHeading: "Security",
      items: [
        "End-to-end encryption to ensure data privacy and protect user information.",
        "Two-factor authentication (2FA) for added account security.",
        "Regular security audits to identify and address potential vulnerabilities.",
        "Automatic session timeouts to prevent unauthorized access in case of inactivity.",
        "Role-based access control (RBAC) to restrict access to sensitive data.",
        "Secure cloud hosting with robust firewalls and data protection protocols.",
        "Comprehensive user activity logging to monitor potential security breaches."
      ]
    }
  ];
  
  


  const settingData = ()=>{
    if(buttonFor == "mainIntro"){
      setData(privacyData)
    }
    else if(buttonFor == "User-Friendly Dashboard"){
      setData(dashboardData)
    }
    else if(buttonFor == "Seamless Integration"){
      setData(seamlessIntegration)
    }   else{
      setData(security)
    }
    
  }

  useEffect(()=>{
    settingData()
  },[])
  
  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(!open)} className="bg-white hover:bg-blue-500 transition duration-300 pl-6 pr-6 pt-2 pb-2 border-2 rounded-md h-12 text-blue-500 hover:text-white leading-normal font-monts  mt-8 shadow-lg ">
        Learn More
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute left-[-19px] lg:left-0  mt-2 w-64 ${darkMode?"dark-mode":"bg-white"} border border-gray-200 rounded-lg shadow-lg p-4 z-10`}
        >
          <h3 className="text-lg font-semibold">About Fester Meetup</h3>
          <p className={`text-sm ${darkMode?"text-white":"text-gray-500"} mt-2`}>
            <strong>Fester Meetup</strong> is a virtual hosting platform that allows users to create and join meetings seamlessly. Built with cutting-edge technology, it ensures smooth communication and collaboration.
          </p>
          <div>
  {data.map((data, index) => (
    <div key={index}>
      <h3 className="text-lg font-semibold mt-3">{data.mainHeading}</h3>
      <ul className={`text-sm ${darkMode ? "text-white" : "text-gray-500"} list-disc pl-5`}>
        {data.items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  ))}
</div>

        
       
          <button onClick={() => setOpen(false)} className="mt-3 px-3 py-1 bg-blue-500 rounded-md text-sm">
            Close
          </button>
        </motion.div>
      )}
    </div>
  );
}