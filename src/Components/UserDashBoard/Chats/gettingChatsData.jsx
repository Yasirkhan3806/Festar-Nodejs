import {db} from '../../../Config/firebase';
import { collection, getDocs } from 'firebase/firestore';


export const gettingChatsData = async () => {
    const chatsCollectionRef = collection(db, "chats");
 };