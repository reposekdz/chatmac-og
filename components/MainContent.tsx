import React, { useState, useMemo } from 'react';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import StoryReel from './StoryReel';
import Reels from './Reels';
import { Post, PostContentType } from '../types';

const allPosts: Post[] = [
  {
    id: 1,
    user: { name: 'Elena Rodriguez', handle: '@elenacodes', avatar: 'https://picsum.photos/id/1027/200/200', reputation: 98, isCommunityVerified: true },
    timestamp: '2h ago',
    content: 'Just deployed a new feature for our React app! The performance gains are incredible. Tailwind CSS made styling a breeze. 🚀',
    contentType: PostContentType.TEXT,
    visibility: ['public'],
    impactScore: 1280,
    comments: 15,
    shares: 23,
    topics: ['Tech', 'Gaming'],
  },
  {
    id: 2,
    user: { name: 'Sam Adventure', handle: '@samgoesplaces', avatar: 'https://picsum.photos/id/1015/200/200', reputation: 92 },
    timestamp: '5h ago',
    content: 'Chasing waterfalls. Nature never ceases to amaze me. 🌲🌊',
    contentType: PostContentType.IMAGE,
    mediaUrl: 'https://picsum.photos/id/1015/600/400',
    visibility: ['public', 'friends'],
    impactScore: 5430,
    comments: 45,
    shares: 89,
    topics: ['Travel', 'Art'],
  },
   {
    id: 3,
    user: { name: 'Tech Central', handle: '@techcentral', avatar: 'https://picsum.photos/id/1/200/200', reputation: 85 },
    timestamp: '8h ago',
    content: 'What is your favorite state management library for React?',
    contentType: PostContentType.POLL,
    pollOptions: [
      { text: 'Redux', votes: 120 },
      { text: 'Zustand', votes: 250 },
      { text: 'Jotai', votes: 80 },
      { text: 'Context API', votes: 150 },
    ],
    visibility: ['public'],
    impactScore: 720,
    comments: 33,
    shares: 12,
    topics: ['Tech'],
  },
  {
    id: 4,
    user: { name: 'Motion Flix', handle: '@motionflix', avatar: 'https://picsum.photos/id/103/200/200', reputation: 99, isCommunityVerified: true },
    timestamp: '1d ago',
    content: 'Our latest short film "Neon Dreams" is out! Here\'s a little teaser. Let us know what you think!',
    contentType: PostContentType.VIDEO,
    mediaUrl: 'https://picsum.photos/id/103/600/400',
    visibility: ['premium'],
    impactScore: 10240,
    comments: 112,
    shares: 256,
    topics: ['Art', 'Music'],
  },
];

const MainContent: React.FC<any> = ({addCoins, isAntiToxic, profileMode}) => {
  const topics = ['Tech', 'Travel', 'Gaming', 'Food', 'Music', 'Art'];
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());

  const toggleTopic = (topic: string) => {
      setSelectedTopics(prev => {
          const newSet = new Set(prev);
          if (newSet.has(topic)) {
              newSet.delete(topic);
          } else {
              newSet.add(topic);
          }
          return newSet;
      });
  };

  const filteredPosts = useMemo(() => {
      if (selectedTopics.size === 0) {
          return allPosts;
      }
      return allPosts.filter(post => 
          post.topics?.some(topic => selectedTopics.has(topic))
      );
  }, [selectedTopics]);
  
  return (
    <div className="flex flex-col space-y-6">
      <CreatePost />
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Topic Fusion</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Combine topics to create your perfect feed.</p>
        <div className="flex flex-wrap gap-2">
            {topics.map(topic => (
                <button 
                  key={topic} 
                  onClick={() => toggleTopic(topic)}
                  className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${selectedTopics.has(topic) ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/50 hover:text-orange-600'}`}
                >
                    {topic}
                </button>
            ))}
        </div>
      </div>
      <StoryReel />
      <Reels />
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} addCoins={addCoins} isAntiToxic={isAntiToxic} />
      ))}
      {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No posts match your selected topics. Try selecting others!</p>
          </div>
      )}
    </div>
  );
};

export default MainContent;