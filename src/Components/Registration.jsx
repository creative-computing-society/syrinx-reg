
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import GamingButton from './GamingButton';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import './reg.css';

function hexToString(data) {
  return data.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function stringToHex(str) {
  const bytes = new Array(str.length / 2);
  for (let i = 0; i < str.length; i += 2) {
    bytes[i / 2] = parseInt(str.slice(i, i + 2), 16);
  }
  return bytes;
}




function Registration() {
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);
  const formRef = useRef(null);
  const [TeamID, setTeamID] = useState('');
  const teamIDRef = useRef(null);
  const navigate = useNavigate();
  const copyTeamIDToClipboard = () => {
    const teamID = teamIDRef.current?.textContent;
    if (teamID) {
      navigator.clipboard.writeText(teamID)
        .then(() => toast.success('Copied to Clipboard!',{
          position: "top-right",
          autoClose: 4999,
          theme: "dark",
        }))
        .catch(err => console.error(toast.error('Failed to Copy.',{
          position: "top-right",
          autoClose: 4999,
          theme: "dark",
        }), err));
    }
  };

  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Password: '',
    DiscordID: '',
    TeamID: '',
    TeamName: '',
  });


  const [formErrors, setFormErrors] = useState({});
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [firstErrorMessage, setFirstErrorMessage] = useState('');
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'bounce.out' }
    );
  }, [showCreateTeam, showJoinTeam]);



    useEffect(() => {
      const teamID = Cookies.get('TeamID');
      if (teamID) {
        setTeamID(teamID);
      }
    }, []);


  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'cPassword') {
      setConfirmedPassword(value);
    }
    else {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }


  function validateFormData(formData, showJoinTeam) {
    const errors = {};
  
    if (!formData.Username.trim()) {
      errors.Username = 'Username is required';
    } else if (formData.Username.length < 3) {
      errors.Username = 'Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.Username)) {
      errors.Username = 'Username can only contain alphanumeric characters, underscores, and hyphens';
    }
  
    if (!formData.Email.trim()) {
      errors.Email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      errors.Email = 'Email is invalid';
    }
  
    if (!formData.Password) {
      errors.Password = 'Password is required';
    } else if (formData.Password.length < 8) {
      errors.Password = 'Password must be at least 8 characters long';
    } else if( formData.Password !== confirmedPassword){
      errors.Password = 'Passwords do not match';
    }
  
    if (!formData.DiscordID.trim()) {
      errors.DiscordID = 'Discord ID is required';
    }

    if (showCreateTeam && (!formData.TeamName.trim())) {
      errors.TeamName = 'Team Name is required';
    }
  
    if (showJoinTeam && (!formData.TeamID || formData.TeamID.length !== 6)) {
      errors.TeamID = 'Team Code must be exactly 6 characters long';
    }
    return errors;
  }

  async function sendData(data) {
    let tosend = undefined;
    const tid = data.TeamID;
    if (tid) {
      const hexed = stringToHex(tid)
      data.TeamID = hexed;
      tosend = JSON.stringify(data);
    } else {
      data.TeamID = undefined;
      tosend = JSON.stringify(data);
    }
    data.TeamID = tid;

    // let url = 'api.syrinx.ccstiet.com';
    const response = await fetch('https://api-syrinx.ccstiet.com/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: tosend,
    });

    const json = await response.json();
    if (!json) {
      throw new Error(`An error occurred while parsing the server's response`);
    }

    if (!response.ok) {
      throw new Error(`${json.error}`);
    }
    const { TeamID, SessionID } = json;
    if (!TeamID || !SessionID) {
      throw new Error(`The server's response did not include valid fields`);
    }
    return [hexToString(TeamID), SessionID];
  }
  async function handleSubmit(event) {
    event.preventDefault();


    const errors = validateFormData(formData, showJoinTeam);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const error = getFirstErrorMessage(errors);

      setFirstErrorMessage(error);

      return;
    }


    try {
      const [TeamID, SessionID] = await sendData(formData);
      // console.log(TeamID, SessionID);
      setTeamID(TeamID);
      Cookies.set('SessionID', SessionID, { expires: 1, secure: true });
      // localStorage.setItem('TeamID', TeamID);
      Cookies.set('TeamID', TeamID, { expires: 10, secure: true }); 
      if(TeamID){
        if(setShowCreateTeam || setShowJoinTeam){
          setShowCreateTeam(false);
        setShowJoinTeam(false);
        }}
      toast.success('User Registered Successfully!',{
        position: "top-right",
        autoClose: 4999,
        theme: "dark",
      });
    } catch (e) {
      toast.error('Failed to register!\n' + e.message, {
        position: "top-right",
        autoClose: 4999,
        theme: "dark",
      });
    }
  }

  function getFirstErrorMessage(formErrors) {
    for (const key in formErrors) {
      if (formErrors[key]) return formErrors[key];
    }
    return ''; // Return null if no error messages are found
  }

  return (
    <div id="Register" className="register flex flex-col items-center justify-center gap-6">
      <>
      <h1 className='w-full text-center text-2xl md:text-4xl lg:text-7xl content mb-28 leading-10 py-4'>{!TeamID?'Register Here':'Registered Successfully'}</h1>
      {/* <h2 className="text-center text-lg md:text-xl lg:text-2xl text-red-300 bg-red-500/10 border-l-4 border-red-500 px-4 py-3 rounded-md max-w-3xl leading-relaxed">
  Click the “Let’s Play” button only after all your teammates have joined your team. 
  Maximum team size: 4 members.
</h2> */}
<h2 className="text-center text-lg md:text-xl lg:text-2xl text-white/80 bg-red-600/20 border border-red-500/40 px-5 py-3 rounded-xl shadow-md tracking-wide max-w-3xl leading-relaxed">
  Click the “Let’s Play” button only after all team members have joined your team.<br />
  Maximum allowed team size is 4. Minimum is 2.
</h2>


      {!TeamID && !showJoinTeam &&  !showCreateTeam && (
        <>
          {/* <h1 className='w-full text-center text-3xl lg:text-7xl content mb-28'>Register Here</h1> */}
        <div className="flex flex-col gap-10  justify-center items-center" ref={formRef}>
        <div className=" text-2xl lg:text-3xl tracking-wide">Teams can have Upto 4 members</div>
          <div className="flex gap-3 lg:gap-10">
            <GamingButton text="Join Team" onClick={() => setShowJoinTeam(true)} className="gaming-button" />
            <GamingButton text="Create Team" onClick={() => setShowCreateTeam(true)} className="gaming-button" />
          </div>
          {/* <a href="https://demo.syrinx.ccstiet.com" className=' gaming-button flex justify-center items-center py-2' target="_blank">
          Lets play
          </a> */}
          <GamingButton 
  text="Let's play"
  onClick={() => {
    window.location.href = "https://syrinx.ccstiet.com";
  }}
/>

        </div>
        </>
      )}
      </>
      {(TeamID && !showJoinTeam && !showCreateTeam) && (
        <>
          <h1 className="text-2xl lg:text-3xl mb-5">Your Team Code is: <span ref={teamIDRef}>{TeamID}</span></h1>
          <GamingButton text="Copy TeamID" className="mb-10" onClick={copyTeamIDToClipboard}  />
          <GamingButton 
  text="Let's play"
  onClick={() => {
    window.location.href = "https://syrinx.ccstiet.com";
  }}
/>
        </>
      )}

      {(showJoinTeam || showCreateTeam) && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 lg:w-[500px] items-center text-red-400" ref={formRef}>
          <GamingButton
            text="Back"
            onClick={() => { setShowJoinTeam(false); setShowCreateTeam(false); formRef.current.reset(); setFormData({Username: '', Email: '', Password: '', DiscordID: '', TeamID: ''}); setFormErrors({}); setConfirmedPassword('');setFirstErrorMessage('')}}
            className="self-start gaming-button"
          />
          {/* {formErrors.Username && <p className="error-message">{formErrors.Username}</p>} */}
          <input
            type="text"
            name="Username"
            minLength={3}
            value={formData.Username}
            onChange={handleChange}
            className={`input-field ${formErrors.Username ? 'error' : ''}`}
            placeholder="Username"
          />
          {/* {formErrors.Email && <p className="error-message">{formErrors.Email}</p>} */}
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className={`input-field ${formErrors.Email ? 'error' : ''}`}
            placeholder="Email"
          />
          <input
            type="password"
            name="Password"
            minLength={8}
            value={formData.Password}
            onChange={handleChange}
            className={`input-field ${formErrors.Password ? 'error' : ''}`}
            placeholder="Password"
          />

        <input
            type="password"
            name="cPassword"
            minLength={8}
            value={confirmedPassword} // Use confirmedPassword as the value
            onChange={handleChange}
            className={`input-field ${formErrors.Password ? 'error' : ''}`}
            placeholder="Confirm Password"
          />
          {/* {formErrors.Password && <p className="error-message">{formErrors.Password}</p>} */}

          
          {/* {formErrors.DiscordID && <p className="error-message">{formErrors.DiscordID}</p>} */}

          <input
            type="text"
            name="DiscordID"
            value={formData.DiscordID}
            onChange={handleChange}
            className={`input-field ${formErrors.DiscordID ? 'error' : ''}`}
            placeholder="Discord Id"
          />
          {showCreateTeam && (
            <>
              <input
                type="text"
                name="TeamName"
                value={formData.TeamName}
                onChange={handleChange}
                className={`input-field ${formErrors.TeamName ? 'error' : ''}`}
                placeholder="Team Name"
              />
              {/* {formErrors.TeamID && <p className="error-message">{formErrors.TeamID}</p>} */}
            </>
          )}
          {showJoinTeam && (
            <>
              <input
                type="text"
                name="TeamID"
                minLength={6}
                maxLength={6}
                value={formData.TeamID}
                onChange={handleChange}
                className={`input-field ${formErrors.TeamID ? 'error' : ''}`}
                placeholder="Team Code"
              />
              {/* {formErrors.TeamID && <p className="error-message">{formErrors.TeamID}</p>} */}
            </>
          )}
          {firstErrorMessage && <p className="error-message">{firstErrorMessage}</p>}
          <GamingButton text="Submit" type="submit" className="gaming-button" />
        </form>
      )}
    </div>
  );
}

export default Registration;
