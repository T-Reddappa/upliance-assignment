import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const CounterChart = () => {
  const counterValues = useSelector(
    (state: RootState) => state.counter.countHistory
  );

  const data = {
    labels: counterValues.map((_, index) => `Count ${index + 1}`),
    datasets: [
      {
        label: "Counter Value",
        data: counterValues,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: true,
      },
    ],
  };

  // You can also add options for more customization
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Counter Trend",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-[70%] m-auto">
      <h2 className="text-2xl font-semibold">Counter Trend</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default CounterChart;
