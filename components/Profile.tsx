import React, { useState, useEffect } from 'react';
import { Post, User, Highlight } from '../types';
import PostCard from './PostCard';
import { loggedInUser } from '../App';
import { CalendarIcon, LinkIcon, ShieldCheckIcon, StarIcon, MoreIcon } from './icons';
import VerificationModal from './VerificationModal';
import MonetizationModal from './MonetizationModal';
import PostDetailModal from './PostDetailModal';
import HighlightsReel from './HighlightsReel';

const Profile: React.FC = () => {
    // For simplicity, this component will always show the logged in user's profile.
    const [user, setUser] = useState<User | null>(loggedInUser);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('posts');
    const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
    const [isMonetizationModalOpen, setMonetizationModalOpen] = useState(false);
    const [activePostDetail, setActivePostDetail] = useState<Post | null>(null);

    useEffect(() => {
        if (user) {
            const fetchUserPosts = async () => {
                try {
                    setLoading(true);
                    const res = await fetch(`/api/posts/user/${user.handle}`);
                    const data = await res.json();
                    setPosts(data);
                } catch (error) {
                    console.error("Failed to fetch user posts", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUserPosts();
        }
    }, [user]);
    
    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 card overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-800 relative">
                    <img src={`https://picsum.photos/seed/${user.id}/1000/400`} className="w-full h-full object-cover" alt="Profile banner" />
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="-mt-20">
                            <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900" />
                        </div>
                        <div className="flex items-center space-x-2">
                             <button onClick={() => setMonetizationModalOpen(true)} className="p-2 rounded-full border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"><StarIcon className="w-5 h-5"/></button>
                             <button onClick={() => setVerificationModalOpen(true)} className="p-2 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10"><ShieldCheckIcon className="w-5 h-5"/></button>
                            <button className="p-2 rounded-full border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"><MoreIcon className="w-5 h-5"/></button>
                            <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full">Edit Profile</button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-3xl font-bold flex items-center space-x-2">{user.name} {user.status_emoji}</h1>
                        <p className="text-gray-500">{user.handle}</p>
                        <p className="mt-2">{user.bio}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                            <div className="flex items-center space-x-1"><LinkIcon className="w-4 h-4"/> <span>{user.handle}.com</span></div>
                            <div className="flex items-center space-x-1"><CalendarIcon className="w-4 h-4"/> <span>Joined {new Date(user.created_at || Date.now()).toLocaleDateString()}</span></div>
                        </div>
                         <div className="flex items-center space-x-4 mt-2">
                            <p><span className="font-bold">{user.following_count}</span> Following</p>
                            <p><span className="font-bold">{user.followers_count}</span> Followers</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <HighlightsReel userId={user.id} />
                    </div>
                </div>
                 <div className="border-b border-gray-200 dark:border-gray-800 flex">
                    <button onClick={() => setActiveTab('posts')} className={`flex-1 p-3 font-semibold text-center ${activeTab === 'posts' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Posts</button>
                    <button onClick={() => setActiveTab('replies')} className={`flex-1 p-3 font-semibold text-center ${activeTab === 'replies' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Replies</button>
                    <button onClick={() => setActiveTab('media')} className={`flex-1 p-3 font-semibold text-center ${activeTab === 'media' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Media</button>
                </div>
            </div>
            <div className="mt-6 space-y-6">
                 {loading ? <p>Loading posts...</p> : posts.map(post => <PostCard key={post.id} post={post} openPostDetail={setActivePostDetail}/>)}
            </div>
            
            {isVerificationModalOpen && <VerificationModal user={user} onClose={() => setVerificationModalOpen(false)} />}
            {isMonetizationModalOpen && <MonetizationModal user={user} onClose={() => setMonetizationModalOpen(false)} />}
            {activePostDetail && <PostDetailModal post={activePostDetail} onClose={() => setActivePostDetail(null)} />}
        </>
    );
};

export default Profile;