import React from 'react';
import { HomeIcon, ExploreIcon, NotificationsIcon, MessagesIcon, MarketplaceIcon, TrophyIcon, MapIcon, UsersIcon, SpeakerWaveIcon, SunIcon, MoonIcon, DesktopComputerIcon, ShieldExclamationIcon, EyeOffIcon, SparklesIcon, ViewBoardsIcon, CloudArrowDownIcon, CogIcon, FilmIcon, MegaphoneIcon, ProfileIcon, XIcon } from './icons';
import { View, Theme, Mood } from '../App';

interface NavLinkProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick: () => void;
    onClose: () => void;
    setView: (view: View) => void;
    view: View;
}

const NavLink: React.FC<NavLinkProps> = ({ icon: Icon, label, active, view, setView, onClose }) => (
    <button onClick={() => { setView(view); onClose(); }} className={`flex items-center w-full space-x-4 p-3 rounded-xl transition-colors ${active ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
        <Icon className="w-6 h-6" />
        <span className="text-base">{label}</span>
    </button>
);

interface NavMenuModalProps {
    onClose: () => void;
    activeView: View;
    setView: (view: View) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    isAntiToxic: boolean;
    setIsAntiToxic: (value: boolean) => void;
    isInvisible: boolean;
    setIsInvisible: (value: boolean) => void;
    mood: Mood;
    setMood: (mood: Mood) => void;
    isSplitScreen: boolean;
    setIsSplitScreen: (value: boolean) => void;
    isOffline: boolean;
    setIsOffline: (value: boolean) => void;
    offlineQueueCount: number;
    setCreatePostModalOpen: (isOpen: boolean) => void;
}

const NavMenuModal: React.FC<NavMenuModalProps> = (props) => {
    const { onClose, activeView, setView, theme, setTheme, isAntiToxic, setIsAntiToxic, isInvisible, setIsInvisible, mood, setMood, isSplitScreen, setIsSplitScreen, isOffline, setIsOffline, offlineQueueCount } = props;

    const navItems: { view: View; icon: React.ElementType; label: string }[] = [
        { view: 'profile', icon: ProfileIcon, label: 'Profile' },
        { view: 'notifications', icon: NotificationsIcon, label: 'Notifications' },
        { view: 'marketplace', icon: MarketplaceIcon, label: 'Marketplace' },
        { view: 'challenges', icon: TrophyIcon, label: 'Challenges' },
        { view: 'journey', icon: MapIcon, label: 'My Journey' },
        { view: 'rooms', icon: UsersIcon, label: 'Local Rooms' },
        { view: 'stage', icon: SpeakerWaveIcon, label: 'Open Stage' },
        { view: 'ads', icon: MegaphoneIcon, label: 'Ads Manager' },
        { view: 'settings', icon: CogIcon, label: 'Settings' },
    ];
     const moods: { name: Mood, label: string, color: string }[] = [ { name: 'default', label: 'Default', color: 'bg-orange-500'}, { name: 'chill', label: 'Chill', color: 'bg-blue-500'}, { name: 'focus', label: 'Focus', color: 'bg-gray-500'}, { name: 'hype', label: 'Hype', color: 'bg-pink-500'}, ]

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-end" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-t-2xl w-full max-h-[80vh] overflow-y-auto pb-6 animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10">
                    <button onClick={onClose} className="absolute top-4 right-4 p-1"><XIcon className="w-5 h-5"/></button>
                    <h2 className="text-xl font-bold text-center">Menu</h2>
                </div>
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 gap-1">
                     {navItems.map(item => (
                        <NavLink 
                            key={item.view}
                            icon={item.icon} 
                            label={item.label} 
                            active={activeView === item.view}
                            view={item.view}
                            setView={setView}
                            onClose={onClose}
                        />
                     ))}
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                         <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 card space-y-2 border dark:border-gray-800">
                            <h3 className="font-bold text-gray-800 dark:text-gray-200 px-2 pb-1">Appearance</h3>
                            <div className="flex justify-around items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                                <button onClick={() => setTheme('light')} className={`p-2 rounded-lg ${theme === 'light' ? 'bg-orange-500 text-white' : 'text-gray-500 dark:text-gray-400'}`}><SunIcon className="w-5 h-5"/></button>
                                <button onClick={() => setTheme('dark')} className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-orange-500 text-white' : 'text-gray-500 dark:text-gray-400'}`}><MoonIcon className="w-5 h-5"/></button>
                                <button onClick={() => setTheme('retro')} className={`p-2 rounded-lg ${theme === 'retro' ? 'bg-orange-500 text-white' : 'text-gray-500 dark:text-gray-400'}`}><DesktopComputerIcon className="w-5 h-5"/></button>
                            </div>
                            <div className="p-2">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2"><SparklesIcon className="w-5 h-5 text-pink-500" /><span className="text-sm font-semibold">Mood</span></div>
                                    <span className="text-sm font-bold text-pink-500 capitalize">{mood}</span>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {moods.map(m => <button key={m.name} onClick={() => setMood(m.name)} className={`h-8 rounded-lg ${m.color} ${mood === m.name ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-black dark:ring-white' : ''}`}></button>)}
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavMenuModal;
