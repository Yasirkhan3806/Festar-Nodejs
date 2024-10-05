import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Services from './Components/Services';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import other components/pages here
import About from './Components/About-page/About';
import Contact from './Components/Contact us page/Contact';
import LoginForm from './Components/LoginForm';
import MainDashboard from './Components/UserDashBoard/MainDashboard';
import MainCalendar from './Components/UserDashBoard/MainCalender';
import { UserProvider } from './userContext';// Import UserProvider

function App() {
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
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
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
