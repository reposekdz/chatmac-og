import React, { useState } from 'react';
import { TicketIcon, QrCodeIcon, XIcon, CalendarIcon, MapIcon } from './icons';

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    imageUrl: string;
}

const eventData: Event[] = [
    { id: 1, title: 'Community Music Festival', date: 'Sat, Aug 24 @ 2:00 PM', location: 'Central Park', imageUrl: 'https://picsum.photos/id/145/400/200' },
    { id: 2, title: 'Tech Innovators Summit', date: 'Thu, Sep 5 @ 9:00 AM', location: 'Convention Center', imageUrl: 'https://picsum.photos/id/2/400/200' },
    { id: 3, title: 'Local Art Exhibition', date: 'Sun, Sep 15 @ 12:00 PM', location: 'City Gallery', imageUrl: 'https://picsum.photos/id/1011/400/200' },
];

const TicketModal: React.FC<{ event: Event; onClose: () => void }> = ({ event, onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center animate-modal-fade-in" onClick={onClose}>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm m-4 animate-modal-content-in" onClick={e => e.stopPropagation()}>
             <div className="p-6 text-center">
                 <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                 <TicketIcon className="w-16 h-16 text-orange-500 mx-auto" />
                 <h2 className="text-2xl font-bold mt-2">{event.title}</h2>
                 <p className="text-gray-500 dark:text-gray-400">{event.date}</p>
                 <div className="my-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <QrCodeIcon className="w-40 h-40 mx-auto text-gray-800 dark:text-gray-200" />
                 </div>
                 <p className="text-sm font-semibold">Your Digital Pass</p>
                 <p className="text-xs text-gray-500">Present this QR code at the event entrance.</p>
             </div>
        </div>
    </div>
);


const Events: React.FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    return (
        <>
        {selectedEvent && <TicketModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 card space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Events</h1>
                <p className="text-gray-600 dark:text-gray-400">Discover and join events happening in the community.</p>
            </div>
            
            <div className="space-y-4">
                {eventData.map(event => (
                    <div key={event.id} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden md:flex">
                        <img src={event.imageUrl} alt={event.title} className="w-full md:w-48 h-32 md:h-full object-cover"/>
                        <div className="p-4 flex flex-col justify-between">
                            <div>
                                <h2 className="font-bold text-lg">{event.title}</h2>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    <div className="flex items-center space-x-1"><CalendarIcon className="w-4 h-4"/><span>{event.date}</span></div>
                                    <div className="flex items-center space-x-1"><MapIcon className="w-4 h-4"/><span>{event.location}</span></div>
                                </div>
                            </div>
                            <button onClick={() => setSelectedEvent(event)} className="mt-4 bg-orange-500 text-white font-bold py-2 px-4 rounded-full text-sm self-start">
                                Get Tickets
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Events;
