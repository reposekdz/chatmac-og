import React, { useState, useEffect } from 'react';
import { Story, StoryComment } from '../types';
import { XIcon, PaperAirplaneIcon } from './icons';
import { loggedInUser } from '../App';

interface StoryCommentsModalProps {
    story: Story;
    onClose: () => void;
    onCommentPosted: () => void;
}

const CommentCard: React.FC<{ comment: StoryComment }> = ({ comment }) => (
     <div className="flex items-start space-x-3">
        <img src={comment.user.avatar} alt={comment.user.name} className="w-10 h-10 rounded-full" />
        <div className="flex-grow bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
            <p className="font-bold text-sm">{comment.user.name}</p>
            <p>{comment.content}</p>
        </div>
    </div>
);


const StoryCommentsModal: React.FC<StoryCommentsModalProps> = ({ story, onClose, onCommentPosted }) => {
    const [comments, setComments] = useState<StoryComment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/stories/${story.id}/comments`);
                const data = await res.json();
                setComments(data);
            } catch (error) {
                console.error("Failed to fetch comments", error);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [story.id]);

     const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const optimisticComment: StoryComment = {
            id: Date.now(),
            content: newComment,
            created_at: new Date().toISOString(),
            user: loggedInUser
        };
        setComments(prev => [optimisticComment, ...prev]);
        const currentCommentText = newComment;
        setNewComment('');

        try {
             const res = await fetch(`/api/stories/${story.id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: loggedInUser.id, content: currentCommentText })
            });
            if (res.ok) {
                onCommentPosted();
                // Optionally replace optimistic comment with real one from server
                const actualComment = await res.json();
                setComments(prev => prev.map(c => c.id === optimisticComment.id ? actualComment : c));
            } else {
                 throw new Error("Failed to post");
            }
        } catch (error) {
            console.error("Failed to post comment", error);
            setComments(prev => prev.filter(c => c.id !== optimisticComment.id)); // Revert on failure
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[210] flex items-end justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-t-2xl shadow-xl w-full max-w-lg h-[80vh] flex flex-col animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-center items-center relative flex-shrink-0">
                    <h2 className="text-lg font-bold">Comments</h2>
                    <button onClick={onClose} className="absolute right-2 top-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>
                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {loading ? <p>Loading comments...</p> : comments.map(comment => <CommentCard key={comment.id} comment={comment} />)}
                    {!loading && comments.length === 0 && <p className="text-center text-gray-500 pt-10">No comments yet. Be the first!</p>}
                </div>
                 <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
                    <form onSubmit={handleCommentSubmit} className="flex items-center space-x-3">
                        <img src={loggedInUser.avatar} alt="your avatar" className="w-10 h-10 rounded-full"/>
                        <input value={newComment} onChange={e => setNewComment(e.target.value)} type="text" placeholder="Add a comment..." className="w-full bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2" />
                        <button type="submit" className="bg-orange-500 text-white p-2 rounded-full disabled:bg-orange-300" disabled={!newComment.trim()}>
                            <PaperAirplaneIcon className="w-6 h-6"/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StoryCommentsModal;