import React, { useState } from 'react';
import { MarketplaceIcon, SearchIcon, XIcon, StarIcon } from './icons';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    seller: string;
    rating: number;
}

const productData: Product[] = [
    { id: 1, name: 'Vintage Polaroid Camera', price: 7500, imageUrl: 'https://picsum.photos/id/250/300/300', seller: '@techguru', rating: 4.5 },
    { id: 2, name: 'Handmade Ceramic Mug', price: 2500, imageUrl: 'https://picsum.photos/id/312/300/300', seller: '@creativecanvas', rating: 5 },
    { id: 3, name: '"The Art of Code" Poster', price: 1800, imageUrl: 'https://picsum.photos/id/2/300/300', seller: '@elenacodes', rating: 4.8 },
    { id: 4, name: 'Gamer Fuel Energy Drink', price: 500, imageUrl: 'https://picsum.photos/id/96/300/300', seller: '@tastytreats', rating: 4.2 },
    { id: 5, name: 'Acoustic Guitar Strings', price: 1200, imageUrl: 'https://picsum.photos/id/145/300/300', seller: '@musiclover', rating: 4.9 },
    { id: 6, name: 'Travel Photography Prints', price: 4500, imageUrl: 'https://picsum.photos/id/1015/300/300', seller: '@samgoesplaces', rating: 5 },
];

const Marketplace: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card space-y-6">
            <div className="flex items-center space-x-3">
                <MarketplaceIcon className="w-8 h-8 text-indigo-500" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Marketplace</h1>
                    <p className="text-gray-600 dark:text-gray-400">Buy and sell goods within the community.</p>
                </div>
            </div>

            <div className="relative">
                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search for products..." className="w-full bg-gray-100 dark:bg-gray-800 rounded-full pl-12 pr-4 py-3"/>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productData.map(product => (
                    <div key={product.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform"/>
                        <div className="p-3">
                            <h3 className="font-bold truncate">{product.name}</h3>
                            <p className="text-sm text-gray-500">by {product.seller}</p>
                            <div className="flex items-center justify-between mt-2">
                                <p className="font-bold text-orange-500">{(product.price / 100).toFixed(2)} C</p>
                                <div className="flex items-center space-x-1 text-xs">
                                    <StarIcon className="w-4 h-4 text-yellow-400"/>
                                    <span className="font-semibold">{product.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;
