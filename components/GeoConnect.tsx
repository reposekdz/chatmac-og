import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { ShieldCheckIcon, BadgeIcon, SearchCircleIcon } from './icons';

const DiscoveryRadar: React.FC = () => {
  const [nearbyUsers, setNearbyUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNearbyUsers = (latitude: number, longitude: number) => {
      fetch(`/api/users/nearby?lat=${latitude}&lon=${longitude}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch nearby users");
          return res.json();
        })
        .then(data => {
          setNearbyUsers(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchNearbyUsers(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError(`Geolocation error: ${err.message}`);
          setLoading(false);
          // Fallback to a default location if permission denied
          fetchNearbyUsers(37.7749, -122.4194);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
      <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">Discovery Radar</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Discover amazing people, events, and content near you.</p>

      <div className="relative w-64 h-64 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full bg-orange-100 dark:bg-orange-900/20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-300 dark:border-orange-700 animate-spin-slow"></div>
        <div className="absolute inset-2 rounded-full border-2 border-orange-200 dark:border-orange-800"></div>
        <div className="absolute inset-0 animate-pulse-radar border-2 border-orange-400 rounded-full"></div>
        <div className="absolute inset-0 animate-pulse-radar border-2 border-orange-400 rounded-full" style={{animationDelay: '1.25s'}}></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-lg animate-pulse-subtle">
                <SearchCircleIcon className="w-10 h-10 text-white"/>
            </div>
        </div>

        {/* Floating user avatars on the radar */}
        {nearbyUsers.length > 0 && <img src={nearbyUsers[0].avatar} className="w-12 h-12 rounded-full absolute top-4 left-8 border-2 border-white shadow-md" alt="user"/>}
        {nearbyUsers.length > 1 && <img src={nearbyUsers[1].avatar} className="w-10 h-10 rounded-full absolute top-24 right-2 border-2 border-white shadow-md" alt="user"/>}
        {nearbyUsers.length > 2 && <img src={nearbyUsers[2].avatar} className="w-14 h-14 rounded-full absolute bottom-4 left-16 border-2 border-white shadow-md" alt="user"/>}
      </div>

      <div className="flex flex-col space-y-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">People Nearby</h3>
        {loading && <p>Searching for people nearby...</p>}
        {error && <p className="text-red-500">{error}</p>}
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
        {!loading && nearbyUsers.length === 0 && <p className="text-center text-gray-500">No users found nearby.</p>}
      </div>
    </div>
  );
};

export default DiscoveryRadar;