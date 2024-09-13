import './App.css'
import Navbar from './Components/Navbar';
import IntroSection from './Components/IntroSection';
import MissionVisionSec from './Components/MissionVisionSec';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  AOS.init({
    duration : 2000,
  }
  );
  return (
    <>
 <Navbar/>
 <IntroSection/>
 <MissionVisionSec/>
    </>
  )
}

export default App
