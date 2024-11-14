import React from 'react';
import AnalyticsChart from './AnalyticsChart';
import EventsDataColl from './EventsDataColl';


export default function Events() {
  return (
    <>
    <div className='flex flex-col items-center gap-4 '>
    <EventsDataColl/>
    <div className='w-full'>
    <AnalyticsChart/>
    </div>
    </div>
    </>
  );
}
