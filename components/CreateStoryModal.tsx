
import React, { useState } from 'react';
import { XIcon, ImageIcon } from './icons';
import { loggedInUser } from '../App';

interface CreateStoryModalProps {
    onClose: () => void;
}

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ onClose }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!imageUrl) return;
        setIsSubmitting(true);
        try {
            await fetch('/api/stories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: loggedInUser.id, imageUrl })
            });
            onClose();
        } catch (error) {
            console.error("Failed to create story", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md m-4 animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Create New Story</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>
                <div className="p-6 space-y-4">
                    {imageUrl ? (
                        <img src={imageUrl} alt="Story preview" className="w-full h-64 object-cover rounded-lg"/>
                    ) : (
                         <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center">
                            <ImageIcon className="w-16 h-16 text-gray-400" />
                            <p className="mt-2 text-gray-500">Add a photo for your story</p>
                        </div>
                    )}
                    <input 
                        type="text"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        placeholder="Image URL"
                        className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2"
                    />
                    <button onClick={handleSubmit} disabled={isSubmitting || !imageUrl} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg disabled:bg-orange-300">
                        {isSubmitting ? 'Posting...' : 'Post Story'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateStoryModal;
