import React, { useEffect } from 'react';
import { Achievement } from '../types';
import { StarIcon, XIcon } from './icons';

interface ToastProps {
    message: string;
    achievement?: Achievement;
    onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, achievement, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 5000); // Same duration as in App.tsx

        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div className="fixed bottom-20 lg:bottom-5 right-5 bg-gray-900 text-white rounded-xl shadow-lg p-4 w-full max-w-sm z-[220] animate-toast-in">
            <div className="flex items-start">
                {achievement ? (
                    <div className="p-2 bg-yellow-400 rounded-full mr-3">
                        <StarIcon className="w-6 h-6 text-white"/>
                    </div>
                ) : (
                    <div className="p-2 bg-orange-500 rounded-full mr-3">
                        <StarIcon className="w-6 h-6 text-white"/>
                    </div>
                )}
                <div className="flex-grow">
                    <p className="font-bold">{achievement ? achievement.name : 'Notification'}</p>
                    <p className="text-sm">{achievement ? achievement.description : message}</p>
                </div>
                 <button onClick={onDismiss} className="ml-2 p-1 rounded-full hover:bg-gray-700">
                    <XIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
};

export default Toast;
