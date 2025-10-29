import React, { useState } from 'react';
import { XIcon, HeartIcon, ChatBubbleIcon, ShareIcon, MoreIcon, PlayIcon } from './icons';

const exploreData = [
  { id: 1, type: 'image', url: 'https://picsum.photos/id/1015/500/800', title: 'Mountain Views', user: { name: 'Sam Adventure', avatar: 'https://picsum.photos/id/1015/50/50' } },
  { id: 2, type: 'video', url: 'https://picsum.photos/id/96/500/500', title: 'Gaming Setup', user: { name: 'TechInnovator', avatar: 'https://picsum.photos/id/1005/50/50' } },
  { id: 3, type: 'image', url: 'https://picsum.photos/id/1025/500/600', title: 'Delicious Pizza', user: { name: 'FoodieFiesta', avatar: 'https://picsum.photos/id/1025/50/50' } },
  { id: 4, type: 'image', url: 'https://picsum.photos/id/103/500/400', title: 'Short Film Scene', user: { name: 'Motion Flix', avatar: 'https://picsum.photos/id/103/50/50' } },
  { id: 5, type: 'image', url: 'https://picsum.photos/id/145/500/700', title: 'Concert Vibes', user: { name: 'MusicLover', avatar: 'https://picsum.photos/id/145/50/50' } },
  { id: 6, type: 'video', url: 'https://picsum.photos/id/2/500/500', title: 'Coding Timelapse', user: { name: 'Elena Rodriguez', avatar: 'https://picsum.photos/id/1027/50/50' } },
  { id: 7, type: 'image', url: 'https://picsum.photos/id/30/500/650', title: 'Global Summit Hall', user: { name: 'World News', avatar: 'https://picsum.photos/id/30/50/50' } },
  { id: 8, type: 'image', url: 'https://picsum.photos/id/1011/500/500', title: 'Art Studio', user: { name: 'ArtfulAdventures', avatar: 'https://picsum.photos/id/1011/50/50' } },
];

type ExploreItem = typeof exploreData[0];

const ExploreModal: React.FC<{ item: ExploreItem; onClose: () => void }> = ({ item, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-4xl h-[90vh] m-4 flex overflow-hidden animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="w-2/3 bg-black flex items-center justify-center">
                    <img src={item.url} alt={item.title} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="w-1/3 flex flex-col">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <img src={item.user.avatar} className="w-10 h-10 rounded-full" />
                            <p className="font-bold">{item.user.name}</p>
                        </div>
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto">
                        <p><span className="font-bold">{item.user.name}</span> {item.title}</p>
                        {/* Comments section placeholder */}
                    </div>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                         <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-4">
                                <button className="hover:text-red-500"><HeartIcon className="w-7 h-7" /></button>
                                <button className="hover:text-blue-500"><ChatBubbleIcon className="w-7 h-7" /></button>
                                <button className="hover:text-green-500"><ShareIcon className="w-7 h-7" /></button>
                            </div>
                            <button><MoreIcon className="w-7 h-7" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Explore = () => {
    const [filter, setFilter] = useState('for_you');
    const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(null);
    
    return (
         <>
         {selectedItem && <ExploreModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
         <div className="flex flex-col space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
                <h1 className="text-2xl font-bold mb-4">Explore</h1>
                <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800">
                    <button onClick={() => setFilter('for_you')} className={`px-4 py-2 text-sm font-semibold ${filter === 'for_you' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}>For You</button>
                    <button onClick={() => setFilter('trending')} className={`px-4 py-2 text-sm font-semibold ${filter === 'trending' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}>Trending</button>
                    <button onClick={() => setFilter('videos')} className={`px-4 py-2 text-sm font-semibold ${filter === 'videos' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}>Videos</button>
                    <button onClick={() => setFilter('images')} className={`px-4 py-2 text-sm font-semibold ${filter === 'images' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}>Images</button>
                </div>
            </div>
            
            <div className="columns-2 md:columns-3 gap-4">
                {exploreData.map((item) => (
                    <button onClick={() => setSelectedItem(item)} key={item.id} className="mb-4 break-inside-avoid relative group">
                        <img src={item.url} alt={item.title} className="w-full rounded-2xl"/>
                        {item.type === 'video' && (
                             <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <PlayIcon className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity"/>
                             </div>
                        )}
                    </button>
                ))}
            </div>
         </div>
         </>
    )
}
export default Explore;
