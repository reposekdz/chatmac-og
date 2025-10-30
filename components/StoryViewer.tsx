import React, { useState, useEffect, useCallback } from 'react';
import { Story, StoryComment } from '../types';
import { XIcon, PaperAirplaneIcon, HeartIcon, ChatBubbleIcon } from './icons';
import { loggedInUser } from '../App';

interface StoryViewerProps {
    stories: Story[];
    startIndex: number;
    onClose: () => void;
    openComments: (story: Story) => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, startIndex, onClose, openComments }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const [progress, setProgress] = useState(0);
    
    const currentStory = stories[currentIndex];

    const [isLiked, setIsLiked] = useState(currentStory.is_liked_by_user);
    const [likeCount, setLikeCount] = useState(currentStory.likes_count);
    const [commentCount, setCommentCount] = useState(currentStory.comments_count);
    const [newComment, setNewComment] = useState('');

    const goToNext = useCallback(() => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onClose();
        }
    }, [currentIndex, stories.length, onClose]);

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    useEffect(() => {
        setProgress(0);
        const story = stories[currentIndex];
        setIsLiked(story.is_liked_by_user);
        setLikeCount(story.likes_count);
        setCommentCount(story.comments_count);
    }, [currentIndex, stories]);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    goToNext();
                    return 0;
                }
                return prev + (100 / 500); // 5-second story duration
            });
        }, 10);

        return () => clearInterval(timer);
    }, [currentIndex, goToNext]);
    
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === 'ArrowLeft') goToPrevious();
      }
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrevious, onClose]);

    const handleLike = async () => {
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setLikeCount(prev => newIsLiked ? prev + 1 : prev - 1);
        try {
            await fetch(`/api/stories/${currentStory.id}/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: loggedInUser.id })
            });
        } catch (error) {
            console.error("Failed to update like status", error);
            // Revert optimistic update on failure
            setIsLiked(!newIsLiked);
            setLikeCount(prev => !newIsLiked ? prev + 1 : prev - 1);
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        try {
             const res = await fetch(`/api/stories/${currentStory.id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: loggedInUser.id, content: newComment })
            });
            if (res.ok) {
                setCommentCount(prev => prev + 1);
                setNewComment('');
            }
        } catch (error) {
            console.error("Failed to post comment", error);
        }
    };
    
    if (!currentStory) return null;

    return (
      <>
        <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="relative w-full max-w-[400px] h-[90vh] rounded-2xl bg-gray-800 overflow-hidden" onClick={e => e.stopPropagation()}>
                
                {/* Progress Bars */}
                <div className="absolute top-2 left-2 right-2 flex items-center space-x-1 z-10">
                    {stories.map((_, index) => (
                        <div key={index} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                           <div 
                                className="h-full bg-white"
                                style={{ width: `${index < currentIndex ? 100 : (index === currentIndex ? progress : 0)}%` }}
                            ></div>
                        </div>
                    ))}
                </div>

                {/* Header */}
                <div className="absolute top-5 left-4 right-4 flex items-center justify-between z-10">
                     <div className="flex items-center space-x-2">
                        <img src={currentStory.user.avatar} className="w-10 h-10 rounded-full" alt={currentStory.user.name} />
                        <p className="text-white font-bold text-sm">{currentStory.user.name}</p>
                     </div>
                     <button onClick={onClose} className="text-white p-1 bg-black/30 rounded-full"><XIcon className="w-5 h-5"/></button>
                </div>

                {/* Main Content */}
                <img src={currentStory.imageUrl} alt="Story content" className="w-full h-full object-contain" />

                {/* Navigation */}
                <div className="absolute inset-y-0 left-0 w-1/2" onClick={goToPrevious}></div>
                <div className="absolute inset-y-0 right-0 w-1/2" onClick={goToNext}></div>


                {/* Reply bar & Actions */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center space-x-2">
                    <form onSubmit={handleCommentSubmit} className="relative flex-grow">
                        <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder={`Reply to ${currentStory.user.name}...`} className="w-full bg-black/40 border-2 border-white/50 rounded-full py-2.5 pl-4 pr-12 text-white placeholder:text-white/70"/>
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-white"><PaperAirplaneIcon className="w-6 h-6"/></button>
                    </form>
                    <div className="flex items-center space-x-2 text-white">
                        <button onClick={handleLike} className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : ''}`}>
                            <HeartIcon className="w-7 h-7"/>
                            <span className="text-sm font-semibold">{likeCount}</span>
                        </button>
                         <button onClick={() => openComments(currentStory)} className="flex items-center space-x-1">
                            <ChatBubbleIcon className="w-7 h-7"/>
                            <span className="text-sm font-semibold">{commentCount}</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
      </>
    );
};

export default StoryViewer;