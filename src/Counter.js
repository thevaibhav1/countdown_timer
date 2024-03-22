import React, { useEffect, useRef, useState } from "react";
import style from "./Counter.module.css";

const Counter = (props) => {
  const { timer, reSet } = props;
  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const [counter, setCounter] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const dayRef = useRef(0);
  useEffect(() => {
    const totalseconds = Math.floor(props.timer / 1000);
    let initialCounter = {
      days: Math.floor(totalseconds / 86400),
      hours: Math.floor(totalseconds / 3600) % 24,
      minutes: Math.floor(totalseconds / 60) % 60,
      seconds: Math.floor(totalseconds) % 60,
    };
    dayRef.current = initialCounter.days;
    if (dayRef.current >= 100) {
      setIsInvalidDate(true);
      setTimeout(() => {
        reSet();
      }, 2000);
      return;
    }
    if (timer <= 0) {
      setCounter({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      setIsInvalidDate(false);
      return;
    }
    const interval = setInterval(() => {
      // if (timer <= 0) {
      //   setCounter({
      //     days: 0,
      //     hours: 0,
      //     minutes: 0,
      //     seconds: 0,
      //   });
      //   // setIsInvalidDate(false);
      //   clearInterval(interval);
      //   return;
      // }
      let newObj = { ...initialCounter };
      newObj.seconds -= 1;
      // Handle negative seconds
      if (newObj.seconds < 0) {
        newObj.minutes -= 1;
        newObj.seconds = 59;
      }

      // Handle minutes reaching 0
      if (newObj.minutes < 0) {
        newObj.hours -= 1;
        newObj.minutes = 59;
      }

      // Handle hours reaching 0
      if (newObj.hours < 0) {
        newObj.hours = 23;
        newObj.days -= 1;
      }

      // Handle countdown reaching 0
      if (
        newObj.days === 0 &&
        newObj.hours === 0 &&
        newObj.minutes === 0 &&
        newObj.seconds === 0
      ) {
        clearInterval(interval);
        setCounter({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }); // Reset counter to initial values
        reSet();
      }
      initialCounter = newObj;
      setCounter({
        days: newObj.days,
        hours: newObj.hours,
        minutes: newObj.minutes,
        seconds: newObj.seconds,
      });
      //for when window is closed and restarted
      // const checkDate = new Date(0); // Initialize with epoch
      // checkDate.setUTCDate(initialCounter.days); // Set the date
      // checkDate.setUTCHours(initialCounter.hours); // Set the hours
      // checkDate.setUTCMinutes(initialCounter.minutes); // Set the minutes
      // checkDate.setUTCSeconds(initialCounter.seconds); // Set the seconds
      // const milliseconds = checkDate.getTime();
      // console.log(milliseconds);
      // localStorage.setItem("timer", milliseconds);
    }, 1000);
    return () => clearInterval(interval); // Cleanup function to clear interval
  }, [timer]);
  return (
    <>
      <div className={style.block}>
        <div className={style.inner_block}>
          <h5>days</h5>
          <span>{counter.days < 10 ? `0${counter.days}` : counter.days}</span>
        </div>
        <div className={style.inner_block}>
          <h5>Hours</h5>
          <span>
            {counter.hours < 10 ? `0${counter.hours}` : counter.hours}
          </span>
        </div>
        <div className={style.inner_block}>
          <h5>Minutes</h5>
          <span>
            {counter.minutes < 10 ? `0${counter.minutes}` : counter.minutes}
          </span>
        </div>
        <div className={style.inner_block}>
          <h5>Second</h5>
          <span>
            {counter.seconds < 10 ? `0${counter.seconds}` : counter.seconds}
          </span>
        </div>
      </div>
      {isInvalidDate && <p>Selcected time is more than 100 days</p>}
    </>
  );
};

export default Counter;
