import React from 'react';
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

function App() {
  // Initialize AOS animations
  AOS.init({
    duration: 1500,
  });

  return (
    <Router>
      <>
        {/* Define your routes inside <Routes> */}
        <Routes>
          {/* Route for Home page */}
          <Route path="/" element={<Services />} />

          {/* Route for About page */}
          <Route path="/about" element={<About />} />

          {/* Route for Contact page */}
          <Route path="/contact" element={<Contact />} />
          {/* Route for Login page */}
          <Route path="/Log-In" element={<LoginForm />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
