import { useEffect, useState } from 'react';

const Countdown = () => {
    const [days, setDays] = useState('00');
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');

    // useEffect(() => {
    //     const countdown = setInterval(() => {

    //         // needs to be fetched from the server
    //         const difference = new Date('2024-07-25T18:00:00') - new Date();


    //         const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
    //         const remainingHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //         const remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    //         const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

    //         setDays(formatTimeUnit(remainingDays));
    //         setHours(formatTimeUnit(remainingHours));
    //         setMinutes(formatTimeUnit(remainingMinutes));
    //         setSeconds(formatTimeUnit(remainingSeconds));
    //     }, 1000);

    //     return () => clearInterval(countdown);
    // }, []);
    useEffect(() => {
      const countdown = setInterval(() => {
          // Target date and time (6 PM on July 25, 2024)
          const targetDate = new Date('2024-07-25T18:00:00');
          const now = new Date();
          const difference = targetDate - now;
  
          // Calculate remaining time units
          const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
          const remainingHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);
  
          // Update state variables
          setDays(formatTimeUnit(remainingDays));
          setHours(formatTimeUnit(remainingHours));
          setMinutes(formatTimeUnit(remainingMinutes));
          setSeconds(formatTimeUnit(remainingSeconds));
      }, 1000);
  
      return () => clearInterval(countdown);
  }, []);

    // Function to format time units to always display two digits
    const formatTimeUnit = (time) => {
        return time < 10 ? `0${time}` : `${time}`;
    };

    return (
        <div className=" flex flex-wrap justify-center items-center gap-4 text-black">
            {/* {renderTimeUnit(days, 'DAYS')} */}
            {renderTimeUnit(hours, 'HOURS')}
            {renderTimeUnit(minutes, 'MINUTES')}
            {renderTimeUnit(seconds, 'SECONDS')}
        </div>
    );

    function renderTimeUnit(time, label) {
        return (

<div className='flex flex-col items-center justify-between lg:p-4 rounded-lg'>
  <div className="flex justify-center items-center gap-1 md:gap-2">
    <div className="flex justify-center text-[1.8rem] md:text-3xl items-center bg-green-100 text-gray-900 rounded-sm h-10 md:h-16 text-center border-4 border-yellow-300 shadow-inner shadow-yellow-500 w-8 md:w-12">
      {time[0]}
    </div>
    <div className="flex justify-center text-[1.8rem] md:text-3xl items-center bg-green-100 text-gray-900 rounded-sm h-10 md:h-16 text-center border-4 border-yellow-300 shadow-inner shadow-yellow-500 w-8 md:w-12">
      {time[1]}
    </div>
  </div>
  <p className='text-white navcontent text-md lg:text-2xl md:text-base' style={{ textShadow: '1px 1px 2px #ffd700' }}>
    {label}
  </p>
</div>






        );
    }
};

export default Countdown;
