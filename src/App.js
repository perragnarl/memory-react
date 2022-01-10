import { useEffect, useState } from "react";
import Card from "./components/Card";

const cardSymbols = [
  { symbol: "🦊", match: false },
  { symbol: "🐶", match: false },
  { symbol: "🦝", match: false },
  { symbol: "🦁", match: false },
  { symbol: "🐱", match: false },
  { symbol: "🐮", match: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardSymbols, ...cardSymbols]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFirstChoice(null);
    setSecondChoice(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.symbol === secondChoice.symbol) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.symbol === firstChoice.symbol) {
              return { ...card, match: true };
            } else {
              return card;
            }
          });
        });
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  const resetTurns = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const isFlipped = (card) => {
    return card === firstChoice || card === secondChoice || card.match
      ? true
      : false;
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <main>
      <h1>Memory</h1>
      <button className="start" onClick={shuffleCards}>Starta nytt</button>
      <p className="turns">Antal försök: {turns}</p>
      <div className="board">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={isFlipped(card)}
            disabled={disabled}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
