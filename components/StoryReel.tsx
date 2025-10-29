import React from 'react';
import { Story } from '../types';
import { MicrophoneIcon, ReplyIcon } from './icons';

export const storyData: Story[] = [
  { id: 1, user: { name: 'You', avatar: 'https://picsum.photos/id/1005/50/50' }, imageUrl: 'https://picsum.photos/id/1005/400/800' },
  { id: 2, user: { name: 'Sam', avatar: 'https://picsum.photos/id/1015/50/50' }, imageUrl: 'https://picsum.photos/id/1015/400/800' },
  { id: 6, user: { name: 'Jane', avatar: 'https://picsum.photos/id/1011/50/50' }, imageUrl: 'https://picsum.photos/id/1011/400/800' },
  { id: 3, user: { name: 'Elena', avatar: 'https://picsum.photos/id/1027/50/50' }, imageUrl: 'https://picsum.photos/id/1027/400/800' },
  { id: 4, user: { name: 'Tech', avatar: 'https://picsum.photos/id/1/50/50' }, imageUrl: 'https://picsum.photos/id/1/400/800' },
  { id: 5, user: { name: 'Motion', avatar: 'https://picsum.photos/id/103/50/50' }, imageUrl: 'https://picsum.photos/id/103/400/800' },
];

interface StoryCardProps {
    story: Story;
    isFirst?: boolean;
    onClick: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, isFirst, onClick }) => {
    const isVoice = story.type === 'voice';
    return (
    <button onClick={onClick} className={`flex-shrink-0 w-28 h-48 rounded-2xl overflow-hidden relative group cursor-pointer shadow-md ${isVoice ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : ''}`}>
        {!isVoice && <img src={story.imageUrl} alt={story.user.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {isVoice && (
            <div className="w-full h-full flex flex-col items-center justify-center text-white">
                <MicrophoneIcon className="w-12 h-12" />
                <p className="font-bold mt-2">Voice Status</p>
            </div>
        )}
        
        {isFirst ? (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center w-full px-1 text-center">
                 <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-white text-2xl mb-1">+</div>
                 <p className="text-white text-xs font-semibold">Create Story</p>
            </div>
        ) : (
            <>
              <img src={story.user.avatar} alt={story.user.name} className="w-10 h-10 rounded-full absolute top-3 left-3 border-4 border-orange-500" />
              <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold truncate">{story.user.name}</p>
            </>
        )}
    </button>
    )
};

interface StoryReelProps {
  setViewingStory: (view: { stories: Story[], startIndex: number } | null) => void;
}

const StoryReel: React.FC<StoryReelProps> = ({ setViewingStory }) => {
  const handleStoryClick = (index: number) => {
    // We pass all stories except the first one ("Create Story") to the viewer
    const viewableStories = storyData.slice(1);
    setViewingStory({ stories: viewableStories, startIndex: index - 1 });
  };
  
  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar">
      {storyData.map((story, index) => (
        <StoryCard 
          key={story.id} 
          story={story} 
          isFirst={index === 0} 
          onClick={() => {
            if (index > 0) {
              handleStoryClick(index);
            } else {
              // Handle "Create Story" action
              console.log("Create story clicked");
            }
          }} 
        />
      ))}
    </div>
  );
};

export default StoryReel;