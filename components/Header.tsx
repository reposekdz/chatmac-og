import React, { useState } from 'react';
import { SearchIcon, HomeIcon, MessagesIcon, StarIcon, SunIcon, MoonIcon, UserGroupIcon, CogIcon } from './icons';
import { View } from '../App';
import NavMenuModal from './NavMenuModal';

interface HeaderProps {
    setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ setView }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-4">
                    <button onClick={() => setView('home')} className="flex items-center space-x-2">
                        <StarIcon className="w-8 h-8 text-orange-500" />
                        <span className="text-xl font-bold text-gray-800 dark:text-gray-200 hidden sm:block">ChatMac</span>
                    </button>
                    <div className="relative hidden md:block">
                        <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="text" placeholder="Search..." className="bg-gray-100 dark:bg-gray-800 rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none" />
                    </div>
                </div>

                <div className="hidden lg:flex items-center space-x-2">
                     <button onClick={() => setView('home')} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><HomeIcon className="w-6 h-6"/></button>
                     <button onClick={() => setView('messages')} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><MessagesIcon className="w-6 h-6"/></button>
                     <button onClick={() => setView('groups')} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><UserGroupIcon className="w-6 h-6"/></button>
                     <button onClick={() => setView('settings')} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><CogIcon className="w-6 h-6"/></button>
                </div>

                <div className="flex items-center space-x-3">
                    <button onClick={() => setView('profile')} className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 p-1 pr-3 rounded-full">
                        <img src="https://picsum.photos/id/1005/50/50" alt="My Profile" className="w-9 h-9 rounded-full" />
                        <span className="font-semibold text-sm hidden sm:block">Jane Doe</span>
                    </button>
                    <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                    </button>
                </div>
            </div>
        </header>
        {isMenuOpen && <NavMenuModal onClose={() => setIsMenuOpen(false)} setView={setView} />}
        </>
    );
};

export default Header;
