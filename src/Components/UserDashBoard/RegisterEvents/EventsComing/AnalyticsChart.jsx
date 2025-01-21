import React, { useEffect,useState } from "react";
import { gettingAnalyticalData } from "./gettingAnalyticalData";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { auth } from "../../../../Config/firebase";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




const AnalyticsChart = () => {
  const [meetingData, setMeetingData] = useState([]); // State to store meeting data
  const [hours,setHours] = useState("");
  const [weekdays,setWeekdays] = useState([])

  const getData = async () => {
    const userId = auth.currentUser?.uid;
    const MeetingData = await gettingAnalyticalData(userId);
    if (MeetingData) {
      const dates = MeetingData[0].map((doc) => new Date(doc.meetingDate)); // Convert to Date object
      const totalHours = MeetingData[0].map((doc) => doc.totalTime.hours);
  
      const dayOfWeek = dates
      .filter((date) => date && !isNaN(date)) // Exclude null and invalid dates
      .map((date) => date.toLocaleDateString('en-US', { weekday: 'long' })); // Get day names

      setWeekdays(dayOfWeek); // Output: [ 'Tuesday', 'Wednesday', ...
      setHours(totalHours);
      setMeetingData(MeetingData);
    } else {
      console.log("No MeetingData...");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
  
    fetchData();
  }, []);
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Time Spent on Meetings (hrs)",
        data: hours, // Example data for meetings
        backgroundColor: "rgba(54, 162, 235, 1)", // Red color
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Hours",
        },
      },
    },
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-md">
      {/* <h2 className="text-center font-semibold text-lg mb-4">Weekly Activity: Calls & Meetings</h2> */}
      <Bar data={data} options={options} />
    </div>
  );
};

export default AnalyticsChart;
