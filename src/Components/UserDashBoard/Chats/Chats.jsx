import React ,{useEffect, useState} from 'react';
import DashNav from '../DashNav';
import { useNavigate } from 'react-router-dom';
import ChatsSearch from './ChatsSearch';
import GrpChats from './GrpChats';
import PeopleChats from './IndividualChats/PeopleChats';
import CreateChat from './CreateChat';
import ChatSection from './ChatSection';
import useWindowSize from '../WindowSize';


export default function Chats() {
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [chatId, setChatId] = useState(''); 
  const[navData,setNavData]=useState([]);
  const [isGroup, setIsGroup] = useState(false);
  const [width] = useWindowSize();
  const navigate = useNavigate()


  const navigateForMobiles = async (groupName, groupPicture) => {
    if (width <= 768) {
      // Update navData
      setNavData({
        groupPicture: groupPicture,
        groupName: groupName,
      });

      // Set the flag to indicate navigation should occur
      setShouldNavigate(true);
    }
  };

  // useEffect to handle navigation after navData is updated
  useEffect(() => {
    if (shouldNavigate) {
      navigate("/Type-chat", {
        state: {
          navData,
          chatId, // Replace with actual chatId
          isGroup, // Replace with actual isGroup
        },
      });

      // Reset the flag after navigation
      setShouldNavigate(false);
    }
  }, [navData, shouldNavigate, navigate]);



  return (
    <>
<div>
  
  <div id='main' className='flex w-[99%] h-screen '>
    <div id='chats' className='flex flex-col md:w-1/2 lg:w-1/2 w-full h-full  gap-2 overflow-y-auto scroll-left'>
    {width<= 768 && <DashNav/>}
    <div id='navbar' className='mt-2'>
      <ChatsSearch />
    </div>
    <div id='chats-section' >
      <div id='create-chat' >
        <CreateChat />
      </div>
      <div id='chats-box' className='flex flex-col gap-2'>
      <div id='grp-chats'>
        <GrpChats navigateForMobiles={navigateForMobiles} setChatId= {setChatId} setNavData={setNavData} setIsGroup={setIsGroup}/>
      </div>
      <div id='indiv-chats'>
        <PeopleChats navigateForMobiles={navigateForMobiles} setNavData={setNavData} setChatId= {setChatId} setIsGroup={setIsGroup} />
      </div>
      </div>
      </div>
    </div>
    <div id='chat-in' className='hidden md:block lg:block border-2 border-b-4 border-blue-400 border-b-blue-600 rounded-xl shadow-2xl m-2 w-[70%]'>
      <ChatSection chatId={chatId} navData={navData} isGroup={isGroup} />
    </div>
  </div>
</div>
    </>
  )
}
