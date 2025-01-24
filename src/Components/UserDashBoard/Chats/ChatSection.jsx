import React,{useContext} from 'react';
import ContactHeader from './ChatSectionNav';
import TypeChat from './TypeChat';
import MainChat from './MainChat';
import { useLocation } from 'react-router-dom';
import useWindowSize from '../WindowSize';
import ChatContext from './ChatsContext';

export default function ChatSection({ chatId, navData, isGroup }) {
  const location = useLocation();
  const [width] = useWindowSize();
  const {currentChat} = useContext(ChatContext)

  // Destructure state with fallback values
  const {  chatId: stateChatId = chatId, isGroup: stateIsGroup = isGroup, navData: stateNavData = navData } = location.state || {};

  // Use state values for mobile, otherwise use props
 
  const finalChatId = width <= 768 ? stateChatId : chatId;
  const finalIsGroup = width <= 768 ? stateIsGroup : isGroup;
  const finalNavData = width <= 768 ? stateNavData : navData;

  return (
    <>
      <div id='main' className='w-[99%] h-[95vh]'>
        <div id='contact-header' className='h-[20%]'>
          <ContactHeader navData={finalNavData} />
        </div>
        <div id='main-Chat' className='h-[66%]'>
          <MainChat currentChat={currentChat} chatId={finalChatId} isGroup={finalIsGroup} />
        </div>
        <div id='Type-chat' className='h-[10%] ml-[2rem]'>
          <TypeChat chatId={finalChatId} isGroup={finalIsGroup} />
        </div>
      </div>
    </>
  );
}