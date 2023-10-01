/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";

export default function Card({ image }) {
  const [hidden, setHidden] = useState(true);
  const imgElement = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = image["url"];
    img.addEventListener("load", () => {
      imgElement.current.src = img.src;
      imgElement.current.className = "image";
    });
  });

  return (
    <div
      className={"card front"}
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <img ref={imgElement} className="image hidden" alt={image["title"]} />
      <div className={hidden ? "caption hidden" : "caption"}>
        {image["title"]}
      </div>
    </div>
  );
}
