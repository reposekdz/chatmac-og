
import React from 'react';
import { User } from '../types';
import { XIcon, ShieldCheckIcon } from './icons';

interface VerificationModalProps {
    user: User;
    onClose: () => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ user, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md m-4 animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Account Verification</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>
                <div className="p-6 text-center">
                    <ShieldCheckIcon className="w-20 h-20 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Get Verified</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        A verified badge lets people know that an account of public interest is authentic.
                    </p>
                    {user.isVerified ? (
                        <p className="font-bold text-green-600">Your account is already verified!</p>
                    ) : (
                        <button className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600">
                            Start Verification Process
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerificationModal;
