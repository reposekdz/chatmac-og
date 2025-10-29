import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { SpeakerWaveIcon, HeartIcon } from './icons';

// FIX: Added missing 'id' property to conform to User type.
const mainSpeaker: User = { id: 8, name: 'Dr. Evelyn Reed', handle: '@scicomm', avatar: 'https://picsum.photos/id/201/100/100' };
const coSpeakers: User[] = [
    // FIX: Added missing 'id' property to conform to User type.
    { id: 9, name: 'Tom', handle: '@tommyboy', avatar: 'https://picsum.photos/id/202/50/50' },
    // FIX: Added missing 'id' property to conform to User type.
    { id: 10, name: 'Jenna', handle: '@jenna_c', avatar: 'https://picsum.photos/id/203/50/50' },
];
const listeners: User[] = [
    // FIX: Added missing 'id' property to conform to User type.
    { id: 11, name: 'Carlos', handle: '@carlos_dev', avatar: 'https://picsum.photos/id/204/50/50' },
    // FIX: Added missing 'id' property to conform to User type.
    { id: 12, name: 'Sam', handle: '@sam_antha', avatar: 'https://picsum.photos/id/206/50/50' },
    // FIX: Added missing 'id' property to conform to User type.
    { id: 13, name: 'Mia', handle: '@mia_wong', avatar: 'https://picsum.photos/id/208/50/50' },
    // FIX: Added missing 'id' property to conform to User type.
    { id: 14, name: 'Leo', handle: '@leo_b', avatar: 'https://picsum.photos/id/209/50/50' },
]

const FloatingReaction: React.FC<{emoji: string, left: string}> = ({emoji, left}) => (
    <div className="floating-reaction" style={{ left }}>
        {emoji}
    </div>
);

const OpenStage: React.FC = () => {
  const [reactions, setReactions] = useState<{id: number, emoji: string, left: string}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
        const emojis = ['❤️', '🔥', '💡', '👏', '🚀'];
        const newReaction = {
            id: Date.now() + Math.random(),
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            left: `${Math.random() * 80 + 10}%`,
        };
        setReactions(prev => [...prev, newReaction]);

        // Clean up old reactions
        setTimeout(() => {
            setReactions(prev => prev.filter(r => r.id !== newReaction.id));
        }, 3000);

    }, 500); // Add a new reaction every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card relative overflow-hidden">
      <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">Live Collab Stage</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Topic: The Future of Renewable Energy</p>
      
      {/* Speaker Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main Speaker */}
        <div className="relative md:col-span-3 bg-gradient-to-br from-orange-100 to-amber-200 dark:from-orange-800/50 dark:to-amber-800/50 p-6 rounded-2xl text-center">
            <div className="absolute top-2 left-2 text-xs font-bold bg-white/50 px-2 py-0.5 rounded-full">HOST</div>
            <img src={mainSpeaker.avatar} alt={mainSpeaker.name} className="w-24 h-24 rounded-full mx-auto mb-2 border-4 border-white" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{mainSpeaker.name}</h2>
            <p className="text-orange-600 dark:text-orange-400 font-semibold">{mainSpeaker.handle}</p>
            <div className="mt-2 inline-flex items-center space-x-2 bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full text-sm font-bold text-gray-700 dark:text-gray-200">
                <SpeakerWaveIcon className="w-5 h-5 text-green-500" />
                <span>Currently Speaking</span>
            </div>
        </div>

        {/* Co-speakers */}
        {coSpeakers.map(speaker => (
             <div key={speaker.handle} className="relative bg-gray-100 dark:bg-gray-800/50 p-4 rounded-2xl text-center">
                <div className="absolute top-2 left-2 text-xs font-bold bg-white/50 px-2 py-0.5 rounded-full">CO-HOST</div>
                <img src={speaker.avatar} alt={speaker.name} className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-white" />
                <h2 className="font-bold text-gray-900 dark:text-gray-100">{speaker.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{speaker.handle}</p>
             </div>
        ))}
         <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-2xl text-center flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700">
            <button className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 text-3xl">+</button>
        </div>
      </div>
      
      {/* Listeners Section */}
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">Listeners ({listeners.length})</h3>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
            {listeners.map(listener => (
                <div key={listener.handle} className="text-center">
                    <img src={listener.avatar} alt={listener.name} className="w-16 h-16 rounded-full mx-auto" />
                    <p className="text-sm font-semibold mt-1 text-gray-800 dark:text-gray-200 truncate">{listener.name}</p>
                </div>
            ))}
        </div>
      </div>

       {/* Action Section */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 flex items-center justify-between">
         <p className="text-sm text-gray-600 dark:text-gray-400">Want to speak? Raise your hand!</p>
         <button className="bg-blue-500 text-white font-bold py-2 px-5 rounded-full hover:bg-blue-600 transition-colors retro-button">
            Request to Speak
        </button>
      </div>
      
      {/* Floating Reactions Container */}
      <div className="absolute bottom-20 left-0 right-0 h-48 pointer-events-none">
        {reactions.map(r => <FloatingReaction key={r.id} emoji={r.emoji} left={r.left} />)}
      </div>

    </div>
  );
};

export default OpenStage;
