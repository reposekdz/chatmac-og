import React, { useState } from 'react';
import { MapIcon, XIcon } from './icons';

interface Pin {
    id: number;
    top: string;
    left: string;
    title: string;
    content: string;
    avatar: string;
}

const pins: Pin[] = [
    { id: 1, top: '45%', left: '15%', title: 'Post from North America', content: 'Exploring the Rockies! 🏔️', avatar: 'https://picsum.photos/id/1015/50/50' },
    { id: 2, top: '40%', left: '50%', title: 'Post from Europe', content: 'Paris is always a good idea.', avatar: 'https://picsum.photos/id/1011/50/50' },
    { id: 3, top: '55%', left: '80%', title: 'Post from Australia', content: 'Sydney Opera House vibes.', avatar: 'https://picsum.photos/id/1025/50/50' },
    { id: 4, top: '65%', left: '25%', title: 'Post from South America', content: 'Amazon rainforest adventure!', avatar: 'https://picsum.photos/id/1027/50/50' },
];

const GeoTimeline: React.FC = () => {
  const [activePin, setActivePin] = useState<Pin | null>(null);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card">
      <div className="flex items-center space-x-3 mb-4">
        <MapIcon className="w-8 h-8 text-green-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Geo-Timeline</h1>
          <p className="text-gray-600 dark:text-gray-400">A map of your journey through posts.</p>
        </div>
      </div>
      
      <div className="relative w-full h-96 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
        <img 
          src="https://www.datocms-assets.com/32641/1675269781-world-map-dots.png" 
          alt="World map with post locations" 
          className="w-full h-full object-cover opacity-50"
        />
        
        {/* Pins */}
        {pins.map(pin => (
            <button 
                key={pin.id}
                className="absolute w-5 h-5 bg-orange-500 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-150" 
                style={{ top: pin.top, left: pin.left }} 
                title={pin.title}
                onClick={() => setActivePin(pin)}
            ></button>
        ))}

        {/* Active Pin Popup */}
        {activePin && (
            <div 
              className="absolute bg-white dark:bg-gray-900 rounded-lg shadow-2xl p-3 w-64 border dark:border-gray-700 transform -translate-x-1/2 -translate-y-full -mt-4"
              style={{ top: activePin.top, left: activePin.left }}
            >
                <button onClick={() => setActivePin(null)} className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <XIcon className="w-4 h-4"/>
                </button>
                <div className="flex items-center space-x-3">
                    <img src={activePin.avatar} className="w-10 h-10 rounded-full" alt="avatar"/>
                    <div>
                        <p className="text-sm font-semibold">{activePin.content}</p>
                    </div>
                </div>
                <div className="absolute w-3 h-3 bg-white dark:bg-gray-900 transform rotate-45 -bottom-1.5 left-1/2 -translate-x-1.2"></div>
            </div>
        )}

      </div>
    </div>
  );
};

export default GeoTimeline;