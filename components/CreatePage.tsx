import React from 'react';
import { ImageIcon, FilmIcon, StarIcon } from './icons';

interface CreatePageProps {
    setCreatePostModalOpen: (isOpen: boolean) => void;
    setCreateStoryModalOpen: (isOpen: boolean) => void;
    setCreateReelModalOpen: (isOpen: boolean) => void;
}

const CreatePage: React.FC<CreatePageProps> = ({ setCreatePostModalOpen, setCreateStoryModalOpen, setCreateReelModalOpen }) => {
    
    const creationOptions = [
        {
            title: 'New Post',
            description: 'Share your thoughts with the community.',
            icon: ImageIcon,
            action: () => setCreatePostModalOpen(true),
            color: 'text-blue-500'
        },
        {
            title: 'New Story',
            description: 'Share a photo or video that disappears in 24 hours.',
            icon: StarIcon,
            action: () => setCreateStoryModalOpen(true),
            color: 'text-purple-500'
        },
        {
            title: 'New Reel',
            description: 'Create and share a short, engaging video.',
            icon: FilmIcon,
            action: () => setCreateReelModalOpen(true),
            color: 'text-pink-500'
        },
    ]

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
            <h1 className="text-3xl font-bold mb-1">Create</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">What would you like to share today?</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {creationOptions.map(opt => (
                     <button key={opt.title} onClick={opt.action} className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700 flex items-center space-x-4">
                        <opt.icon className={`w-10 h-10 ${opt.color}`}/>
                        <div>
                            <h2 className="font-bold text-lg">{opt.title}</h2>
                            <p className="text-sm text-gray-500">{opt.description}</p>
                        </div>
                     </button>
                ))}
            </div>
        </div>
    );
};

export default CreatePage;