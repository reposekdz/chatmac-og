

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
    created_at?: string; // Added for profile page
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
    share_count?: number;
    is_liked_by_user: boolean;
    is_bookmarked_by_user?: boolean;
    latitude?: number | null;
    longitude?: number | null;
    poll?: Poll | null;
    original_post_id?: number | null;
    original_post?: Post | null;
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
    conversation_id: number;
    sender_id: number;
    content: string;
    created_at: string;
}

export interface Notification {
    id: number;
    type: 'like' | 'comment' | 'follow' | 'mention' | 'system' | 'marketplace_purchase' | 'achievement_unlocked';
    actor: User;
    post?: { id: number; content?: string };
    content: string | null;
    created_at: string;
    is_read: boolean;
    entity_id?: number;
}

// FIX: Add types for socket.io events to fix type errors throughout the app.
export interface ServerToClientEvents {
  connect: () => void;
  newNotification: (notification: Notification) => void;
  'video-offer': (data: { offer: any; senderId: number }) => void;
  userOnline: (userId: number) => void;
  userOffline: (userId: number) => void;
  typing: () => void;
  stopTyping: () => void;
  newMessage: (message: Message) => void;
  'video-answer': (data: { answer: any }) => void;
  'ice-candidate': (data: { candidate: any }) => void;
  'call-ended': () => void;
  'post:likeUpdate': (data: { postId: number; likes_count: number; }) => void;
  'post:newComment': (data: { postId: number; comment: Comment; comments_count: number; }) => void;
}

export interface ClientToServerEvents {
  register: (userId: number) => void;
  getOnlineUsers: (callback: (users: number[]) => void) => void;
  joinRoom: (roomName: string) => void;
  'video-offer': (data: { recipientId: number; senderId: number; offer: any }) => void;
  'video-answer': (data: { recipientId: number; answer: any }) => void;
  'ice-candidate': (data: { recipientId: number; candidate: any }) => void;
  'end-call': (data: { recipientId: number }) => void;
  typing: (data: { room: string }) => void;
  stopTyping: (data: { room: string }) => void;
}