/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import fetchImages from "./fetch";
import Card from "./Card";
import CardBack from "./CardBack";

export default function Deck({
  level,
  score,
  setScore,
  resetDeck,
  setResetDeck,
  setTryAgain,
  setLoading,
  showBack,
  setShowBack,
}) {
  const [images, setImages] = useState([]);
  const [clicked, setClicked] = useState(new Set());
  // const [showBack, setShowBack] = useState(true);
  const backUrl = useRef("../src/assets/PIA12833~small.jpg");

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

  useEffect(() => {
    showBack &&
      setTimeout(() => {
        setShowBack(false);
      }, 1200);
  });

  function clickHandler(position) {
    if (!clicked.has(position)) {
      const nextSet = new Set([...clicked, position]);
      setClicked(nextSet);
      setScore(score + 1);
      setShowBack(true);
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
            {showBack ? (
              <CardBack image={backUrl.current} />
            ) : (
              <Card image={images[position]} />
            )}
          </div>
        ))}
      </div>
    );
  } else return <div className="loading-images">Loading images...</div>;
}
