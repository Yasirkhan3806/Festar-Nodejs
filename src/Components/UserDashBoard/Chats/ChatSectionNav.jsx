import groupIcon from './icons/groupIcon.png';
import { useTheme } from '../../../ThemeContext';
import backIconWhite from "./icons/backIconWhite.png";
import backIconDark from "./icons/backIconDark.png";
import { useNavigate } from 'react-router-dom';
import DashSide from '../DashSide';

const ContactHeader = ({ navData }) => {
  const {darkMode} = useTheme();
  const navigate = useNavigate()
  
  const goBackToChats = ()=>{
    navigate("/Dashboard",{
      state:{
          activeItem:"Chats"
      },
      replace:true
    })
  }

  
  return (
    <div className="flex flex-col">
      {/* Left Section: Avatar and Name */}
      <div className={`flex items-center justify-between p-3 px-9 pr-14 gap-2   bg-white w-[100%]  ${darkMode?"dark-mode":""}`}>

  <img onClick={goBackToChats} className='h-12' src={darkMode?backIconDark:backIconWhite} alt="" />
      <div className="flex items-center gap-4 w-[80%] ">
        {/* Avatar */}
        <img
          src={navData.groupPicture || groupIcon}
          alt={`${navData.groupName}'s avatar`}
          className="h-12 w-12 rounded-full object-cover"
        />
        {/* Name  */}
        <div>
          <h3 className={` ${darkMode?"dark-mode":""} text-lg font-bold text-gray-800`}>{navData.groupName || "Chat Name"}</h3>
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4 text-blue-500 ">
      </div>
      </div>
      <div className='border-[1px] border-blue-300 w-[80vw] ml-14 '></div>
    </div>
  );
};

export default ContactHeader;
