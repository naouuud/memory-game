/* eslint-disable react/prop-types */
export default function Score({ score, highScore }) {
  highScore.current = score > highScore.current ? score : highScore.current;
  return (
    <div className="score">
      <h2>Score: {score}</h2>
      <h2>High Score: {highScore.current}</h2>
    </div>
  );
}
