

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import HeroSection from '../Components/HeroSection';
import Registration from '../Components/Registration';
import TypewriterText from '../Components/TypewriterText';
import './crt.css';


import 'react-toastify/dist/ReactToastify.css';
// import Navbar from '../Components/Navbar';


export default function Home() {
  const crtScreenRef = useRef(null);
  const contentRef = useRef(null);


  useEffect(() => {
    const crtScreen = crtScreenRef.current;
    const content = contentRef.current;

    gsap.set(content, { opacity: 0 });

    gsap.timeline()
      .to(crtScreen, { duration: 0.1, opacity: 1, ease: 'power2.in' })
      .add(() => {
        crtScreen.classList.add('turn-on');
      })
      .to(content, { duration: 2, opacity: 1, delay: 1, ease: 'power2.inOut' });




    const elements = document.querySelectorAll('.random-flicker');
    elements.forEach(el => {
      el.style.setProperty('--delay', Math.random() * 1);
    });

    

   
  }, []);

  useEffect(() => {
    const handleResize = (() => {
      let lastWidth = window.innerWidth; // Store the initial width
  
      return () => {
        const newWidth = window.innerWidth;
        const thresholds = [1048, 700, 468];
    
        // Check if new width crosses any of the thresholds
        const crossedThreshold = thresholds.some(threshold => 
          (newWidth < threshold && lastWidth >= threshold) || 
          (newWidth >= threshold && lastWidth < threshold)
        );
  
        if (crossedThreshold) {
          clearTimeout(window.resizeTimeout);
          window.resizeTimeout = setTimeout(() => {
            window.location.reload();
          }, 50); // Adjust debounce time as needed
        }
  
        lastWidth = newWidth; // Update the last known width
      };
    })();
  
    window.addEventListener('resize', handleResize);
  
    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this runs once on mount

  //   crtScreenRef   crtScreenRef
  return (
    <div className="crt-screen min-h-screen flex flex-col justify-center items-center" ref={crtScreenRef}>
      
      <div className=" w-full " ref={contentRef}>
        {/* Hero Section */}
        <div className=" w-full h-[70%]">
          <HeroSection  className="hero-section"/>
        </div>
        {/* Main Content */}
        <div className="crt-content">
        <div className="pt-40 mainCont crt-content">
        <div className="bggrad123 z-1  h-[25vh] "></div>
        {/* max-w-screen-xl mx-auto h-[60vh] lg:h-[80vh] */}
        <div  className="flex gap-10 flex-col content w-[90%] lg:w-[70%] px-4 lg:px-8 py-8  max-w-screen-xl mx-auto lg:py-16  random-flicker">
          {/* <div className="glitch" data-text="As a student in Thapar, your mission in Syrinx is to explore the pixelated Tiet campus,
               tackling quests in locations like Nirvana, G-Block, and CSED.
               <br/><br/>
               Team up to solve puzzles and battle strategically, strengthening your team to unlock new
               areas. Complete your tasks, overcome obstacles, and ultimately, leave the campus to save
               your own life..">
             */}


            {/* <TypewriterText 
              speed={20} 
              className="text-center text-sm lg:text-2xl  leading-5 lg:leading-10" 
              text="As a student in Thapar, your mission in Syrinx is to explore the pixelated Tiet campus,
               tackling quests in locations like Nirvana, G-Block, and CSED.
               <br/><br/>
               Team up to solve puzzles and battle strategically, strengthening your team to unlock new
               areas. Complete your tasks, overcome obstacles, and ultimately, leave the campus to save
               your own life...."
            /> */}
            <div style={{ height: '600px', overflowY: 'auto' }}>
  <TypewriterText 
    speed={20} 
    className="text-center text-sm lg:text-2xl leading-5 lg:leading-10" 
    text="As a student in Thapar, your mission in Syrinx is to explore the pixelated Tiet campus,
         tackling quests in locations like Nirvana, G-Block, and CSED.
         <br/><br/>
         Team up to solve puzzles and battle strategically, strengthening your team to unlock new
         areas. Complete your tasks, overcome obstacles, and ultimately, leave the campus to save
         your own life...."
  />
</div>
            {/* <TypewriterText 
              speed={1} 
              className="text-center text-sm lg:text-2xl  leading-5 lg:leading-10" 
              text=".."
            /> */}

          </div>
          {/* <div className="flex flex-col items-center mt-8 lg:mt-12 random-flicker">
            <p className="text-center text-sm lg:text-xl mb-5 mt-10">WANT TO TRY THE GAME?</p>
            <RetroButton text="DEMO" />
          </div> */}
        </div>
        {/* Registration Section */}
        <div className="w-30px random-flicker" id='Register' style={{height:'100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Registration />
        </div>
        </div>
      </div>
    </div>
  );
}