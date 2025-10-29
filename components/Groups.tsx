import React, { useState } from 'react';
import { CollectionIcon, SpeakerWaveIcon, MegaphoneIcon, ChatBubbleIcon, MarketplaceIcon } from './icons';

type GroupLayer = 'general' | 'announcements' | 'chat' | 'voice' | 'market';

const Groups: React.FC = () => {
    const [activeLayer, setActiveLayer] = useState<GroupLayer>('general');

    const layers: { id: GroupLayer, label: string, icon: React.ElementType }[] = [
        { id: 'general', label: 'General', icon: CollectionIcon },
        { id: 'announcements', label: 'Announcements', icon: MegaphoneIcon },
        { id: 'chat', label: 'Chat', icon: ChatBubbleIcon },
        { id: 'voice', label: 'Voice Room', icon: SpeakerWaveIcon },
        { id: 'market', label: 'Marketplace', icon: MarketplaceIcon },
    ];

    const renderContent = () => {
        switch(activeLayer) {
            case 'general':
                return <p>Welcome to the #DowntownFoodies group! This is the general discussion area.</p>;
            case 'announcements':
                return <p>Important updates and announcements will be posted here by the admins.</p>;
            case 'chat':
                return <p>A real-time chat room for all members. (Feature coming soon!)</p>;
            case 'voice':
                return <p>Join the live voice conversation with other foodies. (Feature coming soon!)</p>;
            case 'market':
                return <p>A dedicated marketplace for group members to trade goods or services.</p>;
        }
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
            <div className="flex items-center space-x-3 mb-6">
               <CollectionIcon className="w-8 h-8 text-blue-500" />
               <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">#DowntownFoodies Group</h1>
            </div>

            {/* Group Layers Tabs */}
            <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-800 mb-6">
                {layers.map(layer => (
                    <button 
                        key={layer.id}
                        onClick={() => setActiveLayer(layer.id)}
                        className={`px-4 py-2 text-sm font-semibold flex items-center space-x-2 transition-colors ${activeLayer === layer.id ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    >
                        <layer.icon className="w-4 h-4"/>
                        <span>{layer.label}</span>
                    </button>
                ))}
            </div>

            {/* Layer Content */}
            <div className="text-gray-600 dark:text-gray-400">
                {renderContent()}
            </div>
        </div>
    );
};

export default Groups;
