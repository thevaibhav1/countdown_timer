import React, { useEffect, useRef, useState } from "react";
import Counter from "./Counter";
import styles from "./Countdown.module.css";
const Countdown = () => {
  const [counter, setCounter] = useState(0);
  const currentDate = new Date().toISOString().slice(0, 16);
  // console.log(month, day);
  const dateRef = useRef("");
  const reSetHandler = () => {
    setCounter(0);
    dateRef.current.value = "";
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (counter !== 0 || dateRef.current.value >= 100) {
      setCounter(0);
      dateRef.current.value = "";
      return;
    }

    const current = new Date();
    const storeddate = dateRef.current.value;
    const date = new Date(storeddate);
    // Calculate difference between target date and current date
    const diff = date.getTime() - current.getTime();
    setCounter(diff);
  };
  // useEffect(() => {
  //   if (localStorage.getItem("timer")) {
  //     const current = new Date();
  //     let storedvalue = localStorage.getItem("timer");
  //     const value = storedvalue;
  //     console.log(value);
  //     setCounter(value);
  //   }
  // }, []);
  return (
    <>
      <form onSubmit={submitHandler} className={styles.timeForm}>
        <div className={styles.formGroup}>
          <label htmlFor="dateTimeInput" className={styles.label}>
            Date
          </label>
          <input
            ref={dateRef}
            type="datetime-local"
            min={currentDate}
            id="dateTimeInput"
            required
            className={styles.input}
          />
        </div>
        <button className={styles.formButton} type="submit">
          {counter === 0 ? "Start Timer" : "Cancel Timer"}
        </button>
      </form>
      <Counter timer={counter} reSet={reSetHandler} />
      {counter < 0 && (
        <p className={styles.errorMessage}>Invalid date and time</p>
      )}
    </>
  );
};
export default Countdown;
