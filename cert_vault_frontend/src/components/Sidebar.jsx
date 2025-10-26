// src/components/Sidebar.jsx
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Certificates", icon: FileText, path: "/certificates" },
    { name: "Issue Certificate", icon: FileText, path: "/issue" },
    { name: "Verify Certificate", icon: CheckCircle, path: "/verify" },
    { name: "Users", icon: Users, path: "/users" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white shadow-md flex flex-col justify-between transition-all duration-300`}
    >
      {/* Top Section */}
      <div>
        <div className="flex items-center justify-between p-4 border-b">
          <h1
            className={`text-3xl font-bold text-pink-900 ${
              collapsed ? "hidden" : "block"
            }`}
          >
            Certi<span className="text-yellow-600">Vault</span>
          </h1>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-pink-900"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md mx-2 ${
                  isActive
                    ? "bg-pink-100 text-pink-900 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profile Section */}
      <div className="border-t p-4 flex items-center gap-3">
        <img
          src="https://ui-avatars.com/api/?name=?&background=ddd&color=555&size=100&font-size=0.4"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">
              Admin User
            </span>
            <span className="text-xs text-gray-500">Administrator</span>
          </div>
        )}
        <button className="ml-auto text-gray-500 hover:text-pink-900">
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
