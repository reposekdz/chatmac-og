import React from 'react';
import { Reel, User } from '../types';
import { FilmIcon } from './icons';

const reelsData: Reel[] = [
    // FIX: Added missing 'id' property to conform to User type.
    { id: 1, user: { id: 4, name: 'ArtfulAdventures', handle: '@creativecanvas', avatar: 'https://picsum.photos/id/1011/50/50' }, videoUrl: 'https://picsum.photos/id/1011/200/300', caption: 'Painting process time-lapse!', views: 125000 },
    // FIX: Added missing 'id' property to conform to User type.
    { id: 2, user: { id: 2, name: 'FoodieFiesta', handle: '@tastytreats', avatar: 'https://picsum.photos/id/1025/50/50' }, videoUrl: 'https://picsum.photos/id/1025/200/300', caption: 'The perfect pizza flip.', views: 2.3 * 1000000 },
    // FIX: Added missing 'id' property to conform to User type.
    { id: 3, user: { id: 15, name: 'Sam Adventure', handle: '@samgoesplaces', avatar: 'https://picsum.photos/id/1015/50/50' }, videoUrl: 'https://picsum.photos/id/1015/200/300', caption: 'Cliff diving moments.', views: 890000 },
    // FIX: Added missing 'id' property to conform to User type.
    { id: 4, user: { id: 3, name: 'TechInnovator', handle: '@techguru', avatar: 'https://picsum.photos/id/1005/50/50' }, videoUrl: 'https://picsum.photos/id/1005/200/300', caption: 'Unboxing the new gadget.', views: 540000 },
    // FIX: Added missing 'id' property to conform to User type.
    { id: 5, user: { id: 1, name: 'Elena Rodriguez', handle: '@elenacodes', avatar: 'https://picsum.photos/id/1027/50/50' }, videoUrl: 'https://picsum.photos/id/1027/200/300', caption: 'Coding a new UI element!', views: 98000 },
];

const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
    return views.toString();
}

const ReelCard: React.FC<{ reel: Reel }> = ({ reel }) => {
    return (
        <div className="flex-shrink-0 w-32 h-56 rounded-2xl overflow-hidden relative group cursor-pointer shadow-md">
            <img src={reel.videoUrl} alt={reel.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-2 left-2 right-2 text-white">
                <div className="flex items-center space-x-1.5 mb-1">
                    <img src={reel.user.avatar} className="w-6 h-6 rounded-full border-2 border-white" />
                    <p className="text-xs font-bold truncate">{reel.user.name}</p>
                </div>
                <p className="text-[10px] line-clamp-2">{reel.caption}</p>
                 <p className="text-xs font-bold mt-1">{formatViews(reel.views)} views</p>
            </div>
        </div>
    );
};

const Reels: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
            <div className="flex items-center space-x-2 mb-3">
                <FilmIcon className="w-6 h-6 text-purple-500" />
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Reels</h3>
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
                {reelsData.map(reel => (
                    <ReelCard key={reel.id} reel={reel} />
                ))}
            </div>
        </div>
    );
};

export default Reels;
