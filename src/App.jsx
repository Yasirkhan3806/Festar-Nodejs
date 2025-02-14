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
import { ApiProvider } from './APIContext';
import { SocketProvider } from './WebsocketApi';
import { UserProvider } from './userContext';// Import UserProvider
import { EventsProvider } from './userContext';
import { UserDataProvider } from './userContext';
import { ParticipantActiveDataProvider } from './userContext';
import {UserMeetingDataProvider } from './userContext';
import { ThemeProvider } from './ThemeContext';
import { ParticipantStateProvider } from './Components/UserDashBoard/Meetings/MeetingRoomComponents/SettingParticipantData';
import { ChatProvider } from './Components/UserDashBoard/Chats/ChatsContext';
// import { MeetingProvider } from './userContext';
import Host from './Components/UserDashBoard/Meetings/MeetingRoom';
import CreateMenuOpt from './Components/UserDashBoard/Meetings/CreateMenuOpt';
import BeforeParticipant from './Components/UserDashBoard/Meetings/BeforeParticipant';
import ChatSection from './Components/UserDashBoard/Chats/ChatSection';
import Chats from './Components/UserDashBoard/Chats/Chats';



function App() {
  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
   <SocketProvider>
    <ApiProvider>
    <ChatProvider>
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
               {/* main chat section */}
             <Route path="/Type-chat" element={<ChatSection />} />
               {/* chats */}
               <Route path="/Chats" element={<Chats />} />

        </Routes>
      </Router>
    </UserProvider>
    </EventsProvider>
    </UserDataProvider>
    </UserMeetingDataProvider>
    </ParticipantActiveDataProvider>
    </ParticipantStateProvider>
    </ThemeProvider>
    </ChatProvider>
    </ApiProvider>
    </SocketProvider>
  );
}

export default App;
