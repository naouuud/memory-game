/* eslint-disable react/prop-types */
import { useEffect } from "react";
export default function LoadingScreen({
  level,
  setLevel,
  setScore,
  setLoading,
  highScore,
  tryAgain,
  setTryAgain,
  rumbleOn,
  setRumbleOn,
  setShowBack,
}) {
  function resetGame() {
    setLevel(1);
    setScore(0);
    setLoading(false);
  }

  // function playAgain() {
  //   setTryAgain(false);
  //   setLoading(false);
  // }

  function startGame() {
    setLevel(level + 1);
    setLoading(false);
    setShowBack(false);
  }

  useEffect(() => {
    tryAgain &&
      setTimeout(() => {
        setTryAgain(false);
        setLoading(false);
      }, 1800);
  });

  useEffect(() => {
    rumbleOn &&
      setTimeout(() => {
        setRumbleOn(false);
        setLevel(level + 1);
        setLoading(false);
        setShowBack(false);
      }, 2000);
  });

  if (!tryAgain && level == 3)
    return (
      <div className="victory">
        <h2>Congratulations, you won!</h2>
        <h2>Your highest score is {highScore.current}.</h2>
        <button onClick={resetGame}>Play again!</button>
      </div>
    );
  else
    return (
      <>
        {level == 0 && (
          <div className="welcome">
            <h1>Welcome to Space Memory!</h1>
            <h2>
              In this game you must try to click all the different cards without
              clicking the same card twice! If you succeed, you will progress to
              a more challenging level. If you double-click a card, a new set of
              images will load for you to try again. Good luck!
            </h2>
            <button onClick={startGame}>Let&apos;s go!</button>
          </div>
        )}
        {tryAgain && (
          <div className="try-again">
            <h2>Whoops, you have double-clicked a card! Try again!</h2>
            {/* <button onClick={playAgain}>Let&apos;s go!</button> */}
          </div>
        )}
        {!tryAgain && level > 0 && (
          <div className="rumble-on">
            <h2>
              Congratulations, you have completed level {level}! Get ready!
            </h2>
            {/* <button onClick={nextLevel}>Let&apos;s go!</button> */}
          </div>
        )}
      </>
    );
}
