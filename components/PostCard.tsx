import React, { useState, useEffect, useCallback } from 'react';
import { Post, PostContentType, User, PostVisibility, Comment } from '../types';
import { HeartIcon, ChatBubbleIcon, ShareIcon, MoreIcon, ClockIcon, ShieldCheckIcon, BadgeIcon, SwordsIcon, GlobeAltIcon, UserGroupIcon, StarIcon, FireIcon, ArrowTrendingUpIcon, MicrophoneIcon, PlusCircleIcon, XIcon, RocketLaunchIcon, PaperAirplaneIcon } from './icons';
import { loggedInUser } from '../App';

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
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const fetchComments = useCallback(async () => {
    if (showComments) {
        try {
            const res = await fetch(`/api/posts/${post.id}/comments`);
            const data = await res.json();
            setComments(data);
        } catch (e) {
            console.error("Failed to fetch comments", e);
        }
    }
  }, [showComments, post.id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleLike = async () => {
    // Optimistic UI update
    setIsLiked(prev => !prev);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);

    try {
        await fetch(`/api/posts/${post.id}/like`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: loggedInUser.id }) // Send current user's ID
        });
        if (!isLiked) addCoins(1);
    } catch (e) {
        console.error("Failed to like post", e);
        // Revert UI on error
        setIsLiked(prev => !prev);
        setLikesCount(prev => isLiked ? prev + 1 : prev - 1);
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newComment.trim()) return;

      const optimisticComment: Comment = {
          id: Date.now(),
          content: newComment,
          user: loggedInUser,
          timestamp: 'Just now'
      };

      setComments(prev => [...prev, optimisticComment]);
      setCommentsCount(prev => prev + 1);
      setNewComment('');
      
      try {
        const res = await fetch(`/api/posts/${post.id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: loggedInUser.id, content: newComment })
        });
        const actualComment = await res.json();
        // Replace optimistic comment with real one from server
        setComments(prev => prev.map(c => c.id === optimisticComment.id ? actualComment : c));
        addCoins(2);
      } catch (error) {
          console.error("Failed to post comment:", error);
          // Revert optimistic update
          setComments(prev => prev.filter(c => c.id !== optimisticComment.id));
          setCommentsCount(prev => prev - 1);
      }
  }
  
  const handleShare = async () => {
      // In a real app, this would open a share dialog. Here, we just hit the backend.
      try {
        await fetch(`/api/posts/${post.id}/share`, { method: 'POST' });
        // Maybe show a "Shared!" toast notification
      } catch (error) {
        console.error("Failed to share post:", error);
      }
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
        if (!post.mediaUrl) return null;
        return <img src={post.mediaUrl} alt="Post content" className="mt-4 rounded-2xl w-full border dark:border-gray-800" />;
      case PostContentType.VIDEO:
        if (!post.mediaUrl) return null;
        return (
          <div className="mt-4 rounded-2xl w-full overflow-hidden relative">
            <video src={post.mediaUrl} controls className="w-full"></video>
          </div>
        );
      case PostContentType.POLL:
        const totalVotes = post.pollOptions?.reduce((sum, option) => sum + option.votes, 0) || 1;
        return (
          <div className="mt-4 space-y-3">
            {post.pollOptions?.map((option, index) => (
              <button key={index} className="w-full relative bg-gray-100 dark:bg-gray-800 rounded-full p-3 text-sm font-semibold text-left">
                <div 
                  className="absolute top-0 left-0 h-full bg-orange-200 dark:bg-orange-800/50 rounded-full" 
                  style={{ width: `${(option.votes / totalVotes) * 100}%` }}
                ></div>
                <div className="relative flex justify-between">
                  <span>{option.text}</span>
                  <span className="text-gray-600 dark:text-gray-400">{Math.round((option.votes / totalVotes) * 100)}%</span>
                </div>
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const UserInfo: React.FC<{ user: User }> = ({ user }) => (
    <div className="flex items-center space-x-4">
      <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full" />
      <div>
        <div className="flex items-center space-x-2">
          <p className="font-bold text-lg text-gray-900 dark:text-gray-100">{user.name}</p>
          {user.isCommunityVerified && <ShieldCheckIcon className="w-5 h-5 text-blue-500" title="Community Verified" />}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
           <span>{user.handle}</span>
           <span>·</span>
           <span>{post.timestamp}</span>
           <div className="flex items-center space-x-1">
            {post.visibility.map(v => <VisibilityIcon key={v} visibility={v} />)}
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
      <div className="flex items-start justify-between">
        <UserInfo user={post.user} />
        <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            <MoreIcon className="w-6 h-6"/>
        </button>
      </div>

      <p className="mt-4 text-gray-800 dark:text-gray-200 text-base leading-relaxed">{applyAntiToxicFilter(post.content)}</p>
      {renderContent()}

      <div className="mt-6 flex items-center justify-between text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
            <button onClick={handleLike} className={`flex items-center space-x-2 transition-colors duration-200 ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}>
                <HeartIcon className={`w-6 h-6 ${isLiked ? 'fill-current' : 'fill-none'}`} />
                <span className="text-sm font-semibold">{likesCount}</span>
            </button>
            <button onClick={() => setShowComments(!showComments)} className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
              <ChatBubbleIcon className="w-6 h-6" />
              <span className="text-sm font-semibold">{commentsCount}</span>
            </button>
            <button onClick={handleShare} className="flex items-center space-x-2 hover:text-green-500 transition-colors">
              <ShareIcon className="w-6 h-6" />
              <span className="text-sm font-semibold">{post.sharesCount}</span>
            </button>
        </div>
        <div className="flex items-center space-x-1 text-sm font-semibold">
            <span>🔥</span>
            <span>{post.impactScore.toLocaleString()}</span>
            <span>Impact</span>
        </div>
      </div>
      
      {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
              {/* Comment Input */}
              <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
                  <img src={loggedInUser.avatar} className="w-8 h-8 rounded-full"/>
                  <input 
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-grow bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm border-transparent focus:border-orange-500 focus:ring-orange-500"
                  />
                  <button type="submit" className="p-2 bg-orange-500 text-white rounded-full"><PaperAirplaneIcon className="w-5 h-5"/></button>
              </form>
              {/* Comments List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {comments.map(comment => (
                    <div key={comment.id} className="flex items-start space-x-3">
                        <img src={comment.user.avatar} className="w-8 h-8 rounded-full"/>
                        <div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-2xl">
                                <p className="font-bold text-sm">{comment.user.name}</p>
                                <p className="text-sm text-gray-800 dark:text-gray-200">{comment.content}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{comment.timestamp}</p>
                        </div>
                    </div>
                ))}
              </div>
          </div>
      )}
    </div>
  );
};

export default PostCard;