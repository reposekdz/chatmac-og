import React, { useState } from 'react';
import { Post } from '../types';
import { loggedInUser } from '../App';
import { ImageIcon, PollIcon, PaperAirplaneIcon, EmojiHappyIcon, PaperclipIcon } from './icons';

interface CreatePostProps {
    onPostCreated: (newPost: Post) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        const newPostData = {
            userId: loggedInUser.id,
            content: content.trim(),
        };

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPostData),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const createdPost: Post = await response.json();
            onPostCreated(createdPost);
            setContent('');
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
            <form onSubmit={handleSubmit}>
                <div className="flex items-start space-x-4">
                    <img src={loggedInUser.avatar} alt="My Avatar" className="w-12 h-12 rounded-full" />
                    <div className="w-full">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full bg-transparent text-lg resize-none focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
                            rows={2}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-2 text-orange-500">
                        <button type="button" className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/50"><ImageIcon className="w-6 h-6" /></button>
                        <button type="button" className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/50"><PaperclipIcon className="w-6 h-6" /></button>
                        <button type="button" className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/50"><PollIcon className="w-6 h-6" /></button>
                        <button type="button" className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/50"><EmojiHappyIcon className="w-6 h-6" /></button>
                    </div>
                    <button
                        type="submit"
                        disabled={!content.trim()}
                        className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full disabled:bg-orange-300 dark:disabled:bg-orange-800 transition-colors retro-button"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
