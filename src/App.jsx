// import { useEffect } from "react";
import fetchImages from "./fetch";

export default function App() {
  return <Deck />;
}

function Deck() {
  return (
    <div className="deck">
      <ul>
        {images.map((image, index) => (
          <li key={index}>
            <img src={image["url"]} alt={image["title"]} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const images = await fetchImages(20);
