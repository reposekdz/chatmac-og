
import React from 'react';
import { loggedInUser } from '../App';
import { ImageIcon, PollIcon, SparklesIcon } from './icons';

interface CreatePostProps {
    setCreatePostModalOpen: (isOpen: boolean) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ setCreatePostModalOpen }) => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
            <div className="flex items-start space-x-4">
                <img src={loggedInUser.avatar} alt="Your avatar" className="w-12 h-12 rounded-full" />
                <div className="flex-grow">
                    <button 
                        onClick={() => setCreatePostModalOpen(true)}
                        className="w-full text-left bg-gray-100 dark:bg-gray-800 rounded-full py-3 px-4 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        What's on your mind, {loggedInUser.name.split(' ')[0]}?
                    </button>
                    <div className="flex items-center justify-end space-x-4 mt-3">
                        <button onClick={() => setCreatePostModalOpen(true)} className="flex items-center space-x-2 text-sm font-semibold text-blue-500 hover:text-blue-600">
                            <ImageIcon className="w-5 h-5"/>
                            <span>Photo/Video</span>
                        </button>
                        <button onClick={() => setCreatePostModalOpen(true)} className="flex items-center space-x-2 text-sm font-semibold text-green-500 hover:text-green-600">
                            <PollIcon className="w-5 h-5"/>
                            <span>Poll</span>
                        </button>
                         <button className="flex items-center space-x-2 text-sm font-semibold text-purple-500 hover:text-purple-600">
                            <SparklesIcon className="w-5 h-5"/>
                            <span>AI Assist</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
