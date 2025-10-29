import React from 'react';
import { User } from '../types';
import { SpeakerWaveIcon, HeartIcon } from './icons';

const speaker: User = { name: 'Dr. Evelyn Reed', handle: '@scicomm', avatar: 'https://picsum.photos/id/201/100/100' };
const listeners: User[] = [
    { name: 'Tom', handle: '@tommyboy', avatar: 'https://picsum.photos/id/202/50/50' },
    { name: 'Jenna', handle: '@jenna_c', avatar: 'https://picsum.photos/id/203/50/50' },
    { name: 'Carlos', handle: '@carlos_dev', avatar: 'https://picsum.photos/id/204/50/50' },
    { name: 'Sam', handle: '@sam_antha', avatar: 'https://picsum.photos/id/206/50/50' },
]

const OpenStage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
      <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">Open Stage</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Topic: The Future of Renewable Energy</p>
      
      {/* Speaker Section */}
      <div className="bg-gradient-to-br from-orange-100 to-amber-200 dark:from-orange-900/50 dark:to-amber-900/50 p-6 rounded-2xl text-center">
        <img src={speaker.avatar} alt={speaker.name} className="w-24 h-24 rounded-full mx-auto mb-2 border-4 border-white" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{speaker.name}</h2>
        <p className="text-orange-600 dark:text-orange-400 font-semibold">{speaker.handle}</p>
        <div className="mt-2 inline-flex items-center space-x-2 bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full text-sm font-bold text-gray-700 dark:text-gray-200">
            <SpeakerWaveIcon className="w-5 h-5 text-green-500" />
            <span>Currently Speaking</span>
        </div>
      </div>
      
      {/* Listeners Section */}
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-gray-200">Listeners ({listeners.length})</h3>
        <div className="grid grid-cols-4 gap-4">
            {listeners.map(listener => (
                <div key={listener.handle} className="text-center">
                    <img src={listener.avatar} alt={listener.name} className="w-16 h-16 rounded-full mx-auto" />
                    <p className="text-sm font-semibold mt-1 text-gray-800 dark:text-gray-200">{listener.name}</p>
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

    </div>
  );
};

export default OpenStage;
