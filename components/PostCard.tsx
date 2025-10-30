import React, { useState } from 'react';
import { Post } from '../types';
import { HeartIcon, ChatBubbleIcon, ShareIcon, BookmarksIcon, MoreIcon, XIcon } from './icons';
import PollDisplay from './PollDisplay';
import { loggedInUser } from '../App';

const ShareModal: React.FC<{ post: Post; onClose: () => void; onConfirm: () => void }> = ({ post, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm m-4" onClick={e => e.stopPropagation()}>
                 <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Share Post</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>
                <div className="p-6 space-y-4">
                    <p>Are you sure you want to share this post by {post.user.name} to your feed?</p>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-500 italic line-clamp-2">{post.content}</p>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button onClick={onClose} className="bg-gray-200 dark:bg-gray-700 font-bold py-2 px-4 rounded-full">Cancel</button>
                        <button onClick={onConfirm} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-full">Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
};


interface PostCardProps {
    post: Post;
    openPostDetail?: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, openPostDetail }) => {
    const [isLiked, setIsLiked] = useState(post.is_liked_by_user);
    const [likesCount, setLikesCount] = useState(post.likes_count);
    const [isBookmarked, setIsBookmarked] = useState(post.is_bookmarked_by_user);
    const [isShareModalOpen, setShareModalOpen] = useState(false);

    const handleLike = async () => {
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1);

        try {
            await fetch(`/api/posts/${post.id}/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: loggedInUser.id })
            });
        } catch (error) {
            console.error("Failed to like post", error);
            setIsLiked(!newIsLiked);
            setLikesCount(prev => !newIsLiked ? prev + 1 : prev - 1);
        }
    };
    
    const handleBookmark = async () => {
        const newIsBookmarked = !isBookmarked;
        setIsBookmarked(newIsBookmarked);

        try {
            await fetch(`/api/posts/${post.id}/bookmark`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: loggedInUser.id })
            });
        } catch (error) {
            console.error("Failed to bookmark post", error);
            setIsBookmarked(!newIsBookmarked);
        }
    };

    const handleShare = async () => {
        try {
            await fetch(`/api/posts/${post.id}/share`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: loggedInUser.id })
            });
            // Ideally, show a toast notification here
        } catch(error) {
            console.error("Failed to share post", error);
        } finally {
            setShareModalOpen(false);
        }
    }

    const originalPost = post.original_post; // Assuming the API returns this nested object

    return (
      <>
        {isShareModalOpen && <ShareModal post={post} onClose={() => setShareModalOpen(false)} onConfirm={handleShare}/>}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
            {post.original_post_id && (
                <div className="text-sm text-gray-500 mb-2">
                    Shared by <span className="font-semibold">{post.user.name}</span>
                </div>
            )}
            <div className="flex items-start space-x-4">
                <img src={post.user.avatar} alt={post.user.name} className="w-12 h-12 rounded-full" />
                <div className="flex-grow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold">{post.user.name}</p>
                            <p className="text-sm text-gray-500">{post.user.handle} · {new Date(post.created_at).toLocaleDateString()}</p>
                        </div>
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><MoreIcon className="w-5 h-5"/></button>
                    </div>
                    
                    <p className="mt-2 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{post.content}</p>

                    {post.image_url && <img src={post.image_url} alt="Post content" className="mt-3 rounded-lg w-full object-cover" />}
                    
                    {post.poll && <PollDisplay poll={post.poll} postId={post.id} />}

                    {originalPost && <div className="mt-2 border border-gray-200 dark:border-gray-700 rounded-xl p-4"><PostCard post={originalPost} /></div>}

                    <div className="flex items-center justify-between mt-4 text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-4">
                            <button onClick={handleLike} className={`flex items-center space-x-1.5 group ${isLiked ? 'text-red-500' : ''}`}>
                                <HeartIcon className="w-6 h-6 group-hover:text-red-500" />
                                <span className="text-sm font-semibold">{likesCount.toLocaleString()}</span>
                            </button>
                             <button onClick={() => openPostDetail && openPostDetail(post)} className="flex items-center space-x-1.5 group">
                                <ChatBubbleIcon className="w-6 h-6 group-hover:text-blue-500" />
                                <span className="text-sm font-semibold">{post.comments_count.toLocaleString()}</span>
                            </button>
                             <button onClick={() => setShareModalOpen(true)} className="flex items-center space-x-1.5 group">
                                <ShareIcon className="w-6 h-6 group-hover:text-green-500" />
                                <span className="text-sm font-semibold">{post.share_count || 0}</span>
                            </button>
                        </div>
                        <button onClick={handleBookmark} className="group">
                           <BookmarksIcon className={`w-6 h-6 group-hover:text-yellow-500 ${isBookmarked ? 'text-yellow-500 fill-current' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
};

export default PostCard;
