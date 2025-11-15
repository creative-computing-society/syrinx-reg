
import Navbar from './Navbar';
import Countdown from './CountDown';

const HeroSection = () => {

  return (

    <div className="relative h-screen">
      <img src="./bg2.jpg" className="w-full h-full object-cover opacity-70 bgimage image1" alt="" />

      {/* inset-0
      relative 
      */}

      <div className="absolute inset-0 ">
        <Navbar className="absolute top-0 left-0"/>
        <div className='h-[70%] flex items-center justify-center text-white text-center flex-col'>
        <img src="ccs.png" className=' w-16 lg:w-20 mb-3' alt="" />
        <h2 className='mb-10 text-xl lg:text-3xl'>presents</h2>
        <h1 className='texting text-[3.35rem] lg:text-[120px] mb-8'>SYRINX</h1>
        <Countdown />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
