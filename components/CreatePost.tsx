import React from 'react';
import { ImageIcon, PollIcon, ClockIcon, UserGroupIcon } from './icons';

const CreatePost: React.FC = () => {
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
            <button className="p-2 rounded-full text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/20" title="Temporary Post">
                <ClockIcon className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/20" title="Invite Collaborator">
                <UserGroupIcon className="w-6 h-6" />
            </button>
        </div>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-2 px-6 rounded-full text-sm hover:shadow-md transition-all retro-button">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
