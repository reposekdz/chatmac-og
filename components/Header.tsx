import React, { useState } from 'react';
import { OrangeIcon, MessagesIcon, UserGroupIcon, CogIcon } from './icons';
import { View } from '../App';
import NavMenuModal from './NavMenuModal';
import WalletConnectButton from './WalletConnectButton';
import GlobalSearch from './GlobalSearch';

interface HeaderProps {
    setView: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ setView }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-4">
                    <button onClick={() => setView('home')} className="flex items-center space-x-2">
                        <OrangeIcon className="w-8 h-8 text-orange-500" />
                        <span className="text-xl font-bold text-gray-800 dark:text-gray-200 hidden sm:block">Orrange</span>
                    </button>
                </div>

                <div className="flex-grow flex items-center justify-center px-4">
                     <GlobalSearch setView={setView} />
                </div>

                <div className="flex items-center space-x-3">
                    <div className="hidden lg:flex items-center space-x-1">
                        <button onClick={() => setView('messages')} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><MessagesIcon className="w-6 h-6"/></button>
                        <button onClick={() => setView('groups')} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><UserGroupIcon className="w-6 h-6"/></button>
                        <button onClick={() => setView('settings')} className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><CogIcon className="w-6 h-6"/></button>
                    </div>

                    <WalletConnectButton />
                    
                    <button onClick={() => setView('profile')} className="flex-shrink-0 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 p-1 pr-3 rounded-full">
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