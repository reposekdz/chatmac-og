import React from 'react';
import { HomeIcon, ExploreIcon, MessagesIcon, MoreIcon, PlusCircleIcon } from './icons';
import { View } from '../App';

interface BottomNavProps {
    activeView: View;
    setView: (view: View) => void;
    openCreatePostModal: () => void;
    openNavMenu: () => void;
}

const NavItem: React.FC<{ view: View, label: string, icon: React.ElementType, active: boolean, onClick: () => void }> = ({ view, label, icon: Icon, active, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full transition-colors ${active ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}>
        <Icon className="w-6 h-6" />
        <span className="text-[10px] font-semibold mt-1">{label}</span>
    </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setView, openCreatePostModal, openNavMenu }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 z-50 flex items-center justify-around px-2 lg:hidden">
            <NavItem view="home" label="Home" icon={HomeIcon} active={activeView === 'home'} onClick={() => setView('home')} />
            <NavItem view="explore" label="Explore" icon={ExploreIcon} active={activeView === 'explore'} onClick={() => setView('explore')} />

            <button onClick={openCreatePostModal} className="w-16 h-16 -mt-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse-subtle">
                <PlusCircleIcon className="w-8 h-8"/>
            </button>

            <NavItem view="messages" label="Messages" icon={MessagesIcon} active={activeView === 'messages'} onClick={() => setView('messages')} />
            <button onClick={openNavMenu} className={`flex flex-col items-center justify-center w-full text-gray-500 dark:text-gray-400`}>
                <MoreIcon className="w-6 h-6" />
                <span className="text-[10px] font-semibold mt-1">More</span>
            </button>
        </div>
    );
};

export default BottomNav;