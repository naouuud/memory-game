/* eslint-disable react/prop-types */
import { useState } from "react";

export default function Card({ image, showBack }) {
  console.log(image);
  const [hidden, setHidden] = useState(true);

  return (
    <div
      className={showBack ? "card back" : "card front"}
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <img
        className="image"
        src={showBack ? image : image["url"]}
        alt={
          showBack
            ? "Painting of the NASA logo, also called the meatball, on the 525-foot-tall Vehicle Assembly Building (VAB) at the agency’s Kennedy Space Center in Florida on June 23, 2020."
            : image["title"]
        }
      />
      <div className={hidden ? "caption hidden" : "caption"}>
        {image["title"]}
      </div>
    </div>
  );
}
