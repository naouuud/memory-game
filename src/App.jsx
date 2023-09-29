/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import fetchImages from "./fetch";

export default function App() {
  // console.log("Rendering App");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <>
      <Score score={score} highScore={highScore} setHighScore={setHighScore} />
      <Game score={score} setScore={setScore} />
    </>
  );
}

function Game({ score, setScore }) {
  // console.log("Rendering Game");
  const [images, setImages] = useState([]);
  const [level, setLevel] = useState(1);
  const [clicked, setClicked] = useState(new Set());
  const [resetLevel, setResetLevel] = useState(0);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function startFetch() {
      // console.log("Fetching Effect");
      const images = await fetchImages(count);
      setImages(images);
    }
    startFetch();

    // return () => {
    //   console.log("Dismount");
    //   setImages([]);
    // };
  }, [count, resetLevel]);

  useEffect(() => {
    if (clicked.size == count) {
      // console.log(`Congratulations, you cleared level ${level}!`);
      setClicked(new Set());
      setLevel(level + 1);
    }
  }, [clicked.size, count, level]);

  if (level <= 4) {
    if (images.length === count) {
      return (
        <Deck
          images={images}
          clicked={clicked}
          setClicked={setClicked}
          resetLevel={resetLevel}
          setResetLevel={setResetLevel}
          count={count}
          level={level}
          score={score}
          setScore={setScore}
        />
      );
    } else return <div>Loading images...</div>;
  } else return <Victory />;
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

function Deck({
  images,
  clicked,
  setClicked,
  resetLevel,
  setResetLevel,
  count,
  level,
  score,
  setScore,
}) {
  // console.log("Rendering Deck");
  let randomOrder = new Set();
  while (randomOrder.size < count) {
    let random = Math.floor(Math.random() * count);
    if (!randomOrder.has(random)) randomOrder.add(random);
  }
  let orderList = [...randomOrder];

  function clickHandler(position) {
    if (!clicked.has(position)) {
      const nextSet = new Set([...clicked, position]);
      // console.log(nextSet);
      setClicked(nextSet);
      setScore(score + 1);
    } else {
      setClicked(new Set());
      setScore(0);
      setResetLevel(resetLevel + 1);
    }
  }

  return (
    <div className={`deck level-${level}`}>
      {orderList.map((position, index) => (
        <div key={index} onClick={() => clickHandler(position)}>
          <Card image={images[position]} />
        </div>
      ))}
    </div>
  );
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

function Score({ score, highScore, setHighScore }) {
  // console.log("Rendering Score");
  useEffect(() => {
    score > highScore && setHighScore(score);
  });

  return (
    <div className="score">
      <h2>Score: {score}</h2>
      <h2>High Score: {highScore}</h2>
    </div>
  );
}

function Victory() {
  return <h2>Congratulations, you win!</h2>;
}
