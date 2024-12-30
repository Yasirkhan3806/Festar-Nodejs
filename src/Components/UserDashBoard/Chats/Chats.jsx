import React ,{useState} from 'react';
import ChatsSearch from './ChatsSearch';
import GrpChats from './GrpChats';
import PeopleChats from './PeopleChats';
import CreateChat from './CreateChat';
import ChatSection from './ChatSection';


export default function Chats() {
  const [currentChat, setCurrentChat] = useState([]); // Initialize with an empty array
  const [chatId, setChatId] = useState(''); // Initialize with an empty string
  const[navData,setNavData]=useState([]);
  const [userData, setUserData] = useState([]);
  // console.log("chatId at chats: ", chatId);
  // console.log("navData at chats: ", navData);
  console.log("userData at chats: ", userData);
  return (
    <>
<div>
  
  <div id='main' className='flex w-[99%] h-screen '>
    <div id='chats' className='flex flex-col w-1/2 h-full  gap-2 overflow-y-auto scroll-left'>
    <div id='navbar' className='mt-2'>
      <ChatsSearch />
    </div>
    <div id='chats-section' >
      <div id='create-chat' >
        <CreateChat />
      </div>
      <div id='chats-box' className='flex flex-col gap-2'>
      <div id='grp-chats'>
        <GrpChats setCurrentChat={setCurrentChat} setChatId= {setChatId} setNavData={setNavData} setUserData={userData}/>
      </div>
      <div id='indiv-chats'>
        <PeopleChats />
      </div>
      </div>
      </div>
    </div>
    <div id='chat-in' className='border-2 border-b-4 border-blue-400 border-b-blue-600 rounded-xl shadow-2xl m-2 w-[70%]'>
      <ChatSection currentChat={currentChat} chatId={chatId} navData={navData} />
    </div>
  </div>
</div>
    </>
  )
}
