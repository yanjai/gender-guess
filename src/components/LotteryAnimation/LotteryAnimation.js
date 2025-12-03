import { useState, useEffect } from "react";
import { GENDER_LABELS } from "../../constants/gender";
import "./LotteryAnimation.css";

const LotteryAnimation = ({ answer, onAnimationComplete }) => {
  const [currentGender, setCurrentGender] = useState("boy");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const genders = ["boy", "girl"];

  useEffect(() => {
    if (isAnimating) {
      const startTime = Date.now();
      const duration = 5000; // 5秒
      const interval = 100; // 每100ms切換一次

      const animationInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;

        if (elapsed < duration) {
          // 隨機切換性別
          setCurrentGender(genders[Math.floor(Math.random() * genders.length)]);
        } else {
          clearInterval(animationInterval);
          // 顯示答案
          setCurrentGender(answer);
          setShowAnswer(true);

          // 顯示恭喜動畫
          setTimeout(() => {
            setShowCongratulations(true);
            setTimeout(() => {
              setIsAnimating(false);
              onAnimationComplete();
            }, 1500);
          }, 300);
        }
      }, interval);

      return () => clearInterval(animationInterval);
    }
  }, [isAnimating, answer]);

  const handleStart = () => {
    setIsAnimating(true);
    setShowAnswer(false);
    setShowCongratulations(false);
  };

  return (
    <div className="lottery-animation">
      {!isAnimating && !showAnswer && (
        <button onClick={handleStart} className="btn-lottery">
          開獎
        </button>
      )}

      {(isAnimating || showAnswer) && (
        <div className="animation-container">
          <div
            className={`gender-display ${showAnswer ? "show-answer" : ""} ${
              showCongratulations ? "congratulations" : ""
            }`}
          >
            {GENDER_LABELS[currentGender]}
          </div>
          {showCongratulations && (
            <div className="congratulations-text">恭喜！</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LotteryAnimation;
