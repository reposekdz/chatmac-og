import React from 'react';
import { XIcon, MicrophoneIcon, VideoCameraIcon, PhoneIcon } from './icons';

interface VideoCallModalProps {
    onClose: () => void;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="bg-gray-900 text-white rounded-2xl shadow-xl w-full max-w-4xl h-[90vh] m-4 flex flex-col overflow-hidden animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 flex justify-between items-center">
                    <p className="font-semibold">Video Call with TechInnovator</p>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>

                <div className="flex-grow bg-black rounded-lg relative m-2">
                    {/* Remote Video */}
                    <img src="https://picsum.photos/id/1005/800/600" className="w-full h-full object-cover rounded-lg"/>
                    <p className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 text-sm rounded">TechInnovator</p>
                    
                    {/* Local Video */}
                    <div className="bg-black rounded-lg absolute bottom-4 right-4 w-1/4 h-1/4 border-2 border-white/50 overflow-hidden">
                         <img src="https://picsum.photos/id/1005/300/200" className="w-full h-full object-cover"/>
                         <p className="absolute bottom-1 left-1 bg-black/50 px-1 text-xs rounded">You</p>
                    </div>
                </div>

                <div className="bg-gray-800/50 p-4 flex justify-center items-center space-x-6">
                    <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600"><MicrophoneIcon className="w-6 h-6"/></button>
                    <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600"><VideoCameraIcon className="w-6 h-6"/></button>
                    <button onClick={onClose} className="p-4 bg-red-600 rounded-full hover:bg-red-700"><PhoneIcon className="w-7 h-7"/></button>
                </div>
            </div>
        </div>
    );
};

export default VideoCallModal;
