import { useState, useEffect, useMemo } from "react";
import { GENDERS, GENDER_LABELS, GENDER_ICONS } from "../../constants/gender";
import "./Step3CardAnimation.css";

const ALL_OPTIONS = [
  GENDERS.BOY,
  GENDERS.GIRL,
  GENDERS.TWIN_BOY_BOY,
  GENDERS.TWIN_GIRL_GIRL,
  GENDERS.TWIN_BOY_GIRL,
];

const Step3CardAnimation = ({ answer, onAnimationComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedCard, setHighlightedCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const isTwin = useMemo(() => answer && answer.includes("twin"), [answer]);

  useEffect(() => {
    if (isAnimating) {
      const startTime = Date.now();
      const duration = 5000; // 5秒
      let lastSwitch = 0;
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
            currentInterval =
              minInterval +
              (maxInterval - minInterval) * ((progress - 0.3) / 0.4);
          } else {
            // 結束階段：快速切換製造緊張感
            currentInterval =
              minInterval +
              (maxInterval - minInterval) * (1 - (progress - 0.7) / 0.3);
          }

          if (timeSinceLastSwitch >= currentInterval) {
            // 隨機切換到任何選項
            const randomIndex = Math.floor(Math.random() * ALL_OPTIONS.length);
            setHighlightedCard(ALL_OPTIONS[randomIndex]);
            lastSwitch = Date.now();
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
  }, [isAnimating, answer, onAnimationComplete]);

  const handleStart = () => {
    setIsAnimating(true);
    setShowAnswer(false);
    setShowCongratulations(false);
    setHighlightedCard(GENDERS.BOY);
  };

  const getCardClass = (option) => {
    const isHighlighted = highlightedCard === option;
    const isAnswer = showAnswer && answer === option;
    const direction =
      option === GENDERS.BOY || option === GENDERS.TWIN_BOY_BOY
        ? "left"
        : option === GENDERS.GIRL || option === GENDERS.TWIN_GIRL_GIRL
        ? "right"
        : "center";

    return `card ${isHighlighted ? `highlighted highlight-${direction}` : ""} ${
      isAnswer ? "answer" : ""
    } ${option.includes("twin") ? "twin-card" : ""}`;
  };

  return (
    <div className="step3-card-animation">
      <h2>步驟 3：開獎</h2>

      {!isAnimating && !showAnswer && (
        <button onClick={handleStart} className="btn-start-lottery">
          開始開獎
        </button>
      )}

      <div className={`cards-container ${isTwin ? "twin-container" : ""}`}>
        {ALL_OPTIONS.map((option) => (
          <div key={option} className={getCardClass(option)}>
            <div className="card-icon">{GENDER_ICONS[option]}</div>
            <div className="card-label">{GENDER_LABELS[option]}</div>
          </div>
        ))}
      </div>

      {showCongratulations && (
        <div className="congratulations-text">恭喜！</div>
      )}
    </div>
  );
};

export default Step3CardAnimation;
