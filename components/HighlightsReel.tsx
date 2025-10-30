import React, { useState, useEffect } from 'react';
import { Highlight } from '../types';
import { PlusCircleIcon } from './icons';

interface HighlightsReelProps {
    userId: number;
}

const HighlightsReel: React.FC<HighlightsReelProps> = ({ userId }) => {
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHighlights = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/highlights/user/${userId}`);
                if (!res.ok) throw new Error('Failed to fetch highlights');
                const data = await res.json();
                setHighlights(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchHighlights();
    }, [userId]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Highlights</h2>
            <div className="flex items-center space-x-4 overflow-x-auto pb-2 no-scrollbar">
                {/* Create New Highlight Button */}
                <button className="flex-shrink-0 flex flex-col items-center space-y-1 w-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <PlusCircleIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-xs font-semibold">New</p>
                </button>
                
                {loading ? <p>Loading...</p> : highlights.map(highlight => (
                    <div key={highlight.id} className="flex-shrink-0 flex flex-col items-center space-y-1 w-20 text-center">
                        <div className="w-16 h-16 rounded-full p-0.5 border-2 border-gray-300 dark:border-gray-700">
                           <img src={highlight.cover_image_url} alt={highlight.title} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <p className="text-xs font-semibold truncate w-full">{highlight.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HighlightsReel;