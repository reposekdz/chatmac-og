import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import StoryReel from './StoryReel';
import { Post, Story } from '../types';

interface MainContentProps {
    addCoins: (amount: number) => void;
    isAntiToxic: boolean;
    profileMode: string;
    setCreatePostModalOpen: (isOpen: boolean) => void;
    setViewingStory: (view: { stories: Story[], startIndex: number } | null) => void;
}

const MainContent: React.FC<MainContentProps> = ({addCoins, isAntiToxic, setCreatePostModalOpen, setViewingStory}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const topics = ['Tech', 'Travel', 'Gaming', 'Food', 'Music', 'Art'];
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts'); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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
  
  const onPostCreated = (newPost: Post) => {
      setPosts(prevPosts => [newPost, ...prevPosts]);
  }


  const filteredPosts = useMemo(() => {
      if (selectedTopics.size === 0) {
          return posts;
      }
      return posts.filter(post => 
          post.topics?.some(topic => selectedTopics.has(topic))
      );
  }, [selectedTopics, posts]);
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="md:hidden">
        <CreatePost onPostCreated={onPostCreated}/>
      </div>
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
      <StoryReel setViewingStory={setViewingStory} />
      {loading && <div className="text-center py-12 text-gray-500 dark:text-gray-400">Loading posts...</div>}
      {error && <div className="text-center py-12 text-red-500">Error fetching posts: {error}. Is the backend running?</div>}
      {!loading && !error && filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} addCoins={addCoins} isAntiToxic={isAntiToxic} />
      ))}
      {!loading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No posts match your selected topics. Try selecting others!</p>
          </div>
      )}
    </div>
  );
};

export default MainContent;