import React, { useState, useEffect, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import Header from './components/Header';
import LeftAside from './components/LeftAside';
import RightAside from './components/RightAside';
import MainContent from './components/MainContent';
import BottomNav from './components/BottomNav';
import CreatePostModal from './components/CreatePostModal';
import CreateStoryModal from './components/CreateStoryModal';
import CreateReelModal from './components/CreateReelModal';
import StoryViewer from './components/StoryViewer';
import StoryCommentsModal from './components/StoryCommentsModal';
import VideoCallModal from './components/VideoCallModal';
import Toast from './components/Toast';
import AIAssistModal from './components/AIAssistModal';
import { User, Post, Story, StoryComment, Achievement, Notification, ServerToClientEvents, ClientToServerEvents } from './types';

export const loggedInUser: User = {
    id: 1,
    name: 'Jane Doe',
    handle: '@janedoe',
    avatar: 'https://picsum.photos/id/1005/50/50',
    bio: 'Just a girl who loves to code and travel. Building cool things on the web. 🚀',
    followers_count: 1258,
    following_count: 345,
    isCommunityVerified: true,
    skillBadges: [{ name: 'React' }, { name: 'UX Design' }],
    isMonetized: true,
    isVerified: false,
    subscriptionPrice: 5,
    coins: 15000,
    status_emoji: '🌴'
};

export type View = 'home' | 'explore' | 'notifications' | 'messages' | 'bookmarks' | 'profile' | 'settings' | 'marketplace' | 'challenges' | 'journey' | 'rooms' | 'stage' | 'ads' | 'reels' | 'groups' | 'create' | 'accessibility' | 'creatorhub' | 'events';
export type Theme = 'light' | 'dark' | 'retro';
export type Mood = 'default' | 'chill' | 'focus' | 'hype';

// FIX: Correctly type the socket instance with server and client events.
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://localhost:3000');

function App() {
  const [view, setView] = useState<View>('home');
  const [theme, setTheme] = useState<Theme>('light');
  const [mood, setMood] = useState<Mood>('default');
  const [isAntiToxic, setIsAntiToxic] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);
  const [isSplitScreen, setIsSplitScreen] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueueCount, setOfflineQueueCount] = useState(0);

  // New Accessibility State
  const [isHighContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [isCreateStoryModalOpen, setCreateStoryModalOpen] = useState(false);
  const [isCreateReelModalOpen, setCreateReelModalOpen] = useState(false);
  const [isStoryViewerOpen, setStoryViewerOpen] = useState<{ stories: Story[], startIndex: number } | null>(null);
  const [isStoryCommentsOpen, setStoryCommentsOpen] = useState<Story | null>(null);
  const [isAIAssistModalOpen, setAIAssistModalOpen] = useState(false);
  
  const [videoCallState, setVideoCallState] = useState<{ isActive: boolean; withUser?: User; isReceiving?: boolean; offer?: any }>({ isActive: false });

  const [coins, setCoins] = useState(loggedInUser.coins || 0);

  const [toast, setToast] = useState<{ message: string; achievement?: Achievement; notification?: Notification } | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsVersion, setPostsVersion] = useState(0); 

  const refreshPosts = useCallback(() => {
    setPostsVersion(v => v + 1);
  }, []);

  const showToast = (message: string, options?: { achievement?: Achievement; notification?: Notification }) => {
    setToast({ message, ...options });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  useEffect(() => {
    document.documentElement.className = theme;
    document.body.className = `bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 theme-${theme} mood-${mood}`;
    document.body.classList.toggle('high-contrast', isHighContrast);
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [theme, mood, isHighContrast, fontSize]);

  useEffect(() => {
    socket.on('connect', () => {
        console.log('Connected to socket server');
        socket.emit('register', loggedInUser.id);
    });

    socket.on('newNotification', (notification: Notification) => {
        showToast(notification.content || "You have a new notification!", { notification });
    });

    socket.on('video-offer', ({ offer, senderId }) => {
        // Fetch sender details
        fetch(`/api/users/id/${senderId}`).then(res => res.json()).then(user => {
            setVideoCallState({ isActive: true, withUser: user, isReceiving: true, offer });
        });
    });

    return () => {
        socket.off('connect');
        socket.off('newNotification');
        socket.off('video-offer');
    };
  }, []);

  const openVideoCall = (user: User) => {
    setVideoCallState({ isActive: true, withUser: user, isReceiving: false });
  };
  
  return (
    <div className={`app-container font-sans`}>
      <Header 
        setView={setView} 
      />

      <main className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 py-6">
        <aside className="hidden md:block md:col-span-1">
          <LeftAside 
            activeView={view} 
            setView={setView}
            theme={theme}
            setTheme={setTheme}
            mood={mood}
            setMood={setMood}
            isAntiToxic={isAntiToxic}
            setIsAntiToxic={setIsAntiToxic}
            isInvisible={isInvisible}
            setIsInvisible={setIsInvisible}
            isSplitScreen={isSplitScreen}
            setIsSplitScreen={setIsSplitScreen}
            isOffline={isOffline}
            setIsOffline={setIsOffline}
            offlineQueueCount={offlineQueueCount}
            setCreatePostModalOpen={setCreatePostModalOpen}
          />
        </aside>

        <div className="col-span-1 md:col-span-2 min-w-0">
          <MainContent
            activeView={view}
            setView={setView}
            setCreatePostModalOpen={setCreatePostModalOpen}
            setCreateStoryModalOpen={setCreateStoryModalOpen}
            setCreateReelModalOpen={setCreateReelModalOpen}
            openVideoCall={openVideoCall}
            coins={coins}
            setCoins={setCoins}
            setViewingStory={setStoryViewerOpen}
            posts={posts}
            setPosts={setPosts}
            postsVersion={postsVersion}
            refreshPosts={refreshPosts}
            socket={socket}
            accessibilitySettings={{ isHighContrast, setHighContrast, fontSize, setFontSize }}
          />
        </div>

        <aside className="hidden md:block md:col-span-1">
          <RightAside setView={setView} />
        </aside>
      </main>

      <BottomNav activeView={view} setView={setView} setCreatePostModalOpen={setCreatePostModalOpen} />

      {isCreatePostModalOpen && <CreatePostModal onClose={() => setCreatePostModalOpen(false)} onPostCreated={refreshPosts} openAIAssist={() => setAIAssistModalOpen(true)} />}
      {isCreateStoryModalOpen && <CreateStoryModal onClose={() => setCreateStoryModalOpen(false)} />}
      {isCreateReelModalOpen && <CreateReelModal onClose={() => setCreateReelModalOpen(false)} />}
      {isStoryViewerOpen && <StoryViewer stories={isStoryViewerOpen.stories} startIndex={isStoryViewerOpen.startIndex} onClose={() => setStoryViewerOpen(null)} openComments={setStoryCommentsOpen}/>}
      {isStoryCommentsOpen && <StoryCommentsModal story={isStoryCommentsOpen} onClose={() => setStoryCommentsOpen(null)} onCommentPosted={() => {}} />}
      {videoCallState.isActive && <VideoCallModal onClose={() => setVideoCallState({isActive: false})} user={videoCallState.withUser!} socket={socket} isReceiving={videoCallState.isReceiving} offer={videoCallState.offer} />}
      {toast && <Toast message={toast.message} achievement={toast.achievement} notification={toast.notification} onDismiss={() => setToast(null)} />}
      {isAIAssistModalOpen && <AIAssistModal onClose={() => setAIAssistModalOpen(false)} onTextGenerated={(text) => {
        // This is a bit of a hack to pass data back to the CreatePostModal
        // In a real app with context/redux this would be cleaner
        const event = new CustomEvent('aiTextGenerated', { detail: text });
        window.dispatchEvent(event);
        setAIAssistModalOpen(false);
        setCreatePostModalOpen(true);
      }} />}
    </div>
  );
}

export default App;