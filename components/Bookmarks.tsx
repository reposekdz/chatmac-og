
import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { BookmarksIcon } from './icons';
import { ClientToServerEvents, Post, ServerToClientEvents } from '../types';
import PostCard from './PostCard';
import { loggedInUser } from '../App';

interface BookmarksProps {
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}

const Bookmarks: React.FC<BookmarksProps> = ({ socket }) => {
    const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const res = await fetch(`/api/bookmarks?userId=${loggedInUser.id}`);
                const data = await res.json();
                setBookmarkedPosts(data);
            } catch (error) {
                console.error("Failed to fetch bookmarks", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookmarks();
    }, []);

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
                <div className="flex items-center space-x-3">
                    <BookmarksIcon className="w-8 h-8 text-yellow-500" />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Bookmarks</h1>
                        <p className="text-gray-600 dark:text-gray-400">Your saved posts.</p>
                    </div>
                </div>
            </div>
            {loading ? <p>Loading bookmarks...</p> : (
                bookmarkedPosts.length > 0 ?
                // FIX: Pass socket prop to PostCard to resolve TypeScript error.
                bookmarkedPosts.map(post => <PostCard key={post.id} post={post} socket={socket} />) :
                <p className="text-center text-gray-500">You haven't bookmarked any posts yet.</p>
            )}
        </div>
    );
};

export default Bookmarks;