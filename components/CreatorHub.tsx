
import React from 'react';
import { ChartBarIcon, UsersIcon, CoinIcon, ArrowTrendingUpIcon } from './icons';

const CreatorHub: React.FC = () => {
    const stats = [
        { label: 'Followers', value: '1.2k', change: '+12%', icon: UsersIcon, color: 'text-blue-500' },
        { label: 'Impressions (7d)', value: '89.4k', change: '+22.5%', icon: ArrowTrendingUpIcon, color: 'text-green-500' },
        { label: 'Earnings (30d)', value: '1,250', change: '+5%', icon: CoinIcon, color: 'text-yellow-500' },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Creator Hub</h1>
                <p className="text-gray-600 dark:text-gray-400">Your analytics and tools in one place.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map(stat => (
                    <div key={stat.label} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                        <p className="text-sm text-green-600 font-semibold">{stat.change}</p>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Audience Growth</h2>
                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                        <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto"/>
                        <p className="text-gray-500 font-semibold mt-2">[Audience Growth Chart Placeholder]</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorHub;
