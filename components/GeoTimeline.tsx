import React from 'react';
import { MapIcon } from './icons';

const GeoTimeline: React.FC = () => {
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
        {/* This would be a real map component, but for now it's a static image */}
        <img 
          src="https://www.datocms-assets.com/32641/1675269781-world-map-dots.png" 
          alt="World map with post locations" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-black/80 px-4 py-2 rounded-lg font-semibold">
                Map feature coming soon!
            </p>
        </div>
        
        {/* Example Pins */}
        <div className="absolute w-4 h-4 bg-orange-500 rounded-full border-2 border-white" style={{top: '45%', left: '15%'}} title="Post from North America"></div>
        <div className="absolute w-4 h-4 bg-orange-500 rounded-full border-2 border-white" style={{top: '40%', left: '50%'}} title="Post from Europe"></div>
        <div className="absolute w-4 h-4 bg-orange-500 rounded-full border-2 border-white" style={{top: '55%', left: '80%'}} title="Post from Australia"></div>
         <div className="absolute w-4 h-4 bg-orange-500 rounded-full border-2 border-white" style={{top: '65%', left: '25%'}} title="Post from South America"></div>

      </div>
    </div>
  );
};

export default GeoTimeline;
