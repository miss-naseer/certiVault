import React from "react";

const ProblemSection = () => {
  return (
    <section className="px-8 md:px-16 py-20 bg-pink-50">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h2 className="text-5xl font-bold text-gray-700">
          The Problem
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Academic certificate forgery and fake credentials are widespread globally. 
          Verification processes remain slow, costly, and mostly manual. 
          Institutions and employers struggle with issues of authenticity, 
          privacy, and trust — while centralized databases remain vulnerable 
          to hacks and unauthorized access.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-yellow-600 underline">Forgery</h3>
            <p className="text-gray-600 mt-2">
              Fake or altered certificates circulate widely, damaging credibility.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-yellow-600 underline">Slow Verification</h3>
            <p className="text-gray-600 mt-2">
              Institutions rely on manual checks and paper trails for validation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-yellow-600 underline">Privacy Concerns</h3>
            <p className="text-gray-600 mt-2">
              Centralized databases expose personal data to leaks and breaches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
