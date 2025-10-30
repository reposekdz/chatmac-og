
import React from 'react';
import { Challenge } from '../types';
import { ImageIcon, ChatBubbleIcon, ShareIcon } from './icons';

// FIX: Added missing `is_joined` property to conform to the Challenge type.
const challengeData: Challenge[] = [
    { id: 1, title: 'Golden Hour Photo', description: 'Share your best sunset or sunrise picture.', participants: 12500, icon: 'ImageIcon', is_joined: false },
    { id: 2, title: 'Two-Sentence Story', description: 'Write a compelling story in just two sentences.', participants: 8300, icon: 'ChatBubbleIcon', is_joined: true },
    { id: 3, title: '#CreativeCollab', description: 'Find a partner and create a joint post!', participants: 540, icon: 'ShareIcon', is_joined: false },
    { id: 4, title: 'My Retro Setup', description: 'Show off your best vintage tech or gaming setup.', participants: 2100, icon: 'ShareIcon', is_joined: false },
]

const Challenges: React.FC = () => {
    const getIcon = (iconName: string) => {
        if (iconName === 'ImageIcon') return <ImageIcon className="w-8 h-8 text-orange-500" />;
        if (iconName === 'ChatBubbleIcon') return <ChatBubbleIcon className="w-8 h-8 text-blue-500" />;
        return <ShareIcon className="w-8 h-8 text-green-500" />;
    }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
      <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">Mini-Challenges</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Join the fun and show your creativity!</p>
      <div className="flex flex-col space-y-4">
        {challengeData.map(challenge => (
            <div key={challenge.id} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                        {getIcon(challenge.icon)}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{challenge.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{challenge.description}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{challenge.participants.toLocaleString()} participants</p>
                    </div>
                </div>
                <button 
                  className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-orange-600 transition-colors retro-button disabled:bg-gray-400"
                  disabled={challenge.is_joined}
                >
                    {challenge.is_joined ? 'Joined' : 'Join'}
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
