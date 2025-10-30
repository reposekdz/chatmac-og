import React from 'react';
import { ChartBarIcon, ArrowTrendingUpIcon, UsersIcon } from './icons';
import { View } from '../App';

interface CreatorHubPreviewProps {
    setView: (view: View) => void;
}

const CreatorHubPreview: React.FC<CreatorHubPreviewProps> = ({ setView }) => {
    const stats = [
        { label: 'Impressions', value: '89.4k', change: '+22.5%', icon: ArrowTrendingUpIcon },
        { label: 'Followers', value: '1.2k', change: '+12%', icon: UsersIcon },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
            <div className="flex items-center space-x-2 mb-3">
                <ChartBarIcon className="w-6 h-6 text-green-500" />
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Creator Stats</h3>
            </div>
            <div className="space-y-3">
                {stats.map(stat => (
                    <div key={stat.label}>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <div className="flex items-baseline space-x-2">
                            <p className="font-bold text-xl">{stat.value}</p>
                            <p className="text-sm text-green-600 font-semibold">{stat.change}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => setView('creatorhub')} className="mt-4 text-sm font-bold text-orange-500 w-full text-center hover:underline">
                View Full Analytics
            </button>
        </div>
    );
};

export default CreatorHubPreview;
