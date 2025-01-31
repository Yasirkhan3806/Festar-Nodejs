import { auth } from "../../../Config/firebase";
import { query,collection,getDocs,where } from "firebase/firestore";
import { db } from "../../../Config/firebase";

export const fetchMeetings = async () => {
    try {
        const q = query(collection(db, 'UserMeetingData'), where('userId', '==', auth.currentUser?.uid));
        const querySnapshot = await getDocs(q);
        
        // Extract and flatten meetingData arrays from all documents
        const meetingsData = querySnapshot.docs.reduce((acc, doc) => {
            const data = doc.data();
            // Check if meetingData exists and is an array
            if (Array.isArray(data.meetingData)) {
                // Add the meetingData array to the accumulator
                acc.push(...data.meetingData);
            }
            return acc;
        }, []);
        console.log(meetingsData)
        return meetingsData;
    
    } catch (error) {
        console.error('Error fetching meetings: ', error);
    }
};
