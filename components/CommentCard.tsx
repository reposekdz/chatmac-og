
import React from 'react';
import { Comment } from '../types';

interface CommentCardProps {
    comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
    return (
        <div className="flex items-start space-x-3 p-4 border-b border-gray-200 dark:border-gray-800">
            <img src={comment.user.avatar} alt={comment.user.name} className="w-10 h-10 rounded-full" />
            <div className="flex-grow">
                <div className="flex items-baseline space-x-2">
                    <p className="font-bold">{comment.user.name}</p>
                    <p className="text-sm text-gray-500">{comment.user.handle}</p>
                    <p className="text-sm text-gray-400">· {new Date(comment.created_at).toLocaleDateString()}</p>
                </div>
                <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
            </div>
        </div>
    );
};

export default CommentCard;
