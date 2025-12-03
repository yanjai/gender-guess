import { useState } from "react";
import Step1PrizeInput from "../components/Step1PrizeInput/Step1PrizeInput";
import Step2AnswerSelect from "../components/Step2AnswerSelect/Step2AnswerSelect";
import Step3CardAnimation from "../components/Step3CardAnimation/Step3CardAnimation";
import Step4Result from "../components/Step4Result/Step4Result";
import "../styles/App.css";

function App() {
  const [step, setStep] = useState(1);
  const [players, setPlayers] = useState([]);
  const [answer, setAnswer] = useState("");

  const handleStep1Next = () => {
    setStep(2);
  };

  const handleStep2Next = () => {
    setStep(3);
  };

  const handleStep3Complete = () => {
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setPlayers([]);
    setAnswer("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>猜性別遊戲</h1>
        <div className="step-indicator">
          <div
            className={`step-item ${step >= 1 ? "active" : ""} ${
              step > 1 ? "completed" : ""
            }`}
          >
            <div className="step-number">1</div>
            <div className="step-label">選擇答案</div>
          </div>
          <div
            className={`step-item ${step >= 2 ? "active" : ""} ${
              step > 2 ? "completed" : ""
            }`}
          >
            <div className="step-number">2</div>
            <div className="step-label">輸入賭注</div>
          </div>
          <div
            className={`step-item ${step >= 3 ? "active" : ""} ${
              step > 3 ? "completed" : ""
            }`}
          >
            <div className="step-number">3</div>
            <div className="step-label">開獎</div>
          </div>
          <div className={`step-item ${step >= 4 ? "active" : ""}`}>
            <div className="step-number">4</div>
            <div className="step-label">結果</div>
          </div>
        </div>
      </header>
      <main className="App-main">
        {step === 1 && (
          <Step2AnswerSelect
            answer={answer}
            setAnswer={setAnswer}
            onNext={handleStep1Next}
          />
        )}

        {step === 2 && (
          <Step1PrizeInput
            players={players}
            setPlayers={setPlayers}
            onNext={handleStep2Next}
          />
        )}

        {step === 3 && (
          <Step3CardAnimation
            answer={answer}
            onAnimationComplete={handleStep3Complete}
          />
        )}

        {step === 4 && (
          <>
            <Step4Result players={players} answer={answer} />
            <button onClick={handleReset} className="btn-reset">
              重新開始
            </button>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
