import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { KeyIcon } from './icons';

const WalletConnectButton: React.FC = () => {
    const { isConnected, address, balance, loading, connect, disconnect } = useWallet();

    if (isConnected) {
        return (
            <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold text-green-800 dark:text-green-200">{address?.substring(0,6)}...</span>
                <button onClick={disconnect} className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">Disconnect</button>
            </div>
        )
    }

    return (
        <button 
            onClick={connect} 
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors disabled:bg-gray-400"
        >
            <KeyIcon className="w-5 h-5"/>
            <span>{loading ? 'Connecting...' : 'Connect Wallet'}</span>
        </button>
    );
};

export default WalletConnectButton;
