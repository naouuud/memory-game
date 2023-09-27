/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import fetchImages from "./fetch";

export default function App() {
  return <Game />;
}

function Game() {
  const [images, setImages] = useState([]);
  const [level, setLevel] = useState(1);
  const [clicked, setClicked] = useState(new Set());
  // console.log(images);
  let count = 0;
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
  }, [count]);

  if (images.length === count) {
    return (
      <>
        <Deck
          images={images}
          orderList={orderList}
          clicked={clicked}
          setClicked={setClicked}
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

function Deck({ images, orderList, level, clicked, setClicked }) {
  function clickHandler(position) {
    if (!clicked.has(position)) {
      const newSet = new Set([...clicked, position]);
      console.log(newSet);
      setClicked(newSet);
    } else {
      console.log("Already clicked, you lose!)");
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
