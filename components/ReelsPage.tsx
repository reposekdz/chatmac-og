import React from 'react';
import { Reel } from '../types';
import { HeartIcon, ChatBubbleIcon, ShareIcon, MoreIcon } from './icons';

const reelsData: Reel[] = [
    // FIX: Added missing 'id' property to conform to User type.
    { id: 1, user: { id: 4, name: 'ArtfulAdventures', handle: '@creativecanvas', avatar: 'https://picsum.photos/id/1011/50/50' }, videoUrl: 'https://picsum.photos/id/1011/400/800', caption: 'Painting process time-lapse! So satisfying to watch.', views: 125000 },
    // FIX: Added missing 'id' property to conform to User type.
    { id: 2, user: { id: 2, name: 'FoodieFiesta', handle: '@tastytreats', avatar: 'https://picsum.photos/id/1025/50/50' }, videoUrl: 'https://picsum.photos/id/1025/400/800', caption: 'The perfect pizza flip. Mastered this after 100 tries!', views: 2.3 * 1000000 },
    // FIX: Added missing 'id' property to conform to User type.
    { id: 3, user: { id: 15, name: 'Sam Adventure', handle: '@samgoesplaces', avatar: 'https://picsum.photos/id/1015/50/50' }, videoUrl: 'https://picsum.photos/id/1015/400/800', caption: 'Cliff diving moments from my last trip. The adrenaline was real!', views: 890000 },
    // FIX: Added missing 'id' property to conform to User type.
    { id: 4, user: { id: 3, name: 'TechInnovator', handle: '@techguru', avatar: 'https://picsum.photos/id/1005/50/50' }, videoUrl: 'https://picsum.photos/id/1005/400/800', caption: 'Unboxing the new gadget. This thing is a beast! Full review soon.', views: 540000 },
];

const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
    return views.toString();
}

const ReelCard: React.FC<{ reel: Reel }> = ({ reel }) => {
    return (
        <div className="w-full h-full rounded-2xl overflow-hidden relative snap-start flex-shrink-0">
            <img src={reel.videoUrl} alt={reel.caption} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <div className="absolute bottom-4 left-4 right-16 text-white">
                <div className="flex items-center space-x-2 mb-2">
                    <img src={reel.user.avatar} className="w-10 h-10 rounded-full border-2 border-white" />
                    <p className="font-bold text-sm">{reel.user.name}</p>
                    <button className="border border-white rounded-md px-2 py-0.5 text-xs font-semibold">Follow</button>
                </div>
                <p className="text-sm line-clamp-2">{reel.caption}</p>
                <p className="text-xs mt-1 opacity-80">{formatViews(reel.views)} views</p>
            </div>

            <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-4 text-white">
                 <button className="flex flex-col items-center space-y-1">
                    <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm"><HeartIcon className="w-7 h-7" /></div>
                    <span className="text-xs font-semibold">12.3K</span>
                </button>
                 <button className="flex flex-col items-center space-y-1">
                    <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm"><ChatBubbleIcon className="w-7 h-7" /></div>
                    <span className="text-xs font-semibold">245</span>
                </button>
                 <button className="flex flex-col items-center space-y-1">
                    <div className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm"><ShareIcon className="w-7 h-7" /></div>
                    <span className="text-xs font-semibold">102</span>
                </button>
                 <button><MoreIcon className="w-7 h-7 opacity-80" /></button>
            </div>
        </div>
    );
};

const ReelsPage: React.FC = () => {
    return (
        <div className="h-[calc(100vh-6rem)] w-full max-w-md mx-auto flex flex-col snap-y snap-mandatory overflow-y-scroll no-scrollbar">
            {reelsData.map(reel => (
                <ReelCard key={reel.id} reel={reel} />
            ))}
        </div>
    );
};

export default ReelsPage;