import { calculateWinnings } from '../../utils/calculateWinnings';
import './ResultDisplay.css';

const ResultDisplay = ({ players, answer }) => {
  const winners = calculateWinnings(players, answer);

  if (winners.length === 0) {
    return (
      <div className="result-display">
        <h2>結果</h2>
        <div className="no-winners">
          <p>沒有人猜對，獎金歸莊家所有</p>
        </div>
      </div>
    );
  }

  const totalWinnings = winners.reduce((sum, winner) => sum + winner.winnings, 0);

  return (
    <div className="result-display">
      <h2>結果</h2>
      <div className="winners-list">
        <h3>贏家名單：</h3>
        <ul>
          {winners.map((winner, index) => (
            <li key={index} className="winner-item">
              <span className="winner-name">{winner.name}</span>
              <span className="winner-amount">{winner.winnings} 元</span>
            </li>
          ))}
        </ul>
        <div className="total-winnings">
          總獎金：{totalWinnings} 元
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;

