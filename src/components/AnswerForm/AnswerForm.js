import './AnswerForm.css';

const AnswerForm = ({ answer, setAnswer, onConfirm }) => {
  const handleConfirm = () => {
    if (answer) {
      onConfirm();
    }
  };

  return (
    <div className="answer-form">
      <h2>輸入答案</h2>
      <div className="answer-inputs">
        <label>
          <input
            type="radio"
            value="boy"
            checked={answer === 'boy'}
            onChange={(e) => setAnswer(e.target.value)}
          />
          男生
        </label>
        <label>
          <input
            type="radio"
            value="girl"
            checked={answer === 'girl'}
            onChange={(e) => setAnswer(e.target.value)}
          />
          女生
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

export default AnswerForm;


