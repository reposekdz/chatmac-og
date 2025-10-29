import React, { useState } from 'react';
import { Conversation, Message } from '../types';
import { SearchIcon, PaperAirplaneIcon, MoreIcon, VideoCameraIcon } from './icons';

const conversationData: Conversation[] = [
    { id: 1, user: { id: 3, name: 'TechInnovator', handle: '@techguru', avatar: 'https://picsum.photos/id/1005/50/50' }, lastMessage: 'Yeah, I think that could work. Let\'s sync up tomorrow.', timestamp: '5m ago', unreadCount: 2, isOnline: true },
    { id: 2, user: { id: 4, name: 'ArtfulAdventures', handle: '@creativecanvas', avatar: 'https://picsum.photos/id/1011/50/50' }, lastMessage: 'Just sent you the final design!', timestamp: '1h ago', unreadCount: 0, isOnline: false },
    { id: 3, user: { id: 2, name: 'FoodieFiesta', handle: '@tastytreats', avatar: 'https://picsum.photos/id/1025/50/50' }, lastMessage: 'You have to try this new ramen place.', timestamp: 'yesterday', unreadCount: 0, isOnline: true },
];

const messageData: { [key: number]: Message[] } = {
    1: [
        { id: 1, sender: 'them', content: 'Hey, did you see the latest framework updates?', timestamp: '10:30 AM' },
        { id: 2, sender: 'me', content: 'Not yet, been swamped. Anything major?', timestamp: '10:31 AM' },
        { id: 3, sender: 'them', content: 'Yeah, I think that could work. Let\'s sync up tomorrow.', timestamp: '10:35 AM' },
    ],
    2: [
        { id: 1, sender: 'them', content: 'Just sent you the final design!', timestamp: '9:15 AM' }
    ]
};

interface MessagesProps {
  openVideoCall: () => void;
}

const Messages: React.FC<MessagesProps> = ({ openVideoCall }) => {
    const [activeConversation, setActiveConversation] = useState<Conversation | null>(conversationData[0]);

    if (!activeConversation) {
        return (
             <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 card h-[calc(100vh-10rem)] flex items-center justify-center">
                <p>Select a conversation to start messaging.</p>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 card h-[calc(100vh-10rem)] flex">
            {/* Conversation List */}
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-800 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <h1 className="text-xl font-bold">Messages</h1>
                </div>
                <div className="p-2">
                     <div className="relative">
                        <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="text" placeholder="Search messages" className="w-full bg-gray-100 dark:bg-gray-800 rounded-full pl-10 pr-4 py-2 text-sm"/>
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {conversationData.map(convo => (
                        <button key={convo.id} onClick={() => setActiveConversation(convo)} className={`w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${activeConversation.id === convo.id ? 'bg-orange-50 dark:bg-orange-900/20' : ''}`}>
                            <div className="relative">
                               <img src={convo.user.avatar} className="w-12 h-12 rounded-full"/>
                               {convo.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>}
                            </div>
                            <div className="flex-grow overflow-hidden">
                                <p className="font-bold">{convo.user.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{convo.lastMessage}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-xs text-gray-400">{convo.timestamp}</p>
                                {convo.unreadCount > 0 && <div className="mt-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center ml-auto">{convo.unreadCount}</div>}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            {/* Active Chat */}
            <div className="w-2/3 flex flex-col">
                 <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <div>
                        <p className="font-bold">{activeConversation.user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activeConversation.user.handle}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={openVideoCall} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><VideoCameraIcon className="w-6 h-6"/></button>
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><MoreIcon className="w-6 h-6"/></button>
                    </div>
                </div>
                <div className="flex-grow p-4 overflow-y-auto flex flex-col-reverse">
                    <div className="space-y-4">
                    {(messageData[activeConversation.id] || []).map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.sender === 'me' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'}`}>
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                 <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="relative">
                        <input type="text" placeholder="Type a message..." className="w-full bg-gray-100 dark:bg-gray-800 rounded-full pl-4 pr-12 py-3 text-sm"/>
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-full">
                            <PaperAirplaneIcon className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
