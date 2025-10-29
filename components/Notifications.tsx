import React, { useState } from 'react';
import { HeartIcon, UserGroupIcon, ChatBubbleIcon, AtSymbolIcon, StarIcon } from './icons';

// Mock notifications data
const notificationsData = [
  { id: 1, type: 'like', user: { name: 'Sam Adventure', avatar: 'https://picsum.photos/id/1015/50/50' }, content: 'your post "Chasing waterfalls."', time: '2h ago', read: false },
  { id: 2, type: 'follow', user: { name: 'TechInnovator', avatar: 'https://picsum.photos/id/1005/50/50' }, content: 'started following you.', time: '5h ago', read: false },
  { id: 3, type: 'comment', user: { name: 'FoodieFiesta', avatar: 'https://picsum.photos/id/1025/50/50' }, content: 'replied: "Looks delicious!"', time: '1d ago', read: true },
  { id: 4, type: 'mention', user: { name: 'Elena Rodriguez', avatar: 'https://picsum.photos/id/1027/50/50' }, content: 'mentioned you in a post.', time: '2d ago', read: true },
  { id: 5, type: 'system', user: { name: 'ChatMac', avatar: 'https://picsum.photos/seed/chatmac/50/50' }, content: 'You have earned the "Power User" badge!', time: '3d ago', read: true },
];

const NotificationIcon = ({ type }: { type: string }) => {
    const commonClass = "w-6 h-6 text-white";
    switch (type) {
        case 'like': return <div className="p-2 bg-red-500 rounded-full"><HeartIcon className={commonClass} /></div>;
        case 'follow': return <div className="p-2 bg-blue-500 rounded-full"><UserGroupIcon className={commonClass} /></div>;
        case 'comment': return <div className="p-2 bg-green-500 rounded-full"><ChatBubbleIcon className={commonClass} /></div>;
        case 'mention': return <div className="p-2 bg-purple-500 rounded-full"><AtSymbolIcon className={commonClass} /></div>;
        case 'system': return <div className="p-2 bg-yellow-500 rounded-full"><StarIcon className={commonClass} /></div>;
        default: return null;
    }
};

const Notifications = () => {
    const [filter, setFilter] = useState('all');
    
    const filteredNotifications = notificationsData.filter(n => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !n.read;
        if (filter === 'mentions') return n.type === 'mention';
        return false;
    });

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 card">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h1 className="text-2xl font-bold">Notifications</h1>
            </div>
            <div className="flex p-2 border-b border-gray-200 dark:border-gray-800">
                <button onClick={() => setFilter('all')} className={`px-4 py-1.5 text-sm font-semibold rounded-full ${filter === 'all' ? 'bg-orange-500 text-white' : ''}`}>All</button>
                <button onClick={() => setFilter('unread')} className={`px-4 py-1.5 text-sm font-semibold rounded-full ${filter === 'unread' ? 'bg-orange-500 text-white' : ''}`}>Unread</button>
                <button onClick={() => setFilter('mentions')} className={`px-4 py-1.5 text-sm font-semibold rounded-full ${filter === 'mentions' ? 'bg-orange-500 text-white' : ''}`}>Mentions</button>
            </div>
            <div className="flex flex-col">
                {filteredNotifications.map(notification => (
                    <div key={notification.id} className={`flex items-start space-x-4 p-4 border-b border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${!notification.read ? 'bg-orange-50 dark:bg-orange-900/10' : ''}`}>
                        <NotificationIcon type={notification.type} />
                        <div className="flex-1">
                            <img src={notification.user.avatar} alt={notification.user.name} className="w-8 h-8 rounded-full mb-1" />
                            <p className="text-sm">
                                <span className="font-bold">{notification.user.name}</span>
                                {' '}
                                <span className="text-gray-600 dark:text-gray-400">{notification.content}</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full self-center"></div>}
                    </div>
                ))}
                {filteredNotifications.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No notifications here.
                    </div>
                )}
            </div>
        </div>
    )
}
export default Notifications;