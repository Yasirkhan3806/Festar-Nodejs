import React from 'react';
import security from './pictures/security.jpg';
import dataEncryption from './icons/dataencryption.png';
import securityChecks from './icons/SecurityChecks.png';
import secureAuth from './icons/Secureauth.png';
import securityStandards from './icons/securityStandards.png';


export default function Robustsecurity() {
    const data = [
        {
          title: "Data Encryption",
          description: "We utilize cutting-edge encryption algorithms, such as AES-256, to scramble your data, making it unintelligible to unauthorized parties. Your data is transmitted over secure channels using protocols like HTTPS, ensuring its confidentiality.",
          image: dataEncryption,
        },
        {
          title: "Security checks",
          description: "Our security experts conduct comprehensive vulnerability assessments to identify potential weaknesses in our systems and applications. We simulate attacks on our systems to uncover vulnerabilities that could be exploited by malicious actors",
          image: securityChecks,
        },
        {
          title: "Secure Validation",
          description: "We have implemented a robust firewall system with multiple layers of protection to block unauthorized access attempts. Our firewalls are equipped with intrusion detection systems to monitor network traffic for signs of malicious activity.",
          image: secureAuth,
        },
        {
          title: "Security Standards",
          description: "We enforce strict password policies, requiring users to create complex passwords that are difficult to guess or crack. We encourage users to enable Multi-Factor Authentication (MFA), requiring them to provide additional forms of verification, such as a code sent to their phone or email, in addition to their password.",
          image: securityStandards,
        },
      ]
  return (
    <>
       <div className="flex h-full gap-4 p-4 mb-16">
   
      <div className="w-2/4 flex flex-col gap-2 ">
      <div>
        <h1 data-aos = "fade-up" className="text-6xl font-bold leading-snug ">Robust<span className="text-blue-500"> Security</span></h1>
        <p data-aos = "fade-up" className="mb-3">At Festar, we prioritize the security of your data and online interactions. We employ state-of-the-art security measures to safeguard your privacy and protect your sensitive information</p>
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
      <div className="w-2/4 h-3/4 mt-24 flex justify-center align-middle ">
        <img data-aos ="fade-left"  className="" src={security} alt="" />
      </div>
      </div> 
    </>
  )
}
