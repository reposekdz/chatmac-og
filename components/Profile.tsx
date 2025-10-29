import React from 'react';
import { Post, PostContentType } from '../types';
import PostCard from './PostCard';
import { View } from '../App';
// FIX: Import TrophyIcon and FireIcon
import { BadgeIcon, QrCodeIcon, MapIcon, AcademicCapIcon, HandThumbUpIcon, StarIcon, CogIcon, TrophyIcon, FireIcon } from './icons';

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

const ProfileModule: React.FC<{title: string, children: React.ReactNode, action?: React.ReactNode}> = ({title, children, action}) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 card">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
            {action}
        </div>
        <div className="p-4">
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
                <ProfileModule title="Badges">
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                        <Badge icon={StarIcon} label="Day One" color="bg-yellow-500" />
                        <Badge icon={HandThumbUpIcon} label="Community Helper" color="bg-green-500" />
                        <Badge icon={AcademicCapIcon} label="Topic Expert" color="bg-blue-500" />
                        <Badge icon={TrophyIcon} label="Challenge Winner" color="bg-purple-500" />
                        <Badge icon={FireIcon} label="Hot Streak" color="bg-red-500" />
                    </div>
                </ProfileModule>
            </div>
             <ProfileModule title="ChatMac ID" action={<button><CogIcon className="w-5 h-5 text-gray-400"/></button>}>
                <div className="flex items-center space-x-4">
                    <QrCodeIcon className="w-24 h-24 text-gray-800 dark:text-gray-200" />
                    <div>
                        <h3 className="font-bold">Cross-App Social ID</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Use this universal ID to connect your profile across the entire ChatMac ecosystem, including Marketplace and Events apps.</p>
                    </div>
                </div>
            </ProfileModule>
            <ProfileModule title="Geo-Timeline" action={<button onClick={() => setView('geotimeline')} className="text-sm font-bold text-orange-500">View Map</button>}>
                <div className="flex items-center space-x-4">
                    <MapIcon className="w-12 h-12 text-green-500" />
                    <div>
                        <h3 className="font-bold">Your Adventures</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">A map of all your geo-tagged posts. See where you've been!</p>
                    </div>
                </div>
            </ProfileModule>
        </div>

        {/* Posts Module */}
        <ProfileModule title="My Posts">
            <div className="flex flex-col space-y-6">
                {userPosts.map(post => <PostCard key={post.id} post={post} addCoins={() => {}} isAntiToxic={false} />)}
            </div>
        </ProfileModule>

    </div>
  );
};

export default Profile;