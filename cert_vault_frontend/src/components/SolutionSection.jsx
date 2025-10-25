import React from "react";
import { ShieldCheck, Lock, FileCheck, Zap } from "lucide-react"; // icons for visuals

const SolutionSection = () => {
  return (
    <section className="px-8 md:px-16 py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        {/* Heading */}
        <div>
          <h2 className="text-4xl font-bold text-gray-700">The Solution — <span className="text-pink-900">Certi</span><span className="text-yellow-600">Vault</span></h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mt-4">
            CertiVault is a <span className="text-pink-900 font-semibold">decentralized certificate management system </span> 
            built on the BlockDAG blockchain. It enables institutions to issue, store, and verify 
            certificates securely, while giving users full control over their data.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-pink-50 p-6 rounded-2xl shadow hover:shadow-lg transition text-left">
            <ShieldCheck className="text-pink-900 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Decentralized Issuance</h3>
            <p className="text-gray-600 mt-2">
              Institutions issue certificates that are cryptographically verified and stored on the blockchain.
            </p>
          </div>

          <div className="bg-pink-50 p-6 rounded-2xl shadow hover:shadow-lg transition text-left">
            <Lock className="text-pink-900 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">User Data Control</h3>
            <p className="text-gray-600 mt-2">
              Students own their certificates and manage access via private keys and permissions.
            </p>
          </div>

          <div className="bg-pink-50 p-6 rounded-2xl shadow hover:shadow-lg transition text-left">
            <FileCheck className="text-pink-900 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Instant Verification</h3>
            <p className="text-gray-600 mt-2">
              Employers and institutions can instantly verify authenticity through hash-based proofs.
            </p>
          </div>

          <div className="bg-pink-50 p-6 rounded-2xl shadow hover:shadow-lg transition text-left">
            <Zap className="text-pink-900 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Powered by BlockDAG</h3>
            <p className="text-gray-600 mt-2">
              BlockDAG ensures scalability and fast validation with parallel transaction processing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
