import { collection, getDocs, where,query } from "firebase/firestore";
import { auth, db } from "../../../../Config/firebase";


export const gettingAnalyticalData = async (userId) => {
  try {
    const collectionRef = query(
      collection(db, "UserMeetingData"), where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(collectionRef);
    if (!querySnapshot.empty) {
      const MeetingData = querySnapshot.docs.map(
        (doc) => doc.data().meetingData
      );
      return MeetingData;
    } else {
      console.log("No data found on this userId");
    }
  } catch (e) {
    console.log("Error fetching Data ", e);
  }
};
