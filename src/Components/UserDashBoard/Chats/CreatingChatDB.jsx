import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../Config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import {auth} from "../../../Config/firebase"


const CreateGroupChat = async (chatName, chatMembers,groupDescription,imageUrl) => {
    const chatid = uuidv4();
alert(imageUrl)
    const collectionRef = collection(db, 'GroupMessages');
    await addDoc(collectionRef, {
        adminId : auth.currentUser.uid,
        chatid: chatid,
        groupPicture: imageUrl,
        chatName: chatName,
        chatMembers: chatMembers,
        groupDescription: groupDescription,
        chatType: 'group',
    });
}

export default CreateGroupChat;