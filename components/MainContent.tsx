import React from 'react';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import StoryReel from './StoryReel';
import { Post, PostContentType } from '../types';

const posts: Post[] = [
  {
    id: 1,
    user: { name: 'Elena Rodriguez', handle: '@elenacodes', avatar: 'https://picsum.photos/id/1027/200/200' },
    timestamp: '2h ago',
    content: 'Just deployed a new feature for our React app! The performance gains are incredible. Tailwind CSS made styling a breeze. 🚀',
    contentType: PostContentType.TEXT,
    likes: 128,
    comments: 15,
    shares: 23,
  },
  {
    id: 2,
    user: { name: 'Sam Adventure', handle: '@samgoesplaces', avatar: 'https://picsum.photos/id/1015/200/200' },
    timestamp: '5h ago',
    content: 'Chasing waterfalls. Nature never ceases to amaze me. 🌲🌊',
    contentType: PostContentType.IMAGE,
    mediaUrl: 'https://picsum.photos/id/1015/600/400',
    likes: 543,
    comments: 45,
    shares: 89,
  },
   {
    id: 3,
    user: { name: 'Tech Central', handle: '@techcentral', avatar: 'https://picsum.photos/id/1/200/200' },
    timestamp: '8h ago',
    content: 'What is your favorite state management library for React?',
    contentType: PostContentType.POLL,
    pollOptions: [
      { text: 'Redux', votes: 120 },
      { text: 'Zustand', votes: 250 },
      { text: 'Jotai', votes: 80 },
      { text: 'Context API', votes: 150 },
    ],
    likes: 72,
    comments: 33,
    shares: 12,
  },
  {
    id: 4,
    user: { name: 'Motion Flix', handle: '@motionflix', avatar: 'https://picsum.photos/id/103/200/200' },
    timestamp: '1d ago',
    content: 'Our latest short film "Neon Dreams" is out! Here\'s a little teaser. Let us know what you think!',
    contentType: PostContentType.VIDEO,
    mediaUrl: 'https://picsum.photos/id/103/600/400',
    likes: 1024,
    comments: 112,
    shares: 256,
  },
];

const MainContent: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6">
      <CreatePost />
      <StoryReel />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default MainContent;