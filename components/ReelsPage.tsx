import React, { useRef, useEffect, useState } from 'react';
import { Reel } from '../types';
import { HeartIcon, ChatBubbleIcon, ShareIcon, MoreIcon, PlayIcon, SpeakerWaveIcon } from './icons';

const reelsData: Reel[] = [
    // FIX: Added missing 'id' property to conform to User type.
    { id: 1, user: { id: 4, name: 'ArtfulAdventures', handle: '@creativecanvas', avatar: 'https://picsum.photos/id/1011/50/50' }, videoUrl: 'https://picsum.photos/id/1011/500/900', caption: 'Painting process time-lapse! So satisfying to watch the colors come together. #art #painting #timelapse', views: 125000 },
    // FIX: Added missing 'id' property to conform to User type.
    { id: 2, user: { id: 2, name: 'FoodieFiesta', handle: '@tastytreats', avatar: 'https://picsum.photos/id/1025/50/50' }, videoUrl: 'https://picsum.photos/id/1025/500/900', caption: 'The perfect pizza flip. It\'s all in the wrist! 🍕 #pizza #food #chef', views: 2.3 * 1000000 },
    // FIX: Added missing 'id' property to conform to User type.
    { id: 3, user: { id: 15, name: 'Sam Adventure', handle: '@samgoesplaces', avatar: 'https://picsum.photos/id/1015/50/50' }, videoUrl: 'https://picsum.photos/id/1015/500/900', caption: 'Cliff diving moments from my last trip. #travel #adventure #thrill', views: 890000 },
];

const ReelItem: React.FC<{ reel: Reel; isVisible: boolean }> = ({ reel, isVisible }) => {
    return (
        <div className="h-full w-full relative snap-start flex-shrink-0">
            <img src={reel.videoUrl} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            <div className="absolute bottom-4 left-4 right-16 text-white">
                <div className="flex items-center space-x-2">
                    <img src={reel.user.avatar} className="w-10 h-10 rounded-full border-2 border-white" />
                    <p className="font-bold">{reel.user.name}</p>
                    <button className="border border-white text-xs font-semibold px-2 py-0.5 rounded">Follow</button>
                </div>
                <p className="text-sm mt-2">{reel.caption}</p>
            </div>

            <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-5 text-white">
                <button className="flex flex-col items-center"><HeartIcon className="w-8 h-8"/> <span className="text-xs">1.2M</span></button>
                <button className="flex flex-col items-center"><ChatBubbleIcon className="w-8 h-8"/> <span className="text-xs">4.5K</span></button>
                <button className="flex flex-col items-center"><ShareIcon className="w-8 h-8"/> <span className="text-xs">Share</span></button>
                <button><MoreIcon className="w-8 h-8"/></button>
                 <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden"><img src={reel.user.avatar} className="w-full h-full object-cover animate-spin-slow" /></div>
            </div>
        </div>
    )
};


const ReelsPage: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleReel, setVisibleReel] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
                        setVisibleReel(index);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const reels = containerRef.current?.querySelectorAll('.reel-item');
        reels?.forEach(reel => observer.observe(reel));

        return () => {
            reels?.forEach(reel => observer.unobserve(reel));
        };
    }, []);

    return (
        <div ref={containerRef} className="h-[calc(100vh-10rem)] w-full max-w-sm mx-auto bg-black rounded-2xl overflow-y-auto snap-y snap-mandatory no-scrollbar">
            {reelsData.map((reel, index) => (
                <div key={reel.id} data-index={index} className="reel-item h-full w-full snap-start flex-shrink-0">
                    <ReelItem reel={reel} isVisible={index === visibleReel} />
                </div>
            ))}
        </div>
    );
};

export default ReelsPage;
