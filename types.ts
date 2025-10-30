
export interface User {
    id: number;
    name: string;
    handle: string;
    avatar: string;
    bio?: string;
    followers_count?: number;
    following_count?: number;
    isCommunityVerified?: boolean;
    skillBadges?: { name: string }[];
    isMonetized?: boolean;
    isVerified?: boolean;
    subscriptionPrice?: number;
    coins?: number;
    status_emoji?: string;
}

export interface PollOption {
    id: number;
    text: string;
    vote_count: number;
}

export interface Poll {
    id: number;
    options: PollOption[];
    total_votes: number;
    user_vote?: number; // option id
}

export interface Post {
    id: number;
    user: User;
    content: string;
    image_url?: string;
    created_at: string;
    likes_count: number;
    comments_count: number;
    is_liked_by_user: boolean;
    is_bookmarked_by_user?: boolean;
    latitude?: number | null;
    longitude?: number | null;
    poll?: Poll | null;
}

export interface Comment {
    id: number;
    user: User;
    content: string;
    created_at: string;
}

export interface Story {
    id: number;
    user: User;
    imageUrl: string;
    created_at: string;
    likes_count: number;
    comments_count: number;
    is_liked_by_user: boolean;
}

export interface Highlight {
    id: number;
    user_id: number;
    title: string;
    cover_image_url: string;
    stories: Story[];
}

export interface StoryComment {
    id: number;
    user: User;
    content: string;
    created_at: string;
}

export interface MarketplaceListing {
    id: number;
    seller: User;
    name: string;
    description: string;
    price: number;
    image_url: string;
    is_sold: boolean;
    created_at: string;
}

export interface Challenge {
    id: number;
    title: string;
    description: string;
    participants: number;
    icon: string;
    is_joined: boolean;
}

export interface JourneyMilestone {
    id: number;
    date: string;
    title: string;
    description: string;
    icon: string;
}

export interface Achievement {
    id: number;
    name: string;
    description: string;
    icon: string;
    achieved_at?: string;
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
    status: 'Active' | 'Ended' | 'Paused';
    budget: number;
    impressions: number;
    clicks: number;
}

export interface Reel {
    id: number;
    user_id: number;
    user: User;
    video_url: string;
    caption: string;
    views: number;
    created_at: string;
}

export interface Conversation {
    id: number;
    participant: User;
    last_message: string;
    last_message_at: string;
    unread_count: number;
}

export interface Message {
    id: number;
    sender_id: number;
    content: string;
    created_at: string;
}

export interface Notification {
    id: number;
    type: 'like' | 'comment' | 'follow' | 'mention' | 'system' | 'marketplace_purchase' | 'achievement_unlocked';
    actor: User;
    post?: { id: number; content: string };
    content: string | null;
    created_at: string;
    is_read: boolean;
    entity_id?: number;
}
