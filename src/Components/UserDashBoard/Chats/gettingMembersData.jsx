import { collection, query, where, getDocs } from "firebase/firestore"; // Correct imports
import { db } from "../../../Config/firebase";  // Assuming db is your Firestore instance

const getMembersDataByEmail = async (email) => {
  const membersCollection = collection(db, 'userData'); // Reference to your collection
  const q = query(membersCollection, where('email', '==', email)); // Create query with 'where' clause

  try {
    const querySnapshot = await getDocs(q); // Execute query to get the documents

    if (querySnapshot.empty) {
      // console.log('No matching documents.');
      return null;
    }

    // Separate userId and userData
    const userIds = [];
    const userDataList = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      userIds.push(data.userId); // Collect userId
      userDataList.push(data); // Collect full user data
    });
    console.log(userDataList)

    return { userIds, userDataList }; // Return both userId and userData
  } catch (error) {
    console.error('Error fetching members data:', error);
    return null;
  }
};


export default getMembersDataByEmail;
