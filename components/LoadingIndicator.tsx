import React from 'react';
import { StarIcon } from './icons';

const LoadingIndicator: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-pulse-radar"></div>
                <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-pulse-radar" style={{ animationDelay: '0.5s' }}></div>
                <StarIcon className="w-12 h-12 text-orange-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
        </div>
    );
};

export default LoadingIndicator;
