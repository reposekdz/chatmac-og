import React from 'react';
import { User } from '../types';
import { ShieldCheckIcon, BadgeIcon, SearchCircleIcon } from './icons';

const nearbyUsers: User[] = [
  // FIX: Added missing 'id' property to conform to User type.
  { id: 5, name: 'Local Artisan', handle: '@handcrafts', avatar: 'https://picsum.photos/id/1012/100/100', isCommunityVerified: true, skillBadges: [{name: 'Crafting', icon: ''}] },
  // FIX: Added missing 'id' property to conform to User type.
  { id: 6, name: 'City Photographer', handle: '@urbanlens', avatar: 'https://picsum.photos/id/1013/100/100', skillBadges: [{name: 'Photography', icon: ''}] },
  // FIX: Added missing 'id' property to conform to User type.
  { id: 7, name: 'Parkside Jogger', handle: '@runhappy', avatar: 'https://picsum.photos/id/1014/100/100' },
]

const DiscoveryRadar: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
      <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">Discovery Radar</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Discover amazing people, events, and content near you.</p>

      <div className="relative w-64 h-64 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full bg-orange-100 dark:bg-orange-900/20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-300 dark:border-orange-700"></div>
        <div className="absolute inset-0 rounded-full radar-ring border-2 border-orange-400" style={{animationDelay: '0s'}}></div>
        <div className="absolute inset-0 rounded-full radar-ring border-2 border-orange-400" style={{animationDelay: '1.25s'}}></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
                <SearchCircleIcon className="w-10 h-10 text-white"/>
            </div>
        </div>

        {/* Floating user avatars on the radar */}
        <img src={nearbyUsers[0].avatar} className="w-12 h-12 rounded-full absolute top-4 left-8 border-2 border-white shadow-md" alt="user"/>
        <img src={nearbyUsers[1].avatar} className="w-10 h-10 rounded-full absolute top-24 right-2 border-2 border-white shadow-md" alt="user"/>
        <img src={nearbyUsers[2].avatar} className="w-14 h-14 rounded-full absolute bottom-4 left-16 border-2 border-white shadow-md" alt="user"/>
      </div>


      <div className="flex flex-col space-y-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">People Nearby</h3>
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

export default DiscoveryRadar;
