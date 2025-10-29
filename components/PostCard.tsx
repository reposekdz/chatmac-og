import React, { useState } from 'react';
import { Post } from '../types';
import { HeartIcon, ChatBubbleIcon, ShareIcon, MoreIcon, StarIcon, ReplyIcon } from './icons';

interface PostCardProps {
    post: Post;
    addCoins: (amount: number) => void;
    isAntiToxic: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, addCoins, isAntiToxic }) => {
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likes, setLikes] = useState(post.stats.likes);
    
    const handleLike = () => {
        if (isLiked) {
            setLikes(l => l - 1);
        } else {
            setLikes(l => l + 1);
            addCoins(5); // Add 5 coins for liking a post
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 card">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <img src={post.user.avatar} alt={post.user.name} className="w-12 h-12 rounded-full" />
                    <div>
                        <div className="flex items-center space-x-2">
                           <p className="font-bold text-lg">{post.user.name}</p>
                           {post.user.rank && <span className="text-xs font-bold text-orange-500 bg-orange-100 dark:bg-orange-900/50 px-2 py-0.5 rounded-full">{post.user.rank}</span>}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{post.user.handle} · {post.timestamp}</p>
                    </div>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <MoreIcon className="w-6 h-6" />
                </button>
            </div>
            <p className="mt-4 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{post.content}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="mt-4 rounded-2xl w-full object-cover" />}

            {post.topics && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {post.topics.map(topic => (
                        <span key={topic} className="text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-full">#{topic}</span>
                    ))}
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-gray-500 dark:text-gray-400">
                <button onClick={handleLike} className={`flex items-center space-x-2 hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''}`}>
                    <HeartIcon className="w-6 h-6" />
                    <span className="font-semibold text-sm">{likes.toLocaleString()}</span>
                </button>
                 <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                    <ChatBubbleIcon className="w-6 h-6" />
                    <span className="font-semibold text-sm">{post.stats.comments.toLocaleString()}</span>
                </button>
                 <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                    <ReplyIcon className="w-6 h-6" />
                    <span className="font-semibold text-sm">{post.stats.shares.toLocaleString()}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-yellow-500 transition-colors">
                    <StarIcon className="w-6 h-6" />
                    <span className="font-semibold text-sm">Tip</span>
                </button>
            </div>
        </div>
    );
};

export default PostCard;
