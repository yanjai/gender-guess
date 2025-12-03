import { calculateWinnings } from '../../utils/calculateWinnings';
import { GENDER_LABELS } from '../../constants/gender';
import './Step4Result.css';

const Step4Result = ({ players, answer }) => {
  const winners = calculateWinnings(players, answer);

  const totalBets = players.reduce((sum, player) => sum + player.bet, 0);

  return (
    <div className="step4-result">
      <h2>步驟 4：結果</h2>
      
      <div className="answer-display">
        <div className="answer-icon">{answer === 'boy' ? '👶' : '👧'}</div>
        <div className="answer-text">答案是：{GENDER_LABELS[answer]}</div>
      </div>

      <div className="results-section">
        <h3>賭注結果</h3>
        
        {winners.length === 0 ? (
          <div className="no-winners">
            <p>沒有人猜對</p>
            <p className="total-bets">總賭注：{totalBets} 元</p>
          </div>
        ) : (
          <>
            <div className="winners-list">
              {winners.map((winner, index) => (
                <div key={index} className="winner-item">
                  <span className="winner-name">{winner.name}</span>
                  <span className="winner-amount">+{winner.winnings} 元</span>
                </div>
              ))}
            </div>
            <div className="total-info">
              <div className="total-bets">總賭注：{totalBets} 元</div>
              <div className="total-winnings">總獎金：{winners.reduce((sum, w) => sum + w.winnings, 0)} 元</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Step4Result;


