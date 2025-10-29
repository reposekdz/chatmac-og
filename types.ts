export interface User {
  name: string;
  handle: string;
  avatar: string;
  reputation?: number;
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

export interface ThreadBattle {
  isActive: boolean;
  topic: string;
  sideA: { user: User; text: string; votes: number };
  sideB: { user: User; text: string; votes: number };
}

export interface Post {
  id: number;
  user: User;
  timestamp: string;
  content: string;
  contentType: PostContentType;
  mediaUrl?: string;
  pollOptions?: PollOption[];
  likes: number;
  comments: number;
  shares: number;
  expiresAt?: Date;
  collaborator?: User;
  battle?: ThreadBattle;
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
