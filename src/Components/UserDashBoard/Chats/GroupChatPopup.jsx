import React, { useState, useEffect } from "react";
import IndividualChat from "./IndividualChat";
import CreateGroupChat from "./CreatingChatDB";
import getMembersDataByEmail from "./gettingMembersData";
import { use } from "react";

export default function GroupChatPopup({ setShowPopup }) {
  const [isGroupChat, setIsGroupChat] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [members, setMembers] = useState([""]);
  const [userIdsState, setUserIdsState] = useState([]);
  const [userData, setUserData] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Group_Pictures"); // Set your upload preset (see below)

    setIsUploading(true);

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dcvalsbfk/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      // Retrieve the image URL after upload
      const imageUrl = data.secure_url;
      setImageUrl(imageUrl);
      console.log("Uploaded image URL:", imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddMember = () => {
    setMembers([...members, ""]);
  };

  const handleChangeMemberEmail = async (index, value) => {
    try {
      // Update the email value in the members array
      const updatedMembers = [...members];
      updatedMembers[index] = value; // Keep the email as a string for the input field
      setMembers(updatedMembers);
  
      // Fetch user data asynchronously
      const fetchedMembers = await getMembersDataByEmail(value);
      if (fetchedMembers) {
        const { userIds, userDataList } = fetchedMembers;
  
        if (userDataList.length > 0) {
          // Update the userData state
          const updatedUserData = [...userData];
          updatedUserData[index] = userDataList[0]; // Add fetched user data at the same index
          setUserData(updatedUserData);
        }
  
        if (userIds && userIds.length > 0) {
          // Store the userId in a separate state or variable
          const updatedUserIds = [...userIdsState]; // Assume you have a `userIdsState` for this
          updatedUserIds[index] = userIds[0];
          setUserIdsState(updatedUserIds); // Store the userId separately
          // console.log("Updated userIds state:", updatedUserIds);
        }
      }
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  };
  

  const showPopup = () => {
    setShowPopup(false);
  };

  const createGroupChat = async () => {
    await CreateGroupChat(groupName, userIdsState, groupDescription, imageUrl,userData);
    setShowPopup(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <span className="flex justify-between">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Create Chat
          </h2>
          <button
            onClick={showPopup}
            className="text-blue-500 font-bold text-xl mb-6"
          >
            X
          </button>
        </span>
        {/* Chat type selection */}
        <div className="flex justify-between mb-4 gap-2">
          <button
            className={`w-1/2 py-2 border rounded-lg ${
              !isGroupChat ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsGroupChat(false)}
          >
            Individual Chat
          </button>
          <button
            className={`w-1/2 py-2 border rounded-lg ${
              isGroupChat ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsGroupChat(true)}
          >
            Group Chat
          </button>
        </div>

        {/* Group Chat Form */}
        {isGroupChat && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Group Image
              </label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="mb-2"
              />
              <p>{isUploading ? "uploading...." : ""}</p>
              <label className="block text-sm font-medium text-gray-700">
                Group Name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter group name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Group Description
              </label>
              <textarea
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter group description"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Add Members (Email)
              </label>
              {members.map((member, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="email"
                    value={
                      typeof member === "string" ? member : member.email || ""
                    }
                    onChange={(e) =>
                      handleChangeMemberEmail(index, e.target.value)
                    }
                    className="block w-full p-2 border rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Member ${index + 1} Email`}
                  />
                  {index === members.length - 1 && (
                    <button onClick={handleAddMember} className="text-blue-500">
                      Add Another
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => createGroupChat()}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg"
              >
                Create Group
              </button>
            </div>
          </div>
        )}
        {/* is individual Chat form */}
        {isGroupChat === false && <IndividualChat />}

        {/* Submit Button */}
      </div>
    </div>
  );
}
