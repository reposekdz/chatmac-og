import React, { useState } from 'react';
import { User } from '../types';
import { MapIcon, LinkIcon, CalendarIcon, MoreIcon } from './icons';
import PostCard from './PostCard';

interface ProfileProps {
    user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    const [activeTab, setActiveTab] = useState('posts');
    
    return (
        <div className="flex flex-col space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 card overflow-hidden">
                <img src={user.banner} alt={`${user.name}'s banner`} className="w-full h-48 object-cover" />
                <div className="p-6">
                    <div className="flex justify-between items-start -mt-20">
                        <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900"/>
                        <div className="flex items-center space-x-2 mt-20">
                            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><MoreIcon className="w-6 h-6"/></button>
                            <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full">Follow</button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-gray-500">{user.handle}</p>
                    </div>
                    <p className="mt-2">{user.bio}</p>
                    <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1"><MapIcon className="w-4 h-4"/><span>{user.location}</span></div>
                        <a href="#" className="flex items-center space-x-1 hover:underline"><LinkIcon className="w-4 h-4"/><span>{user.website}</span></a>
                        <div className="flex items-center space-x-1"><CalendarIcon className="w-4 h-4"/><span>{user.joinedDate}</span></div>
                    </div>
                     <div className="mt-4 flex items-center space-x-6">
                        <p><span className="font-bold">{user.stats?.following}</span> Following</p>
                        <p><span className="font-bold">{user.stats?.followers}</span> Followers</p>
                     </div>
                </div>
                 <div className="border-t border-gray-200 dark:border-gray-800 flex">
                    <button onClick={() => setActiveTab('posts')} className={`flex-1 p-3 font-semibold text-center ${activeTab === 'posts' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Posts</button>
                    <button onClick={() => setActiveTab('replies')} className={`flex-1 p-3 font-semibold text-center ${activeTab === 'replies' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Replies</button>
                    <button onClick={() => setActiveTab('media')} className={`flex-1 p-3 font-semibold text-center ${activeTab === 'media' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Media</button>
                    <button onClick={() => setActiveTab('likes')} className={`flex-1 p-3 font-semibold text-center ${activeTab === 'likes' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Likes</button>
                </div>
            </div>
             {/* Posts would be fetched and displayed here based on active tab */}
        </div>
    );
};

export default Profile;
