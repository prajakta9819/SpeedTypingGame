import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

function App() {
  const STARTING_TIME = 5;

  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const textBoxRef = useRef(null);

  function startGame() {
    setIsTimeRunning(true);
    setTimeRemaining(5);
    setText("");
    //when timer starts,
    //automatically shift focus to textbox and start typing
    textBoxRef.current.disabled = false;
    textBoxRef.current.focus();
  }

  function endGame() {
    //stop timer at 0
    setIsTimeRunning(false);
    // count words after timer bcomes 0
    setWordCount(calculateWordCount(text));
  }

  function handleChange(event) {
    const { value } = event.target;
    setText(value);
  }

  function calculateWordCount(text) {
    const wordsArr = text.trim().split(" ");
    return wordsArr.filter((word) => word !== "").length;
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning}
        ref={textBoxRef}
      />
      <h4>Time remaining: {timeRemaining}</h4>
      <button onClick={startGame} disabled={isTimeRunning}>
        Start
      </button>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
