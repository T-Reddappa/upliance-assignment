import React from "react";
import useBackgroundColor from "../hooks/useBackgroundColor";
import CounterChart from "../components/CounterChart";

const Dashboard = () => {
  const backgroundColor = useBackgroundColor();

  return (
    <div style={{ backgroundColor }} className="p-10 w-full min-h-svh">
      <div>
        <CounterChart />
      </div>
    </div>
  );
};

export default Dashboard;
