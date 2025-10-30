import React from 'react';
import { AccessibilityIcon } from './icons';

interface AccessibilityHubProps {
    settings: {
        isHighContrast: boolean;
        setHighContrast: (value: boolean) => void;
        fontSize: number;
        setFontSize: (value: number) => void;
    };
}

const AccessibilityHub: React.FC<AccessibilityHubProps> = ({ settings }) => {
    const { isHighContrast, setHighContrast, fontSize, setFontSize } = settings;

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card space-y-8">
            <div className="flex items-center space-x-3">
                <AccessibilityIcon className="w-8 h-8 text-blue-500" />
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Accessibility</h1>
                    <p className="text-gray-600 dark:text-gray-400">Customize the app to your needs.</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* High Contrast Mode */}
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border dark:border-gray-700">
                    <div>
                        <h2 className="font-bold">High Contrast Mode</h2>
                        <p className="text-sm text-gray-500">Increases text and background contrast.</p>
                    </div>
                    <button onClick={() => setHighContrast(!isHighContrast)} className={`w-12 h-7 rounded-full p-1 flex items-center transition-colors ${isHighContrast ? 'bg-orange-500 justify-end' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}>
                        <div className="w-5 h-5 bg-white rounded-full transform transition-transform"></div>
                    </button>
                </div>

                {/* Font Size */}
                 <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border dark:border-gray-700">
                    <h2 className="font-bold">Font Size</h2>
                    <p className="text-sm text-gray-500 mb-4">Adjust the text size for better readability.</p>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm">A</span>
                        <input
                            type="range"
                            min="14"
                            max="20"
                            step="1"
                            value={fontSize}
                            onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <span className="text-xl">A</span>
                    </div>
                    <p className="text-center font-bold mt-2">{fontSize}px</p>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityHub;