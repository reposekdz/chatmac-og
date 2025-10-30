import React, { useState, useEffect } from 'react';
import { TicketIcon, CalendarIcon } from './icons';
import { View } from '../App';

interface Event {
    id: number;
    title: string;
    date: string;
}

interface EventsPreviewProps {
    setView: (view: View) => void;
}

const EventsPreview: React.FC<EventsPreviewProps> = ({ setView }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events');
                if (!res.ok) throw new Error('Failed to fetch events');
                const data = await res.json();
                setEvents(data.slice(0, 2)); // Take only the first two events
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 card">
            <div className="flex items-center space-x-2 mb-3">
                <TicketIcon className="w-6 h-6 text-indigo-500" />
                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">Upcoming Events</h3>
            </div>
            <div className="space-y-3">
                {loading && <p className="text-sm text-gray-500">Loading events...</p>}
                {events.map(event => (
                    <div key={event.id}>
                        <p className="font-bold truncate">{event.title}</p>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                           <CalendarIcon className="w-3 h-3" />
                           <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
                {!loading && events.length === 0 && <p className="text-sm text-gray-500">No upcoming events.</p>}
            </div>
            <button onClick={() => setView('events')} className="mt-4 text-sm font-bold text-orange-500 w-full text-center hover:underline">
                View All Events
            </button>
        </div>
    );
};

export default EventsPreview;
