import React from "react";
import { FileCheck, Upload, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="flex min-h-screen bg-pink-50">

      {/* Main Dashboard Area */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-500">Welcome back, Admin 👋</p>
          </div>

          {/* Right-side Profile + Search */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search certificates..."
              className="px-3 py-2 border border-gray-500 rounded-lg w-64 focus:ring focus:ring-pink-700 outline-none"
            />
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full border"
            />
          </div>
        </header>

        {/* Quick Action Buttons */}
        <section className="flex flex-wrap gap-4 mb-8">
          <button
            className="flex items-center gap-2 px-5 py-3 bg-pink-900 text-white font-medium rounded-lg hover:bg-pink-700 transition"
            onClick={() => navigate("/issue")}
          >
            <Upload size={18} />
            Issue Certificate
          </button>

          <button
            className="flex items-center gap-2 px-5 py-3 bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-400 transition"
            onClick={() => navigate("/verify")}
          >
            <FileCheck size={18} />
            Verify Certificate
          </button>

          <button
            className="flex items-center gap-2 px-5 py-3 bg-pink-900 text-white font-medium rounded-lg hover:bg-pink-700 transition"
            onClick={() => navigate("/users")}
          >
            <Users size={18} />
            Manage Users
          </button>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-400 shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 mb-1">Total Certificates</p>
            <h2 className="text-3xl font-bold text-pink-600">128</h2>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-400 shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 mb-1">Verified Certificates</p>
            <h2 className="text-3xl font-bold text-green-600">117</h2>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-400 shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 mb-1">Pending Approvals</p>
            <h2 className="text-3xl font-bold text-yellow-500">11</h2>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-400 shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 mb-1">Registered Institutions</p>
            <h2 className="text-3xl font-bold text-gray-700">6</h2>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Recent Activity
          </h2>
          <div className="bg-white border border-gray-400 rounded-xl shadow-sm divide-y">
            {[
              {
                name: "John Doe",
                action: "Verified Degree Certificate",
                time: "2 mins ago",
              },
              {
                name: "Mary Smith",
                action: "Issued Certificate",
                time: "10 mins ago",
              },
              {
                name: "James Lee",
                action: "Viewed Certificate",
                time: "1 hour ago",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.action}</p>
                </div>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Clock size={14} /> {item.time}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;