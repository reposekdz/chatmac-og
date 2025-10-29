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

export type View = 'home' | 'explore' | 'notifications' | 'messages' | 'bookmarks' | 'profile' | 'marketplace' | 'challenges' | 'journey' | 'rooms' | 'stage' | 'creatorhub' | 'events' | 'groups' | 'discovery' | 'settings';
export type Theme = 'light' | 'dark' | 'retro';
export type ProfileMode = 'public' | 'private' | 'work' | 'stealth';
export type Mood = 'default' | 'chill' | 'focus' | 'hype';

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

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark:bg-gray-950');
      body.classList.remove('retro-mode');
    } else if (theme === 'retro') {
      root.classList.remove('dark');
      body.classList.remove('dark:bg-gray-950');
      body.classList.add('retro-mode');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark:bg-gray-950', 'retro-mode');
    }
  }, [theme]);
  
  const addCoins = (amount: number) => setCoins(prev => prev + amount);

  const renderView = () => {
    const PlaceholderView: React.FC<{title: string, description: string}> = ({title, description}) => (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 card">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    );

    switch (view) {
      case 'home':
        return <MainContent addCoins={addCoins} isAntiToxic={isAntiToxic} profileMode={profileMode} />;
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
          return <PlaceholderView title="Creator Hub" description="Manage your earnings, fan subscriptions, and sponsored content. Coming soon!" />;
      case 'events':
          return <PlaceholderView title="Events" description="Discover and get tickets for exclusive events. Coming soon!" />;
      case 'groups':
           return <PlaceholderView title="Groups" description="Find your community with layered group discussions. Coming soon!" />;
      case 'settings':
            return <PlaceholderView title="Settings" description="Configure auto-privacy resets and other advanced settings. Coming soon!" />;
      default:
        return <PlaceholderView title={view.charAt(0).toUpperCase() + view.slice(1)} description="This page is under construction."/>;
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${theme === 'retro' ? 'retro-mode' : ''}`}>
      <Header 
        profileMode={profileMode} 
        setProfileMode={setProfileMode}
        coins={coins}
      />
      {isInvisible && (
        <div className="bg-purple-600 text-white text-center py-1 fixed top-20 w-full z-40 text-sm font-bold">
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
            />
          </div>
          <div className={`col-span-1 ${isSplitScreen ? 'lg:col-span-1' : 'lg:col-span-2'}`}>
            {renderView()}
          </div>
          {isSplitScreen && (
             <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card h-[calc(100vh-7rem)]">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Chat</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Split screen chat view is active.</p>
                </div>
             </div>
          )}
          <div className="hidden lg:block lg:col-span-1">
            <RightAside setView={setView} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;