import React, { useState, useEffect } from 'react';
import { Post, PostContentType, User } from '../types';
import { HeartIcon, ChatBubbleIcon, ShareIcon, MoreIcon, ClockIcon, ShieldCheckIcon, BadgeIcon, SwordsIcon } from './icons';

const PostCard: React.FC<{ post: Post; addCoins: (amount: number) => void, isAntiToxic: boolean }> = ({ post, addCoins, isAntiToxic }) => {
  const [liked, setLiked] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [showBattle, setShowBattle] = useState(post.battle?.isActive || false);

  useEffect(() => {
    if (post.expiresAt) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = post.expiresAt!.getTime() - now.getTime();
        if (diff <= 0) {
          setTimeLeft('Expired');
          clearInterval(interval);
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`${hours}h ${minutes}m left`);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [post.expiresAt]);
  
  const handleLike = () => {
    setLiked(!liked);
    if (!liked) addCoins(5); // Add 5 coins for a like
  }
  
  const applyAntiToxicFilter = (text: string) => {
      if (!isAntiToxic) return text;
      const toxicWords = ['hate', 'stupid', 'dumb']; // example words
      let filteredText = text;
      toxicWords.forEach(word => {
          const regex = new RegExp(`\\b${word}\\b`, 'gi');
          filteredText = filteredText.replace(regex, '****');
      });
      return filteredText;
  }

  const renderContent = () => {
    switch (post.contentType) {
      case PostContentType.IMAGE:
        return <img src={post.mediaUrl} alt="Post content" className="mt-4 rounded-2xl w-full object-cover border border-gray-200 dark:border-gray-800" />;
      case PostContentType.VIDEO:
        return (
          <div className="mt-4 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
             <img src={post.mediaUrl} alt="Video thumbnail" className="w-full object-cover" />
          </div>
        );
      case PostContentType.POLL:
        const totalVotes = post.pollOptions?.reduce((sum, option) => sum + option.votes, 0) || 1;
        return (
          <div className="mt-4 space-y-2">
            {post.pollOptions?.map((option, index) => {
              const percentage = (option.votes / totalVotes) * 100;
              return (
                <div key={index} className="relative bg-gray-100 dark:bg-gray-800 rounded-full p-3 text-gray-800 dark:text-gray-200 text-sm font-semibold overflow-hidden retro-button">
                  <div className="absolute top-0 left-0 h-full bg-orange-200 dark:bg-orange-900/50 rounded-full" style={{ width: `${percentage}%` }}></div>
                  <div className="relative flex justify-between">
                    <span>{option.text}</span>
                    <span>{Math.round(percentage)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  const UserInfo: React.FC<{user: User}> = ({ user }) => (
      <div className="flex items-center space-x-4">
          <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full" />
          <div>
              <div className="flex items-center space-x-1.5">
                  <p className="font-bold text-gray-900 dark:text-gray-100">{user.name}</p>
                  {user.isCommunityVerified && <ShieldCheckIcon className="w-5 h-5 text-blue-500" title="Community Verified" />}
                  {user.skillBadges?.map(badge => <BadgeIcon key={badge.name} className="w-5 h-5 text-purple-500" title={badge.name} />)}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.handle} &middot; {post.timestamp}</p>
          </div>
      </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
      <div className="flex items-start justify-between">
        <div className="flex -space-x-4">
          <UserInfo user={post.user} />
          {post.collaborator && <div className="pl-6"><UserInfo user={post.collaborator} /></div>}
        </div>
        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            <MoreIcon className="w-6 h-6"/>
        </button>
      </div>

      {post.expiresAt && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-blue-500 font-semibold bg-blue-50 dark:bg-blue-900/30 rounded-full px-3 py-1 w-fit">
            <ClockIcon className="w-4 h-4" />
            <span>{timeLeft}</span>
        </div>
      )}

      <p className="mt-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">{applyAntiToxicFilter(post.content)}</p>
      {renderContent()}

      {post.battle && (
        <div className="mt-4">
            <button onClick={() => setShowBattle(!showBattle)} className="w-full text-center p-2 font-bold text-orange-600 dark:text-orange-400 flex items-center justify-center space-x-2">
                <SwordsIcon className="w-5 h-5" />
                <span>Thread Battle</span>
            </button>
            {showBattle && (
                <div className="mt-2 border-t-2 border-dashed border-gray-300 dark:border-gray-700 pt-4 flex space-x-4">
                    <div className="flex-1 text-center p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                        <p className="font-bold">{post.battle.sideA.user.name}</p>
                        <p className="text-sm italic">"{applyAntiToxicFilter(post.battle.sideA.text)}"</p>
                        <button className="mt-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">{post.battle.sideA.votes} Votes</button>
                    </div>
                    <div className="flex-1 text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <p className="font-bold">{post.battle.sideB.user.name}</p>
                        <p className="text-sm italic">"{applyAntiToxicFilter(post.battle.sideB.text)}"</p>
                        <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">{post.battle.sideB.votes} Votes</button>
                    </div>
                </div>
            )}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between text-gray-500 dark:text-gray-400">
        <button 
          onClick={handleLike}
          className={`flex items-center space-x-2 hover:text-red-500 transition-colors ${liked ? 'text-red-500' : ''}`}
        >
          <HeartIcon className="w-6 h-6" />
          <span className="text-sm font-semibold">{post.likes + (liked ? 1 : 0)}</span>
        </button>
        <button onClick={() => addCoins(2)} className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
          <ChatBubbleIcon className="w-6 h-6" />
          <span className="text-sm font-semibold">{post.comments}</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
          <ShareIcon className="w-6 h-6" />
          <span className="text-sm font-semibold">{post.shares}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
