
import React, { useState, useEffect } from 'react';
import { Post, Comment } from '../types';
import { XIcon } from './icons';
import PostCard from './PostCard';
import { loggedInUser } from '../App';

interface PostDetailModalProps {
    post: Post;
    onClose: () => void;
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ post, onClose }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetch(`/api/posts/${post.id}/comments`)
            .then(res => res.json())
            .then(data => setComments(data));
    }, [post.id]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        
        const res = await fetch(`/api/posts/${post.id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: loggedInUser.id, content: newComment }),
        });
        const createdComment = await res.json();
        setComments(prev => [createdComment, ...prev]);
        setNewComment('');
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl h-[90vh] m-4 flex flex-col overflow-hidden animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Post by {post.user.name}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>
                <div className="flex-grow overflow-y-auto">
                    <PostCard post={post} />
                    <div className="p-4 space-y-4">
                        {comments.map(comment => (
                            <div key={comment.id} className="flex items-start space-x-3">
                                <img src={comment.user.avatar} className="w-10 h-10 rounded-full"/>
                                <div>
                                    <p><span className="font-bold">{comment.user.name}</span> <span className="text-gray-500 text-sm">@{comment.user.handle}</span></p>
                                    <p>{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleCommentSubmit} className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Post your reply" className="w-full bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2"/>
                </form>
            </div>
        </div>
    );
};

export default PostDetailModal;
