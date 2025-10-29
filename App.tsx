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
import Notifications from './components/Notifications';
import Messages from './components/Messages';
import { CollectionIcon, MessagesIcon, TicketIcon, XIcon, SpeakerWaveIcon, VideoCameraIcon, PaperAirplaneIcon, PaperclipIcon, MicrophoneIcon, EmojiHappyIcon, ReplyIcon, DotsHorizontalIcon } from './components/icons';

export type View = 'home' | 'explore' | 'notifications' | 'messages' | 'bookmarks' | 'profile' | 'marketplace' | 'challenges' | 'journey' | 'rooms' | 'stage' | 'creatorhub' | 'events' | 'groups' | 'discovery' | 'settings' | 'geotimeline' | 'ads' | 'reels';
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
  const [activeChats, setActiveChats] = useState<{id: number, name: string, avatar: string}[]>([]);


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

  const openChat = (user: {id: number, name: string, avatar: string}) => {
    if (activeChats.length >= 3) {
        // Limit to 3 floating chats
        setActiveChats(prev => [...prev.slice(1), user]);
        return;
    }
    if (!activeChats.find(c => c.id === user.id)) {
      setActiveChats(prev => [...prev, user]);
    }
  }
  const closeChat = (id: number) => {
    setActiveChats(prev => prev.filter(c => c.id !== id));
  }

  const renderView = () => {
    const PlaceholderView: React.FC<{title: string, description: React.ReactNode}> = ({title, description}) => (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 card">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    );

    switch (view) {
      case 'home':
        return <MainContent addCoins={addCoins} isAntiToxic={isAntiToxic} profileMode={profileMode} />;
      case 'explore':
        return <Explore />;
      case 'reels':
        return <ReelsPage />;
      case 'notifications':
        return <Notifications />;
      case 'messages':
        return <Messages />;
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
                <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card h-[calc(100vh-7rem)] flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Split Chat</h2>
                    <div className="flex-grow mt-2 border-t border-gray-200 dark:border-gray-800 pt-2 space-y-2">
                       {activeChats.length > 0 ? activeChats.map(chat => (
                         <div key={chat.id} className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                           <img src={chat.avatar} className="w-8 h-8 rounded-full" alt={chat.name}/>
                           <span className="font-semibold text-sm">{chat.name}</span>
                         </div>
                       )) : (
                         <p className="text-sm text-gray-500 dark:text-gray-400">Your conversations will appear here.</p>
                       )}
                    </div>
                </div>
             </div>
          )}
          <div className="hidden lg:block lg:col-span-1">
            <RightAside setView={setView} openChat={openChat} />
          </div>
        </div>
      </main>

      {/* Real-Time Multichat Overlay */}
      <div className="fixed bottom-0 right-4 flex items-end space-x-4 z-50">
          {activeChats.map(chat => (
            <div key={chat.id} className="w-80 h-[28rem] bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col card">
              <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-2">
                  <img src={chat.avatar} className="w-8 h-8 rounded-full" alt={chat.name}/>
                  <span className="font-bold text-sm">{chat.name}</span>
                </div>
                 <div className="flex items-center space-x-1">
                   <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"><SpeakerWaveIcon className="w-5 h-5"/></button>
                   <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"><VideoCameraIcon className="w-5 h-5"/></button>
                   <button onClick={() => closeChat(chat.id)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <XIcon className="w-5 h-5"/>
                   </button>
                 </div>
              </div>
              <div className="flex-grow p-3 space-y-3 overflow-y-auto">
                 {/* Example messages */}
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-2xl rounded-bl-none max-w-xs text-sm">Hey, how's it going?</div>
                  </div>
                   <div className="flex justify-end">
                    <div className="bg-orange-500 text-white p-2.5 rounded-2xl rounded-br-none max-w-xs text-sm">Pretty good! Just working on the new designs.</div>
                  </div>
                   <div className="flex justify-start">
                     <div className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-2xl rounded-bl-none max-w-xs text-sm">
                        <div className="border-l-2 border-orange-300 pl-2 text-xs opacity-80 mb-1">
                           Replying to "Pretty good!..."
                        </div>
                        Nice! Can't wait to see them.
                     </div>
                  </div>

              </div>
              <div className="p-2 border-t border-gray-200 dark:border-gray-800">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-full flex items-center px-2">
                    <button className="p-2 text-gray-500 hover:text-orange-500"><PaperclipIcon className="w-5 h-5"/></button>
                    <button className="p-2 text-gray-500 hover:text-orange-500"><MicrophoneIcon className="w-5 h-5"/></button>
                    <input type="text" placeholder="Type a message..." className="flex-grow bg-transparent focus:ring-0 border-none text-sm"/>
                    <button className="p-2 text-gray-500 hover:text-orange-500"><EmojiHappyIcon className="w-5 h-5"/></button>
                    <button className="p-2 bg-orange-500 text-white rounded-full"><PaperAirplaneIcon className="w-5 h-5"/></button>
                </div>
              </div>
            </div>
          ))}
      </div>
       <button onClick={() => openChat({id: 1, name: 'Elena Rodriguez', avatar: 'https://picsum.photos/id/1027/50/50'})} className="fixed bottom-4 right-4 bg-orange-500 text-white rounded-full p-4 shadow-lg z-40 hover:bg-orange-600">
          <MessagesIcon className="w-6 h-6" />
        </button>
    </div>
  );
};

export default App;
