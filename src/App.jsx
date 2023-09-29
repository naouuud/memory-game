/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import fetchImages from "./fetch";

export default function App() {
  const [score, setScore] = useState(0);
  const highScore = useRef(0);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState(0);
  const [resetDeck, setResetDeck] = useState(0);
  const [tryAgain, setTryAgain] = useState(false);

  return (
    <>
      <Score score={score} highScore={highScore} />
      {level > 0 && <Level level={level} />}
      {loading ? (
        <LoadingScreen
          level={level}
          setLevel={setLevel}
          setLoading={setLoading}
          highScore={highScore}
          tryAgain={tryAgain}
          setTryAgain={setTryAgain}
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
        />
      )}
    </>
  );
}

function Score({ score, highScore }) {
  highScore.current = score > highScore.current ? score : highScore.current;
  return (
    <div className="score">
      <h3>Score: {score}</h3>
      <h3>High Score: {highScore.current}</h3>
    </div>
  );
}

function Level({ level }) {
  return <h3>Level: {level}</h3>;
}

function LoadingScreen({
  level,
  setLevel,
  setLoading,
  highScore,
  tryAgain,
  setTryAgain,
}) {
  function resetGame() {
    setLevel(1);
    setLoading(false);
  }

  function playAgain() {
    setLoading(false);
    setTryAgain(false);
  }

  function nextLevel() {
    setLevel(level + 1);
    setLoading(false);
  }

  if (!tryAgain && level == 4)
    return (
      <>
        <h2>Congratulations, you won!</h2>
        <h2>Your highest score is {highScore.current}.</h2>
        <button onClick={resetGame}>Play again!</button>
      </>
    );
  else
    return (
      <>
        {level == 0 && (
          <>
            <h1>Welcome to Space Memory!</h1>
            <h2>
              In this game you must try to click all the different cards without
              clicking the same card twice! If you succeed, you will progress to
              a more challenging level. If you double-click a card, a new set of
              images will load for you to try again. Good luck!
            </h2>
            <button onClick={nextLevel}>Let&apos;s go!</button>
          </>
        )}
        {tryAgain && (
          <>
            <h2>Whoops, you have double-clicked a card! Try again?</h2>
            <button onClick={playAgain}>Let&apos;s go!</button>
          </>
        )}
        {!tryAgain && level > 0 && (
          <>
            <h2>
              Congratulations, you have completed level {level}! Rumble on?
            </h2>
            <button onClick={nextLevel}>Let&apos;s go!</button>
          </>
        )}
      </>
    );
}

function Deck({
  level,
  score,
  setScore,
  resetDeck,
  setResetDeck,
  setTryAgain,
  setLoading,
}) {
  const [images, setImages] = useState([]);
  const [clicked, setClicked] = useState(new Set());

  let count;
  switch (level) {
    case 1:
      count = 4;
      break;
    case 2:
      count = 8;
      break;
    case 3:
      count = 12;
      break;
    case 4:
      count = 16;
      break;
    default:
      count = 0;
  }

  let randomOrder = new Set();
  while (randomOrder.size < count) {
    let random = Math.floor(Math.random() * count);
    if (!randomOrder.has(random)) randomOrder.add(random);
  }
  let orderList = [...randomOrder];

  useEffect(() => {
    if (clicked.size == count) {
      setClicked(new Set());
      setLoading(true);
    }
  }, [clicked.size, count, setLoading]);

  useEffect(() => {
    async function startFetch() {
      const images = await fetchImages(count);
      setImages(images);
    }
    startFetch();

    return () => {
      setImages([]);
    };
  }, [count, resetDeck]);

  function clickHandler(position) {
    if (!clicked.has(position)) {
      const nextSet = new Set([...clicked, position]);
      setClicked(nextSet);
      setScore(score + 1);
    } else {
      setClicked(new Set());
      setScore(0);
      setResetDeck(resetDeck + 1);
      setLoading(true);
      setTryAgain(true);
    }
  }

  if (images.length === count) {
    return (
      <div className={`deck level-${level}`}>
        {orderList.map((position, index) => (
          <div key={index} onClick={() => clickHandler(position)}>
            <Card image={images[position]} />
          </div>
        ))}
      </div>
    );
  } else return <div>Loading images...</div>;
}

function Card({ image }) {
  const [hidden, setHidden] = useState(true);
  return (
    <div
      className="card"
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <img className="image" src={image["url"]} alt={image["title"]} />
      <div className={hidden ? "caption hidden" : "caption"}>
        {image["title"]}
      </div>
    </div>
  );
}
