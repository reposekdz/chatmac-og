
import React from 'react';
import { User, Trend } from '../types';
import { MoreIcon, StarIcon, ChartBarIcon, TicketIcon, CollectionIcon, SearchCircleIcon } from './icons';
import { View } from '../App';

const whoToFollowData: User[] = [
  { name: 'TechInnovator', handle: '@techguru', avatar: 'https://picsum.photos/id/1005/50/50', reputation: 95 },
  { name: 'ArtfulAdventures', handle: '@creativecanvas', avatar: 'https://picsum.photos/id/1011/50/50', reputation: 88 },
  { name: 'FoodieFiesta', handle: '@tastytreats', avatar: 'https://picsum.photos/id/1025/50/50', reputation: 92 },
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
            <a href="#" className="block px-4 py-3 text-sm text-orange-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                Show more
            </a>
        )}
    </div>
);

const UserCard: React.FC<{user: User}> = ({ user }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
            <div>
                 <div className="flex items-center space-x-1">
                    <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{user.name}</p>
                    {user.reputation && (
                        <div className="flex items-center text-xs text-yellow-500" title={`Reputation Score: ${user.reputation}`}>
                            <StarIcon className="w-3 h-3" />
                            <span>{user.reputation}</span>
                        </div>
                    )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.handle}</p>
            </div>
        </div>
        <button className="bg-orange-500 text-white font-semibold py-1 px-3 rounded-full text-xs hover:bg-orange-600 transition-all retro-button">
            Follow
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
}

const RightAside: React.FC<RightAsideProps> = ({ setView }) => {
   const navItems = [
      { name: 'Creator Hub', icon: ChartBarIcon, color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/50', view: 'creatorhub' },
      { name: 'Events', icon: TicketIcon, color: 'text-red-500 bg-red-100 dark:bg-red-900/50', view: 'events' },
      { name: 'Groups', icon: CollectionIcon, color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/50', view: 'groups' },
      { name: 'Discovery', icon: SearchCircleIcon, color: 'text-green-500 bg-green-100 dark:bg-green-900/50', view: 'discovery' },
  ];

  return (
    <div className="sticky top-24 flex flex-col space-y-6">
       <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">Advanced Navigations</h2>
            <div className="grid grid-cols-2 gap-2">
                {navItems.map(item => (
                    <button onClick={() => setView(item.view as View)} key={item.name} className="flex flex-col items-center justify-center text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <div className={`p-2 rounded-full ${item.color}`}>
                           <item.icon className="w-6 h-6" />
                        </div>
                        <span className="mt-2 text-xs font-semibold text-gray-800 dark:text-gray-200">{item.name}</span>
                    </button>
                ))}
            </div>
      </div>

      <Card title="Who to follow">
        <div className="flex flex-col space-y-3">
            {whoToFollowData.map((user) => (
                <UserCard key={user.handle} user={user} />
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