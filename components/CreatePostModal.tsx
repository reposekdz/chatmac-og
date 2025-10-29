import React from 'react';
import CreatePost from './CreatePost';
import { Post } from '../types';
import { XIcon } from './icons';

interface CreatePostModalProps {
    onClose: () => void;
    onPostCreated: (newPost: Post) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onPostCreated }) => {

    const handlePostAndClose = (newPost: Post) => {
        onPostCreated(newPost);
        onClose();
    }
    
    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-end justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-t-2xl shadow-xl w-full max-w-2xl animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Create a new post</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <XIcon className="w-5 h-5"/>
                    </button>
                </div>
                <div className="p-4">
                    <CreatePost onPostCreated={handlePostAndClose} />
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;
