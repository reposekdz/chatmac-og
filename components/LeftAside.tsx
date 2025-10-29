import React from 'react';
import { HomeIcon, ExploreIcon, NotificationsIcon, MessagesIcon, BookmarksIcon, ProfileIcon, MarketplaceIcon, TrophyIcon, MapIcon, UsersIcon, SpeakerWaveIcon, MoreIcon, SunIcon, MoonIcon, DesktopComputerIcon, ShieldExclamationIcon, EyeOffIcon } from './icons';
import { View, Theme } from '../App';

interface NavLinkProps {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ icon: Icon, label, active, onClick }) => (
    <button onClick={onClick} className={`flex items-center w-full space-x-4 p-3 rounded-full transition-colors ${active ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-bold' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
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
}

const LeftAside: React.FC<LeftAsideProps> = ({ activeView, setView, theme, setTheme, isAntiToxic, setIsAntiToxic, isInvisible, setIsInvisible }) => {
    const navItems: { view: View; icon: React.ElementType; label: string }[] = [
        { view: 'home', icon: HomeIcon, label: 'Home' },
        { view: 'explore', icon: ExploreIcon, label: 'Explore' },
        { view: 'notifications', icon: NotificationsIcon, label: 'Notifications' },
        { view: 'messages', icon: MessagesIcon, label: 'Messages' },
        { view: 'marketplace', icon: MarketplaceIcon, label: 'Marketplace' },
        { view: 'challenges', icon: TrophyIcon, label: 'Challenges' },
        { view: 'journey', icon: MapIcon, label: 'My Journey' },
        { view: 'rooms', icon: UsersIcon, label: 'Local Rooms' },
        { view: 'stage', icon: SpeakerWaveIcon, label: 'Open Stage' },
        { view: 'profile', icon: ProfileIcon, label: 'Profile' },
    ];
    
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
                 <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 card">
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 px-2 pb-2">More</h3>
                    <div className="flex justify-around items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-xl mb-2">
                        <button onClick={() => setTheme('light')} className={`p-2 rounded-lg ${theme === 'light' ? 'bg-orange-500 text-white' : 'text-gray-500 dark:text-gray-400'}`}><SunIcon className="w-5 h-5"/></button>
                        <button onClick={() => setTheme('dark')} className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-orange-500 text-white' : 'text-gray-500 dark:text-gray-400'}`}><MoonIcon className="w-5 h-5"/></button>
                        <button onClick={() => setTheme('retro')} className={`p-2 rounded-lg ${theme === 'retro' ? 'bg-orange-500 text-white' : 'text-gray-500 dark:text-gray-400'}`}><DesktopComputerIcon className="w-5 h-5"/></button>
                    </div>
                     <button onClick={() => setIsAntiToxic(!isAntiToxic)} className={`w-full flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isAntiToxic ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        <div className="flex items-center space-x-2">
                            <ShieldExclamationIcon className="w-5 h-5" />
                            <span className="text-sm font-semibold">Anti-Toxic Mode</span>
                        </div>
                        <div className={`w-10 h-6 rounded-full p-1 flex items-center transition-colors ${isAntiToxic ? 'bg-green-500 justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}>
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </button>
                    <button onClick={() => setIsInvisible(!isInvisible)} className={`w-full flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${isInvisible ? 'text-purple-600 dark:text-purple-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        <div className="flex items-center space-x-2">
                            <EyeOffIcon className="w-5 h-5" />
                            <span className="text-sm font-semibold">Invisible Mode</span>
                            <span className="text-xs font-bold text-orange-500">(Premium)</span>
                        </div>
                        <div className={`w-10 h-6 rounded-full p-1 flex items-center transition-colors ${isInvisible ? 'bg-purple-500 justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}>
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </button>
                 </div>
            </div>

            <button className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 px-6 rounded-full w-full text-lg hover:shadow-lg transition-all retro-button">
                Post
            </button>
        </div>
    );
};

export default LeftAside;
