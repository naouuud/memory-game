/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import fetchImages from "./fetch";

export default function App() {
  const [score, setScore] = useState(0);
  const [resetDeck, setResetDeck] = useState(0);
  console.log("Render App");
  return (
    <>
      <Score score={score} />
      <Deck
        score={score}
        setScore={setScore}
        resetDeck={resetDeck}
        setResetDeck={setResetDeck}
      />
    </>
  );
}

function Deck({ score, setScore, resetDeck, setResetDeck }) {
  console.log("Render Deck");
  const [level, setLevel] = useState(1);
  const [images, setImages] = useState([]);
  const [clicked, setClicked] = useState(new Set());
  console.log(images);
  let count;
  switch (level) {
    case 1:
      count = 4;
      break;
    case 2:
      count = 8;
      break;
    case 3:
      count = 10;
      break;
    case 4:
      count = 15;
      break;
    case 5:
      count = 20;
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

  // useEffect(() => {
  if (clicked.size == count) {
    console.log(`Congratulations, you cleared level ${level}!`);
    setClicked(new Set());
    setLevel(level + 1);
  }
  // }, [clicked.size, count, level]);

  useEffect(() => {
    console.log("Fetching Effect");
    async function startFetch() {
      const images = await fetchImages(count);
      setImages(images);
    }
    startFetch();

    return () => {
      console.log("Dismount");
      setImages([]);
    };
  }, [count, resetDeck]);

  function clickHandler(position) {
    if (!clicked.has(position)) {
      const nextSet = new Set([...clicked, position]);
      // console.log(nextSet);
      setClicked(nextSet);
      setScore(score + 1);
    } else {
      setClicked(new Set());
      setScore(0);
      setResetDeck(resetDeck + 1);
    }
  }

  if (images.length > 0) {
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

function Score({ score }) {
  console.log("Render Score");
  const highScore = useRef(0);
  highScore.current = score > highScore.current ? score : highScore.current;

  return (
    <div className="score">
      <h2>Score: {score}</h2>
      <h2>High Score: {highScore.current}</h2>
    </div>
  );
}
