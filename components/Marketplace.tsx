import React, { useState, useEffect } from 'react';
import { MarketplaceIcon, SearchIcon, XIcon, StarIcon, CoinIcon, ImageIcon } from './icons';
import { MarketplaceListing } from '../types';
import { useWallet } from '../hooks/useWallet';
import { loggedInUser } from '../App';

interface CreateListingModalProps {
    onClose: () => void;
    onListingCreated: () => void;
}

const CreateListingModal: React.FC<CreateListingModalProps> = ({ onClose, onListingCreated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/marketplace', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sellerId: loggedInUser.id,
                    name,
                    description,
                    price: parseFloat(price),
                    imageUrl: imageUrl || `https://picsum.photos/seed/${name}/300/300`,
                }),
            });
            if (!response.ok) throw new Error('Failed to create listing');
            onListingCreated();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md m-4 animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Create New Listing</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2" required />
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2" rows={3}></textarea>
                    <input type="number" placeholder="Price (in Coins)" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2" required />
                    <input type="text" placeholder="Image URL (optional)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2" />
                    <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg disabled:bg-orange-300">{isSubmitting ? 'Submitting...' : 'Create Listing'}</button>
                </form>
            </div>
        </div>
    );
};


const Marketplace: React.FC<{ coins: number, setCoins: (c: number | ((prev: number) => number)) => void }> = ({ coins, setCoins }) => {
    const [listings, setListings] = useState<MarketplaceListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreateOpen, setCreateOpen] = useState(false);
    const { isConnected, address, connect } = useWallet();

    const fetchListings = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/marketplace');
            if (!response.ok) throw new Error('Failed to fetch listings');
            const data = await response.json();
            setListings(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);
    
    const handleBuy = async (item: MarketplaceListing) => {
        if (!isConnected) {
            alert('Please connect your wallet first!');
            connect();
            return;
        }
        if (coins < item.price) {
            alert('Not enough coins!');
            return;
        }
        if (!window.confirm(`Are you sure you want to buy ${item.name} for ${item.price} Coins?`)) return;

        try {
            const response = await fetch(`/api/marketplace/${item.id}/buy`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: loggedInUser.id, buyerAddress: address })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Purchase failed');
            }
            alert('Purchase successful!');
            setCoins(c => c - item.price);
            fetchListings(); // Refresh listings
        } catch (error) {
            alert((error as Error).message);
        }
    };

    return (
        <>
            {isCreateOpen && <CreateListingModal onClose={() => setCreateOpen(false)} onListingCreated={fetchListings} />}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <MarketplaceIcon className="w-8 h-8 text-indigo-500" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Marketplace</h1>
                            <p className="text-gray-600 dark:text-gray-400">Buy and sell goods with Coins.</p>
                        </div>
                    </div>
                    <button onClick={() => setCreateOpen(true)} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">Create Listing</button>
                </div>

                <div className="relative">
                    <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search for products..." className="w-full bg-gray-100 dark:bg-gray-800 rounded-full pl-12 pr-4 py-3"/>
                </div>

                {loading && <p>Loading listings...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {!loading && !error && (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {listings.map(item => (
                            <div key={item.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group flex flex-col">
                                <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform"/>
                                <div className="p-3 flex-grow flex flex-col">
                                    <h3 className="font-bold truncate">{item.name}</h3>
                                    <p className="text-sm text-gray-500">by {item.seller.handle}</p>
                                    <div className="flex-grow"></div>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="font-bold text-orange-500 flex items-center"><CoinIcon className="w-4 h-4 mr-1"/>{item.price.toLocaleString()}</p>
                                        <button onClick={() => handleBuy(item)} className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full hover:bg-blue-600">Buy</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Marketplace;