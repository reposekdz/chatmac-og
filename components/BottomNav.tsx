import React from 'react';
import { HomeIcon, ExploreIcon, MessagesIcon, NotificationsIcon, PlusCircleIcon } from './icons';
import { View } from '../App';

interface BottomNavProps {
    setView: (view: View) => void;
    activeView: View;
    setCreatePostModalOpen: (isOpen: boolean) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ setView, activeView, setCreatePostModalOpen }) => {
    const navItems = [
        { view: 'home', icon: HomeIcon },
        { view: 'explore', icon: ExploreIcon },
        { view: 'create', icon: PlusCircleIcon, isCentral: true },
        { view: 'messages', icon: MessagesIcon },
        { view: 'notifications', icon: NotificationsIcon },
    ];
    
    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 shadow-t-lg z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map(item => (
                    <button 
                        key={item.view} 
                        onClick={() => item.isCentral ? setCreatePostModalOpen(true) : setView(item.view as View)}
                        className={`p-2 rounded-full transition-colors ${item.isCentral ? '-mt-8' : ''}`}
                    >
                        {item.isCentral ? (
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-full text-white shadow-lg animate-pulse-subtle">
                                <item.icon className="w-8 h-8"/>
                            </div>
                        ) : (
                             <item.icon className={`w-7 h-7 ${activeView === item.view ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'}`}/>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;