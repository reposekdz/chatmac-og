import React from 'react';
import { HomeIcon, ExploreIcon, NotificationsIcon, MessagesIcon, BookmarksIcon, ProfileIcon, MarketplaceIcon, TrophyIcon, MapIcon, UsersIcon, SpeakerWaveIcon, MoreIcon, SunIcon, MoonIcon, DesktopComputerIcon, ShieldExclamationIcon, EyeOffIcon, SparklesIcon, ViewBoardsIcon, CloudArrowDownIcon, CogIcon, FireIcon, MegaphoneIcon, FilmIcon, AccessibilityIcon, ChartBarIcon, TicketIcon } from './icons';
import { View, Theme, Mood } from '../App';

interface NavLinkProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ icon: Icon, label, active, onClick }) => (
    <button onClick={onClick} className={`flex items-center w-full space-x-4 p-3 rounded-full transition-colors ${active ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
        <Icon className="w-7 h-7" />
        <span className="text-lg">{label}</span>
    </button>
);

interface LeftAsideProps {
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

const LeftAside: React.FC<LeftAsideProps> = (props) => {
    const { activeView, setView, theme, setTheme, isAntiToxic, setIsAntiToxic, isInvisible, setIsInvisible, mood, setMood, isSplitScreen, setIsSplitScreen, isOffline, setIsOffline, offlineQueueCount, setCreatePostModalOpen } = props;

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
        { view: 'events', icon: TicketIcon, label: 'Events' },
        { view: 'ads', icon: MegaphoneIcon, label: 'Ads Manager' },
        { view: 'creatorhub', icon: ChartBarIcon, label: 'Creator Hub' },
        { view: 'profile', icon: ProfileIcon, label: 'Profile' },
        { view: 'settings', icon: CogIcon, label: 'Settings' },
        { view: 'accessibility', icon: AccessibilityIcon, label: 'Accessibility' },
    ];
    
    const moods: { name: Mood, label: string, color: string }[] = [
        { name: 'default', label: 'Default', color: 'bg-orange-500'},
        { name: 'chill', label: 'Chill', color: 'bg-blue-500'},
        { name: 'focus', label: 'Focus', color: 'bg-gray-500'},
        { name: 'hype', label: 'Hype', color: 'bg-pink-500'},
    ]

    return (
        <div className="sticky top-24 flex flex-col space-y-1">
            {navItems.map(item => (
                <NavLink 
                    key={item.view}
                    icon={item.icon} 
                    label={item.label} 
                    active={activeView === item.view}
                    onClick={() => setView(item.view)}
                />
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
                 <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 card space-y-2">
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 px-2 pb-1">Appearance</h3>
                    <div className="flex justify-around items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                        <button onClick={() => setTheme('light')} className={`p-2 rounded-lg ${theme === 'light' ? 'bg-orange-500 text-white' : 'text-gray-500 dark:text-gray-400'}`}><SunIcon className="w-5 h-5"/></button>
                        <button onClick={() => setTheme('dark')} className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-orange-500 text-white' : 'text-gray-500 dark:text-gray-400'}`}><MoonIcon className="w-5 h-5"/></button>
                        <button onClick={() => setTheme('retro')} className={`p-2 rounded-lg ${theme === 'retro' ? 'bg-orange-500 text-white' : 'text-gray-500 dark:text-gray-400'}`}><DesktopComputerIcon className="w-5 h-5"/></button>
                    </div>
                     <div className="p-2">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <SparklesIcon className="w-5 h-5 text-pink-500" />
                                <span className="text-sm font-semibold">Mood</span>
                            </div>
                            <span className="text-sm font-bold text-pink-500 capitalize">{mood}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                             {moods.map(m => (
                                <button key={m.name} onClick={() => setMood(m.name)} className={`h-8 rounded-lg ${m.color} ${mood === m.name ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-black dark:ring-white' : ''}`}></button>
                             ))}
                        </div>
                    </div>
                 </div>
            </div>
            
            <div className="pt-4">
                 <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 card space-y-1">
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 px-2 pb-1">Modes</h3>
                     <button onClick={() => setIsAntiToxic(!isAntiToxic)} className={`w-full flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isAntiToxic ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        <div className="flex items-center space-x-2">
                            <ShieldExclamationIcon className="w-5 h-5" />
                            <span className="text-sm font-semibold">Anti-Toxic</span>
                        </div>
                        <div className={`w-10 h-6 rounded-full p-1 flex items-center transition-colors ${isAntiToxic ? 'bg-green-500 justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}><div className="w-4 h-4 bg-white rounded-full"></div></div>
                    </button>
                    <button onClick={() => setIsInvisible(!isInvisible)} className={`w-full flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isInvisible ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        <div className="flex items-center space-x-2">
                            <EyeOffIcon className="w-5 h-5" />
                            <span className="text-sm font-semibold">Invisible</span>
                        </div>
                        <div className={`w-10 h-6 rounded-full p-1 flex items-center transition-colors ${isInvisible ? 'bg-purple-500 justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}><div className="w-4 h-4 bg-white rounded-full"></div></div>
                    </button>
                     <button onClick={() => setIsSplitScreen(!isSplitScreen)} className={`w-full flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isSplitScreen ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        <div className="flex items-center space-x-2">
                            <ViewBoardsIcon className="w-5 h-5" />
                            <span className="text-sm font-semibold">Split Screen</span>
                        </div>
                        <div className={`w-10 h-6 rounded-full p-1 flex items-center transition-colors ${isSplitScreen ? 'bg-blue-500 justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}><div className="w-4 h-4 bg-white rounded-full"></div></div>
                    </button>
                     <button onClick={() => setIsOffline(!isOffline)} className={`w-full flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isOffline ? 'text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                        <div className="flex items-center space-x-2">
                            <CloudArrowDownIcon className="w-5 h-5" />
                            <span className="text-sm font-semibold">Offline Mode</span>
                            {isOffline && <span className="text-xs font-bold text-orange-500">({offlineQueueCount})</span>}
                        </div>
                        <div className={`w-10 h-6 rounded-full p-1 flex items-center transition-colors ${isOffline ? 'bg-gray-500 justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}><div className="w-4 h-4 bg-white rounded-full"></div></div>
                    </button>
                 </div>
            </div>

            <button onClick={() => setCreatePostModalOpen(true)} className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-6 rounded-full w-full text-lg hover:shadow-lg transition-all retro-button">
                Post
            </button>
        </div>
    );
};

export default LeftAside;