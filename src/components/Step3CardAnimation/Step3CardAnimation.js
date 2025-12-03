import { useState, useEffect } from 'react';
import { GENDER_LABELS } from '../../constants/gender';
import './Step3CardAnimation.css';

const Step3CardAnimation = ({ answer, onAnimationComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedCard, setHighlightedCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const genders = ['boy', 'girl'];

  useEffect(() => {
    if (isAnimating) {
      const startTime = Date.now();
      const duration = 5000; // 5秒
      let lastSwitch = 0;
      let switchCount = 0;
      const minInterval = 150; // 最小間隔
      const maxInterval = 250; // 最大間隔

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const timeSinceLastSwitch = Date.now() - lastSwitch;
        
        if (elapsed < duration) {
          // 動態調整切換速度，開始快，中間慢，最後又快
          const progress = elapsed / duration;
          let currentInterval;
          
          if (progress < 0.3) {
            // 開始階段：快速切換
            currentInterval = minInterval;
          } else if (progress < 0.7) {
            // 中間階段：逐漸變慢
            currentInterval = minInterval + (maxInterval - minInterval) * ((progress - 0.3) / 0.4);
          } else {
            // 結束階段：快速切換製造緊張感
            currentInterval = minInterval + (maxInterval - minInterval) * (1 - (progress - 0.7) / 0.3);
          }
          
          if (timeSinceLastSwitch >= currentInterval) {
            setHighlightedCard(prev => prev === 'boy' ? 'girl' : 'boy');
            lastSwitch = Date.now();
            switchCount++;
          }
          
          requestAnimationFrame(animate);
        } else {
          // 顯示答案
          setHighlightedCard(answer);
          setShowAnswer(true);
          
          // 顯示恭喜動畫
          setTimeout(() => {
            setShowCongratulations(true);
            setTimeout(() => {
              setIsAnimating(false);
              onAnimationComplete();
            }, 2000);
          }, 500);
        }
      };

      animate();
    }
  }, [isAnimating, answer]);

  const handleStart = () => {
    setIsAnimating(true);
    setShowAnswer(false);
    setShowCongratulations(false);
    setHighlightedCard('boy');
  };

  return (
    <div className="step3-card-animation">
      <h2>步驟 3：開獎</h2>
      
      {!isAnimating && !showAnswer && (
        <button onClick={handleStart} className="btn-start-lottery">
          開始開獎
        </button>
      )}

      <div className="cards-container">
        <div 
          className={`card ${highlightedCard === 'boy' ? 'highlighted highlight-boy' : ''} ${showAnswer && answer === 'boy' ? 'answer' : ''}`}
        >
          <div className="card-icon">👶</div>
          <div className="card-label">{GENDER_LABELS.boy}</div>
        </div>
        <div 
          className={`card ${highlightedCard === 'girl' ? 'highlighted highlight-girl' : ''} ${showAnswer && answer === 'girl' ? 'answer' : ''}`}
        >
          <div className="card-icon">👧</div>
          <div className="card-label">{GENDER_LABELS.girl}</div>
        </div>
      </div>

      {showCongratulations && (
        <div className="congratulations-text">恭喜！</div>
      )}
    </div>
  );
};

export default Step3CardAnimation;

