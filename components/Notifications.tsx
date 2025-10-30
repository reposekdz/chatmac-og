import React, { useState, useEffect } from 'react';
import { Notification } from '../types';
import { StarIcon, HeartIcon, ChatBubbleIcon, UserGroupIcon, MegaphoneIcon } from './icons';
import { loggedInUser } from '../App';


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
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/notifications?userId=${loggedInUser.id}`);
                if (!res.ok) throw new Error("Failed to fetch notifications");
                const data = await res.json();
                setNotifications(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);
    
    const filteredNotifications = notifications.filter(n => {
        if (filter === 'mentions') return n.type === 'mention';
        return true;
    });

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
                {loading && <div className="p-4 text-center">Loading notifications...</div>}
                {!loading && filteredNotifications.map(notif => (
                    <div key={notif.id} className={`flex items-start space-x-4 p-4 border-b border-gray-200 dark:border-gray-800 ${!notif.is_read ? 'bg-orange-50 dark:bg-orange-900/10' : ''}`}>
                        <NotificationIcon type={notif.type} />
                        <div>
                            {notif.actor && <img src={notif.actor.avatar} className="w-8 h-8 rounded-full mb-1" />}
                            <p>
                                {notif.actor && <span className="font-bold">{notif.actor.name}</span>}
                                {notif.type === 'like' && ' liked your post: '}
                                {notif.type === 'comment' && ' commented on your post: '}
                                {notif.type === 'follow' && ' started following you.'}
                                {notif.type === 'mention' && ' mentioned you in a post: '}
                                {notif.type === 'system' && <span className="font-bold">System Announcement: </span>}
                                {notif.content}
                                {notif.post && <span className="text-gray-600 dark:text-gray-400">"{notif.post.content}"</span>}
                            </p>
                             <p className="text-xs text-gray-500 mt-1">{new Date(notif.created_at).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
                {!loading && filteredNotifications.length === 0 && <div className="p-4 text-center text-gray-500">No notifications yet.</div>}
            </div>
        </div>
    );
};

export default Notifications;