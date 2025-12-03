/**
 * 根據賭注比例計算每個贏家的金額
 * @param {Array} players - 玩家陣列，每個玩家包含 { name, bet, guess }
 * @param {string} answer - 正確答案 ('boy' 或 'girl')
 * @returns {Array} 贏家陣列，每個贏家包含 { name, winnings }
 */
export const calculateWinnings = (players, answer) => {
  // 找出猜對的玩家
  const winners = players.filter(player => player.guess === answer);
  
  if (winners.length === 0) {
    return [];
  }
  
  // 計算總賭注（所有玩家的賭注）
  const totalBets = players.reduce((sum, player) => sum + player.bet, 0);
  
  // 計算贏家總賭注
  const winnersTotalBets = winners.reduce((sum, player) => sum + player.bet, 0);
  
  // 計算每個贏家應得的比例和金額
  return winners.map(player => {
    const ratio = player.bet / winnersTotalBets;
    const winnings = Math.round(totalBets * ratio);
    return {
      name: player.name,
      winnings,
    };
  });
};


