import React, { useState } from 'react';
import { ImageIcon, PollIcon, ClockIcon, UserGroupIcon, GlobeAltIcon, StarIcon, LinkIcon, CalendarIcon } from './icons';
import { PostVisibility } from '../types';

const CreatePost: React.FC = () => {
  const [visibility, setVisibility] = useState<Set<PostVisibility>>(new Set(['public']));

  const toggleVisibility = (v: PostVisibility) => {
    setVisibility(prev => {
        const newSet = new Set(prev);
        if (newSet.has(v)) {
            newSet.delete(v);
        } else {
            newSet.add(v);
        }
        return newSet;
    });
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
      <div className="flex items-start space-x-4">
        <img
          className="h-12 w-12 rounded-full"
          src="https://picsum.photos/id/1005/50/50"
          alt="User avatar"
        />
        <div className="flex-1">
          <textarea
            rows={3}
            className="w-full border-none focus:ring-0 resize-none text-lg placeholder-gray-500 dark:placeholder-gray-400 bg-transparent"
            placeholder="What's happening?"
          ></textarea>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
            <button className="p-2 rounded-full text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/20" title="Add Image">
                <ImageIcon className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/20" title="Create Poll">
                <PollIcon className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/20" title="Schedule Post">
                <CalendarIcon className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/20" title="Create a Chain Post">
                <LinkIcon className="w-6 h-6" />
            </button>
        </div>
         <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
                <button onClick={() => toggleVisibility('public')} className={`p-1.5 rounded-full ${visibility.has('public') ? 'bg-white dark:bg-gray-700 text-blue-500' : 'text-gray-400'}`} title="Public">
                    <GlobeAltIcon className="w-5 h-5"/>
                </button>
                <button onClick={() => toggleVisibility('friends')} className={`p-1.5 rounded-full ${visibility.has('friends') ? 'bg-white dark:bg-gray-700 text-green-500' : 'text-gray-400'}`} title="Friends Only">
                    <UserGroupIcon className="w-5 h-5"/>
                </button>
                <button onClick={() => toggleVisibility('premium')} className={`p-1.5 rounded-full ${visibility.has('premium') ? 'bg-white dark:bg-gray-700 text-yellow-500' : 'text-gray-400'}`} title="Premium Subscribers Only">
                    <StarIcon className="w-5 h-5"/>
                </button>
            </div>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-2 px-6 rounded-full text-sm hover:shadow-md transition-all retro-button">
              Post
            </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;