import './App.css'
import Navbar from './Components/Navbar';
import IntroSection from './Components/IntroSection';
import MissionVisionSec from './Components/MissionVisionSec';
import GettingStarted from './Components/gettingStarted';
import KeyFeatures from './Components/KeyFeatures';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  AOS.init({
    duration : 1500,
  }
  );
  return (
    <>
 <Navbar/>
 <IntroSection/>
 <MissionVisionSec/>
 <GettingStarted/>
 <KeyFeatures/>
    </>
  )
}

export default App
