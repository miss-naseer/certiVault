import React from "react";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-pink-900 text-gray-300 px-8 md:px-20 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo and description */}
        <div>
          <h2 className="text-2xl font-bold bg-white px-2 py-2 rounded-full text-pink-900 mb-3">Certi<span className="text-yellow-600">Vault</span></h2>
          <p className="text-white leading-relaxed text-sm">
            Empowering authenticity through blockchain technology.
            CertiVault ensures that every certificate you share is verifiable,
            secure, and tamper-proof.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-500 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#hero" className="hover:text-pink-400 transition">Home</a></li>
            <li><a href="#solutions" className="hover:text-pink-400 transition">Solutions</a></li>
            <li><a href="#how-it-works" className="hover:text-pink-400 transition">How It Works</a></li>
            <li><a href="#contact" className="hover:text-pink-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-500 mb-3">Connect With Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-pink-400 transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-pink-400 transition"><Twitter size={20} /></a>
            <a href="#" className="hover:text-pink-400 transition"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-pink-400 transition"><Mail size={20} /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 border-t border-white pt-6 text-center text-sm text-white">
        © {new Date().getFullYear()} CertiVault. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
