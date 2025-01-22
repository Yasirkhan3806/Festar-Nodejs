import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Services from './Components/Services';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Import other components/pages here
import About from './Components/About-page/About';
import Contact from './Components/Contact us page/Contact';
import LoginForm from './Components/LoginForm';
import MainDashboard from './Components/UserDashBoard/MainDashboard';
import MainCalendar from './Components/UserDashBoard/RegisterEvents/MainCalender';
import { UserProvider } from './userContext';// Import UserProvider
import { EventsProvider } from './userContext';
import { UserDataProvider } from './userContext';
import { ParticipantActiveDataProvider } from './userContext';
import {UserMeetingDataProvider } from './userContext';
import { ThemeProvider } from './ThemeContext';
import { ParticipantStateProvider } from './Components/UserDashBoard/Meetings/MeetingRoomComponents/SettingParticipantData';
// import { MeetingProvider } from './userContext';
import Host from './Components/UserDashBoard/Meetings/MeetingRoom';
import CreateMenuOpt from './Components/UserDashBoard/Meetings/CreateMenuOpt';
import BeforeParticipant from './Components/UserDashBoard/Meetings/BeforeParticipant';



function App() {
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <ThemeProvider>
    <ParticipantStateProvider>
    <ParticipantActiveDataProvider>
    <UserMeetingDataProvider>
<UserDataProvider>
    <EventsProvider>
    <UserProvider> {/* Wrap the entire app with UserProvider */}
      <Router>
        <Routes>
          {/* Route for Home page */}
          <Route path="/" element={<Services />} />

          {/* Route for About page */}
          <Route path="/about" element={<About />} />

          {/* Route for Contact page */}
          <Route path="/contact" element={<Contact />} />

          {/* Route for Login page */}
          <Route path="/Log-In" element={<LoginForm />} />

          {/* Route for Main Dashboard */}
          <Route path="/Dashboard" element={<MainDashboard />} />
           {/* Route for MainCalender */}
           <Route path="/Register-event" element={<MainCalendar />} />
           {/* Page before creating meeting by host */}
           <Route path="/Create-menu" element={<CreateMenuOpt />} />
           {/* Route for host meeting room */}
           <Route path="/MeetingRoom" element={<Host />} />
             {/* Page before joining meeting by participant */}
             <Route path="/Join-Menu" element={<BeforeParticipant />} />
        </Routes>
      </Router>
    </UserProvider>
    </EventsProvider>
    </UserDataProvider>
    </UserMeetingDataProvider>
    </ParticipantActiveDataProvider>
    </ParticipantStateProvider>
    </ThemeProvider>
  );
}

export default App;
