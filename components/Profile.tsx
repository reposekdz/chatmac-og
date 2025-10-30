
import React, { useState, useEffect } from 'react';
import { Post, User } from '../types';
import { loggedInUser } from '../App';
import PostCard from './PostCard';
import { CalendarIcon, LinkIcon, MapIcon, CogIcon, StarIcon, ShieldCheckIcon } from './icons';
import MonetizationModal from './MonetizationModal';
import VerificationModal from './VerificationModal';

const Profile: React.FC = () => {
    const [user] = useState<User>(loggedInUser);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isMonetizationModalOpen, setMonetizationModalOpen] = useState(false);
    const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);

    useEffect(() => {
        fetch(`/api/posts?userId=${user.id}`)
          .then(res => res.json())
          .then(data => setPosts(data));
    }, [user.id]);

    return (
        <>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 card overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-800">
                    <img src="https://picsum.photos/seed/header/1200/400" className="w-full h-full object-cover" alt="Profile banner"/>
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start -mt-24">
                        <img src={user.avatar} className="w-36 h-36 rounded-full border-4 border-white dark:border-gray-900" alt="Profile avatar"/>
                        <div className="flex items-center space-x-2">
                           <button onClick={() => setMonetizationModalOpen(true)} className="p-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500" title="Monetization">
                                <StarIcon className="w-5 h-5"/>
                            </button>
                             <button onClick={() => setVerificationModalOpen(true)} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600" title="Get Verified">
                                <ShieldCheckIcon className="w-5 h-5"/>
                            </button>
                            <button className="font-bold py-2 px-4 rounded-full border-2 border-orange-500 text-orange-500">Edit Profile</button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-3xl font-bold">{user.name}</h1>
                        <p className="text-gray-500">{user.handle}</p>
                    </div>
                    <p className="mt-4">{user.bio}</p>
                    <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1"><MapIcon className="w-4 h-4"/><span>San Francisco, CA</span></div>
                        <div className="flex items-center space-x-1"><LinkIcon className="w-4 h-4"/><a>website.com</a></div>
                        <div className="flex items-center space-x-1"><CalendarIcon className="w-4 h-4"/><span>Joined June 2023</span></div>
                    </div>
                     <div className="flex items-center space-x-6 mt-4">
                        <p><span className="font-bold">{user.following_count}</span> <span className="text-gray-500">Following</span></p>
                        <p><span className="font-bold">{user.followers_count}</span> <span className="text-gray-500">Followers</span></p>
                    </div>
                </div>
                 <div className="border-t border-gray-200 dark:border-gray-800">
                    {/* Add tabs for Posts, Replies, Media, Likes */}
                 </div>
            </div>

            <div className="mt-6 space-y-6">
                {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>

            {isMonetizationModalOpen && <MonetizationModal user={user} onClose={() => setMonetizationModalOpen(false)} />}
            {isVerificationModalOpen && <VerificationModal user={user} onClose={() => setVerificationModalOpen(false)} />}
        </>
    );
};

export default Profile;
