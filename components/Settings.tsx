
import React from 'react';
import { ShieldCheckIcon, NotificationsIcon, ShieldExclamationIcon, ProfileIcon } from './icons';

const Settings: React.FC = () => {
    
    const settingsSections = [
        { name: "Account", icon: ProfileIcon },
        { name: "Security & Privacy", icon: ShieldExclamationIcon },
        { name: "Notifications", icon: NotificationsIcon },
        { name: "Content Moderation", icon: ShieldCheckIcon },
    ];
    
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 card">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                 <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
            </div>
            <div className="md:grid md:grid-cols-3">
                <div className="md:col-span-1 p-6 border-r border-gray-200 dark:border-gray-800">
                    <nav className="space-y-2">
                        {settingsSections.map(section => (
                             <button key={section.name} className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
                                <section.icon className="w-6 h-6 text-gray-500"/>
                                <span className="font-semibold">{section.name}</span>
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="md:col-span-2 p-6">
                    <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
                    {/* Placeholder for form fields */}
                    <p>Details for the selected settings category would appear here.</p>
                </div>
            </div>
        </div>
    );
}

export default Settings;
