/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import fetchImages from "./fetch";

export default function App() {
  return <Game />;
}

function Game() {
  const [images, setImages] = useState([]);
  const [level, setLevel] = useState(1);
  const [clicked, setClicked] = useState(new Set());
  const [score, setScore] = useState(0);
  const [resetLevel, setResetLevel] = useState(0);

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

  if (clicked.size == count) {
    console.log(`Congratulations, you cleared level ${level}!`);
    setClicked(new Set());
    setLevel(level + 1);
  }

  useEffect(() => {
    let ignore = false;
    async function startFetch() {
      const images = await fetchImages(count);
      !ignore && setImages(images);
    }

    startFetch();

    return () => {
      ignore = true;
    };
  }, [count, resetLevel]);

  if (images.length === count) {
    return (
      <>
        <Score score={score} />
        <Deck
          images={images}
          clicked={clicked}
          setClicked={setClicked}
          score={score}
          setScore={setScore}
          resetLevel={resetLevel}
          setResetLevel={setResetLevel}
          count={count}
          level={level}
        />
        <div className="remove-later">
          <select
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </>
    );
  } else return;
}

function Deck({
  images,
  clicked,
  setClicked,
  score,
  setScore,
  resetLevel,
  setResetLevel,
  count,
  level,
}) {
  let randomOrder = new Set();
  while (randomOrder.size < count) {
    let random = Math.floor(Math.random() * count);
    if (!randomOrder.has(random)) randomOrder.add(random);
  }
  let orderList = [...randomOrder];

  function clickHandler(position) {
    if (!clicked.has(position)) {
      const nextSet = new Set([...clicked, position]);
      console.log(nextSet);
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

function Score({ score }) {
  const highScore = useRef(0);
  highScore.current = score > highScore.current ? score : highScore.current;

  return (
    <div className="score">
      <h2>Score: {score}</h2>
      <h2>High Score: {highScore.current}</h2>
    </div>
  );
}
