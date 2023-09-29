/* eslint-disable react/prop-types */
export default function Score({ score, highScore }) {
  highScore.current = score > highScore.current ? score : highScore.current;
  return (
    <div className="score">
      <h3>Score: {score}</h3>
      <h3>High Score: {highScore.current}</h3>
    </div>
  );
}
