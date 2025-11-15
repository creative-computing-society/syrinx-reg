import  { useState, useEffect } from 'react';
import './crt.css';
import TypewriterText from '../Components/TypewriterText';

import { useNavigate,  } from 'react-router-dom';

import './mid.css'
const Game = () => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isTypingComplete2, setIsTypingComplete2] = useState(false);
  const [isTypingComplete3, setIsTypingComplete3] = useState(false);
  const [isTypingComplete4, setIsTypingComplete4] = useState(false);

const navigate = useNavigate(); 



useEffect(() => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = 'https://demo.syrinx.ccstiet.com';
  document.head.appendChild(link);
}, []);

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-3xl crt-content gap-8 p-4">

      <div className="flex flex-col items-center justify-start gap-4">
        <div className="flex items-center gap-4 w-full max-w-[800px]">
          <img src="./buttons.png" alt="Arrow Keys" className="w-20" />
          <TypewriterText speed={20} text="Use Arrow Keys to move around" ticking={false} onComplete={() => setIsTypingComplete(true)} />
        </div>
        {isTypingComplete && (
          <div className="flex items-center gap-4 w-full max-w-[800px] mt-4">
            <img src="./enter.png" alt="Enter Key" className={`w-20 ${isTypingComplete ? 'slide-in' : ''}`} />
            <TypewriterText speed={20} text="Use Enter to interact with characters" ticking={false} onComplete={() => setIsTypingComplete2(true)} />
          </div>
        )}
        {isTypingComplete2 && (
          <div className="flex items-center gap-4 w-full max-w-[800px] mt-4 mb-10">
            <img src="./shift.png" alt="Shift Key" className={`w-20 ${isTypingComplete2 ? 'slide-in' : ''}`} />
            <TypewriterText speed={20} text="Use shift to sprint" ticking={false} onComplete={() => setTimeout(()=>setIsTypingComplete3(true),1000)}/>
          </div>
        )}
        {isTypingComplete3 && (
          <div> <TypewriterText speed={25} text="Are You Ready???" ticking={true} onComplete={() => setTimeout(()=>setIsTypingComplete4(true),1000)}/></div>
          )}
          {isTypingComplete4 && (
            <div className="flex gap-6"> 
            <a href="https://demo.syrinx.ccstiet.com" target="_blank" className="btn m-4">{`Let's`} Go</a>
            <p className="m-4 btn hover:cursor-pointer" onClick={()=>navigate('/')}>No....</p>
            </div>
          )}

          
      </div>
    </div>
  );
};

export default Game;



