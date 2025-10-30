import React from 'react';
import { Post, User } from '../types';
import { CoinIcon } from './icons';

interface Nft {
    id: number;
    price: number;
    post: Post;
    creator: User;
    owner: User;
}

interface NFTCardProps {
    nft: Nft;
    showBuyButton?: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, showBuyButton }) => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group flex flex-col">
            <div className="aspect-square w-full overflow-hidden">
                <img src={nft.post.image_url} alt={nft.post.content} className="w-full h-full object-cover group-hover:scale-105 transition-transform"/>
            </div>
            <div className="p-3 flex-grow flex flex-col">
                <p className="text-sm font-semibold text-gray-500">by @{nft.creator.handle}</p>
                <h3 className="font-bold truncate flex-grow">{nft.post.content}</h3>
                
                <div className="flex items-center justify-between mt-2">
                    <p className="font-bold text-orange-500 flex items-center"><CoinIcon className="w-4 h-4 mr-1"/>{nft.price.toLocaleString()}</p>
                    {showBuyButton && (
                        <button className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full hover:bg-purple-600">Buy</button>
                    )}
                </div>
                 <p className="text-xs text-gray-400 mt-1">Owner: @{nft.owner.handle}</p>
            </div>
        </div>
    );
};

export default NFTCard;