import React, { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { SearchIcon, XIcon } from './icons';
import { User, Post } from '../types';
import { View } from '../App';

interface SearchResult {
    users: User[];
    posts: Post[];
}

interface GlobalSearchProps {
    setView: (view: View) => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ setView }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const debouncedQuery = useDebounce(query, 300);

    const fetchResults = useCallback(async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setResults(null);
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            const data: SearchResult = await response.json();
            setResults(data);
        } catch (error) {
            console.error("Failed to fetch search results:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchResults(debouncedQuery);
    }, [debouncedQuery, fetchResults]);

    const handleUserClick = (user: User) => {
        // In a real app, you'd navigate to the user's profile
        // For this demo, we can set the view if the profile view exists
        console.log(`Navigate to ${user.handle}'s profile`);
        setQuery('');
        setIsFocused(false);
        setView('profile'); // simplified
    }

    const handlePostClick = (post: Post) => {
        // In a real app, you'd open a post detail view
        console.log(`Open post ${post.id}`);
        setQuery('');
        setIsFocused(false);
    }

    return (
        <div className="relative w-full max-w-lg">
            <div className="relative">
                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="Search Orrange"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow clicks on results
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-orange-500 rounded-full pl-12 pr-10 py-2 transition-colors"
                />
                {query && (
                    <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                        <XIcon className="w-4 h-4 text-gray-500"/>
                    </button>
                )}
            </div>

            {isFocused && (debouncedQuery.length >= 2) && (
                <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                    {isLoading && <div className="p-4 text-center text-gray-500">Searching...</div>}
                    {!isLoading && results && (
                        <div>
                            {results.users.length === 0 && results.posts.length === 0 && (
                                <div className="p-4 text-center text-gray-500">No results found for "{debouncedQuery}"</div>
                            )}

                            {results.users.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-sm text-gray-500 p-3 border-b dark:border-gray-700">Users</h3>
                                    {results.users.map(user => (
                                        <button key={user.id} onClick={() => handleUserClick(user)} className="w-full text-left flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <img src={user.avatar} className="w-10 h-10 rounded-full" alt={user.name} />
                                            <div>
                                                <p className="font-semibold">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.handle}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                             {results.posts.length > 0 && (
                                <div>
                                    <h3 className="font-bold text-sm text-gray-500 p-3 border-b dark:border-gray-700">Posts</h3>
                                    {results.posts.map(post => (
                                        <button key={post.id} onClick={() => handlePostClick(post)} className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <p className="line-clamp-2">{post.content}</p>
                                            <p className="text-xs text-gray-500 mt-1">by {post.user.name}</p>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;