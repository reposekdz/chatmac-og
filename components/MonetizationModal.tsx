
import React from 'react';
import { User } from '../types';
import { XIcon, StarIcon, CoinIcon } from './icons';

interface MonetizationModalProps {
    user: User;
    onClose: () => void;
}

const MonetizationModal: React.FC<MonetizationModalProps> = ({ user, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md m-4 animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Monetization</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>
                <div className="p-6">
                    <div className="text-center mb-6">
                        <StarIcon className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Earn from your content</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Set up paid subscriptions to offer exclusive content to your followers.
                        </p>
                    </div>
                    
                    {user.isMonetized ? (
                        <div>
                            <p className="font-semibold text-green-600 text-center mb-4">Monetization is active!</p>
                             <div className="mb-4">
                                <label className="block text-sm font-bold mb-2" htmlFor="subPrice">
                                    Subscription Price (Coins / month)
                                </label>
                                <div className="relative">
                                    <CoinIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                                    <input id="subPrice" type="number" defaultValue={user.subscriptionPrice || 5} className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg pl-10 pr-4 py-2" />
                                </div>
                            </div>
                            <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600">
                                Save Changes
                            </button>
                        </div>
                    ) : (
                         <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600">
                            Set Up Monetization
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MonetizationModal;
