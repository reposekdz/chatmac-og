import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import LeftAside from './components/LeftAside';
import RightAside from './components/RightAside';
import MainContent from './components/MainContent';
import BottomNav from './components/BottomNav';
import CreatePostModal from './components/CreatePostModal';
import StoryViewer from './components/StoryViewer';
import Marketplace from './components/Marketplace';
import GeoConnect from './components/GeoConnect';
import Challenges from './components/Challenges';
import JourneyTracker from './components/JourneyTracker';
import LocalRooms from './components/LocalRooms';
import OpenStage from './components/OpenStage';
import Profile from './components/Profile';
import GeoTimeline from './components/GeoTimeline';
import CreatorHub from './components/CreatorHub';
import Events from './components/Events';
import Groups from './components/Groups';
import Settings from './components/Settings';
import AdsManager from './components/AdsManager';
import ReelsPage from './components/ReelsPage';
import Explore from './components/Explore';
import Messages from './components/Messages';
import Notifications from './components/Notifications';
import Bookmarks from './components/Bookmarks';
import { User, Story } from './types';
import VideoCallModal from './components/VideoCallModal';

export type View = 'home' | 'explore' | 'reels' | 'notifications' | 'messages' | 'marketplace' | 'challenges' | 'journey' | 'rooms' | 'stage' | 'ads' | 'profile' | 'settings' | 'geoconnect' | 'geotimeline' | 'creatorhub' | 'events' | 'groups' | 'bookmarks' | 'create';

export type Theme = 'light' | 'dark' | 'retro';
export type Mood = 'default' | 'chill' | 'focus' | 'hype';

export const loggedInUser: User = {
    id: 1005,
    name: 'Jane Doe',
    handle: '@janedoe',
    avatar: 'https://picsum.photos/id/1005/50/50',
    banner: 'https://picsum.photos/id/1015/1000/400',
    bio: 'Frontend Developer & UI/UX enthusiast. Exploring the world one component at a time. 🚀',
    location: 'San Francisco, CA',
    website: 'janedoe.dev',
    joinedDate: 'Joined July 2023',
    stats: {
        following: 150,
        followers: 2800,
    },
};

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [theme, setTheme] = useState<Theme>('light');
    const [mood, setMood] = useState<Mood>('default');
    const [isAntiToxic, setIsAntiToxic] = useState(false);
    const [isInvisible, setIsInvisible] = useState(false);
    const [isSplitScreen, setIsSplitScreen] = useState(false);
    const [isOffline, setIsOffline] = useState(false);
    const [offlineQueueCount, setOfflineQueueCount] = useState(0);
    const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
    const [viewingStory, setViewingStory] = useState<{ stories: Story[], startIndex: number } | null>(null);
    const [coins, setCoins] = useState(25000);
    const [isVideocallModalOpen, setVideocallModalOpen] = useState(false);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark', 'retro-theme');
        if (theme === 'retro') {
            document.documentElement.classList.add('dark', 'retro-theme');
        } else {
            document.documentElement.classList.add(theme);
        }
    }, [theme]);
    
    useEffect(() => {
        document.documentElement.classList.remove('mood-default', 'mood-chill', 'mood-focus', 'mood-hype');
        document.documentElement.classList.add(`mood-${mood}`);
    }, [mood]);

    const addCoins = (amount: number) => {
        setCoins(prev => prev + amount);
    };

    const renderView = () => {
        switch (view) {
            case 'home': return <MainContent addCoins={addCoins} isAntiToxic={isAntiToxic} profileMode={""} setCreatePostModalOpen={setCreatePostModalOpen} setViewingStory={setViewingStory} />;
            case 'explore': return <Explore />;
            case 'reels': return <ReelsPage />;
            case 'notifications': return <Notifications />;
            case 'messages': return <Messages openVideoCall={() => setVideocallModalOpen(true)} />;
            case 'marketplace': return <Marketplace />;
            case 'challenges': return <Challenges />;
            case 'journey': return <GeoTimeline />;
            case 'rooms': return <LocalRooms />;
            case 'stage': return <OpenStage />;
            case 'ads': return <AdsManager coins={coins} setCoins={setCoins} />;
            case 'profile': return <Profile user={loggedInUser} />;
            case 'settings': return <Settings />;
            case 'geoconnect': return <GeoConnect />;
            case 'events': return <Events />;
            case 'groups': return <Groups />;
            case 'bookmarks': return <Bookmarks />;
            default: return <MainContent addCoins={addCoins} isAntiToxic={isAntiToxic} profileMode={""} setCreatePostModalOpen={setCreatePostModalOpen} setViewingStory={setViewingStory} />;
        }
    };
    
    const openChat = useCallback(() => {
        setView('messages');
    }, []);

    return (
        <div className={`bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-300 ${isSplitScreen ? 'split-screen-active' : ''}`}>
            <Header setView={setView} />
            <main className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-6 lg:px-8 mt-6">
                <aside className="hidden lg:block lg:col-span-3">
                    <LeftAside
                        activeView={view}
                        setView={setView}
                        theme={theme}
                        setTheme={setTheme}
                        isAntiToxic={isAntiToxic}
                        setIsAntiToxic={setIsAntiToxic}
                        isInvisible={isInvisible}
                        setIsInvisible={setIsInvisible}
                        mood={mood}
                        setMood={setMood}
                        isSplitScreen={isSplitScreen}
                        setIsSplitScreen={setIsSplitScreen}
                        isOffline={isOffline}
                        setIsOffline={setIsOffline}
                        offlineQueueCount={offlineQueueCount}
                        setCreatePostModalOpen={setCreatePostModalOpen}
                    />
                </aside>
                <div className={`lg:col-span-6 ${isSplitScreen ? 'main-content-split' : ''}`}>
                    {renderView()}
                </div>
                <aside className={`hidden lg:block lg:col-span-3 ${isSplitScreen ? 'right-aside-split' : ''}`}>
                    <RightAside setView={setView} openChat={openChat} />
                </aside>
            </main>
            {isCreatePostModalOpen && <CreatePostModal onClose={() => setCreatePostModalOpen(false)} onPostCreated={() => {}} />}
            {viewingStory && <StoryViewer {...viewingStory} onClose={() => setViewingStory(null)} />}
            {isVideocallModalOpen && <VideoCallModal onClose={() => setVideocallModalOpen(false)} />}
            <BottomNav setView={setView} activeView={view} />
        </div>
    );
};

export default App;
