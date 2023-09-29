/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import fetchImages from "./fetch";
import Card from "./Card";

export default function Deck({
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
