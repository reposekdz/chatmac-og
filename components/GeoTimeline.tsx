import React, { useState, useEffect } from 'react';
import { MapIcon, XIcon } from './icons';
import { Post } from '../types';

interface Pin extends Post {
    top: string;
    left: string;
}

// Helper to convert lat/lng to pixel coordinates for a flat map
const geoToPixel = (lat: number, lng: number) => {
    const mapWidth = 500; // a base width for calculation
    const mapHeight = 250; // a base height
    const x = (lng + 180) * (mapWidth / 360);
    const latRad = lat * Math.PI / 180;
    const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
    const y = (mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI));
    return {
        left: `${(x / mapWidth) * 100}%`,
        top: `${(y / mapHeight) * 100}%`,
    };
};


const GeoTimeline: React.FC = () => {
  const [activePin, setActivePin] = useState<Pin | null>(null);
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    const fetchGeotaggedPosts = async () => {
        try {
            const res = await fetch('/api/posts/geotagged');
            const data: Post[] = await res.json();
            const mappedPins = data.map(post => ({
                ...post,
                ...geoToPixel(post.latitude, post.longitude),
            }));
            setPins(mappedPins);
        } catch (error) {
            console.error("Failed to fetch geotagged posts", error);
        }
    };
    fetchGeotaggedPosts();
  }, []);

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
                title={pin.content}
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
                    <img src={activePin.user.avatar} className="w-10 h-10 rounded-full" alt="avatar"/>
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