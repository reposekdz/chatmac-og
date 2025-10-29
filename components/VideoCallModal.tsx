import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { XIcon, MicrophoneIcon, VideoCameraIcon } from './icons';

interface VideoCallModalProps {
    user: User;
    onClose: () => void;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ user, onClose }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [status, setStatus] = useState('Connecting...');

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus('Ringing...');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-gray-900 z-[200] flex flex-col items-center justify-between p-8 animate-modal-fade-in text-white">
            <div className="text-center">
                <p className="text-lg font-semibold">{status}</p>
                <h1 className="text-4xl font-bold mt-2">{user.name}</h1>
            </div>

            <div className="relative">
                <img src={user.avatar} className="w-48 h-48 rounded-full shadow-2xl" />
                <div className="absolute inset-0 rounded-full border-4 border-orange-500 animate-pulse-radar"></div>
            </div>

            <div className="flex items-center space-x-6">
                <button onClick={() => setIsMuted(!isMuted)} className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-red-500' : 'bg-white/20'}`}>
                    <MicrophoneIcon className={`w-8 h-8 ${isMuted ? 'text-white' : ''}`} />
                    {isMuted && <div className="absolute w-1 h-16 bg-red-500 transform rotate-45"></div>}
                </button>
                 <button onClick={() => setIsVideoOff(!isVideoOff)} className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isVideoOff ? 'bg-gray-500' : 'bg-white/20'}`}>
                    <VideoCameraIcon className={`w-8 h-8 ${isVideoOff ? 'text-white' : ''}`} />
                </button>
                <button onClick={onClose} className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <XIcon className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
};

export default VideoCallModal;
