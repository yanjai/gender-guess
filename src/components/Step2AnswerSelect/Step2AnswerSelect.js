import './Step2AnswerSelect.css';

const Step2AnswerSelect = ({ answer, setAnswer, onNext }) => {
  const handleConfirm = () => {
    if (answer) {
      onNext();
    }
  };

  return (
    <div className="step2-answer-select">
      <h2>步驟 2：選擇答案</h2>
      <div className="answer-options">
        <label className={`answer-option ${answer === 'boy' ? 'selected' : ''}`}>
          <input
            type="radio"
            value="boy"
            checked={answer === 'boy'}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="option-content">
            <div className="option-icon">👶</div>
            <div className="option-label">男生</div>
          </div>
        </label>
        <label className={`answer-option ${answer === 'girl' ? 'selected' : ''}`}>
          <input
            type="radio"
            value="girl"
            checked={answer === 'girl'}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="option-content">
            <div className="option-icon">👧</div>
            <div className="option-label">女生</div>
          </div>
        </label>
      </div>
      <button
        onClick={handleConfirm}
        disabled={!answer}
        className="btn-confirm"
      >
        確定
      </button>
    </div>
  );
};

export default Step2AnswerSelect;


