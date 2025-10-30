
import React, { useState } from 'react';
import { Post } from '../types';
import { HeartIcon, ChatBubbleIcon, ShareIcon, BookmarksIcon, MoreIcon } from './icons';

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [isLiked, setIsLiked] = useState(post.is_liked_by_user);
    const [likeCount, setLikeCount] = useState(post.likes_count);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
        // In a real app, you'd make an API call here.
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img src={post.user.avatar} alt={post.user.name} className="w-12 h-12 rounded-full" />
                    <div>
                        <p className="font-bold">{post.user.name}</p>
                        <p className="text-sm text-gray-500">{post.user.handle} · {new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><MoreIcon className="w-6 h-6" /></button>
            </div>
            
            <p className="my-4 text-gray-800 dark:text-gray-200">{post.content}</p>

            {post.image_url && (
                <img src={post.image_url} alt="Post content" className="mt-4 rounded-lg w-full object-cover" style={{maxHeight: '500px'}}/>
            )}

            <div className="mt-4 flex items-center justify-between text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-6">
                    <button onClick={handleLike} className={`flex items-center space-x-2 hover:text-red-500 ${isLiked ? 'text-red-500' : ''}`}>
                        <HeartIcon className="w-6 h-6" />
                        <span className="text-sm font-semibold">{likeCount.toLocaleString()}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-blue-500">
                        <ChatBubbleIcon className="w-6 h-6" />
                        <span className="text-sm font-semibold">{post.comments_count.toLocaleString()}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-green-500">
                        <ShareIcon className="w-6 h-6" />
                    </button>
                </div>
                <button className="flex items-center space-x-2 hover:text-yellow-500">
                    <BookmarksIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default PostCard;
