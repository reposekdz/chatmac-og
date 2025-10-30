
import React, { useState, useEffect } from 'react';
import { Story } from '../types';
import { loggedInUser } from '../App';

interface StoryCardProps {
    story: Story;
    isFirst?: boolean;
    onClick: () => void;
    isHeaderVersion?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ story, isFirst, onClick, isHeaderVersion }) => {
    if (isHeaderVersion) {
        return (
            <button onClick={onClick} className="flex-shrink-0 flex flex-col items-center space-y-1 w-20 group">
                <div className={`w-16 h-16 rounded-full p-0.5 ${isFirst ? '' : 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600'}`}>
                    <div className="bg-white dark:bg-gray-900 p-0.5 rounded-full">
                         {isFirst ? (
                             <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-orange-500 text-3xl group-hover:bg-gray-200 dark:group-hover:bg-gray-700">+</div>
                         ) : (
                             <img src={story.user.avatar} alt={story.user.name} className="w-full h-full rounded-full object-cover" />
                         )}
                    </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate w-full">{isFirst ? 'Add Story' : story.user.name}</p>
            </button>
        )
    }
    
    // Original large card style
    return (
    <button onClick={onClick} className="flex-shrink-0 w-28 h-48 rounded-2xl overflow-hidden relative group cursor-pointer shadow-md">
        <img src={story.imageUrl} alt={isFirst ? 'Create Story' : story.user.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
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
  setCreateStoryModalOpen: (isOpen: boolean) => void;
  isHeaderVersion?: boolean;
}

const StoryReel: React.FC<StoryReelProps> = ({ setViewingStory, setCreateStoryModalOpen, isHeaderVersion }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchStories = async () => {
          try {
              const response = await fetch(`/api/stories?userId=${loggedInUser.id}`);
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data: Story[] = await response.json();
              
              const createStoryPlaceholder: Story = { id: 0, user: loggedInUser, imageUrl: loggedInUser.avatar, created_at: '', likes_count: 0, comments_count: 0, is_liked_by_user: false };

              setStories([createStoryPlaceholder, ...data]);
          } catch (error) {
              console.error("Failed to fetch stories:", error);
          } finally {
              setLoading(false);
          }
      };
      fetchStories();
  }, []);

  const handleStoryClick = (index: number) => {
    const viewableStories = stories.slice(1);
    const startIndex = index - 1;
    if (startIndex >= 0) {
      setViewingStory({ stories: viewableStories, startIndex });
    } else {
        setCreateStoryModalOpen(true);
    }
  };
  
  if (loading && isHeaderVersion) {
    return <div className="h-16 flex items-center justify-center text-gray-500 text-sm">Loading...</div>;
  }
  
  return (
    <div className={`flex space-x-3 overflow-x-auto py-2 no-scrollbar ${isHeaderVersion ? 'w-full' : '-mx-6 px-6'}`}>
      {stories.map((story, index) => (
        <StoryCard 
          key={story.id === 0 ? 'create' : story.id}
          story={story} 
          isFirst={index === 0} 
          onClick={() => handleStoryClick(index)}
          isHeaderVersion={isHeaderVersion}
        />
      ))}
    </div>
  );
};

export default StoryReel;
