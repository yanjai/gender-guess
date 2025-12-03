import { useState } from "react";
import { GENDERS, GENDER_LABELS } from "../../constants/gender";
import "./Step1PrizeInput.css";

const Step1PrizeInput = ({ players, setPlayers, onNext }) => {
  const [name, setName] = useState("");
  const [bet, setBet] = useState("");
  const [guess, setGuess] = useState(GENDERS.BOY);

  const handleAddPlayer = () => {
    if (!name.trim() || !bet || bet <= 0) {
      return;
    }

    setPlayers([
      ...players,
      {
        id: Date.now(),
        name: name.trim(),
        bet: Number(bet),
        guess,
      },
    ]);

    setName("");
    setBet("");
    setGuess(GENDERS.BOY);
  };

  const handleRemovePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const handleNext = () => {
    if (players.length > 0) {
      onNext();
    }
  };

  return (
    <div className="step1-prize-input">
      <h2>步驟 2：輸入賭注</h2>
      <div className="form-inputs">
        <input
          type="text"
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-name"
          onKeyPress={(e) => e.key === "Enter" && handleAddPlayer()}
        />
        <input
          type="number"
          placeholder="賭注金額"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
          min="1"
          className="input-bet"
          onKeyPress={(e) => e.key === "Enter" && handleAddPlayer()}
        />
        <select
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="input-guess"
        >
          <option value={GENDERS.BOY}>{GENDER_LABELS[GENDERS.BOY]}</option>
          <option value={GENDERS.GIRL}>{GENDER_LABELS[GENDERS.GIRL]}</option>
          <option value={GENDERS.TWIN_BOY_BOY}>
            {GENDER_LABELS[GENDERS.TWIN_BOY_BOY]}
          </option>
          <option value={GENDERS.TWIN_GIRL_GIRL}>
            {GENDER_LABELS[GENDERS.TWIN_GIRL_GIRL]}
          </option>
          <option value={GENDERS.TWIN_BOY_GIRL}>
            {GENDER_LABELS[GENDERS.TWIN_BOY_GIRL]}
          </option>
        </select>
        <button onClick={handleAddPlayer} className="btn-add">
          新增
        </button>
      </div>

      {players.length > 0 && (
        <div className="players-list">
          <h3>已輸入的猜測者：</h3>
          <ul>
            {players.map((player) => (
              <li key={player.id} className="player-item">
                <span>
                  {player.name} - {player.bet}元 -{" "}
                  {GENDER_LABELS[player.guess] || player.guess}
                </span>
                <button
                  onClick={() => handleRemovePlayer(player.id)}
                  className="btn-remove"
                >
                  移除
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleNext} className="btn-next">
            下一步：開始開獎
          </button>
        </div>
      )}
    </div>
  );
};

export default Step1PrizeInput;
