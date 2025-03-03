import React, { useEffect, useState ,useContext} from 'react';
import { auth } from '../../../Config/firebase';
import { gettingChatsData, gettingChats } from './gettingChatsData';
import groupIcon from './icons/groupIcon.png';
import { settingRead } from './sendingMessages';
import DeleteGroup from './DeleteChats/deleteGroup';
import { useTheme } from '../../../ThemeContext';
import ChatContext from './ChatsContext';
import useWindowSize from '../WindowSize';

export default function GrpChats({ setChatId, setNavData,setIsGroup,navigateForMobiles }) {
  const [groups, setGroups] = useState([]); // Initialize with an empty array
  const [unreadMessages, setUnreadMessages] = useState({ count: 0, messages: [] }); // Store unread messages and their count
  const {darkMode} = useTheme();
  const {setCurrentChat} = useContext(ChatContext)
  const [width] = useWindowSize()
  console.log(width)

  useEffect(() => {
    const fetchData = async () => {
      try {
        gettingChatsData(setGroups); // Fetch group data
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  const getChats = async (chatId, groupPicture, groupName) => {
    try {
      console.log("i am getting clicked")
      gettingChats(chatId, setCurrentChat,true); // Fetch chat data
      setNavData({
        groupPicture: groupPicture,
        groupName: groupName,
      });
      setChatId(chatId); // Set the chatId to the state
      setIsGroup(true);
      settingRead(chatId,true); // Mark messages as read
      if(width <= 768){
      navigateForMobiles(groupName,groupPicture)
      }
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  useEffect(() => {
    const newUnreadMessages = []; // Array to hold unread message detail

    if(groups){
    // Loop through the groups
    groups.forEach((group) => {
      // Loop through the messages in each group
      group.messages.forEach((message) => {
        if (!message.read && message.senderId !== auth.currentUser.uid) {
          // Add message details to the unreadMessages array
          newUnreadMessages.push({
            message: message.text,
            time: new Date(message.timestamp).toLocaleTimeString(),
            chatId: group.chatid,
          });
        }
      });
    });
  }

    // Update the unreadMessages state with both the count and message details
    setUnreadMessages({
      messages: newUnreadMessages,
    });

  }, [groups]); // Run when groups or the current user changes

  return (
    <div className={`max-w-md mx-auto bg-white rounded-xl shadow-lg p-4 border-[2.5px] border-b-4 border-blue-400  ${darkMode?"dark-mode":""}`}>
      <h2 className={`text-xl font-bold text-gray-800 mb-4  ${darkMode?"dark-mode":""}`}>Groups</h2>
      <div className="space-y-4 ">
        {groups.length > 0 ? (
          groups.map((group) => {
            // Find the most recent unread message for the group
            const recentMessage = unreadMessages.messages.find(
              (unread) => unread.chatId === group.chatid
            );

            // Find the unread count for this specific group
            const unreadCount = unreadMessages.messages.filter(
              (unread) => unread.chatId === group.chatid
            ).length;

            return (
              <div
                key={group.chatid}
                onClick={() =>
                  getChats(group.chatid, group.groupPicture, group.chatName)
                }
                className="flex items-center justify-between p-2 rounded-md border-b-2 border-gray-200 cursor-pointer "
              >
                <div className="flex items-center space-x-4 ">
                  <img
                    src={group.groupPicture || groupIcon} // Ensure fallback works
                    alt={group.chatName}
                    className="h-12 w-12 rounded-full "
                  />
                  <div>
                    <h3 className={` ${darkMode?"dark-mode":""} text-sm font-semibold text-gray-800`}>
                      {group.chatName || 'Untitled Group'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {recentMessage ? recentMessage.message : 'No recent messages'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400">{recentMessage? recentMessage.time:"N/A"}</span>
                  {unreadCount > 0 && (
                    <span className="text-xs text-white bg-blue-500 rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                 
                </div>
                <div>
                    <DeleteGroup chatId={group.chatid} isGroup={true} />
                
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">No groups available</p>
        )}
      </div>
    </div>
  );
}
