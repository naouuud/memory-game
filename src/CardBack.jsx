/* eslint-disable react/prop-types */
export default function CardBack({ image }) {
  return (
    <div className={"card back"}>
      <img
        className="image"
        src={image}
        alt={
          "Painting of the NASA logo, also called the meatball, on the 525-foot-tall Vehicle Assembly Building (VAB) at the agency’s Kennedy Space Center in Florida on June 23, 2020."
        }
      />
    </div>
  );
}
