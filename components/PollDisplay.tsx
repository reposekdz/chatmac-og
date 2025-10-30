
import React, { useState, useMemo } from 'react';
import { Poll } from '../types';

interface PollDisplayProps {
    poll: Poll;
    postId: number;
}

const PollDisplay: React.FC<PollDisplayProps> = ({ poll, postId }) => {
    const [userVote, setUserVote] = useState(poll.user_vote);
    const [options, setOptions] = useState(poll.options);
    const [totalVotes, setTotalVotes] = useState(poll.total_votes);

    const handleVote = async (optionId: number) => {
        if (userVote) return; // Already voted

        const previousOptions = options;
        const previousTotalVotes = totalVotes;
        
        // Optimistic update
        setUserVote(optionId);
        setTotalVotes(prev => prev + 1);
        setOptions(prevOptions => prevOptions.map(opt => 
            opt.id === optionId ? { ...opt, vote_count: opt.vote_count + 1 } : opt
        ));

        try {
            const res = await fetch(`/api/posts/${postId}/poll/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ optionId })
            });
            if (!res.ok) throw new Error("Vote failed");

        } catch (error) {
            console.error("Failed to submit vote:", error);
            // Revert optimistic update
            setUserVote(undefined);
            setOptions(previousOptions);
            setTotalVotes(previousTotalVotes);
        }
    };

    const totalVotesForPercentage = useMemo(() => Math.max(1, totalVotes), [totalVotes]);

    return (
        <div className="mt-3 space-y-2">
            {options.map(option => {
                const percentage = (option.vote_count / totalVotesForPercentage) * 100;
                const isVotedOption = userVote === option.id;

                return (
                    <button 
                        key={option.id}
                        onClick={() => handleVote(option.id)}
                        disabled={!!userVote}
                        className="w-full text-left p-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden"
                    >
                        {userVote && <div className="absolute top-0 left-0 h-full bg-orange-200 dark:bg-orange-900/50" style={{ width: `${percentage}%` }}></div>}
                        
                        <div className="relative flex justify-between items-center">
                            <span className={`font-semibold ${isVotedOption ? 'text-orange-800 dark:text-orange-200' : ''}`}>{option.text}</span>
                            {userVote && <span className="text-sm font-bold">{Math.round(percentage)}%</span>}
                        </div>
                    </button>
                );
            })}
             <p className="text-xs text-gray-500 text-right">{totalVotes.toLocaleString()} votes</p>
        </div>
    );
};

export default PollDisplay;
