import React, { useRef, useState, useEffect } from "react";

function Countdown() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const interval = useRef(null);

    // Start button to start the timer
    const handleStart = () => {
        if (minutes >= 60 || seconds >= 60) {
            alert("Invalid input. Minutes or Seconds cannot be more than 60.");
        } else {
            const totalTime = parseInt(minutes) * 60 + parseInt(seconds);
            setTime(totalTime);
            setIsRunning(true);
        }
    };

    // Reset everything to what it was
    const handleReset = () => {
        clearInterval(interval.current);
        setIsRunning(false);
        setTime(0);
        setMinutes(0);
        setSeconds(0);
    };

    // useEffect is set on isRunning and time
    useEffect(() => {
        if (isRunning && time > 0) {
            interval.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            clearInterval(interval.current);
            setIsRunning(false);
        }
        return () => clearInterval(interval.current);
    }, [isRunning, time]);

    // format the time to 00:00 mins:sec format
    const formatTime = (time) => {
        const getMinutes = Math.floor(time / 60);
        const getSeconds = time % 60;
        return `${getMinutes < 10 ? "0" : ""}${getMinutes}:${
            getSeconds < 10 ? "0" : ""
        }${getSeconds}`;
    };

    return (
        <div>
            <input
                id="minutes"
                className="input__minutes"
                value={minutes}
                type="number"
                onChange={(e) => setMinutes(e.target.value)}
                disabled={isRunning}
            />{" "}
            Minutes{" "}
            <input
                id="seconds"
                className="input__seconds"
                value={seconds}
                type="number"
                onChange={(e) => setSeconds(e.target.value)}
                disabled={isRunning}
            />{" "}
            Seconds
            <br />
            <button className="btn__start" onClick={handleStart}>
                START
            </button>
            {/* Using one button to handle toggle on PAUSE and RESUME */}
            <button
                className="btn__pause_resume"
                onClick={() => setIsRunning(!isRunning)}
            >
                {isRunning ? "PAUSE" : "RESUME"}
            </button>
            <button className="btn__RESET" onClick={handleReset}>
                RESET
            </button>
            <h1 id="timer" className="timer">
                {formatTime(time)}
            </h1>
        </div>
    );
}

export default Countdown;
