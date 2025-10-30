import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { XIcon, SparklesIcon } from './icons';

interface AIAssistModalProps {
    onClose: () => void;
    onTextGenerated: (text: string) => void;
}

const AIAssistModal: React.FC<AIAssistModalProps> = ({ onClose, onTextGenerated }) => {
    const [prompt, setPrompt] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setError('');
        setGeneratedText('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: [{
                parts: [{ text: `Based on the following prompt, write a short social media post (max 280 characters). Be creative and engaging.\n\nPROMPT: "${prompt}"` }]
              }],
            });

            const text = response.text;
            if (text) {
                setGeneratedText(text.trim());
            } else {
                setError('The AI could not generate a response. Please try a different prompt.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while communicating with the AI. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleUseText = () => {
        if (generatedText) {
            onTextGenerated(generatedText);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-[110] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg m-4 animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <SparklesIcon className="w-6 h-6 text-purple-500" />
                        <h2 className="text-xl font-bold">AI Post Assistant</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label htmlFor="ai-prompt" className="font-semibold mb-2 block">What should the post be about?</label>
                        <textarea
                            id="ai-prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., a funny tweet about coding bugs"
                            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-3 resize-none"
                            rows={3}
                        />
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !prompt.trim()}
                        className="w-full flex justify-center items-center space-x-2 bg-purple-500 text-white font-bold py-3 rounded-lg hover:bg-purple-600 disabled:bg-purple-300"
                    >
                        {isLoading ? 'Generating...' : 'Generate Text'}
                    </button>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    {generatedText && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <p className="font-semibold mb-2">Generated Text:</p>
                            <p className="italic">"{generatedText}"</p>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                    <button
                        onClick={handleUseText}
                        disabled={!generatedText}
                        className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full disabled:bg-orange-300"
                    >
                        Use This Text
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIAssistModal;