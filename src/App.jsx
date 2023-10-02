/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import Score from "./Score";
import Level from "./Level";
import LoadingScreen from "./LoadingScreen";
import Deck from "./Deck";

export default function App() {
  const [score, setScore] = useState(0);
  const highScore = useRef(0);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState(0);
  const [resetDeck, setResetDeck] = useState(0);
  const [tryAgain, setTryAgain] = useState(false);
  const [rumbleOn, setRumbleOn] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const backImage = useRef(null);

  useEffect(() => {
    backImage.current = new Image();
    backImage.src = "../src/assets/PIA11796~small.jpg";
  }, []);

  return (
    <>
      <Score score={score} highScore={highScore} />
      {level > 0 && <Level level={level} />}
      {loading ? (
        <LoadingScreen
          level={level}
          setLevel={setLevel}
          setScore={setScore}
          setLoading={setLoading}
          highScore={highScore}
          tryAgain={tryAgain}
          setTryAgain={setTryAgain}
          rumbleOn={rumbleOn}
          setRumbleOn={setRumbleOn}
          setShowBack={setShowBack}
        />
      ) : (
        <Deck
          level={level}
          score={score}
          setScore={setScore}
          resetDeck={resetDeck}
          setResetDeck={setResetDeck}
          setTryAgain={setTryAgain}
          setLoading={setLoading}
          setRumbleOn={setRumbleOn}
          showBack={showBack}
          setShowBack={setShowBack}
        />
      )}
    </>
  );
}
