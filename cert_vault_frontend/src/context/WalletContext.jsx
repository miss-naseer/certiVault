import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WalletContext = createContext();

export function WalletProvider({ children }) {
    const [account, setAccount] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const navigate = useNavigate();

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert('Please install MetaMask to use this application');
            return;
        }

        setIsConnecting(true);
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            setAccount(accounts[0]);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error connecting wallet:', error);
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setAccount('');
        navigate('/');
    };

    // Handle account changes
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                } else {
                    setAccount('');
                    navigate('/');
                }
            });
        }
    }, [navigate]);

    return (
        <WalletContext.Provider value={{
            account,
            isConnecting,
            connectWallet,
            disconnectWallet
        }}>
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => useContext(WalletContext);