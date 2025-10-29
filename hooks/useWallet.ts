import { useState, useCallback } from 'react';

export interface WalletState {
    address: string | null;
    isConnected: boolean;
    balance: number;
}

export const useWallet = () => {
    const [wallet, setWallet] = useState<WalletState>({
        address: null,
        isConnected: false,
        balance: 0,
    });
    const [loading, setLoading] = useState(false);

    const connect = useCallback(() => {
        setLoading(true);
        // Simulate async connection
        setTimeout(() => {
            setWallet({
                address: '0x1234...5678',
                isConnected: true,
                balance: 1.25,
            });
            setLoading(false);
        }, 1500);
    }, []);

    const disconnect = useCallback(() => {
        setWallet({
            address: null,
            isConnected: false,
            balance: 0,
        });
    }, []);

    return { ...wallet, loading, connect, disconnect };
};
