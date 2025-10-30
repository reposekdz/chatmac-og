import React, { useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';
import { Conversation, Message, User } from '../types';
import { SearchIcon, PaperAirplaneIcon, MoreIcon, VideoCameraIcon } from './icons';
import { loggedInUser } from '../App';

interface MessagesProps {
  openVideoCall: (user: User) => void;
  socket: Socket;
}

const Messages: React.FC<MessagesProps> = ({ openVideoCall, socket }) => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [onlineUsers, setOnlineUsers] = useState<number[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const fetchConversations = async () => {
        try {
            const res = await fetch(`/api/conversations?userId=${loggedInUser.id}`);
            if (!res.ok) throw new Error('Failed to fetch conversations');
            const data: Conversation[] = await res.json();
            setConversations(data);
            if (!activeConversation && data.length > 0) {
                setActiveConversation(data[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchConversations();
        
        socket.emit('getOnlineUsers', (users: number[]) => {
            setOnlineUsers(users);
        });

        const handleUserOnline = (userId: number) => setOnlineUsers(prev => [...prev, userId]);
        const handleUserOffline = (userId: number) => setOnlineUsers(prev => prev.filter(id => id !== userId));

        socket.on('userOnline', handleUserOnline);
        socket.on('userOffline', handleUserOffline);
        
        return () => {
            socket.off('userOnline', handleUserOnline);
            socket.off('userOffline', handleUserOffline);
        };
    }, []);

    useEffect(() => {
        if (!activeConversation) return;

        socket.emit('joinRoom', `conversation:${activeConversation.id}`);

        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/conversations/${activeConversation.id}/messages`);
                if (!res.ok) throw new Error('Failed to fetch messages');
                const data: Message[] = await res.json();
                setMessages(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
        
        const handleNewMessage = (message: Message) => {
            if (message.conversation_id === activeConversation.id) {
                setMessages(prev => [message, ...prev]);
            }
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };

    }, [activeConversation]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversation) return;

        // Optimistic update is now handled by the server echoing the message back via socket
        setNewMessage('');

        try {
            await fetch(`/api/conversations/${activeConversation.id}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ senderId: loggedInUser.id, content: newMessage }),
            });
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };
    
    const timeAgo = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        if (seconds < 60) return `now`;
        if (seconds < 3600) return `${Math.floor(seconds/60)}m`;
        if (seconds < 86400) return `${Math.floor(seconds/3600)}h`;
        return date.toLocaleDateString();
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
                    {conversations.map(convo => (
                        <button key={convo.id} onClick={() => setActiveConversation(convo)} className={`w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${activeConversation?.id === convo.id ? 'bg-orange-50 dark:bg-orange-900/20' : ''}`}>
                            <div className="relative">
                               <img src={convo.participant.avatar} className="w-12 h-12 rounded-full"/>
                               {onlineUsers.includes(convo.participant.id) && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>}
                            </div>
                            <div className="flex-grow overflow-hidden">
                                <p className="font-bold">{convo.participant.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{convo.last_message}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-xs text-gray-400">{timeAgo(convo.last_message_at)}</p>
                                {convo.unread_count > 0 && <div className="mt-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center ml-auto">{convo.unread_count}</div>}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            {/* Active Chat */}
            <div className="w-2/3 flex flex-col">
                {activeConversation ? (
                    <>
                        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                            <div>
                                <p className="font-bold">{activeConversation.participant.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{activeConversation.participant.handle}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => openVideoCall(activeConversation.participant)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><VideoCameraIcon className="w-6 h-6"/></button>
                                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><MoreIcon className="w-6 h-6"/></button>
                            </div>
                        </div>
                        <div className="flex-grow p-4 overflow-y-auto flex flex-col-reverse">
                            <div className="space-y-4">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.sender_id === loggedInUser.id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.sender_id === loggedInUser.id ? 'bg-orange-500 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'}`}>
                                            <p>{msg.content}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                            <form onSubmit={handleSendMessage} className="relative">
                                <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message..." className="w-full bg-gray-100 dark:bg-gray-800 rounded-full pl-4 pr-12 py-3 text-sm"/>
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-full">
                                    <PaperAirplaneIcon className="w-6 h-6"/>
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p>Select a conversation to start messaging.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
