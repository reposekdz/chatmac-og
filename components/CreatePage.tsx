import React from 'react';

const CreatePage = () => {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
            <h1 className="text-2xl font-bold mb-4">Create</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <button className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center hover:bg-gray-200 dark:hover:bg-gray-700">
                    <h2 className="font-bold">New Post</h2>
                    <p className="text-sm text-gray-500">Share your thoughts</p>
                 </button>
                 <button className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center hover:bg-gray-200 dark:hover:bg-gray-700">
                    <h2 className="font-bold">New Story</h2>
                    <p className="text-sm text-gray-500">A temporary update</p>
                 </button>
                 <button className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center hover:bg-gray-200 dark:hover:bg-gray-700">
                    <h2 className="font-bold">New Reel</h2>
                    <p className="text-sm text-gray-500">Create a short video</p>
                 </button>
            </div>
        </div>
    );
};

export default CreatePage;
