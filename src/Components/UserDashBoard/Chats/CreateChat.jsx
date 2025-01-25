import GroupChatPopup from "./GroupChatPopup";
import { useState } from "react";


export default function CreateChat() {
    const [showPopup, setShowPopup] = useState(false);
    const createChat = () => {
        // alert('Create Chat')
        setShowPopup(true);
    }
  return (
    <>
      <button onClick={createChat} id='create-chat' className='bg-blue-500 text-white font-bold text-2xl w-12 h-12 rounded-full fixed top-[37rem] md:top-[29rem] lg:top-[29rem] right-[2rem] md:right-[42rem] lg:right-[55rem]'>+</button>
      {showPopup && <GroupChatPopup setShowPopup={setShowPopup} />}
    </>
  )
}
