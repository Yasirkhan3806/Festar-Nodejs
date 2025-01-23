import groupIcon from './icons/groupIcon.png';
import { useTheme } from '../../../ThemeContext';

const ContactHeader = ({ navData }) => {
  const {darkMode} = useTheme();

  
  return (
    <div className="flex flex-col">
      {/* Left Section: Avatar and Name */}
      <div className={`flex items-center justify-between p-3 px-9 pr-14   bg-white w-[100%] gap-44 dark-mode  ${darkMode?"dark-mode":""}`}>
      <div className="flex items-center gap-4 w-[80%] ">
        {/* Avatar */}
        <img
          src={navData.groupPicture || groupIcon}
          alt={`${navData.groupName}'s avatar`}
          className="h-12 w-12 rounded-full object-cover"
        />
        {/* Name  */}
        <div>
          <h3 className={` ${darkMode?"dark-mode":""} text-lg font-bold text-gray-800 dark-mode`}>{navData.groupName || "Chat Name"}</h3>
        </div>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4 text-blue-500 ">
      </div>
      </div>
      <div className='border-[1px] border-blue-300 w-[27rem] ml-14 '></div>
    </div>
  );
};

export default ContactHeader;
