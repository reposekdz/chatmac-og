
export interface User {
    id: number;
    name: string;
    handle: string;
    avatar: string;
    banner?: string;
    bio?: string;
    location?: string;
    website?: string;
    joinedDate?: string;
    stats?: {
        following: number;
        followers: number;
    };
    isCommunityVerified?: boolean;
    skillBadges?: { name: string; icon: string }[];
    reputation?: number;
    rank?: string;
}

export interface Post {
    id: number;
    user: User;
    content: string;
    imageUrl?: string;
    timestamp: string;
    stats: {
        likes: number;
        comments: number;
        shares: number;
    };
    isLiked: boolean;
    topics?: string[];
    comments?: Comment[];
}

export interface Comment {
    id: number;
    user: User;
    content: string;
    timestamp: string;
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

export interface Trend {
    category: string;
    topic: string;
    posts: string;
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

export interface AdCampaign {
    id: number;
    name: string;
    status: 'Active' | 'Ended' | 'Draft';
    budget: number;
    impressions: number;
    clicks: number;
}

export interface Reel {
    id: number;
    user: User;
    videoUrl: string;
    caption: string;
    views: number;
}

export interface Notification {
    id: number;
    type: 'follow' | 'like' | 'comment' | 'mention' | 'system';
    user?: User;
    post?: {
        id: number;
        excerpt: string;
    };
    content?: string;
    timestamp: string;
    isRead: boolean;
}

export interface Conversation {
    id: number;
    user: User;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    isOnline: boolean;
}

export interface Message {
    id: number;
    sender: 'me' | 'them';
    content: string;
    timestamp: string;
}
