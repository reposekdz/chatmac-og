import React, { useState, useEffect } from 'react';
import { HeartIcon, UserGroupIcon, ChatBubbleIcon, AtSymbolIcon, StarIcon } from './icons';
import { Notification } from '../types';
import { loggedInUser } from '../App';

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
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
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/notifications?userId=${loggedInUser.id}`);
                const data = await res.json();
                setNotifications(data);
            } catch (e) {
                console.error("Failed to fetch notifications", e);
            } finally {
                setLoading(false);
            }
        }
        fetchNotifications();
    }, []);
    
    const filteredNotifications = notifications.filter(n => {
        if (filter === 'all') return true;
        if (filter === 'unread') return !n.read_status;
        if (filter === 'mentions') return n.type === 'mention';
        return false;
    });

    const getNotificationText = (n: Notification) => {
        switch(n.type) {
            case 'like': return 'liked your post.';
            case 'comment': return `commented: "${n.content_preview}"`;
            case 'follow': return 'started following you.';
            case 'mention': return `mentioned you in a post.`;
            case 'system': return n.content_preview || 'System notification.';
            default: return '';
        }
    }

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
                {loading && <div className="p-8 text-center text-gray-500">Loading...</div>}
                {!loading && filteredNotifications.map(notification => (
                    <div key={notification.id} className={`flex items-start space-x-4 p-4 border-b border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${!notification.read_status ? 'bg-orange-50 dark:bg-orange-900/10' : ''}`}>
                        <NotificationIcon type={notification.type} />
                        <div className="flex-1">
                            <img src={notification.actor.avatar} alt={notification.actor.name} className="w-8 h-8 rounded-full mb-1" />
                            <p className="text-sm">
                                <span className="font-bold">{notification.actor.name}</span>
                                {' '}
                                <span className="text-gray-600 dark:text-gray-400">{getNotificationText(notification)}</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{new Date(notification.created_at).toLocaleString()}</p>
                        </div>
                        {!notification.read_status && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full self-center"></div>}
                    </div>
                ))}
                {!loading && filteredNotifications.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No notifications here.
                    </div>
                )}
            </div>
        </div>
    )
}
export default Notifications;