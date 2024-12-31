import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../Config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {auth} from "../../../Config/firebase"



const CreateGroupChat = async (chatName, chatMembers,groupDescription,imageUrl,userData) => {
    const chatid = uuidv4();
// alert(imageUrl)
// console.log("userData: ",userData)
    const collectionRef = collection(db, 'GroupMessages');
    await addDoc(collectionRef, {
        adminId : auth.currentUser.uid,
        chatid: chatid,
        groupPicture: imageUrl,
        chatName: chatName,
        chatMembers: chatMembers,
        messages :[],
        userData:userData,
        groupDescription: groupDescription,
        chatType: 'group',
    });
}

export default CreateGroupChat;

export const createIndividualChat = async(receiverId,receiverData,userName )=>{
   
    const chatid = uuidv4();
    const collectionRef = collection(db, 'IndividualMessages');
    await addDoc(collectionRef, {
        chatId :chatid,
        senderId:auth.currentUser.uid,
        receiverId,
        receiverName:receiverData[0].userName,
        receiverPicture:receiverData[0].profilePicture,
        senderName : auth.currentUser.displayName || userName || "guest",
        senderPicture : auth.currentUser.photoURL || "",
        messages :[],

    });
}