
import React from 'react';
import { View } from '../App';
import { Post, Story } from '../types';
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
import GeoTimeline from './GeoTimeline';
import CreatorHub from './CreatorHub';
import Events from './Events';
import Groups from './Groups';
import ReelsPage from './ReelsPage';
import CreatePage from './CreatePage';

interface MainContentProps {
    view: View;
    posts: Post[];
    loading: boolean;
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
    addPost: (newPost: Post) => void;
    setViewingStory: (view: { stories: Story[], startIndex: number } | null) => void;
    setCreateStoryModalOpen: (isOpen: boolean) => void;
    coins: number;
    setCoins: (c: number | ((prev: number) => number)) => void;
    openVideoCall: () => void;
}

const MainContent: React.FC<MainContentProps> = (props) => {
    const { view, posts, loading, setPosts, addPost, setViewingStory, setCreateStoryModalOpen, coins, setCoins, openVideoCall } = props;

    const renderView = () => {
        switch (view) {
            case 'home':
                return (
                    <div className="space-y-6">
                        <StoryReel setViewingStory={setViewingStory} setCreateStoryModalOpen={setCreateStoryModalOpen} />
                        <CreatePost onPostCreated={addPost} />
                        {loading ? (
                            <p>Loading posts...</p>
                        ) : (
                            posts.map(post => <PostCard key={post.id} post={post} />)
                        )}
                    </div>
                );
            case 'explore':
                return <Explore />;
            case 'reels':
                return <ReelsPage />;
            case 'notifications':
                return <Notifications />;
            case 'messages':
                return <Messages openVideoCall={openVideoCall} />;
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
            case 'ads':
                return <AdsManager coins={coins} setCoins={setCoins} />;
            case 'profile':
                return <Profile />;
            case 'settings':
                return <Settings />;
            case 'bookmarks':
                return <Bookmarks />;
            case 'groups':
                return <Groups />;
            case 'create':
                 return <CreatePage setCreatePostModalOpen={() => { /* Handled by App.tsx */ }} setCreateStoryModalOpen={() => { /* Handled by App.tsx */ }} setCreateReelModalOpen={() => { /* Handled by App.tsx */ }} />;
            default:
                return (
                     <div className="space-y-6">
                        <StoryReel setViewingStory={setViewingStory} setCreateStoryModalOpen={setCreateStoryModalOpen} />
                        <CreatePost onPostCreated={addPost} />
                        {loading ? <p>Loading posts...</p> : posts.map(post => <PostCard key={post.id} post={post} />)}
                    </div>
                );
        }
    };

    return <div>{renderView()}</div>;
};

export default MainContent;
