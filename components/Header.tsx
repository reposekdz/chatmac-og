import React from 'react';
import { SearchIcon, NotificationsIcon, MessagesIcon, CoinIcon } from './icons';
import { ProfileMode } from '../App';

interface HeaderProps {
    profileMode: ProfileMode;
    setProfileMode: (mode: ProfileMode) => void;
    coins: number;
}

const Header: React.FC<HeaderProps> = ({ profileMode, setProfileMode, coins }) => {
    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center space-x-8">
                        <a href="#" className="text-2xl font-bold text-orange-600">
                            ChatMac
                        </a>
                         <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-full flex items-center space-x-1 retro-button">
                            <button 
                                onClick={() => setProfileMode('public')}
                                className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors ${profileMode === 'public' ? 'bg-white dark:bg-gray-900 text-orange-600' : 'text-gray-600 dark:text-gray-300'}`}
                            >
                                Public
                            </button>
                             <button 
                                onClick={() => setProfileMode('private')}
                                className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors ${profileMode === 'private' ? 'bg-white dark:bg-gray-900 text-orange-600' : 'text-gray-600 dark:text-gray-300'}`}
                            >
                                Private
                            </button>
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
                            <span className="text-sm">{coins.toLocaleString()}</span>
                         </div>
                         <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200">
                            <MessagesIcon className="h-6 w-6" />
                        </button>
                        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200">
                            <NotificationsIcon className="h-6 w-6" />
                        </button>
                        <div className="flex-shrink-0">
                            <img
                                className="h-10 w-10 rounded-full"
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
