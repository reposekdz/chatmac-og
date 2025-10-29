import React from 'react';
import { LocalRoom } from '../types';
import { UsersIcon, HomeIcon } from './icons';

const roomData: LocalRoom[] = [
    { id: 1, name: '#DowntownFoodies', description: 'A place to discuss the best eats in the city center.', members: 128, isLocked: false },
    { id: 2, name: 'North Park Gamers', description: 'Weekly meetups and online tournaments.', members: 72, isLocked: false },
    { id: 3, name: 'Riverside Runners Club', description: 'Morning jogs and marathon training.', members: 245, isLocked: false },
    { id: 4, name: 'Art District [Private]', description: 'Invite-only for local artists and creators.', members: 42, isLocked: true },
]

const LocalRooms: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
      <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">Local Rooms</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Chat with people in your city.</p>
      <div className="flex flex-col space-y-4">
        {roomData.map(room => (
            <div key={room.id} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{room.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{room.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500 mt-2">
                        <UsersIcon className="w-4 h-4" />
                        <span>{room.members} members</span>
                    </div>
                </div>
                <button 
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded-full text-sm hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed retro-button"
                    disabled={room.isLocked}
                >
                    {room.isLocked ? 'Private' : 'Join'}
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default LocalRooms;
