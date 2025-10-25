import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </header>

        <DashboardCards />
      </main>
    </div>
  );
};

export default Dashboard;
