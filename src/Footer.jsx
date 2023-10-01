/* eslint-disable react/prop-types */
export default function Footer({ className }) {
  return (
    <footer className={className}>
      <span>
        Website by{" "}
        <a href="https://github.com/naouuud" target="blank">
          naouuud
        </a>
        .
      </span>{" "}
      <span>Built with React and Vite.</span>{" "}
      <span>
        All images from{" "}
        <a href="https://api.nasa.gov/" target="blank">
          NASA Open APIs.
        </a>
      </span>
    </footer>
  );
}
