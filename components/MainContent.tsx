
import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { View } from '../App';
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

interface HomeFeedProps {
    posts: Post[];
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    refreshPosts: () => void;
    postsVersion: number;
    setViewingStory: (view: { stories: Story[], startIndex: number } | null) => void;
    setCreatePostModalOpen: (isOpen: boolean) => void;
    setCreateStoryModalOpen: (isOpen: boolean) => void;
}

const HomeFeed: React.FC<HomeFeedProps> = ({ posts, setPosts, refreshPosts, postsVersion, setViewingStory, setCreatePostModalOpen, setCreateStoryModalOpen }) => {
    const [loading, setLoading] = useState(true);
    const [activePostDetail, setActivePostDetail] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/posts');
                const data: Post[] = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [postsVersion, setPosts]);
    
    return (
        <>
        <div className="space-y-6">
            <StoryReel setViewingStory={setViewingStory} setCreateStoryModalOpen={setCreateStoryModalOpen} />
            <CreatePost setCreatePostModalOpen={setCreatePostModalOpen} />
            {loading ? (
                <p>Loading posts...</p>
            ) : (
                posts.map(post => <PostCard key={post.id} post={post} openPostDetail={setActivePostDetail}/>)
            )}
        </div>
        {activePostDetail && <PostDetailModal post={activePostDetail} onClose={() => setActivePostDetail(null)} />}
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
        case 'ads':
            return <AdsManager coins={props.coins} setCoins={props.setCoins} />;
        case 'profile':
            return <Profile />;
        case 'settings':
            return <Settings />;
        case 'bookmarks':
            return <Bookmarks />;
        case 'groups':
            return <Groups />;
        case 'create':
            return <CreatePage 
                setCreatePostModalOpen={props.setCreatePostModalOpen}
                setCreateStoryModalOpen={props.setCreateStoryModalOpen}
                setCreateReelModalOpen={props.setCreateReelModalOpen}
                />;
        default:
            return <HomeFeed 
                posts={props.posts} 
                setPosts={props.setPosts} 
                refreshPosts={props.refreshPosts}
                postsVersion={props.postsVersion}
                setViewingStory={props.setViewingStory}
                setCreatePostModalOpen={props.setCreatePostModalOpen}
                setCreateStoryModalOpen={props.setCreateStoryModalOpen}
              />;
    }
};

export default MainContent;
