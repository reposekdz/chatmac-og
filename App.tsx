
import React, { useState, useEffect, useCallback } from 'react';
import { User, Post, Story, Achievement } from './types';
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
import LoadingIndicator from './components/LoadingIndicator';
import Toast from './components/Toast';

export const loggedInUser: User = {
    id: 1,
    name: 'Jane Doe',
    handle: '@janedoe',
    avatar: 'https://picsum.photos/id/1005/50/50',
    bio: 'Just a simple developer exploring the world. SF -> NY.',
    followers_count: 1258,
    following_count: 342,
    isMonetized: true,
    isVerified: true,
    subscriptionPrice: 5,
    coins: 15000,
    status_emoji: '🚀',
};

export type View =
  | 'home'
  | 'explore'
  | 'reels'
  | 'notifications'
  | 'messages'
  | 'marketplace'
  | 'challenges'
  | 'journey'
  | 'rooms'
  | 'stage'
  | 'ads'
  | 'profile'
  | 'settings'
  | 'bookmarks'
  | 'groups'
  | 'create';

export type Theme = 'light' | 'dark' | 'retro';
export type Mood = 'default' | 'chill' | 'focus' | 'hype';

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [theme, setTheme] = useState<Theme>('light');
    const [isAntiToxic, setIsAntiToxic] = useState(false);
    const [isInvisible, setIsInvisible] = useState(false);
    const [mood, setMood] = useState<Mood>('default');
    const [isSplitScreen, setIsSplitScreen] = useState(false);
    const [isOffline, setIsOffline] = useState(false);
    const [offlineQueueCount, setOfflineQueueCount] = useState(0);

    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState<{message: string, achievement?: Achievement} | null>(null);

    const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
    const [isCreateStoryModalOpen, setCreateStoryModalOpen] = useState(false);
    const [isCreateReelModalOpen, setCreateReelModalOpen] = useState(false);
    const [viewingStory, setViewingStory] = useState<{ stories: Story[], startIndex: number } | null>(null);
    const [storyForComments, setStoryForComments] = useState<Story | null>(null);
    const [isVideoCallOpen, setVideoCallOpen] = useState(false);
    
    const [coins, setCoins] = useState(15000);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-mood', mood);
    }, [theme, mood]);

    const showToast = useCallback((message: string, achievement?: Achievement) => {
        setToast({ message, achievement });
        setTimeout(() => setToast(null), 5000);
    }, []);

    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/posts');
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
            showToast('Error: Could not fetch posts.');
        } finally {
            setIsLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const addPost = async (newPostData: Omit<Post, 'id' | 'user' | 'created_at' | 'likes_count' | 'comments_count' | 'is_liked_by_user'>) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newPostData, userId: loggedInUser.id }),
            });
            if (!response.ok) throw new Error('Failed to create post');
            const createdPost: {post: Post, achievement?: Achievement} = await response.json();
            setPosts(prevPosts => [createdPost.post, ...prevPosts]);
            if(createdPost.achievement) {
                showToast("Achievement Unlocked!", createdPost.achievement);
            }
        } catch (error) {
            console.error("Error creating post:", error);
            showToast('Error: Could not create post.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen font-sans">
            <Header setView={setView} setViewingStory={setViewingStory} setCreateStoryModalOpen={setCreateStoryModalOpen} />
            <main className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8 py-8">
                <aside className="hidden lg:block lg:col-span-1">
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
                <div className="lg:col-span-2">
                    <MainContent 
                        view={view} 
                        posts={posts} 
                        loading={isLoading}
                        setPosts={setPosts}
                        addPost={addPost}
                        setViewingStory={setViewingStory}
                        setCreateStoryModalOpen={setCreateStoryModalOpen}
                        coins={coins}
                        setCoins={setCoins}
                        openVideoCall={() => setVideoCallOpen(true)}
                        setIsLoading={setIsLoading}
                        showToast={showToast}
                    />
                </div>
                <aside className="hidden lg:block lg:col-span-1">
                    <RightAside />
                </aside>
            </main>
            <BottomNav setView={setView} activeView={view} setCreatePostModalOpen={setCreatePostModalOpen}/>
            
            {isCreatePostModalOpen && <CreatePostModal onClose={() => setCreatePostModalOpen(false)} onPostCreated={addPost} />}
            {isCreateStoryModalOpen && <CreateStoryModal onClose={() => setCreateStoryModalOpen(false)} onStoryCreated={fetchPosts} />}
            {isCreateReelModalOpen && <CreateReelModal onClose={() => setCreateReelModalOpen(false)} />}
            {viewingStory && <StoryViewer stories={viewingStory.stories} startIndex={viewingStory.startIndex} onClose={() => setViewingStory(null)} openComments={setStoryForComments} />}
            {storyForComments && <StoryCommentsModal story={storyForComments} onClose={() => setStoryForComments(null)} onCommentPosted={() => {
                setStoryForComments(s => s ? {...s, comments_count: s.comments_count + 1} : null)
            }}/>}
            {isVideoCallOpen && <VideoCallModal onClose={() => setVideoCallOpen(false)} />}
            {isLoading && <LoadingIndicator />}
            {toast && <Toast message={toast.message} achievement={toast.achievement} onDismiss={() => setToast(null)} />}
        </div>
    );
};

export default App;