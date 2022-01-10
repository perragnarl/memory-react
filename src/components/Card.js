export default function Card({ card, flipped, handleChoice, disabled }) {
  const handleClick = () => {
    !disabled && handleChoice(card);    
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
      <span className="backside"></span>
      <span className="symbol">{card.symbol}</span>
    </div>
  );
}
