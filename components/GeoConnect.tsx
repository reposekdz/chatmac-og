import React from 'react';
import { User } from '../types';
import { ShieldCheckIcon, BadgeIcon } from './icons';

const nearbyUsers: User[] = [
  { name: 'Local Artisan', handle: '@handcrafts', avatar: 'https://picsum.photos/id/1012/100/100', isCommunityVerified: true, skillBadges: [{name: 'Crafting', icon: ''}] },
  { name: 'City Photographer', handle: '@urbanlens', avatar: 'https://picsum.photos/id/1013/100/100', skillBadges: [{name: 'Photography', icon: ''}] },
  { name: 'Parkside Jogger', handle: '@runhappy', avatar: 'https://picsum.photos/id/1014/100/100' },
]

const GeoConnect: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
      <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">GeoConnect</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Discover amazing people near you.</p>

      <div className="flex flex-col space-y-4">
        {nearbyUsers.map(user => (
          <div key={user.handle} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-bold text-gray-900 dark:text-gray-100">{user.name}</p>
                   {user.isCommunityVerified && <ShieldCheckIcon className="w-5 h-5 text-blue-500" title="Community Verified" />}
                   {user.skillBadges?.map((badge, i) => <BadgeIcon key={i} className="w-5 h-5 text-purple-500" title={badge.name} />)}
                </div>
                <p className="text-gray-500 dark:text-gray-400">{user.handle}</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-2 px-4 rounded-full text-sm hover:shadow-md transition-all retro-button">
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeoConnect;
