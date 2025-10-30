
import React, { useState } from 'react';
import { XIcon, ImageIcon, PollIcon, GlobeAltIcon } from './icons';
import { loggedInUser } from '../App';

interface CreatePostModalProps {
    onClose: () => void;
    onPostCreated: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onPostCreated }) => {
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: loggedInUser.id,
                    content,
                    imageUrl,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }
            
            onPostCreated();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg m-4 animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Create a new post</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="flex items-start space-x-4">
                            <img src={loggedInUser.avatar} alt="your avatar" className="w-12 h-12 rounded-full" />
                            <textarea
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                placeholder={`What's on your mind, ${loggedInUser.name.split(' ')[0]}?`}
                                className="w-full h-32 bg-transparent text-lg resize-none focus:outline-none"
                            />
                        </div>
                        {imageUrl && (
                            <div className="mt-4 ml-16">
                                <img src={imageUrl} alt="preview" className="rounded-lg max-h-64 w-auto"/>
                            </div>
                        )}
                         <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Image URL (optional)"
                            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mt-4 ml-16"
                        />
                    </div>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <button type="button" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-blue-500"><ImageIcon className="w-6 h-6"/></button>
                            <button type="button" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-green-500"><PollIcon className="w-6 h-6"/></button>
                            <button type="button" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><GlobeAltIcon className="w-6 h-6"/></button>
                        </div>
                        <button type="submit" disabled={isSubmitting || !content.trim()} className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full disabled:bg-orange-300">
                            {isSubmitting ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostModal;
