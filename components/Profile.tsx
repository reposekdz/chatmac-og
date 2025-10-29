import React from 'react';
import { Post, PostContentType } from '../types';
import PostCard from './PostCard';
import { View } from '../App';
// FIX: Imported HomeIcon to resolve reference error.
import { BadgeIcon, QrCodeIcon, MapIcon, AcademicCapIcon, HandThumbUpIcon, StarIcon, CogIcon, TrophyIcon, FireIcon, MarketplaceIcon, BookmarksIcon, HomeIcon } from './icons';

const userPosts: Post[] = [
    {
    id: 1,
    user: { name: 'Your Name', handle: '@yourhandle', avatar: 'https://picsum.photos/id/1005/200/200' },
    timestamp: '2h ago',
    content: 'This is a post on my modular profile page!',
    contentType: PostContentType.TEXT,
    visibility: ['public'],
    impactScore: 150,
    comments: 2,
    shares: 1,
  },
]

const ProfileModule: React.FC<{title: string, icon: React.ElementType, children: React.ReactNode, action?: React.ReactNode}> = ({title, icon: Icon, children, action}) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 card h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5 text-gray-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
            </div>
            {action}
        </div>
        <div className="p-4 flex-grow">
            {children}
        </div>
    </div>
);

const Badge: React.FC<{icon: React.ElementType, label: string, color: string}> = ({icon: Icon, label, color}) => (
    <div className="text-center">
        <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${color}`}>
            <Icon className="w-8 h-8 text-white" />
        </div>
        <p className="text-xs font-bold mt-2">{label}</p>
    </div>
)

interface ProfileProps {
    setView: (view: View) => void;
}

const Profile: React.FC<ProfileProps> = ({ setView }) => {
  return (
    <div className="flex flex-col space-y-6">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card text-center">
            <img src="https://picsum.photos/id/1005/150/150" alt="Your Name" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-orange-500 shadow-lg"/>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Your Name</h1>
            <p className="text-gray-500 dark:text-gray-400">@yourhandle</p>
            <div className="mt-4 flex justify-center items-center space-x-4">
                 <div className="text-center">
                    <p className="font-bold text-xl">1.2K</p>
                    <p className="text-sm text-gray-500">Following</p>
                 </div>
                 <div className="text-center">
                    <p className="font-bold text-xl">5.8K</p>
                    <p className="text-sm text-gray-500">Followers</p>
                 </div>
                 <div className="text-center">
                    <p className="font-bold text-xl text-orange-500">Master</p>
                    <p className="text-sm text-gray-500">Rank</p>
                 </div>
            </div>
        </div>

        {/* Modular Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
                <ProfileModule title="Badges" icon={BadgeIcon}>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                        <Badge icon={StarIcon} label="Day One" color="bg-yellow-500" />
                        <Badge icon={HandThumbUpIcon} label="Community Helper" color="bg-green-500" />
                        <Badge icon={AcademicCapIcon} label="Topic Expert" color="bg-blue-500" />
                        <Badge icon={TrophyIcon} label="Challenge Winner" color="bg-purple-500" />
                        <Badge icon={FireIcon} label="Hot Streak" color="bg-red-500" />
                    </div>
                </ProfileModule>
            </div>
             <ProfileModule title="ChatMac ID" icon={QrCodeIcon} action={<button><CogIcon className="w-5 h-5 text-gray-400"/></button>}>
                <div className="flex items-center space-x-4">
                    <QrCodeIcon className="w-24 h-24 text-gray-800 dark:text-gray-200" />
                    <div>
                        <h3 className="font-bold">Cross-App Social ID</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Use this universal ID to connect your profile across the entire ChatMac ecosystem.</p>
                    </div>
                </div>
            </ProfileModule>
            <ProfileModule title="Geo-Timeline" icon={MapIcon} action={<button onClick={() => setView('geotimeline')} className="text-sm font-bold text-orange-500">View Map</button>}>
                <div className="flex items-center space-x-4">
                    <MapIcon className="w-12 h-12 text-green-500" />
                    <div>
                        <h3 className="font-bold">Your Adventures</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">A map of all your geo-tagged posts. See where you've been!</p>
                    </div>
                </div>
            </ProfileModule>
             <ProfileModule title="Creator Marketplace" icon={MarketplaceIcon} action={<button className="text-sm font-bold text-orange-500">View Store</button>}>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                        <img src="https://picsum.photos/id/1074/50/50" className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                            <p className="font-bold">Creator Merch Hoodie</p>
                            <p className="text-xs text-gray-500">40000 Coins</p>
                        </div>
                    </div>
                </div>
            </ProfileModule>
             <ProfileModule title="Personal Blog" icon={BookmarksIcon} action={<button className="text-sm font-bold text-orange-500">Read More</button>}>
                 <div>
                    <h3 className="font-bold">My Journey into Development</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-3">It all started with a single line of code. I was fascinated by how characters on a screen could create entire worlds...</p>
                </div>
            </ProfileModule>
        </div>

        <div className="md:col-span-2">
            <ProfileModule title="My Posts" icon={HomeIcon}>
                <div className="flex flex-col space-y-6">
                    {userPosts.map(post => <PostCard key={post.id} post={post} addCoins={() => {}} isAntiToxic={false} />)}
                </div>
            </ProfileModule>
        </div>

    </div>
  );
};

export default Profile;