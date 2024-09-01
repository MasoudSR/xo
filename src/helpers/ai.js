import { winnerCalc } from "./winnerCalc";

const minimax = (newTilesValue, depth, isMaximizing) => {
    const winner = winnerCalc(newTilesValue);
    if (winner === 'x') return -10;
    if (winner === 'o') return 10;
    if (newTilesValue.every(tile => tile !== "")) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newTilesValue.length; i++) {
            if (newTilesValue[i] === "") {
                newTilesValue[i] = 'o';
                let score = minimax(newTilesValue, depth + 1, false);
                newTilesValue[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newTilesValue.length; i++) {
            if (newTilesValue[i] === "") {
                newTilesValue[i] = 'x';
                let score = minimax(newTilesValue, depth + 1, true);
                newTilesValue[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

export const bestMove = (tilesValue) => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < tilesValue.length; i++) {
        if (tilesValue[i] === "") {
            tilesValue[i] = 'o';
            let score = minimax(tilesValue, 0, false);
            tilesValue[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
};