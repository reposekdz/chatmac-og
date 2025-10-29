import React from 'react';
import { User, Trend } from '../types';
import { MoreIcon, StarIcon, ChartBarIcon, TicketIcon, CollectionIcon, SearchCircleIcon, UsersIcon, FireIcon, SpeakerWaveIcon } from './icons';
import { View } from '../App';

const whoToFollowData: User[] = [
  { id: 3, name: 'TechInnovator', handle: '@techguru', avatar: 'https://picsum.photos/id/1005/50/50', reputation: 95, rank: 'Community Pillar' },
  { id: 4, name: 'ArtfulAdventures', handle: '@creativecanvas', avatar: 'https://picsum.photos/id/1011/50/50', reputation: 88, rank: 'Creative Voice' },
  { id: 2, name: 'FoodieFiesta', handle: '@tastytreats', avatar: 'https://picsum.photos/id/1025/50/50', reputation: 92, rank: 'Expert Contributor' },
];

const trendsData: Trend[] = [
    { category: 'Technology', topic: '#React19', posts: '15.2K posts', imageUrl: 'https://picsum.photos/id/2/100/100' },
    { category: 'World News', topic: '#GlobalSummit', posts: '98.1K posts', imageUrl: 'https://picsum.photos/id/30/100/100' },
    { category: 'Gaming', topic: 'New Zelda Release', posts: '45K posts', imageUrl: 'https://picsum.photos/id/96/100/100' },
    { category: 'Music', topic: '#IndiePopRevival', posts: '7,845 posts', imageUrl: 'https://picsum.photos/id/145/100/100' },
]

const Card: React.FC<{ title: string; children: React.ReactNode; padding?: boolean, showMore?: boolean }> = ({ title, children, padding = true, showMore = true }) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden card">
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        </div>
        <div className={padding ? 'px-4 pb-4' : ''}>
          {children}
        </div>
        {showMore && (
            <a href="#" className="block px-4 py-3 text-sm text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Show more
            </a>
        )}
    </div>
);

const UserCard: React.FC<{user: User, openChat: () => void}> = ({ user, openChat }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
                 <div className="flex items-center space-x-1">
                    <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{user.name}</p>
                 </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.handle}</p>
                 {user.rank && <p className="text-xs font-bold text-orange-500 dark:text-orange-400">{user.rank}</p>}
            </div>
        </div>
        <button onClick={openChat} className="bg-orange-500 text-white font-semibold py-1 px-3 rounded-full text-xs hover:bg-orange-600 transition-all retro-button">
            Chat
        </button>
    </div>
);

const TrendItem: React.FC<{trend: Trend}> = ({ trend }) => (
    <a href="#" className="block group p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
        <div className="flex justify-between items-center">
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{trend.category}</p>
                <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{trend.topic}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{trend.posts}</p>
            </div>
            <img src={trend.imageUrl} alt={trend.topic} className="w-16 h-16 object-cover rounded-lg" />
        </div>
    </a>
)

interface RightAsideProps {
    setView: (view: View) => void;
    openChat: () => void;
}

const RightAside: React.FC<RightAsideProps> = ({ setView, openChat }) => {
   const navItems = [
      { name: 'Creator Hub', icon: ChartBarIcon, view: 'creatorhub' },
      { name: 'Events', icon: TicketIcon, view: 'events' },
      { name: 'Groups', icon: CollectionIcon, view: 'groups' },
      { name: 'Discovery', icon: SearchCircleIcon, view: 'discovery' },
  ];

  const communityStats = [
    { name: 'Active Users', value: '12.5k', icon: UsersIcon, color: 'text-blue-500' },
    { name: 'Posts Today', value: '4,821', icon: FireIcon, color: 'text-red-500' },
  ];

  return (
    <div className="sticky top-24 flex flex-col space-y-6">
       <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Community Hub</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {communityStats.map(stat => (
                <div key={stat.name} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                  <stat.icon className={`w-6 h-6 mb-1 ${stat.color}`} />
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.name}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setView('stage')} className="flex flex-col items-center justify-center text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="p-2 rounded-full text-green-500 bg-green-100 dark:bg-green-900/50"><SpeakerWaveIcon className="w-6 h-6" /></div>
                    <span className="mt-2 text-xs font-semibold text-gray-800 dark:text-gray-200">Start a Stage</span>
                </button>
                 <button onClick={() => setView('events')} className="flex flex-col items-center justify-center text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="p-2 rounded-full text-red-500 bg-red-100 dark:bg-red-900/50"><TicketIcon className="w-6 h-6" /></div>
                    <span className="mt-2 text-xs font-semibold text-gray-800 dark:text-gray-200">Create an Event</span>
                </button>
            </div>
            <div className="mt-3 border-t border-gray-200 dark:border-gray-800 pt-3">
               {navItems.map(item => (
                    <button onClick={() => setView(item.view as View)} key={item.name} className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                      <item.icon className="w-5 h-5 text-gray-500" />
                      <span className="text-sm font-semibold">{item.name}</span>
                    </button>
                ))}
            </div>
      </div>

      <Card title="Who to Follow / Top Contributors">
        <div className="flex flex-col space-y-3">
            {whoToFollowData.map((user) => (
                <UserCard key={user.handle} user={user} openChat={openChat} />
            ))}
        </div>
      </Card>
      
      <Card title="Trending">
        <div className="flex flex-col">
            {trendsData.slice(0, 3).map((trend, index) => (
                 <TrendItem key={index} trend={trend} />
            ))}
        </div>
      </Card>
      
    </div>
  );
};

export default RightAside;