
import React from 'react';
import { User, Trend } from '../types';
import { MoreIcon, StarIcon } from './icons';

const whoToFollowData: User[] = [
  { name: 'TechInnovator', handle: '@techguru', avatar: 'https://picsum.photos/id/1005/50/50', reputation: 95 },
  { name: 'ArtfulAdventures', handle: '@creativecanvas', avatar: 'https://picsum.photos/id/1011/50/50', reputation: 88 },
  { name: 'FoodieFiesta', handle: '@tastytreats', avatar: 'https://picsum.photos/id/1025/50/50', reputation: 92 },
];

const trendsData: Trend[] = [
    { category: 'Technology', topic: '#React19', posts: '15.2K posts', imageUrl: 'https://picsum.photos/id/2/400/200' },
    { category: 'World News', topic: '#GlobalSummit', posts: '98.1K posts', imageUrl: 'https://picsum.photos/id/30/400/200' },
    { category: 'Gaming', topic: 'New Zelda Release', posts: '45K posts', imageUrl: 'https://picsum.photos/id/96/400/200' },
    { category: 'Music', topic: '#IndiePopRevival', posts: '7,845 posts', imageUrl: 'https://picsum.photos/id/145/400/200' },
]

const Card: React.FC<{ title: string; children: React.ReactNode; padding?: boolean }> = ({ title, children, padding = true }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className={padding ? 'px-4' : ''}>
          {children}
        </div>
        <a href="#" className="block px-4 py-3 text-sm text-orange-600 hover:bg-gray-100 transition-colors">
            Show more
        </a>
    </div>
);

const UserCard: React.FC<{user: User}> = ({ user }) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors">
        <div className="flex items-center space-x-4">
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
            <div>
                <div className="flex items-center space-x-1">
                    <p className="font-bold text-gray-900">{user.name}</p>
                    {user.reputation && (
                        <div className="flex items-center text-sm text-yellow-500" title={`Reputation Score: ${user.reputation}`}>
                            <StarIcon className="w-4 h-4" />
                            <span>{user.reputation}</span>
                        </div>
                    )}
                </div>
                <p className="text-gray-500">{user.handle}</p>
            </div>
        </div>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-2 px-4 rounded-full text-sm hover:shadow-md transition-all">
            Follow
        </button>
    </div>
);

const TrendCard: React.FC<{trend: Trend}> = ({ trend }) => (
    <a href="#" className="block group relative rounded-xl overflow-hidden mb-3">
        <img src={trend.imageUrl} alt={trend.topic} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-3 text-white">
            <p className="text-sm font-semibold">{trend.topic}</p>
            <p className="text-xs text-gray-300">{trend.posts}</p>
        </div>
    </a>
)


const RightAside: React.FC = () => {
  return (
    <div className="sticky top-24 flex flex-col space-y-6">
      <Card title="Who to follow" padding={false}>
        <div className="flex flex-col">
            {whoToFollowData.map((user) => (
                <UserCard key={user.handle} user={user} />
            ))}
        </div>
      </Card>
      
      <Card title="Trending">
        <div className="flex flex-col">
            {trendsData.map((trend, index) => (
                 <TrendCard key={index} trend={trend} />
            ))}
        </div>
      </Card>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-bold text-lg mb-2">Advertisement</h3>
        <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
            <p className="text-gray-500">Ad Content Here</p>
        </div>
        <p className="text-xs text-gray-400 mt-2">This is a promotional post.</p>
      </div>
    </div>
  );
};

export default RightAside;
