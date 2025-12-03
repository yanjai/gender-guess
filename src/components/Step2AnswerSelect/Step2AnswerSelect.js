import { GENDERS, GENDER_LABELS, GENDER_ICONS } from "../../constants/gender";
import "./Step2AnswerSelect.css";

const Step2AnswerSelect = ({ answer, setAnswer, onNext }) => {
  const handleConfirm = () => {
    if (answer) {
      onNext();
    }
  };

  const options = [
    {
      value: GENDERS.BOY,
      label: GENDER_LABELS[GENDERS.BOY],
      icon: GENDER_ICONS[GENDERS.BOY],
    },
    {
      value: GENDERS.GIRL,
      label: GENDER_LABELS[GENDERS.GIRL],
      icon: GENDER_ICONS[GENDERS.GIRL],
    },
    {
      value: GENDERS.TWIN_BOY_BOY,
      label: GENDER_LABELS[GENDERS.TWIN_BOY_BOY],
      icon: GENDER_ICONS[GENDERS.TWIN_BOY_BOY],
    },
    {
      value: GENDERS.TWIN_GIRL_GIRL,
      label: GENDER_LABELS[GENDERS.TWIN_GIRL_GIRL],
      icon: GENDER_ICONS[GENDERS.TWIN_GIRL_GIRL],
    },
    {
      value: GENDERS.TWIN_BOY_GIRL,
      label: GENDER_LABELS[GENDERS.TWIN_BOY_GIRL],
      icon: GENDER_ICONS[GENDERS.TWIN_BOY_GIRL],
    },
  ];

  return (
    <div className="step2-answer-select">
      <h2>步驟 1：選擇答案</h2>
      <p className="answer-hint">請先設定正確答案（只有主辦人知道）</p>
      <div className="answer-options">
        {options.map((option) => (
          <label
            key={option.value}
            className={`answer-option ${
              answer === option.value ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              value={option.value}
              checked={answer === option.value}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <div
              className={`option-content ${
                option.value.includes("twin") ? "twin" : ""
              }`}
            >
              <div className="option-icon">{option.icon}</div>
              <div className="option-label">{option.label}</div>
            </div>
          </label>
        ))}
      </div>
      <button
        onClick={handleConfirm}
        disabled={!answer}
        className="btn-confirm"
      >
        下一步：輸入賭注
      </button>
    </div>
  );
};

export default Step2AnswerSelect;
