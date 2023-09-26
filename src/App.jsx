/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import fetchImages from "./fetch";

export default function App() {
  return <Game />;
}

function Game() {
  const [images, setImages] = useState([]);
  const [level, setLevel] = useState(1);

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

  return (
    <>
      <Deck images={images} level={level} />
      <div className="remove-later">
        <select onChange={(e) => setLevel(parseInt(e.target.value))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </>
  );
}

function Deck({ images, level }) {
  return (
    <div className={`deck level-${level}`}>
      {images.map((image, index) => (
        <Card key={index} image={image} />
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
