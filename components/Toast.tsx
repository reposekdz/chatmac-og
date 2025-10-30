import React, { useEffect } from 'react';
import { Achievement, Notification } from '../types';
import { StarIcon, XIcon, HeartIcon } from './icons';

interface ToastProps {
    message: string;
    achievement?: Achievement;
    notification?: Notification;
    onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, achievement, notification, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onDismiss]);
    
    const renderContent = () => {
        if (achievement) {
            return {
                icon: <div className="p-2 bg-yellow-400 rounded-full mr-3"><StarIcon className="w-6 h-6 text-white"/></div>,
                title: achievement.name,
                body: achievement.description
            };
        }
        if (notification) {
            return {
                icon: <img src={notification.actor.avatar} className="w-10 h-10 rounded-full mr-3" />,
                title: `${notification.actor.name}`,
                body: notification.content
            }
        }
        return {
            icon: <div className="p-2 bg-orange-500 rounded-full mr-3"><StarIcon className="w-6 h-6 text-white"/></div>,
            title: 'Notification',
            body: message
        };
    };
    
    const { icon, title, body } = renderContent();

    return (
        <div className="fixed bottom-20 lg:bottom-5 right-5 bg-gray-900/90 backdrop-blur-md text-white rounded-xl shadow-lg p-4 w-full max-w-sm z-[220] animate-toast-in border border-gray-700">
            <div className="flex items-start">
                {icon}
                <div className="flex-grow">
                    <p className="font-bold">{title}</p>
                    <p className="text-sm text-gray-300">{body}</p>
                </div>
                 <button onClick={onDismiss} className="ml-2 p-1 rounded-full hover:bg-gray-700 flex-shrink-0">
                    <XIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
};

export default Toast;
