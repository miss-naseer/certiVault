import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, FileText, Users, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-blue-600 mb-10">CertiVault</h2>
        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
          >
            <FileText size={20} />
            Certificates
          </Link>
          <Link
            to="#"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
          >
            <Users size={20} />
            Users
          </Link>
        </nav>
      </div>

      <button className="flex items-center gap-3 text-gray-600 hover:text-red-500">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
