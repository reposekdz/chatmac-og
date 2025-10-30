
import React from 'react';
import { SearchIcon, FireIcon, ArrowTrendingUpIcon, PlusCircleIcon, MegaphoneIcon } from './icons';
import GeoConnect from './GeoConnect';
import Reels from './Reels';

const RightAside: React.FC = () => {
    const trends = [
        { topic: '#TechWeek', posts: '15.2k' },
        { topic: 'AI Art', posts: '8.9k' },
        { topic: '#IndieGameDev', posts: '5.1k' },
    ];
    
    const whoToFollow = [
        { name: 'TechInnovator', handle: '@techguru', avatar: 'https://picsum.photos/id/1005/50/50' },
        { name: 'ArtfulAdventures', handle: '@creativecanvas', avatar: 'https://picsum.photos/id/1011/50/50' },
        { name: 'FoodieFiesta', handle: '@tastytreats', avatar: 'https://picsum.photos/id/1025/50/50' },
    ];

    return (
        <div className="sticky top-24 flex flex-col space-y-6">
            <div className="relative">
                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search ChatMac" className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full pl-12 pr-4 py-3 card"/>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
                <div className="flex items-center space-x-2 mb-3">
                    <FireIcon className="w-6 h-6 text-red-500" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Trending Now</h3>
                </div>
                <div className="space-y-3">
                    {trends.map(trend => (
                        <div key={trend.topic}>
                            <p className="font-bold">{trend.topic}</p>
                            <p className="text-sm text-gray-500">{trend.posts} posts</p>
                        </div>
                    ))}
                </div>
            </div>

            <Reels />
            
            <GeoConnect />

             <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
                <div className="flex items-center space-x-2 mb-3">
                    <MegaphoneIcon className="w-6 h-6 text-blue-500" />
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Who to Follow</h3>
                </div>
                <div className="space-y-4">
                    {whoToFollow.map(user => (
                        <div key={user.handle} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                                <div>
                                    <p className="font-bold">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.handle}</p>
                                </div>
                            </div>
                            <button className="bg-gray-200 dark:bg-gray-800 font-semibold px-4 py-1.5 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-700">Follow</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RightAside;
