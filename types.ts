export interface User {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  reputation?: number;
  rank?: string;
  isCommunityVerified?: boolean;
  skillBadges?: { name: string; icon: string }[];
}

export interface Trend {
  category: string;
  topic: string;
  posts: string;
  imageUrl?: string;
}

export enum PostContentType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  POLL = 'POLL',
}

export interface PollOption {
  text: string;
  votes: number;
}

export type PostVisibility = 'public' | 'friends' | 'premium';

export interface Comment {
    id: number;
    user: User;
    content: string;
    timestamp: string;
}

export interface Post {
  id: number;
  user: User;
  timestamp: string;
  content: string;
  contentType: PostContentType;
  mediaUrl?: string;
  pollOptions?: PollOption[];
  visibility: PostVisibility[];
  impactScore: number;
  comments: Comment[];
  commentsCount: number;
  likesCount: number;
  sharesCount: number;
  isLiked: boolean; // Is the post liked by the current user
  expiresAt?: Date;
  collaborator?: User;
  topics?: string[];
}

export interface Story {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  imageUrl: string;
  type?: 'image' | 'voice';
}

export interface MarketplaceItem {
    id: number;
    name: string;
    seller: string;
    priceUSD: number;
    priceCoins: number;
    imageUrl: string;
}

export interface Challenge {
    id: number;
    title: string;
    description: string;
    participants: number;
    icon: string;
}

export interface JourneyMilestone {
    id: number;
    date: string;
    title: string;
    description: string;
    icon: string;
}

export interface LocalRoom {
    id: number;
    name: string;
    description: string;
    members: number;
    isLocked: boolean;
}

export interface Reel {
    id: number;
    user: User;
    videoUrl: string;
    caption: string;
    views: number;
}

export interface AdCampaign {
    id: number;
    name: string;
    status: 'Active' | 'Paused' | 'Ended';
    budget: number; // in coins
    impressions: number;
    clicks: number;
}

export interface Notification {
    id: number;
    type: 'like' | 'comment' | 'follow' | 'mention' | 'system';
    actor: User;
    post_id?: number;
    content_preview?: string;
    created_at: string;
    read_status: boolean;
}

export interface Message {
    id: number;
    sender_id: number;
    content: string;
    created_at: string;
    reply_to?: string;
}
