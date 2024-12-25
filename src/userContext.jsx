import { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "./Config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Create contexts
const UserContext = createContext();
const EventsContext = createContext();
const UserDataContext = createContext();
const UserMeetingDataContext = createContext();
const ParticipantActiveContext = createContext();
// const MeetingContext = createContext();


// Custom hooks for accessing contexts
export const useUser = () => useContext(UserContext);
export const useEvents = () => useContext(EventsContext);
export const useUserData = () => useContext(UserDataContext);
export const useMeetingData = () => useContext(UserMeetingDataContext);
export const useParticipantActiveData = () => useContext(ParticipantActiveContext);
// export const useMeeting = () => useContext(MeetingContext);


// export const MeetingProvider = ({ children }) => {
//   const [audioTrack, setAudioTrack] = useState(null);
//   const [videoTrack, setVideoTrack] = useState(null);

//   return (
//     <MeetingContext.Provider value={{ audioTrack, setAudioTrack, videoTrack, setVideoTrack }}>
//       {children}
//     </MeetingContext.Provider>
//   );
// };



// Active participant of meeting data
export const ParticipantActiveDataProvider = ({ children }) => {
  const [participantActive, setParticipantsActive] = useState(["fuck u"]);
  const [meetingId, setMeetingId] = useState("");

  const getParticipantData = async (meetingId) => {
    if (!meetingId) return;
    try {
      const collectionRef = collection(db, "ParticipantsData");
      const q = query(collectionRef, where("uniqueId", "==", meetingId[0]));
      
      const querySnapshot = await getDocs(q);
     
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data().participants,
      }));
      // console.log("query data",data)
      setParticipantsActive(Object.values(data[0]));
    } catch (e) {
      console.log("Error fetching participant data:", e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getParticipantData(meetingId);
      } else {
        setParticipantsActive([]);
      }
    });
    return () => unsubscribe();
  }, [meetingId]);

  return (
    <ParticipantActiveContext.Provider value={{ participantActive, setMeetingId }}>
      {children}
    </ParticipantActiveContext.Provider>
  );
};



// UserMeetingDataProvider
export const UserMeetingDataProvider = ({ children }) => {
  const [userMeetingData, setUserMeetingData] = useState([]);
  const [uniqueIdFilter, setUniqueIdFilter] = useState(""); // State to store the uniqueId filter

  const getMeetingData = async (userId, uniqueId) => {
    try {
      const collectionRef = collection(db, "UserMeetingData");

      // Use a single query based on whether uniqueId is provided
      const q = uniqueId 
        ? query(collectionRef, where("uniqueId", "==", uniqueId)) 
        : query(collectionRef, where("userId", "==", userId));
      
      if (!uniqueId) {
        console.log("uniqueId not provided, querying by userId");
      }

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
 

      setUserMeetingData(data);
    } catch (e) {
      console.error("Error fetching user meeting data:", e);
      setUserMeetingData([]);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(uniqueIdFilter)
        if(user.uid && uniqueIdFilter){
        getMeetingData(user.uid, uniqueIdFilter);
        } // Fetch data based on userId and uniqueId
      } else {
        setUserMeetingData([]);
      }
    });

    return () => unsubscribe();
  }, [uniqueIdFilter]); // Re-run effect when uniqueIdFilter changes
  // console.log(uniqueIdFilter)
  return (
    <UserMeetingDataContext.Provider
      value={{ userMeetingData, setUniqueIdFilter }}
    >
      {children}
    </UserMeetingDataContext.Provider>
  );
};

// UserDataProvider
export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);

  const getUserData = async (userId) => {
    try {
      const collectionRef = collection(db, "userData");
      const q = query(collectionRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => doc.data());
      setUserData(data);
    } catch (e) {
      console.error("Error fetching user data:", e);
      setUserData([]);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user.uid);
      } else {
        setUserData([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserDataContext.Provider value={{ userData }}>
      {children}
    </UserDataContext.Provider>
  );
};

// UserProvider
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("Guest");

  const getUserNameForLoggedInUser = async (userId) => {
    try {
      const collectionRef = collection(db, "userData");
      const q = query(collectionRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const userNames = querySnapshot.docs.map((doc) => doc.data().userName);
      setUserName(userNames[0] || "Guest");
    } catch (error) {
      console.error("Error fetching userName from Firestore:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserNameForLoggedInUser(user.uid);
      } else {
        setUserName("Guest");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userName }}>
      {children}
    </UserContext.Provider>
  );
};

// EventsProvider
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "UserEvents"));
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events }}>
      {children}
    </EventsContext.Provider>
  );
};
