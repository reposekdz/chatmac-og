import React from 'react';
import { SearchIcon, NotificationsIcon, MessagesIcon, CoinIcon, ExploreIcon, HomeIcon } from './icons';
import { ProfileMode, View } from '../App';

interface HeaderProps {
    profileMode: ProfileMode;
    setProfileMode: (mode: ProfileMode) => void;
    coins: number;
    setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ profileMode, setProfileMode, coins, setView }) => {
    
    const modes: {key: ProfileMode, label: string}[] = [
        { key: 'public', label: 'Public' },
        { key: 'private', label: 'Private' },
        { key: 'work', label: 'Work Mode' },
        { key: 'stealth', label: 'Stealth Mode' },
    ];

    const currentModeLabel = modes.find(m => m.key === profileMode)?.label;

    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <div className="flex items-center space-x-4 md:space-x-8">
                        <a href="#" className="text-2xl font-bold text-orange-500">
                            ChatMac
                        </a>
                         <div className="relative hidden md:block">
                           <select 
                                value={profileMode}
                                onChange={(e) => setProfileMode(e.target.value as ProfileMode)}
                                className="appearance-none bg-gray-200 dark:bg-gray-700 p-2 rounded-full font-semibold text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 retro-button pr-8"
                           >
                                {modes.map(mode => (
                                    <option key={mode.key} value={mode.key}>{mode.label}</option>
                                ))}
                           </select>
                        </div>
                    </div>
                    
                    <div className="hidden md:block flex-1 max-w-xl mx-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            </div>
                            <input
                                id="search"
                                name="search"
                                className="block w-full bg-gray-100 dark:bg-gray-800 border border-transparent rounded-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:text-gray-900 dark:text-gray-100 focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                placeholder="Search ChatMac"
                                type="search"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-4">
                         <div className="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 font-bold px-3 py-1.5 rounded-full">
                            <CoinIcon className="w-5 h-5" />
                            <span className="text-sm hidden sm:inline">{coins.toLocaleString()}</span>
                         </div>
                         <div className="flex items-center md:hidden">
                            <button onClick={() => setView('explore')} className="p-2 rounded-full text-gray-500 dark:text-gray-400"><ExploreIcon className="h-6 w-6" /></button>
                            <button onClick={() => setView('messages')} className="p-2 rounded-full text-gray-500 dark:text-gray-400"><MessagesIcon className="h-6 w-6" /></button>
                             <button onClick={() => setView('notifications')} className="p-2 rounded-full text-gray-500 dark:text-gray-400"><NotificationsIcon className="h-6 w-6" /></button>
                         </div>
                        <div className="flex-shrink-0" onClick={() => setView('profile')}>
                            <img
                                className="h-10 w-10 rounded-full cursor-pointer"
                                src="https://picsum.photos/id/1005/50/50"
                                alt="User avatar"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;