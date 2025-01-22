import React, { useEffect, useState } from "react";
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
  const [hours, setHours] = useState([]);
  const [weekdays, setWeekdays] = useState([]);

  const gettingUid = async () => {
    const userId = auth.currentUser?.uid;
    return userId;
  };
  const getData = async () => {
    const userId = await gettingUid();
    if (userId) {
      const MeetingData = await gettingAnalyticalData(userId);

      if (MeetingData) {
        const dates = MeetingData[0].map((doc) => new Date(doc.meetingDate)); // Convert to Date object
        const totalHours = MeetingData[0].map((doc) => doc.totalTime.hours);
        const filteredDates = dates.filter((date) => {
          const currentDate = new Date(); // Get today's date
          const targetDate = new Date(date); // Convert the date string to a Date object
        
          // Calculate the difference in milliseconds
          const timeDifference = targetDate - currentDate;
        
          // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
          const dayDifference = Math.abs(Math.ceil(timeDifference / (24 * 60 * 60 * 1000)));
        
          // Check if the difference is within 7 days (inclusive)
          return dayDifference >= 0 && dayDifference <= 7;
        });
        const dayOfWeek = filteredDates
          .filter((date) => !isNaN(date)) // Exclude null and invalid dates
          .map((date) => date.toLocaleDateString("en-US", { weekday: "long" })); // Get day names
        console.log(dayOfWeek);

        setWeekdays(dayOfWeek); // Output: [ 'Tuesday', 'Wednesday', ...
        setHours(totalHours);
        setMeetingData(MeetingData);
      } else {
        console.log("No MeetingData...");
      }
    } else {
      setTimeout(async () => {
        await getData();
      }, 1000);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();
  }, []);

  // Map hours to weekdays
  const mapHoursToWeekdays = () => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const hoursByDay = new Array(7).fill(0); // Initialize an array with 7 zeros

    weekdays.forEach((day, index) => {
      const dayIndex = daysOfWeek.indexOf(day);
      if (dayIndex !== -1) {
        hoursByDay[dayIndex] = hours[index]; // Assign hours to the corresponding day
      }
    });

    return hoursByDay;
  };
  console.log(hours);

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
        data: mapHoursToWeekdays(), // Use the mapped hours array
        backgroundColor: "rgba(54, 162, 235, 1)", // Blue color
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default AnalyticsChart;
