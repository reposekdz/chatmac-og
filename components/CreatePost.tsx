import React, { useState } from 'react';
import { Post } from '../types';
import { loggedInUser } from '../App';
import { ImageIcon, PollIcon, PaperAirplaneIcon, EmojiHappyIcon, PaperclipIcon, MapIcon } from './icons';

interface CreatePostProps {
    onPostCreated: (newPost: Post) => void;
}

interface Location {
    latitude: number;
    longitude: number;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [location, setLocation] = useState<Location | null>(null);
    const [isLocating, setIsLocating] = useState(false);

    const handleAddLocation = () => {
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                setIsLocating(false);
            },
            (error) => {
                console.error("Geolocation error:", error);
                alert("Could not get location.");
                setIsLocating(false);
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        const newPostData = {
            userId: loggedInUser.id,
            content: content.trim(),
            latitude: location?.latitude,
            longitude: location?.longitude,
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
            setLocation(null);
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
                        {location && (
                            <div className="text-xs text-green-600 font-semibold bg-green-100 dark:bg-green-900/50 rounded-full px-2 py-1 inline-flex items-center">
                                <MapIcon className="w-3 h-3 mr-1"/> Location Added
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-2 text-orange-500">
                        <button type="button" className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/50"><ImageIcon className="w-6 h-6" /></button>
                        <button type="button" className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/50"><PaperclipIcon className="w-6 h-6" /></button>
                        <button type="button" className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/50"><PollIcon className="w-6 h-6" /></button>
                        <button type="button" className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/50"><EmojiHappyIcon className="w-6 h-6" /></button>
                         <button type="button" onClick={handleAddLocation} disabled={isLocating} className="p-2 rounded-full hover:bg-orange-100 dark:hover:bg-orange-900/50 disabled:opacity-50">
                            <MapIcon className="w-6 h-6" />
                        </button>
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