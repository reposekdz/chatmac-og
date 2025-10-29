import React, { useState } from 'react';
import { Post, PostContentType } from '../types';
import PostCard from './PostCard';
import { View } from '../App';
import { BadgeIcon, QrCodeIcon, MapIcon, AcademicCapIcon, HandThumbUpIcon, StarIcon, CogIcon, TrophyIcon, FireIcon, MarketplaceIcon, BookmarksIcon, CameraIcon, XIcon, FilmIcon } from './icons';

const userPosts: Post[] = [
    {
    id: 1,
    // FIX: Added missing 'id' property to conform to User type.
    user: { id: 1, name: 'Your Name', handle: '@yourhandle', avatar: 'https://picsum.photos/id/1005/200/200' },
    timestamp: '2h ago',
    content: 'This is a post on my modular profile page!',
    contentType: PostContentType.TEXT,
    visibility: ['public'],
    impactScore: 150,
    // FIX: Changed 'comments' from number to Comment[] and added 'commentsCount' to match Post type.
    comments: [],
    commentsCount: 2,
    // FIX: Renamed 'shares' to 'sharesCount' and added missing properties to match Post type.
    sharesCount: 1,
    likesCount: 12,
    isLiked: false,
  },
];

const badges = [
    { name: "Day One", description: "You've been with us from the very beginning. Thanks for being a pioneer!", icon: StarIcon, color: "bg-yellow-500" },
    { name: "Community Helper", description: "Awarded for providing helpful answers and being a positive force in the community.", icon: HandThumbUpIcon, color: "bg-green-500" },
    { name: "Topic Expert", description: "Recognized for deep knowledge and frequent contributions in a specific topic.", icon: AcademicCapIcon, color: "bg-blue-500" },
    { name: "Challenge Winner", description: "You conquered a community-wide challenge and came out on top!", icon: TrophyIcon, color: "bg-purple-500" },
    { name: "Hot Streak", description: "Awarded for posting valuable content for 7 consecutive days.", icon: FireIcon, color: "bg-red-500" }
];


const BadgeModal: React.FC<{ badge: typeof badges[0]; onClose: () => void }> = ({ badge, onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm m-4 animate-modal-content-in text-center p-8" onClick={e => e.stopPropagation()}>
            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${badge.color}`}>
                <badge.icon className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold mt-4">{badge.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{badge.description}</p>
            <button onClick={onClose} className="mt-6 bg-orange-500 text-white font-bold py-2 px-6 rounded-full">Got it!</button>
        </div>
    </div>
);


const Profile: React.FC<{ setView: (view: View) => void; }> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedBadge, setSelectedBadge] = useState<typeof badges[0] | null>(null);

  return (
    <div className="flex flex-col space-y-6">
        {selectedBadge && <BadgeModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />}
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 card overflow-hidden">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
                 <img src="https://picsum.photos/id/1018/1000/300" className="w-full h-full object-cover" />
                 <button className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80">
                    <CameraIcon className="w-5 h-5"/>
                 </button>
            </div>
            <div className="p-6 pt-0">
                <div className="flex justify-between items-end -mt-16">
                    <div className="relative">
                        <img src="https://picsum.photos/id/1005/150/150" alt="Your Name" className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"/>
                        <button className="absolute bottom-2 right-2 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80">
                             <CameraIcon className="w-4 h-4"/>
                        </button>
                    </div>
                    <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full text-sm">Edit Profile</button>
                </div>
                 <div className="mt-4">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Your Name</h1>
                    <p className="text-gray-500 dark:text-gray-400">@yourhandle</p>
                    <p className="mt-2 text-sm">Digital Creator | Building cool things with code | Coffee enthusiast ☕</p>
                </div>
                 <div className="mt-4 flex items-center space-x-6 border-t border-gray-200 dark:border-gray-800 pt-4">
                     <div className="text-center"><p className="font-bold text-lg">1.2K</p><p className="text-sm text-gray-500">Following</p></div>
                     <div className="text-center"><p className="font-bold text-lg">5.8K</p><p className="text-sm text-gray-500">Followers</p></div>
                     <div className="text-center"><p className="font-bold text-lg text-orange-500">Master</p><p className="text-sm text-gray-500">Rank</p></div>
                </div>
            </div>
        </div>
        
        {/* Badges Module */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Badge Showcase</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {badges.map(badge => (
                    <button key={badge.name} onClick={() => setSelectedBadge(badge)} className="text-center group">
                        <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${badge.color} transition-transform group-hover:scale-110`}>
                            <badge.icon className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-xs font-bold mt-2">{badge.name}</p>
                    </button>
                ))}
            </div>
        </div>


        {/* Profile Content */}
        <div>
            <div className="flex border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-t-2xl px-2 sticky top-20 z-10">
                <button onClick={() => setActiveTab('posts')} className={`px-4 py-3 text-sm font-semibold ${activeTab === 'posts' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}>Posts</button>
                <button onClick={() => setActiveTab('reels')} className={`px-4 py-3 text-sm font-semibold ${activeTab === 'reels' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}>Reels</button>
                <button onClick={() => setActiveTab('highlights')} className={`px-4 py-3 text-sm font-semibold ${activeTab === 'highlights' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}>Highlights</button>
                <button onClick={() => setActiveTab('media')} className={`px-4 py-3 text-sm font-semibold ${activeTab === 'media' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}>Media</button>
            </div>
             <div className="bg-white dark:bg-gray-900 rounded-b-2xl shadow-sm border-x border-b border-gray-200 dark:border-gray-800 card">
                <div>
                    {activeTab === 'posts' && userPosts.map(post => <PostCard key={post.id} post={post} addCoins={() => {}} isAntiToxic={false} />)}
                    {activeTab === 'reels' && <div className="text-center py-12 text-gray-500">Your Reels will appear here.</div>}
                    {activeTab === 'highlights' && <div className="text-center py-12 text-gray-500">Your curated Highlights will appear here.</div>}
                    {activeTab === 'media' && <div className="text-center py-12 text-gray-500">All your media will appear here.</div>}
                </div>
            </div>
        </div>

    </div>
  );
};

export default Profile;