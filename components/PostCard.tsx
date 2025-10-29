import React, { useState, useEffect } from 'react';
import { Post, PostContentType, User, PostVisibility } from '../types';
import { HeartIcon, ChatBubbleIcon, ShareIcon, MoreIcon, ClockIcon, ShieldCheckIcon, BadgeIcon, SwordsIcon, GlobeAltIcon, UserGroupIcon, StarIcon, FireIcon, ArrowTrendingUpIcon, MicrophoneIcon, PlusCircleIcon, XIcon, RocketLaunchIcon } from './icons';

const Modal: React.FC<{ title: string, children: React.ReactNode, onClose: () => void }> = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md m-4 animate-modal-content-in" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-xl font-bold">{title}</h2>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
            </div>
            <div className="p-6">{children}</div>
        </div>
    </div>
);

const PostCard: React.FC<{ post: Post; addCoins: (amount: number) => void, isAntiToxic: boolean }> = ({ post, addCoins, isAntiToxic }) => {
  const [impactScore, setImpactScore] = useState(post.impactScore);
  const [reactions, setReactions] = useState({love: false, fire: false, trend: false});
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showRemixModal, setShowRemixModal] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);

  const handleReaction = (type: 'love' | 'fire' | 'trend') => {
      setReactions(prev => {
          const wasActive = prev[type];
          const scoreChange = wasActive ? -1 : 1;
          let multiplier = 1;
          if (type === 'fire') multiplier = 5;
          if (type === 'trend') multiplier = 10;
          
          setImpactScore(prevScore => prevScore + (scoreChange * multiplier));
          if (!wasActive) addCoins(1);

          return {...prev, [type]: !wasActive};
      });
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
  
  const VisibilityIcon: React.FC<{visibility: PostVisibility}> = ({visibility}) => {
      switch(visibility) {
          case 'public': return <GlobeAltIcon className="w-4 h-4 text-gray-400" title="Public" />;
          case 'friends': return <UserGroupIcon className="w-4 h-4 text-blue-400" title="Friends Only" />;
          case 'premium': return <StarIcon className="w-4 h-4 text-yellow-400" title="Premium Only" />;
          default: return null;
      }
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
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.handle} &middot; {post.timestamp}</p>
                <div className="flex items-center space-x-1">
                    {post.visibility.map(v => <VisibilityIcon key={v} visibility={v} />)}
                </div>
              </div>
          </div>
      </div>
  );

  return (
    <>
    {showVoiceModal && <Modal title="Threaded Voice Conversation" onClose={() => setShowVoiceModal(false)}>
        <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">This feature allows for audio-only comment threads. Press record to leave a voice reply.</p>
            <button className="w-24 h-24 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto transition-transform hover:scale-105 active:scale-95">
                <MicrophoneIcon className="w-10 h-10"/>
            </button>
            <p className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Tap to Record</p>
        </div>
    </Modal>}

    {showRemixModal && <Modal title="Multi-Post Merge" onClose={() => setShowRemixModal(false)}>
        <div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Remix this post by adding your own content. It will be displayed as a collaboration.</p>
            <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-4">
                <div className="opacity-70"><PostCard post={post} addCoins={()=>{}} isAntiToxic={isAntiToxic} /></div>
                <div className="text-center font-bold text-2xl">+</div>
                <textarea className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-2" placeholder="Add your text, image, or video..."></textarea>
            </div>
            <button className="mt-4 w-full bg-orange-500 text-white font-bold py-2 rounded-lg">Publish Remix</button>
        </div>
    </Modal>}

    {showPromoteModal && <Modal title="Promote Post" onClose={() => setShowPromoteModal(false)}>
        <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Use your coins to boost this post's visibility across the platform.</p>
            <div className="flex items-center justify-center space-x-2 my-4">
                <RocketLaunchIcon className="w-8 h-8 text-orange-500" />
                <input type="range" min="100" max="5000" step="100" defaultValue="1000" className="w-full" />
            </div>
            <p className="text-lg font-bold">Spend <span className="text-orange-500">1000</span> Coins</p>
            <button className="mt-4 w-full bg-orange-500 text-white font-bold py-2 rounded-lg">Confirm & Promote</button>
        </div>
    </Modal>}
    
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
      <div className="flex items-start justify-between">
        <UserInfo user={post.user} />
        <div className="relative group">
            <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                <MoreIcon className="w-6 h-6"/>
            </button>
             <div className="absolute top-full right-0 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg w-48 hidden group-hover:block z-10">
                <button onClick={() => setShowPromoteModal(true)} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                    <RocketLaunchIcon className="w-4 h-4" /><span>Promote Post</span>
                </button>
            </div>
        </div>
      </div>

      <p className="mt-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">{applyAntiToxicFilter(post.content)}</p>
      {renderContent()}

      <div className="mt-6 flex items-center justify-between text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
            <button onClick={() => handleReaction('love')} className={`flex items-center space-x-2 transition-colors duration-200 ${reactions.love ? 'text-red-500' : 'hover:text-red-500'}`}><HeartIcon className="w-6 h-6" /></button>
            <button onClick={() => handleReaction('fire')} className={`flex items-center space-x-2 transition-colors duration-200 ${reactions.fire ? 'text-orange-500' : 'hover:text-orange-500'}`}><FireIcon className="w-6 h-6" /></button>
            <button onClick={() => handleReaction('trend')} className={`flex items-center space-x-2 transition-colors duration-200 ${reactions.trend ? 'text-green-500' : 'hover:text-green-500'}`}><ArrowTrendingUpIcon className="w-6 h-6" /></button>
            <div className="flex items-center space-x-1 text-sm font-semibold">
                <span>🔥</span>
                <span>{impactScore.toLocaleString()}</span>
                <span>Impact</span>
            </div>
        </div>
         <div className="flex items-center space-x-4">
            <button onClick={() => setShowRemixModal(true)} className="flex items-center space-x-2 hover:text-purple-500 transition-colors" title="Remix Post">
                <PlusCircleIcon className="w-6 h-6" />
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
       <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                <button onClick={() => setShowVoiceModal(true)} className="p-2 bg-orange-200 dark:bg-orange-500/50 rounded-full text-orange-600 dark:text-orange-200">
                    <MicrophoneIcon className="w-6 h-6"/>
                </button>
                <div className="flex-grow h-8 bg-gray-200 dark:bg-gray-700 rounded-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/2 bg-orange-400 dark:bg-orange-500/80 animate-pulse"></div>
                    <p className="absolute inset-0 flex items-center px-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Listen to voice thread...</p>
                </div>
            </div>
       </div>
    </div>
    </>
  );
};

export default PostCard;