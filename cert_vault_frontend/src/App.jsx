import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import IssueCertificate from "./pages/IssueCertificate";
import VerifyCertificate from "./pages/VerifyCertificate";
import ManageUsers from "./pages/ManageUsers";
import LandingPage from "./pages/LandingPage";
import StudentDigitalVault from "./pages/StudentDigitalVault";
import { WalletProvider } from "./context/WalletContext";

// Wrapper for dashboard layout
function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-pink-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <WalletProvider>
        <Routes>
          {/* Landing page has NO sidebar */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />

          {/* All dashboard/protected routes have the sidebar */}
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/certificates"
            element={
              <DashboardLayout>
                <StudentDigitalVault />
              </DashboardLayout>
            }
          />
          <Route
            path="/issue"
            element={
              <DashboardLayout>
                <IssueCertificate />
              </DashboardLayout>
            }
          />
          <Route
            path="/verify"
            element={
              <DashboardLayout>
                <VerifyCertificate />
              </DashboardLayout>
            }
          />
          <Route
            path="/users"
            element={
              <DashboardLayout>
                <ManageUsers />
              </DashboardLayout>
            }
          />
        </Routes>
      </WalletProvider>
    </Router>
  );
}