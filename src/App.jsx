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
import Host from './Components/UserDashBoard/Meetings/MeetingRoom';

function App() {
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
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
           {/* Route for host meeting room */}
           <Route path="/MeetingRoom" element={<Host />} />
        </Routes>
      </Router>
    </UserProvider>
    </EventsProvider>
  );
}

export default App;
