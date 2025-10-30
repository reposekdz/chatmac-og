import React from 'react';
import { HomeIcon, ExploreIcon, NotificationsIcon, MessagesIcon, BookmarksIcon, ProfileIcon, CogIcon, XIcon, MarketplaceIcon, TrophyIcon, MapIcon, UsersIcon, SpeakerWaveIcon, MegaphoneIcon, FilmIcon } from './icons';
import { View } from '../App';

interface NavMenuModalProps {
    onClose: () => void;
    setView: (view: View) => void;
}

const NavMenuModal: React.FC<NavMenuModalProps> = ({ onClose, setView }) => {
    // FIX: Explicitly type navItems to prevent TypeScript from widening the 'view' property to a generic string.
     const navItems: { view: View; icon: React.ElementType; label: string }[] = [
        { view: 'home', icon: HomeIcon, label: 'Home' },
        { view: 'explore', icon: ExploreIcon, label: 'Explore' },
        { view: 'reels', icon: FilmIcon, label: 'Reels' },
        { view: 'notifications', icon: NotificationsIcon, label: 'Notifications' },
        { view: 'messages', icon: MessagesIcon, label: 'Messages' },
        { view: 'marketplace', icon: MarketplaceIcon, label: 'Marketplace' },
        { view: 'challenges', icon: TrophyIcon, label: 'Challenges' },
        { view: 'journey', icon: MapIcon, label: 'My Journey' },
        { view: 'rooms', icon: UsersIcon, label: 'Local Rooms' },
        { view: 'stage', icon: SpeakerWaveIcon, label: 'Open Stage' },
        { view: 'ads', icon: MegaphoneIcon, label: 'Ads Manager' },
        { view: 'profile', icon: ProfileIcon, label: 'Profile' },
        { view: 'settings', icon: CogIcon, label: 'Settings' },
    ];
    
    const handleNavClick = (view: View) => {
        setView(view);
        onClose();
    }
    
    return (
        <div className="fixed inset-0 bg-black/50 z-[100] animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 h-full w-4/5 max-w-sm shadow-xl animate-slide-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="font-bold text-lg">Menu</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map(item => (
                         <button key={item.view} onClick={() => handleNavClick(item.view)} className="flex items-center w-full space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                            <item.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            <span className="text-lg font-semibold">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default NavMenuModal;