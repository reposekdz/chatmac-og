import React, { useState } from 'react';
import { AdCampaign } from '../types';
import { MegaphoneIcon, CoinIcon, PlusCircleIcon, ChartBarIcon } from './icons';

const initialAds: AdCampaign[] = [
    { id: 1, name: 'My Photography Portfolio', status: 'Active', budget: 5000, impressions: 152340, clicks: 1280 },
    { id: 2, name: 'Summer Merch Sale', status: 'Ended', budget: 10000, impressions: 345890, clicks: 2540 },
];

const AdsManager: React.FC<{ coins: number, setCoins: (c: number | ((prev:number) => number)) => void }> = ({ coins, setCoins }) => {
    const [campaigns, setCampaigns] = useState(initialAds);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card space-y-6">
             <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Ads Manager</h1>
                    <p className="text-gray-600 dark:text-gray-400">Promote your content and reach a wider audience.</p>
                </div>
                <button className="flex items-center space-x-2 bg-green-500 text-white font-bold py-2 px-4 rounded-full text-sm">
                    <PlusCircleIcon className="w-5 h-5"/>
                    <span>New Campaign</span>
                </button>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex justify-between items-center">
                <div>
                    <p className="text-sm font-semibold text-orange-800 dark:text-orange-200">Advertising Balance</p>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-300">{coins.toLocaleString()} Coins</p>
                </div>
                <button className="text-sm font-bold text-orange-600">Add Funds</button>
            </div>
            
            <div>
                 <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Your Campaigns</h2>
                 <div className="space-y-3">
                    {campaigns.map(ad => (
                        <div key={ad.id} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <p className="font-bold">{ad.name}</p>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ad.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{ad.status}</span>
                            </div>
                            <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                                <div><p className="text-gray-500">Budget</p><p className="font-semibold">{ad.budget.toLocaleString()} Coins</p></div>
                                <div><p className="text-gray-500">Impressions</p><p className="font-semibold">{ad.impressions.toLocaleString()}</p></div>
                                <div><p className="text-gray-500">Clicks</p><p className="font-semibold">{ad.clicks.toLocaleString()}</p></div>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

        </div>
    );
};

export default AdsManager;
