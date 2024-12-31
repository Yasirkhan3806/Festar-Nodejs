import React, { useState, useEffect,useRef } from "react";
import { db } from "../../../../Config/firebase";
import {
  collection,
  deleteDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import threeDots from "../icons/threeDotsIcon.png";

export default function DeleteGroup({ chatId }) {
  const [open, setOpen] = useState(false);

  const deleteGroup = async (chatId) => {
    try {
      const q = query(
        collection(db, "GroupMessages"),
        where("chatid", "==", chatId)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.error("No matching chat document found for chatId:", chatId);
        return false;
      }
      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);
      console.log("Group deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting group: ", error);
      return false;
    }
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (open && menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]); //

  return (
    <>
     <button
        onClick={(event) => {
          event.stopPropagation(); // Stops the click from propagating to the document listener
          setOpen((prev) => !prev); // Toggle the menu state
        }}
      >
        <img src={threeDots} alt="" className="h-[24px]" />
      </button>
      {open && (
        <div
          ref={menuRef}
          className="absolute bg-white p-2 rounded-lg shadow-md text-xs"
        >
          <button
            onClick={() => {
              deleteGroup(chatId);
              setOpen(false);
            }}
          >
            Delete Group
          </button>
        </div>
      )}
    </>
  );
}
