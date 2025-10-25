import React from "react";
import DashboardLayout from "./DashboardLayout";
import CertificateCard from "../../components/CertificateCard";

const StudentDashboard = () => {
  const certificates = [
    {
      id: 1,
      title: "BSc Computer Science",
      issuer: "Ahmadu Bello University",
      date: "2023-07-12",
      hash: "0xA91F...92D",
    },
    {
      id: 2,
      title: "Blockchain Developer Certificate",
      issuer: "ALX Africa",
      date: "2025-01-10",
      hash: "0xF54D...AC8",
    },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">My Certificates</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
