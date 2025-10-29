import React, { useState } from 'react';
import { SearchIcon, MoreIcon, SpeakerWaveIcon, VideoCameraIcon, PaperAirplaneIcon, PaperclipIcon, MicrophoneIcon, EmojiHappyIcon, ReplyIcon } from './icons';

const conversationsData = [
  { id: 1, name: 'Elena Rodriguez', avatar: 'https://picsum.photos/id/1027/50/50', lastMessage: 'Haha, for sure! Let\'s sync up tomorrow.', time: '5m', unread: 2, online: true },
  { id: 2, name: 'Sam Adventure', avatar: 'https://picsum.photos/id/1015/50/50', lastMessage: 'Check out this photo I took!', time: '1h', unread: 0, online: false },
  { id: 3, name: 'Tech Central', avatar: 'https://picsum.photos/id/1/50/50', lastMessage: 'Thanks for your feedback on the poll.', time: '3h', unread: 0, online: true },
  { id: 4, name: 'ArtfulAdventures', avatar: 'https://picsum.photos/id/1011/50/50', lastMessage: 'Loved your latest post!', time: 'yesterday', unread: 0, online: false },
];

const messagesData: { [key: number]: { id: number, sender: 'me' | 'other', text: string, time: string, replyTo?: string }[] } = {
  1: [
    { id: 1, sender: 'other', text: 'Hey, I saw your new feature deploy, looks amazing! 🚀', time: '10:01 AM' },
    { id: 2, sender: 'me', text: 'Thanks, Elena! It was a team effort.', time: '10:02 AM' },
    { id: 3, sender: 'other', text: 'How did you solve that rendering issue we talked about?', time: '10:02 AM' },
    { id: 4, sender: 'me', text: 'I used a memoized selector, I can show you the code.', time: '10:03 AM', replyTo: 'How did you solve that rendering...' },
    { id: 5, sender: 'other', text: 'That would be awesome! Haha, for sure! Let\'s sync up tomorrow.', time: '10:04 AM' },
  ],
  2: [
    { id: 6, sender: 'other', text: 'Check out this photo I took!', time: '9:15 AM' }
  ],
};


const Messages = () => {
    const [selectedConv, setSelectedConv] = useState(conversationsData[0]);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 card h-[calc(100vh-7rem)] flex">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-800 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-xl font-bold">Messages</h2>
                    <div className="relative mt-2">
                        <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                        <input type="text" placeholder="Search messages" className="w-full bg-gray-100 dark:bg-gray-800 rounded-full pl-10 pr-4 py-1.5 text-sm"/>
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {conversationsData.map(conv => (
                        <button key={conv.id} onClick={() => setSelectedConv(conv)} className={`w-full text-left flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${selectedConv.id === conv.id ? 'bg-orange-50 dark:bg-orange-900/20' : ''}`}>
                            <div className="relative">
                                <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full"/>
                                {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-sm">{conv.name}</p>
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
            <div className="w-2/3 flex flex-col">
                {selectedConv ? (
                    <>
                    <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                             <img src={selectedConv.avatar} alt={selectedConv.name} className="w-10 h-10 rounded-full"/>
                             <div>
                                <p className="font-bold">{selectedConv.name}</p>
                                <p className="text-xs text-green-500">{selectedConv.online ? 'Online' : 'Offline'}</p>
                             </div>
                        </div>
                        <div className="flex items-center space-x-2">
                             <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><SpeakerWaveIcon className="w-5 h-5"/></button>
                             <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><VideoCameraIcon className="w-5 h-5"/></button>
                             <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><MoreIcon className="w-5 h-5"/></button>
                        </div>
                    </div>

                    <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                        {messagesData[selectedConv.id]?.map((msg) => (
                            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'other' && <img src={selectedConv.avatar} className="w-6 h-6 rounded-full"/>}
                                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'me' ? 'bg-orange-500 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-800 rounded-bl-none'}`}>
                                    {msg.replyTo && (
                                        <div className="border-l-2 border-orange-200 dark:border-orange-400 pl-2 text-xs opacity-80 mb-1">
                                            Replying to "{msg.replyTo}"
                                        </div>
                                    )}
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                         <div className="bg-gray-100 dark:bg-gray-800 rounded-full flex items-center px-2">
                            <button className="p-2 text-gray-500 hover:text-orange-500"><PaperclipIcon className="w-5 h-5"/></button>
                            <button className="p-2 text-gray-500 hover:text-orange-500"><MicrophoneIcon className="w-5 h-5"/></button>
                            <input type="text" placeholder="Type a message..." className="flex-grow bg-transparent focus:ring-0 border-none text-sm"/>
                            <button className="p-2 text-gray-500 hover:text-orange-500"><EmojiHappyIcon className="w-5 h-5"/></button>
                            <button className="p-2 bg-orange-500 text-white rounded-full"><PaperAirplaneIcon className="w-5 h-5"/></button>
                        </div>
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
