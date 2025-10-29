import React from 'react';
import { Post } from '../types';
import { BookmarksIcon } from './icons';
import PostCard from './PostCard'; // Assuming PostCard can be reused

const bookmarkedPosts: Post[] = [
    // Mocked data for bookmarked posts
];

const Bookmarks: React.FC = () => {
    return (
        <div className="flex flex-col space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
                <div className="flex items-center space-x-3">
                    <BookmarksIcon className="w-7 h-7 text-blue-500" />
                    <h1 className="text-2xl font-bold">Bookmarks</h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Your saved posts for later.</p>
            </div>
            {bookmarkedPosts.length > 0 ? (
                 bookmarkedPosts.map(post => <PostCard key={post.id} post={post} addCoins={() => {}} isAntiToxic={false} />)
            ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <p>You haven't bookmarked any posts yet.</p>
                </div>
            )}
        </div>
    );
};

export default Bookmarks;
