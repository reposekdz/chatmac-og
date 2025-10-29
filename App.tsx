import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LeftAside from './components/LeftAside';
import MainContent from './components/MainContent';
import RightAside from './components/RightAside';
import Marketplace from './components/Marketplace';
import Challenges from './components/Challenges';
import JourneyTracker from './components/JourneyTracker';
import LocalRooms from './components/LocalRooms';
import OpenStage from './components/OpenStage';
import GeoConnect from './components/GeoConnect';
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
import BottomNav from './components/BottomNav';
import CreatePostModal from './components/CreatePostModal';
import StoryViewer from './components/StoryViewer';
import NavMenuModal from './components/NavMenuModal';
import VideoCallModal from './components/VideoCallModal';
import { Story, User } from './types';

export type View = 'home' | 'explore' | 'notifications' | 'messages' | 'bookmarks' | 'profile' | 'marketplace' | 'challenges' | 'journey' | 'rooms' | 'stage' | 'creatorhub' | 'events' | 'groups' | 'discovery' | 'settings' | 'geotimeline' | 'ads' | 'reels';
export type Theme = 'light' | 'dark' | 'retro';
export type ProfileMode = 'public' | 'private' | 'work' | 'stealth';
export type Mood = 'default' | 'chill' | 'focus' | 'hype';

// A mock logged-in user. In a real app, this would come from an auth context.
export const loggedInUser: User = { 
  id: 1, 
  name: 'Elena Rodriguez', 
  handle: '@elenacodes', 
  avatar: 'https://picsum.photos/id/1027/200/200' 
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [theme, setTheme] = useState<Theme>('light');
  const [profileMode, setProfileMode] = useState<ProfileMode>('public');
  const [coins, setCoins] = useState(1250);
  const [isAntiToxic, setIsAntiToxic] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);
  const [mood, setMood] = useState<Mood>('default');
  const [isSplitScreen, setIsSplitScreen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState(3);
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [isNavMenuModalOpen, setNavMenuModalOpen] = useState(false);
  const [viewingStory, setViewingStory] = useState<{ stories: Story[], startIndex: number } | null>(null);
  const [videoCallTarget, setVideoCallTarget] = useState<User | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    body.classList.remove('retro-mode');
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark:bg-gray-950');
    } else if (theme === 'retro') {
      root.classList.remove('dark');
      body.classList.remove('dark:bg-gray-950');
      body.classList.add('retro-mode');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark:bg-gray-950');
    }

    body.classList.remove('mood-default', 'mood-chill', 'mood-focus', 'mood-hype');
    body.classList.add(`mood-${mood}`);

  }, [theme, mood]);
  
  const addCoins = (amount: number) => setCoins(prev => prev + amount);
  
  const handlePostCreated = () => {
      setCreatePostModalOpen(false);
      // Re-navigate to home to trigger a feed refresh.
      // A more sophisticated state management library would handle this better.
      if (view === 'home') {
          setView('explore'); 
          setTimeout(() => setView('home'), 50);
      } else {
          setView('home');
      }
  }

  const renderView = () => {
    switch (view) {
      case 'home':
        return <MainContent addCoins={addCoins} isAntiToxic={isAntiToxic} profileMode={profileMode} setCreatePostModalOpen={setCreatePostModalOpen} setViewingStory={setViewingStory}/>;
      case 'explore':
        return <Explore />;
      case 'reels':
        return <ReelsPage />;
      case 'notifications':
        return <Notifications />;
      case 'messages':
        return <Messages onStartVideoCall={setVideoCallTarget} />;
      case 'profile':
        return <Profile setView={setView} />;
      case 'geotimeline':
        return <GeoTimeline />;
      case 'marketplace':
        return <Marketplace coins={coins} setCoins={setCoins} />;
      case 'challenges':
          return <Challenges />;
      case 'journey':
          return <JourneyTracker />;
      case 'rooms':
          return <LocalRooms />;
      case 'stage':
          return <OpenStage />;
      case 'discovery':
          return <GeoConnect />;
      case 'creatorhub':
          return <CreatorHub />;
      case 'events':
          return <Events />;
      case 'groups':
           return <Groups />;
      case 'settings':
            return <Settings />;
       case 'ads':
            return <AdsManager coins={coins} setCoins={setCoins} />;
      default:
        return <div className="bg-white dark:bg-gray-900 rounded-2xl p-8"><h1 className="text-2xl font-bold">{view}</h1><p>This page is under construction.</p></div>;
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${theme === 'retro' ? 'retro-mode' : ''}`}>
      <Header 
        profileMode={profileMode} 
        setProfileMode={setProfileMode}
        coins={coins}
        setView={setView}
      />
      {isInvisible && (
        <div className="bg-purple-600 text-white text-center py-1 fixed top-16 md:top-20 w-full z-40 text-sm font-bold">
          🕶️ Invisible Mode is ON
        </div>
      )}
      <main className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isInvisible ? 'pt-28' : 'pt-24'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block lg:col-span-1">
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
              offlineQueueCount={offlineQueue}
              setCreatePostModalOpen={setCreatePostModalOpen}
            />
          </div>
          <div className="col-span-1 lg:col-span-2">
            {renderView()}
          </div>
          
          <div className="hidden lg:block lg:col-span-1">
            <RightAside setView={setView} openChat={() => setView('messages')} />
          </div>
        </div>
      </main>

      {isCreatePostModalOpen && <CreatePostModal onClose={() => setCreatePostModalOpen(false)} onPostCreated={handlePostCreated} />}
      {viewingStory && <StoryViewer {...viewingStory} onClose={() => setViewingStory(null)} />}
      {isNavMenuModalOpen && <NavMenuModal 
        onClose={() => setNavMenuModalOpen(false)}
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
        offlineQueueCount={offlineQueue}
        setCreatePostModalOpen={setCreatePostModalOpen}
      />}
      {videoCallTarget && <VideoCallModal user={videoCallTarget} onClose={() => setVideoCallTarget(null)} />}

      <BottomNav 
        activeView={view} 
        setView={setView} 
        openCreatePostModal={() => setCreatePostModalOpen(true)}
        openNavMenu={() => setNavMenuModalOpen(true)}
      />
    </div>
  );
};

export default App;