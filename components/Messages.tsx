import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SearchIcon, MoreIcon, SpeakerWaveIcon, VideoCameraIcon, PaperAirplaneIcon, PaperclipIcon, MicrophoneIcon, EmojiHappyIcon, ReplyIcon } from './icons';
import { User, Message } from '../types';
import { loggedInUser } from '../App';

interface Conversation {
    user: User;
    lastMessage: string;
    time: string;
    unread: number;
}

const Messages: React.FC<{ onStartVideoCall: (user: User) => void }> = ({ onStartVideoCall }) => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch conversations list
        const fetchConversations = async () => {
            try {
                const res = await fetch(`/api/conversations?userId=${loggedInUser.id}`);
                const data = await res.json();
                setConversations(data);
                if (data.length > 0) {
                    setSelectedUser(data[0].user);
                }
            } catch (e) {
                console.error("Failed to fetch conversations", e);
            }
        };
        fetchConversations();
    }, []);

    useEffect(() => {
        // Fetch messages for the selected conversation
        const fetchMessages = async () => {
            if (selectedUser) {
                try {
                    const res = await fetch(`/api/conversations/${selectedUser.id}?userId=${loggedInUser.id}`);
                    const data = await res.json();
                    setMessages(data);
                } catch (e) {
                    console.error("Failed to fetch messages", e);
                }
            }
        };
        fetchMessages();
    }, [selectedUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        const optimisticMessage: Message = {
            id: Date.now(),
            sender_id: loggedInUser.id,
            content: newMessage,
            created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev, optimisticMessage]);
        setNewMessage('');
        
        try {
            const res = await fetch(`/api/conversations/${selectedUser.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ senderId: loggedInUser.id, content: newMessage })
            });
            const actualMessage = await res.json();
            setMessages(prev => prev.map(m => m.id === optimisticMessage.id ? actualMessage : m));
        } catch (error) {
            console.error("Failed to send message", error);
            // Revert optimistic update
            setMessages(prev => prev.filter(m => m.id !== optimisticMessage.id));
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 card h-[calc(100vh-7rem)] flex">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-800 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-bold">Messages</h2>
                    <div className="relative mt-2">
                        <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                        <input type="text" placeholder="Search messages" className="w-full bg-gray-100 dark:bg-gray-800 rounded-full pl-10 pr-4 py-1.5 text-sm"/>
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {conversations.map(conv => (
                        <button key={conv.user.id} onClick={() => setSelectedUser(conv.user)} className={`w-full text-left flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${selectedUser?.id === conv.user.id ? 'bg-orange-50 dark:bg-orange-900/20' : ''}`}>
                            <div className="relative">
                                <img src={conv.user.avatar} alt={conv.user.name} className="w-12 h-12 rounded-full"/>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-sm">{conv.user.name}</p>
                                    <p className="text-xs text-gray-400">{conv.time}</p>
                                </div>
                                <div className="flex justify-between items-start mt-1">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate pr-2">{conv.lastMessage}</p>
                                    {conv.unread > 0 && <span className="bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{conv.unread}</span>}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat View */}
            <div className="hidden md:flex w-2/3 flex-col">
                {selectedUser ? (
                    <>
                    <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                             <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full"/>
                             <div>
                                <p className="font-bold">{selectedUser.name}</p>
                             </div>
                        </div>
                        <div className="flex items-center space-x-2">
                             <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><SpeakerWaveIcon className="w-5 h-5"/></button>
                             <button onClick={() => onStartVideoCall(selectedUser)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><VideoCameraIcon className="w-5 h-5"/></button>
                             <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><MoreIcon className="w-5 h-5"/></button>
                        </div>
                    </div>

                    <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender_id === loggedInUser.id ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender_id !== loggedInUser.id && <img src={selectedUser.avatar} className="w-6 h-6 rounded-full"/>}
                                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender_id === loggedInUser.id ? 'bg-orange-500 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'}`}>
                                    <p className="text-sm">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                         <form onSubmit={handleSendMessage} className="bg-gray-100 dark:bg-gray-800 rounded-full flex items-center px-2">
                            <input type="text" placeholder="Type a message..." value={newMessage} onChange={e => setNewMessage(e.target.value)} className="flex-grow bg-transparent focus:ring-0 border-none text-sm"/>
                            <button type="submit" className="p-2 bg-orange-500 text-white rounded-full"><PaperAirplaneIcon className="w-5 h-5"/></button>
                        </form>
                    </div>
                    </>
                ) : (
                    <div className="flex-grow flex items-center justify-center text-gray-500">Select a conversation to start chatting.</div>
                )}
            </div>
        </div>
    )
}
export default Messages;