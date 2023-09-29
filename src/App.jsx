/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import fetchImages from "./fetch";

export default function App() {
  const [score, setScore] = useState(0);
  const [resetDeck, setResetDeck] = useState(0);
  const highScore = useRef(0);
  const [loading, setLoading] = useState(true);

  // console.log("Render App");
  return (
    <>
      <Score score={score} highScore={highScore} />
      {loading ? (
        <Loading setLoading={setLoading} />
      ) : (
        <Deck
          score={score}
          setScore={setScore}
          resetDeck={resetDeck}
          setResetDeck={setResetDeck}
          highScore={highScore}
        />
      )}
    </>
  );
}

function newLevel({ setLoading, level }) {
  function startGame() {
    setLoading(false);
  }
  return (
    <>
      <h2>
        Congratulations, you have finished level {level}! Ready for the next
        challenge?
      </h2>
      <button onClick={startGame}>Let&apos;s go!</button>
    </>
  );
}

function Loading({ setLoading }) {
  function startGame() {
    setLoading(false);
  }

  return (
    <>
      <h1>Welcome to Space Memory!</h1>
      <h2>
        In this game you must try to click all the different cards without
        clicking the same card twice! If you succeed, you will progress to a
        more challenging level. If you double-click a card, a new set of images
        will load for you to try again. Good luck!
      </h2>
      <button onClick={startGame}>Let&apos;s go!</button>
    </>
  );
}

function Deck({ score, setScore, resetDeck, setResetDeck, highScore }) {
  // console.log("Render Deck");
  const [level, setLevel] = useState(1);
  const [images, setImages] = useState([]);
  const [clicked, setClicked] = useState(new Set());

  // console.log(images);
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

  if (clicked.size == count) {
    console.log(`Congratulations, you cleared level ${level}!`);
    setClicked(new Set());
    setLevel(level + 1);
  }

  useEffect(() => {
    // console.log("Fetching Effect");
    async function startFetch() {
      const images = await fetchImages(count);
      setImages(images);
    }
    startFetch();

    return () => {
      // console.log("Resynchronize");
      setImages([]);
    };
  }, [count, resetDeck]);

  function clickHandler(position) {
    if (!clicked.has(position)) {
      // console.log("Clicked++");
      const nextSet = new Set([...clicked, position]);
      setClicked(nextSet);
      setScore(score + 1);
    } else {
      setClicked(new Set());
      setScore(0);
      setResetDeck(resetDeck + 1);
    }
  }

  if (level <= 4) {
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
  } else return <Victory highScore={highScore} />;
}

function Card({ image }) {
  // console.log("Render Card");
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

function Score({ score, highScore }) {
  // console.log("Render Score");
  highScore.current = score > highScore.current ? score : highScore.current;
  return (
    <div className="score">
      <h3>Score: {score}</h3>
      <h3>High Score: {highScore.current}</h3>
    </div>
  );
}

function Victory({ highScore }) {
  return (
    <>
      <h2>Congratulations, you won!</h2>
      <h2>Your highest score is {highScore.current}.</h2>
    </>
  );
}
