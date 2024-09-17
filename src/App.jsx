import './App.css'
import Navbar from './Components/Navbar';
import IntroSection from './Components/IntroSection';
import MissionVisionSec from './Components/MissionVisionSec';
import GettingStarted from './Components/gettingStarted';
import KeyFeatures from './Components/KeyFeatures';
import ReviewSection from './Components/ReviewSection';
import FAQ from './Components/FAQ';
import Footer from './Components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
 <ReviewSection/>
 <FAQ/>
 <Footer/>
    </>
  )
}

export default App
