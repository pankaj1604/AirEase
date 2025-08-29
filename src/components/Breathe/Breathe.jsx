import React, { useState, useEffect, useRef } from 'react'
import './Breathe.css'
import back_icon from '../../images/back-icon.png'
import play_icon from '../../images/play-icon.png'
import pause_icon from '../../images/pause-icon.png'
import { useLocation, useNavigate } from 'react-router-dom'

const Breathe = () => {

    const {state} = useLocation();
    const navigate = useNavigate();

    const goToHome = ()=>{
        navigate('/');
    }

    if (!state) {
        navigate("/");
        return null;
    }

    const { inhale, hold, exhale, duration } = state;

    const [timeLeft, setTimeLeft] = useState(duration);
    const [phase, setPhase] = useState("Inhale");
    const [phaseTime, setPhaseTime] = useState(inhale);
    const [isRunning, setIsRunning] = useState(true);

    const intervalRef = useRef(null);

    const [prevPhase, setPrevPhase] = useState("Inhale");

    const getNextPhase = (phase) => {
        if (phase === "Inhale"){
            setPrevPhase("Inhale");
            return { name: "Hold", time: hold };   
        }
        if (phase === "Hold"){
            if(prevPhase === "Inhale"){
                return { name: "Exhale", time: exhale };
            } else if(prevPhase === "Exhale"){
                return { name: "Inhale", time: inhale };
            }
        }
        if (phase === "Exhale"){
            setPrevPhase("Exhale");
            return { name: "Hold", time: hold };   
        }
    };

    useEffect(()=>{

        if(timeLeft <=0){
            resetCircle();
            return
        }

        if(!isRunning){
            return
        };

        intervalRef.current = setInterval(() => {
            setPhaseTime((prev) =>{
                if(prev>1) return prev-1;

                const next = getNextPhase(phase);
                setPhase(next.name);
                return next.time;

            })

            setTimeLeft((prev) => prev - 1);
        }, 1000);

        circleTransition(phase);

        return () => clearInterval(intervalRef.current);


    }, [isRunning, phase, inhale, hold, exhale, timeLeft]);

    const formatTimeLeft = (seconds)=>{
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    const circle = useRef();

    const circleTransition = (changeCircle)=>{

        if(changeCircle === "Inhale" && timeLeft>0){
            circle.current.style.animation = `scaleUp ${inhale}s ease-in-out forwards`;
        } else if(changeCircle === "Exhale" && timeLeft>0){
            circle.current.style.animation = `scaleDown ${exhale}s ease-in-out forwards`;
        }
    }

    const resetCircle = ()=>{
        circle.current.style.transition = `4s ease-in-out`; 
        circle.current.style.transform = "scale(1)"; 
    }

    const toggleTimer = () => {
        setIsRunning((prev) => {
        const newState = !prev;

        if (circle.current) {
            circle.current.style.animationPlayState = newState ? "running" : "paused";
        }

        return newState;
    });
    };

  return (
    <>
        <div className="nav">
                <div className="logo">Air<span>Ease</span></div>
                <img src={back_icon} alt="" onClick={goToHome}/>
        </div>

        <div className="breathe-circle" ref={circle}>
            <h2 className={timeLeft!==0?'':'hide'}>{phaseTime}s</h2>
            <h5 className={timeLeft!==0?'':'hide'}>{phase}</h5>
            <h5 className={timeLeft!==0?'hide':''}>Completed!</h5>
        </div>

        <div className="time-duration">
            <h3>{formatTimeLeft(timeLeft)}</h3>

            <div className="control-btn" onClick={toggleTimer}>
                {isRunning? <img src={pause_icon} alt=""/>: <img src={play_icon} alt="" id='playIcon'/>}  
            </div>
        </div>

        


    </>
  )
}

export default Breathe
