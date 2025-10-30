import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { View, loggedInUser } from '../App';
import { Post, Story, User, ServerToClientEvents, ClientToServerEvents } from '../types';
import CreatePost from './CreatePost';
import PostCard from './PostCard';
import StoryReel from './StoryReel';
import Explore from './Explore';
import Notifications from './Notifications';
import Messages from './Messages';
import Marketplace from './Marketplace';
import Challenges from './Challenges';
import JourneyTracker from './JourneyTracker';
import LocalRooms from './LocalRooms';
import OpenStage from './OpenStage';
import AdsManager from './AdsManager';
import Profile from './Profile';
import Settings from './Settings';
import Bookmarks from './Bookmarks';
import ReelsPage from './ReelsPage';
import Groups from './Groups';
import CreatePage from './CreatePage';
import PostDetailModal from './PostDetailModal';
import AccessibilityHub from './AccessibilityHub';
import CreatorHub from './CreatorHub';
import Events from './Events';

interface HomeFeedProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    refreshPosts: () => void;
    postsVersion: number;
    setViewingStory: (view: { stories: Story[], startIndex: number } | null) => void;
    setCreatePostModalOpen: (isOpen: boolean) => void;
    setCreateStoryModalOpen: (isOpen: boolean) => void;
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

const HomeFeed: React.FC<HomeFeedProps> = ({ posts, setPosts, refreshPosts, postsVersion, setViewingStory, setCreatePostModalOpen, setCreateStoryModalOpen, socket }) => {
    const [loading, setLoading] = useState(true);
    const [activePostDetail, setActivePostDetail] = useState<Post | null>(null);
    const [feedType, setFeedType] = useState<'foryou' | 'following'>('foryou');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const endpoint = feedType === 'foryou' ? `/api/posts/foryou/${loggedInUser.id}` : `/api/posts?userId=${loggedInUser.id}`;
                const response = await fetch(endpoint);
                const data: Post[] = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [postsVersion, setPosts, feedType]);
    
    return (
        <>
        <div className="space-y-6">
            <StoryReel setViewingStory={setViewingStory} setCreateStoryModalOpen={setCreateStoryModalOpen} />
            <CreatePost setCreatePostModalOpen={setCreatePostModalOpen} />

            {/* Feed Type Tabs */}
            <div className="bg-white dark:bg-gray-900 sticky top-20 z-40 border-b border-gray-200 dark:border-gray-800 flex">
                 <button onClick={() => setFeedType('foryou')} className={`flex-1 p-3 font-semibold text-center ${feedType === 'foryou' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>For You</button>
                 <button onClick={() => setFeedType('following')} className={`flex-1 p-3 font-semibold text-center ${feedType === 'following' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Following</button>
            </div>

            {loading ? (
                <p className="text-center pt-8">Loading posts...</p>
            ) : (
                posts.map(post => <PostCard key={`${feedType}-${post.id}`} post={post} openPostDetail={setActivePostDetail} socket={socket} />)
            )}
        </div>
        {activePostDetail && <PostDetailModal post={activePostDetail} onClose={() => setActivePostDetail(null)} socket={socket} />}
        </>
    );
};


interface MainContentProps {
    activeView: View;
    setView: (view: View) => void;
    setCreatePostModalOpen: (isOpen: boolean) => void;
    setCreateStoryModalOpen: (isOpen: boolean) => void;
    setCreateReelModalOpen: (isOpen: boolean) => void;
    openVideoCall: (user: User) => void;
    coins: number;
    setCoins: (c: number | ((prev: number) => number)) => void;
    setViewingStory: (view: { stories: Story[], startIndex: number } | null) => void;
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    postsVersion: number;
    refreshPosts: () => void;
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
    accessibilitySettings: {
        isHighContrast: boolean;
        setHighContrast: (value: boolean) => void;
        fontSize: number;
        setFontSize: (value: number) => void;
    };
}

const MainContent: React.FC<MainContentProps> = (props) => {
    switch (props.activeView) {
        case 'home':
            return <HomeFeed 
                posts={props.posts} 
                setPosts={props.setPosts} 
                refreshPosts={props.refreshPosts}
                postsVersion={props.postsVersion}
                setViewingStory={props.setViewingStory} 
                setCreatePostModalOpen={props.setCreatePostModalOpen}
                setCreateStoryModalOpen={props.setCreateStoryModalOpen}
                socket={props.socket}
              />;
        case 'explore':
            return <Explore />;
        case 'reels':
            return <ReelsPage />;
        case 'notifications':
            return <Notifications />;
        case 'messages':
            return <Messages openVideoCall={props.openVideoCall} socket={props.socket} />;
        case 'marketplace':
            return <Marketplace coins={props.coins} setCoins={props.setCoins} />;
        case 'challenges':
            return <Challenges />;
        case 'journey':
            return <JourneyTracker />;
        case 'rooms':
            return <LocalRooms />;
        case 'stage':
            return <OpenStage />;
        case 'events':
            return <Events />;
        case 'creatorhub':
            return <CreatorHub />;
        case 'ads':
            return <AdsManager coins={props.coins} setCoins={props.setCoins} />;
        case 'profile':
            return <Profile socket={props.socket} />;
        case 'settings':
            return <Settings />;
        case 'bookmarks':
            // FIX: Pass socket prop to Bookmarks component to fix PostCard prop error.
            return <Bookmarks socket={props.socket} />;
        case 'groups':
            return <Groups />;
        case 'create':
            return <CreatePage 
                setCreatePostModalOpen={props.setCreatePostModalOpen}
                setCreateStoryModalOpen={props.setCreateStoryModalOpen}
                setCreateReelModalOpen={props.setCreateReelModalOpen}
                />;
        case 'accessibility':
            return <AccessibilityHub settings={props.accessibilitySettings} />;
        default:
            return <HomeFeed 
                posts={props.posts} 
                setPosts={props.setPosts} 
                refreshPosts={props.refreshPosts}
                postsVersion={props.postsVersion}
                setViewingStory={props.setViewingStory}
                setCreatePostModalOpen={props.setCreatePostModalOpen}
                setCreateStoryModalOpen={props.setCreateStoryModalOpen}
                socket={props.socket}
              />;
    }
};

export default MainContent;