import React, { useState } from 'react';
import { ClockIcon, ShieldCheckIcon } from './icons';

const Settings: React.FC = () => {
    const [autoReset, setAutoReset] = useState(false);
    const [resetDuration, setResetDuration] = useState('30');

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card space-y-8">
             <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage your account and application settings.</p>
            </div>
            
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b pb-2">Privacy</h2>

                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold text-lg flex items-center space-x-2"><ClockIcon className="w-5 h-5"/><span>Auto Privacy Reset</span></h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Automatically hide your public posts after a certain period.</p>
                    </div>
                     <button onClick={() => setAutoReset(!autoReset)} className={`w-12 h-7 rounded-full p-1 flex items-center transition-colors ${autoReset ? 'bg-green-500 justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}>
                        <div className="w-5 h-5 bg-white rounded-full transition-transform"></div>
                    </button>
                </div>

                {autoReset && (
                    <div className="pl-8">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hide posts after:</label>
                        <select 
                            id="duration"
                            value={resetDuration}
                            onChange={(e) => setResetDuration(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                        >
                            <option value="30">30 days</option>
                            <option value="60">60 days</option>
                            <option value="90">90 days</option>
                        </select>
                    </div>
                )}
            </div>

             <div className="space-y-6 pt-6 border-t">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b pb-2">Content</h2>
                <div className="flex items-center justify-between">
                     <div>
                        <h3 className="font-semibold text-lg">Content Moderation</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage what you see.</p>
                    </div>
                    <button className="text-sm font-bold text-orange-500">Customize</button>
                </div>
             </div>

        </div>
    );
};

export default Settings;
