import React from "react";
import heroImage from "../assets/Hero.svg"; // adjust path if needed

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16 bg-white">
      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-5xl md:text-6xl pt-15 font-extrabold text-pink-900 leading-tight">
          Certi<span className="text-yellow-500">Vault</span>
        </h1>

        <h2 className="text-3xl md:text-3xl text-gray-700 font-medium">
          Secure Academic & Identity Verification System
        </h2>
        
        <p className="text-gray-600 font-bold text-lg md:text-xl max-w-md mx-auto md:mx-0">
          “Your Certificate, Your Control.”
        </p>
        <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto md:mx-0">
          Empowering institutions, employers, and individuals with a secure, 
          decentralized certificate management platform built on BlockDAG.
        </p>

        <div>
          <button className="mt-4 px-8 py-3 bg-pink-900 text-white font-semibold rounded-full shadow hover:bg-pink-700 transition">
            Explore CertiVault
          </button>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className=" md:w-1/2 md:mt-0 flex justify-center">
        <img
          src={heroImage}
          alt="CertiVault Hero Illustration"
          className="w-full h-auto pt-10 mt-6 object-cover max-w-md md:max-w-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
