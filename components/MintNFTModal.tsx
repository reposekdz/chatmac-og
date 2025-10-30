import React, { useState } from 'react';
import { Post } from '../types';
import { XIcon, CoinIcon, StarIcon } from './icons';

interface MintNFTModalProps {
    post: Post;
    onClose: () => void;
    onMintSuccess: () => void;
}

const MintNFTModal: React.FC<MintNFTModalProps> = ({ post, onClose, onMintSuccess }) => {
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleMint = async () => {
        if (!price || parseInt(price) <= 0) {
            setError('Please enter a valid price.');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/nfts/mint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    postId: post.id,
                    userId: post.user.id,
                    price: parseInt(price),
                }),
            });
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Minting failed');
            }
            onMintSuccess();
            onClose();
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md m-4 animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Mint Post as NFT</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>
                <div className="p-6 space-y-4">
                    <p>You are about to turn your post into a unique digital collectible on the Orrange blockchain.</p>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <img src={post.image_url} alt="Post content" className="w-full h-48 object-cover rounded-md mb-2"/>
                        <p className="text-sm italic line-clamp-2">"{post.content}"</p>
                    </div>
                     <div>
                        <label htmlFor="nft-price" className="font-semibold mb-2 block">Set a Price</label>
                         <div className="relative">
                            <CoinIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                            <input
                                id="nft-price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price in Coins"
                                className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg pl-10 pr-4 py-2"
                            />
                        </div>
                    </div>
                     {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                 <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                    <button
                        onClick={handleMint}
                        disabled={isLoading}
                        className="flex items-center space-x-2 bg-purple-600 text-white font-bold py-2 px-6 rounded-full disabled:bg-purple-400"
                    >
                        <StarIcon className="w-5 h-5"/>
                        <span>{isLoading ? 'Minting...' : 'Mint NFT'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MintNFTModal;