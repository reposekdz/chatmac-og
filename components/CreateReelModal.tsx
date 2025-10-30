import React, { useState } from 'react';
import { XIcon, FilmIcon } from './icons';
import { loggedInUser } from '../App';

interface CreateReelModalProps {
    onClose: () => void;
}

const CreateReelModal: React.FC<CreateReelModalProps> = ({ onClose }) => {
    const [videoUrl, setVideoUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async () => {
        setIsUploading(true);
        try {
            // Simulate file upload
            const uploadRes = await fetch('/api/uploads', { method: 'POST' });
            const { url } = await uploadRes.json();
            setVideoUrl(url); // We'll use an image URL as a placeholder for the video
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setIsUploading(false);
        }
    };
    
    const handleSubmit = async () => {
        if (!videoUrl) return;
        try {
            await fetch('/api/reels', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: loggedInUser.id, videoUrl, caption })
            });
            onClose();
        } catch (error) {
            console.error("Failed to create reel", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md m-4 animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Create New Reel</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>
                <div className="p-6 space-y-4">
                     {videoUrl ? (
                        <img src={videoUrl} alt="Reel preview" className="w-full h-64 object-cover rounded-lg"/>
                    ) : (
                         <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center">
                            <FilmIcon className="w-16 h-16 text-gray-400" />
                            <p className="mt-2 text-gray-500">Upload a video for your reel</p>
                        </div>
                    )}
                    <button onClick={handleUpload} disabled={isUploading} className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg">
                        {isUploading ? 'Uploading...' : 'Upload Video'}
                    </button>
                    <textarea value={caption} onChange={e => setCaption(e.target.value)} placeholder="Write a caption..." className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2" rows={3}></textarea>
                    <button onClick={handleSubmit} disabled={!videoUrl} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg disabled:bg-orange-300">
                        Post Reel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateReelModal;