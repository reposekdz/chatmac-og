import React from 'react';
import { JourneyMilestone } from '../types';
import { StarIcon, HeartIcon, TrophyIcon, UserGroupIcon } from './icons';

const journeyData: JourneyMilestone[] = [
    { id: 4, date: 'Last week', title: 'First Viral Post', description: 'A post about your trip reached over 10,000 likes!', icon: 'StarIcon' },
    { id: 3, date: '2 months ago', title: 'Won a Challenge', description: 'Your photo won the #GoldenHour challenge.', icon: 'TrophyIcon' },
    { id: 2, date: '8 months ago', title: 'Community Verified', description: 'Your peers verified your account as authentic.', icon: 'UserGroupIcon' },
    { id: 1, date: '1 year ago', title: 'Joined ChatMac', description: 'Your first step into a new community.', icon: 'HeartIcon' },
];

const JourneyTracker: React.FC = () => {
    const getIcon = (iconName: string) => {
        const props = {className: "w-5 h-5 text-white"};
        if (iconName === 'StarIcon') return <StarIcon {...props} />;
        if (iconName === 'TrophyIcon') return <TrophyIcon {...props} />;
        if (iconName === 'UserGroupIcon') return <UserGroupIcon {...props} />;
        return <HeartIcon {...props} />;
    }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
      <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">My Journey</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">A timeline of your greatest moments on ChatMac.</p>
      
      <div className="relative border-l-2 border-dashed border-gray-300 dark:border-gray-700 ml-4">
        {journeyData.map(milestone => (
          <div key={milestone.id} className="mb-8 pl-8 relative">
            <div className="absolute -left-4 top-1 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              {getIcon(milestone.icon)}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{milestone.date}</p>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{milestone.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{milestone.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneyTracker;
