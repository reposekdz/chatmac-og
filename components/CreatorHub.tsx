import React from 'react';
import { ChartBarIcon, UsersIcon, CoinIcon, StarIcon } from './icons';

const StatCard: React.FC<{ title: string, value: string, change: string, icon: React.ElementType }> = ({ title, value, change, icon: Icon }) => (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg"><Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" /></div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            </div>
        </div>
        <p className="text-xs text-green-500 mt-2">{change}</p>
    </div>
);

const CreatorHub: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Creator Hub</h1>
                <p className="text-gray-600 dark:text-gray-400">Your central dashboard for earnings, subscriptions, and content.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Total Earnings" value="8,450 Coins" change="+1,200 this month" icon={CoinIcon} />
                <StatCard title="Subscribers" value="1,280" change="+52 this month" icon={UsersIcon} />
                <StatCard title="Impressions" value="2.1M" change="+15% this month" icon={ChartBarIcon} />
            </div>

            {/* Earnings Chart */}
            <div>
                <h2 className="text-xl font-bold mb-4">Monthly Earnings</h2>
                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 font-semibold">[Earnings Chart Placeholder]</p>
                </div>
            </div>

            {/* Management Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Payouts */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-lg mb-2">Payouts</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Your current balance is <span className="font-bold text-green-500">8,450 Coins</span>.</p>
                    <button className="w-full bg-green-500 text-white font-bold py-2 rounded-lg">Withdraw Funds</button>
                </div>
                {/* Sponsored Content */}
                 <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-lg mb-2">Sponsored Content</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">You have 2 pending partnership requests.</p>
                    <button className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg">Manage Partnerships</button>
                </div>
            </div>

        </div>
    );
};

export default CreatorHub;
