import { auth } from "../../../Config/firebase";
import { query,collection,getDocs,where } from "firebase/firestore";
import { db } from "../../../Config/firebase";

export const fetchMeetings = async () => {
    try {
        const q = query(collection(db, 'UserMeetingData'), where('userId', '==', auth.currentUser?.uid));
        const querySnapshot = await getDocs(q);
        const meetingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return meetingsData
    } catch (error) {
        console.error('Error fetching meetings: ', error);
    }
};
