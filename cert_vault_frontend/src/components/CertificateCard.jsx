import React from "react";
import { FileText, CheckCircle } from "lucide-react";

const CertificateCard = ({ cert }) => (
  <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
    <div className="flex items-center justify-between mb-3">
      <FileText className="text-blue-500" />
      <CheckCircle className="text-green-500" />
    </div>
    <h2 className="text-lg font-bold">{cert.title}</h2>
    <p className="text-sm text-gray-600">{cert.issuer}</p>
    <p className="text-xs text-gray-400 mt-1">Issued: {cert.date}</p>
    <p className="text-xs text-gray-500 truncate mt-2">
      Blockchain Hash: {cert.hash}
    </p>
  </div>
);

export default CertificateCard;
