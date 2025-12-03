import { useState } from 'react';
import './Step1PrizeInput.css';

const Step1PrizeInput = ({ players, setPlayers, onNext }) => {
  const [name, setName] = useState('');
  const [bet, setBet] = useState('');
  const [guess, setGuess] = useState('boy');

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

    setName('');
    setBet('');
    setGuess('boy');
  };

  const handleRemovePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const handleNext = () => {
    if (players.length > 0) {
      onNext();
    }
  };

  return (
    <div className="step1-prize-input">
      <h2>步驟 1：輸入獎金</h2>
      <div className="form-inputs">
        <input
          type="text"
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-name"
          onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
        />
        <input
          type="number"
          placeholder="賭注金額"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
          min="1"
          className="input-bet"
          onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
        />
        <select
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="input-guess"
        >
          <option value="boy">男生</option>
          <option value="girl">女生</option>
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
                  {player.name} - {player.bet}元 - {player.guess === 'boy' ? '男生' : '女生'}
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
            下一步：選擇答案
          </button>
        </div>
      )}
    </div>
  );
};

export default Step1PrizeInput;

