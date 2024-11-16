import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Time Spent on Calls (hrs)',
        data: [1.5, 2, 0.5, 3, 1.2, 0, 1], // Example data for calls
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Time Spent on Meetings (hrs)',
        data: [2, 1, 3, 2.5, 0, 1.8, 2.2], // Example data for meetings
        backgroundColor: 'rgba(54, 162, 235, 1)', // Red color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
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
