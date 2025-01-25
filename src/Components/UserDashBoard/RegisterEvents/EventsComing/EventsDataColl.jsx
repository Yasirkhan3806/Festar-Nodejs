import React, { useEffect, useState } from 'react';
import { useEvents } from '../../../../userContext';
import { useTheme } from '../../../../ThemeContext';

export default function EventsDataColl() {
    const {events} = useEvents();
    const {darkMode} = useTheme();
    console.log(events)

    // Get today's date for comparison
    const today = new Date().setHours(0, 0, 0, 0); // Normalize to midnight to ignore time part

    // Filter only upcoming events
    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.eventDate);
        return eventDate >= today;
    });

    return (
        <>
            <div className={` bg-blue-200 font-monts  p-6 rounded-lg w-[70%] overflow-x-auto overflow-y-auto h-80  border-blue-500 border-2 shadow-xl  ${darkMode?"dark-mode":""}`}>
                <h1 className="text-2xl font-bold  text-center text-white mb-4">Upcoming Events & Meetings</h1>
                <div className="flex flex-col justify-center items-center">
                    {upcomingEvents.map(event => {
                        // Extract only the day of the month
                        const eventDate = new Date(event.eventDate).getDate(); // Get the day number
                        return (
                            <div
                                key={event.id}
                                className={`p-4 rounded-md text-white font-semibold ${
                                    event.isToday ? 'bg-white text-blue-800' : 'bg-blue-500'
                                }`}
                            >
                                <span>{eventDate} {event.eventName}:</span> {event.notes}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
