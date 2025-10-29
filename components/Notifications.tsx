import React, { useState } from 'react';
import { Notification } from '../types';
import { StarIcon, HeartIcon, ChatBubbleIcon, UserGroupIcon, MegaphoneIcon } from './icons';

const notificationData: Notification[] = [
    { id: 1, type: 'follow', user: { id: 2, name: 'FoodieFiesta', handle: '@tastytreats', avatar: 'https://picsum.photos/id/1025/50/50' }, timestamp: '2h ago', isRead: false },
    { id: 2, type: 'like', user: { id: 3, name: 'TechInnovator', handle: '@techguru', avatar: 'https://picsum.photos/id/1005/50/50' }, post: { id: 1, excerpt: 'My new setup is finally complete!...' }, timestamp: '5h ago', isRead: false },
    { id: 3, type: 'comment', user: { id: 4, name: 'ArtfulAdventures', handle: '@creativecanvas', avatar: 'https://picsum.photos/id/1011/50/50' }, post: { id: 2, excerpt: 'Just finished this painting...' }, timestamp: '1d ago', isRead: true },
    { id: 4, type: 'mention', user: { id: 1, name: 'Elena Rodriguez', handle: '@elenacodes', avatar: 'https://picsum.photos/id/1027/50/50' }, post: { id: 3, excerpt: 'Shoutout to @janedoe for the help!...' }, timestamp: '2d ago', isRead: true },
    { id: 5, type: 'system', content: 'New community guidelines have been published.', timestamp: '3d ago', isRead: true }
];

const NotificationIcon: React.FC<{ type: Notification['type'] }> = ({ type }) => {
    const commonClass = "w-6 h-6 text-white";
    switch (type) {
        case 'like': return <div className="p-2 rounded-full bg-red-500"><HeartIcon className={commonClass} /></div>;
        case 'comment': return <div className="p-2 rounded-full bg-blue-500"><ChatBubbleIcon className={commonClass} /></div>;
        case 'follow': return <div className="p-2 rounded-full bg-green-500"><UserGroupIcon className={commonClass} /></div>;
        case 'mention': return <div className="p-2 rounded-full bg-purple-500"><StarIcon className={commonClass} /></div>;
        case 'system': return <div className="p-2 rounded-full bg-gray-500"><MegaphoneIcon className={commonClass} /></div>;
        default: return null;
    }
};


const Notifications: React.FC = () => {
    const [filter, setFilter] = useState('all');

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 card">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h1 className="text-2xl font-bold">Notifications</h1>
            </div>
            <div className="flex border-b border-gray-200 dark:border-gray-800">
                 <button onClick={() => setFilter('all')} className={`flex-1 p-3 font-semibold text-center ${filter === 'all' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>All</button>
                 <button onClick={() => setFilter('mentions')} className={`flex-1 p-3 font-semibold text-center ${filter === 'mentions' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'}`}>Mentions</button>
            </div>
            <div>
                {notificationData.map(notif => (
                    <div key={notif.id} className={`flex items-start space-x-4 p-4 border-b border-gray-200 dark:border-gray-800 ${!notif.isRead ? 'bg-orange-50 dark:bg-orange-900/10' : ''}`}>
                        <NotificationIcon type={notif.type} />
                        <div>
                            {notif.user && <img src={notif.user.avatar} className="w-8 h-8 rounded-full mb-1" />}
                            <p>
                                {notif.user && <span className="font-bold">{notif.user.name}</span>}
                                {notif.type === 'like' && ' liked your post: '}
                                {notif.type === 'comment' && ' commented on your post: '}
                                {notif.type === 'follow' && ' started following you.'}
                                {notif.type === 'mention' && ' mentioned you in a post: '}
                                {notif.type === 'system' && <span className="font-bold">System Announcement: </span>}
                                {notif.content}
                                {notif.post && <span className="text-gray-600 dark:text-gray-400">"{notif.post.excerpt}"</span>}
                            </p>
                             <p className="text-xs text-gray-500 mt-1">{notif.timestamp}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
