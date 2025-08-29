import React, { useRef, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const [inhale, setInhale] = useState(4);
    const [hold, setHold] = useState(4);
    const [exhale, setExhale] = useState(4);
    const [duration, setDuration] = useState(60);

    const navigate = useNavigate();

    const startBreath = ()=>{
        navigate("/breathing", {
            state: {inhale, hold, exhale, duration},
        });
    };

  return (
    <>
            <div className="nav">
                <div className="logo">Air<span>Ease</span></div>
            </div>

            <div className="timings-container">
                <h4>Enter Timings(in Seconds)</h4>
                <div className="timings">
                    <div className="inhale">
                        <p>INHALE</p>
                        <input type="text" value={inhale} onChange={(e) => setInhale(+e.target.value)} id="inhale" />
                    </div>
                    <div className="hold">
                        <p>HOLD</p>
                        <input type="text" value={hold} onChange={(e) => setHold(+e.target.value)} id="hold" />
                    </div>
                    <div className="exhale">
                        <p>EXHALE</p>
                        <input type="text" value={exhale} onChange={(e) => setExhale(+e.target.value)} id="exhale" />
                    </div>

                </div>

                <div className="duration-container">
                    <h4>Enter Duration(in Minutes)</h4>
                    <input type="text" value={duration/60} onChange={(e) => setDuration(+e.target.value * 60)} id="duration" />
                </div>
            </div>

            <button className="start" onClick={startBreath}>
                START
            </button>
        </>
  )
}

export default Home
