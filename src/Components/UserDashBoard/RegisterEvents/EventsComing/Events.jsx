import React from 'react';
import AnalyticsChart from './AnalyticsChart';
import EventsDataColl from './EventsDataColl';


export default function Events() {
  return (
    <>
    <div className='flex flex-col items-center gap-8 '>
    <EventsDataColl/>
   <h2 className="text-center font-semibold text-3xl mt-8 ">Weekly Activity: <span className='text-blue-500'>Calls</span> &  <span className='text-blue-500'>Meetings</span></h2>
    <div className='w-full'>

    <AnalyticsChart/>
    </div>
    </div>
    </>
  );
}
