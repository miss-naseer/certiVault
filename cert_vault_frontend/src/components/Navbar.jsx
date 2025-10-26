import React, { useState } from "react";
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { account, connectWallet, disconnectWallet, isConnecting } = useWallet();
  const navigate = useNavigate();

  const handleWalletClick = async () => {
    if (account) {
      disconnectWallet();
    } else {
      await connectWallet();
      navigate('/dashboard');
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-pink-900">Certi<span className="text-yellow-500">Vault</span></div>

        {/* Menu links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li><a href="#home" className="hover:text-pink-600">Home</a></li>
          <li><a href="#about" className="hover:text-pink-600">About</a></li>
          <li><a href="#features" className="hover:text-pink-600">Features</a></li>
          <li><a href="#contact" className="hover:text-pink-600">Contact</a></li>
        </ul>

        {/* Button */}
        <button 
          onClick={handleWalletClick}
          disabled={isConnecting}
          className={`hidden md:block bg-pink-900 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition
            ${isConnecting 
              ? 'bg-pink-900/70 cursor-not-allowed'
              : account 
                ? 'bg-pink-700 hover:bg-pink-800'
                : 'bg-pink-900 hover:bg-pink-800'
            }`}
        >
          {isConnecting ? (
            'Connecting...'
          ) : account ? (
            `${account.slice(0, 6)}...${account.slice(-4)}`
          ) : (
            'Connect Wallet'
          )}
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" 
               fill="none" 
               viewBox="0 0 24 24" 
               strokeWidth={1.5} 
               stroke="currentColor" 
               className="w-6 h-6">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <li><a href="#home" className="hover:text-pink-600">Home</a></li>
            <li><a href="#about" className="hover:text-pink-600">About</a></li>
            <li><a href="#features" className="hover:text-pink-600">Features</a></li>
            <li><a href="#contact" className="hover:text-pink-600">Contact</a></li>
            <button 
              onClick={handleWalletClick}
              disabled={isConnecting}
              className={`bg-pink-900 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition
                ${isConnecting 
                  ? 'bg-pink-900/70 cursor-not-allowed'
                  : account 
                    ? 'bg-pink-700 hover:bg-pink-800'
                    : 'bg-pink-900 hover:bg-pink-800'
                }`}
            >
              {isConnecting ? (
                'Connecting...'
              ) : account ? (
                `${account.slice(0, 6)}...${account.slice(-4)}`
              ) : (
                'Connect Wallet'
              )}
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
