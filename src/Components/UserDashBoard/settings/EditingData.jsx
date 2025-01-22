import { collection,query,getDocs,where,updateDoc } from "firebase/firestore"
import { auth, db } from "../../../Config/firebase";

const getUserUid = async()=>{
const userId = auth.currentUser?.uid;

return userId
}

export const editName = async(newUserName)=>{
    try {
        const uid = await getUserUid()
        // Reference the collection
        const usersCollectionRef = collection(db, "userData");
    
        // Create a query to find the document where the `userId` field matches
        const q = query(usersCollectionRef, where("userId", "==", uid));
    
        // Execute the query
        const querySnapshot = await getDocs(q);
    
        // Check if any documents match the query
        if (!querySnapshot.empty) {
          // Get the first matching document (assuming userId is unique)
          const userDoc = querySnapshot.docs[0];
    
          // Update the userName field in the document
          await updateDoc(userDoc.ref, {
            userName: newUserName,
          });
    
          console.log("userName updated successfully!");
        } else {
          console.log("No document found with the given userId.");
        }
      } catch (error) {
        console.error("Error updating userName: ", error);
      }
}