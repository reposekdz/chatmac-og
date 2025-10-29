import React from 'react';
import { MarketplaceItem } from '../types';

const marketplaceData: MarketplaceItem[] = [
    { id: 1, name: 'Premium Profile Badge', seller: 'ChatMac Store', priceUSD: 4.99, priceCoins: 5000, imageUrl: 'https://picsum.photos/id/12/300/300' },
    { id: 2, name: 'Neon Profile Theme', seller: 'ChatMac Store', priceUSD: 2.99, priceCoins: 3000, imageUrl: 'https://picsum.photos/id/15/300/300' },
    { id: 3, name: 'Creator Merch Hoodie', seller: '@elenacodes', priceUSD: 39.99, priceCoins: 40000, imageUrl: 'https://picsum.photos/id/1074/300/300' },
    { id: 4, name: 'Photography Print', seller: '@samgoesplaces', priceUSD: 19.99, priceCoins: 20000, imageUrl: 'https://picsum.photos/id/1039/300/300' },
];

interface MarketplaceProps {
    coins: number;
    setCoins: (coins: number | ((prev: number) => number)) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ coins, setCoins }) => {
    
    const handlePurchase = (item: MarketplaceItem) => {
        if (coins >= item.priceCoins) {
            setCoins(prev => prev - item.priceCoins);
            alert(`You successfully purchased "${item.name}"!`);
        } else {
            alert("You don't have enough coins!");
        }
    }

    return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketplaceData.map(item => (
            <div key={item.id} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex flex-col">
                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">by {item.seller}</p>
                <div className="flex-grow"></div>
                <div className="mt-4 flex flex-col space-y-2">
                     <p className="text-right text-xl font-bold text-gray-800 dark:text-gray-200">${item.priceUSD.toFixed(2)}</p>
                     <button 
                        onClick={() => handlePurchase(item)}
                        className="w-full bg-yellow-400 text-yellow-900 font-bold py-2 rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={coins < item.priceCoins}
                    >
                        Buy with {item.priceCoins.toLocaleString()} Coins
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
    );
};

export default Marketplace;
