import { winnerCalc } from "./winnerCalc";

const minimax = (newTilesValue, depth, isMaximizing, sides) => {
	const winner = winnerCalc(newTilesValue);
	if (winner === sides.player) return -10;
	if (winner === sides.ai) return 10;
	if (newTilesValue.every((tile) => tile !== "")) return 0;

	if (isMaximizing) {
		let bestScore = -Infinity;
		for (let i = 0; i < newTilesValue.length; i++) {
			if (newTilesValue[i] === "") {
				newTilesValue[i] = sides.ai;
				let score = minimax(newTilesValue, depth + 1, false, sides);
				newTilesValue[i] = "";
				bestScore = Math.max(score, bestScore);
			}
		}
		return bestScore;
	} else {
		let bestScore = Infinity;
		for (let i = 0; i < newTilesValue.length; i++) {
			if (newTilesValue[i] === "") {
				newTilesValue[i] = sides.player;
				let score = minimax(newTilesValue, depth + 1, true, sides);
				newTilesValue[i] = "";
				bestScore = Math.min(score, bestScore);
			}
		}
		return bestScore;
	}
};

export const bestMove = (tilesValue, sides, difficulty) => {
	let bestScore = -Infinity;
	let move;

	if (difficulty === "easy") {
		const emptyTiles = tilesValue
			.map((tile, index) => (tile === "" ? index : null)) 
			.filter((index) => index !== null); 

		if (emptyTiles.length > 0) {
			const randomIndex = Math.floor(Math.random() * emptyTiles.length);
			return emptyTiles[randomIndex];
		}

		return 0; 
	}

	if (difficulty === "normal") {
		for (let i = 0; i < tilesValue.length; i++) {
			if (tilesValue[i] === "") {
				tilesValue[i] = sides.ai;
				const winner = winnerCalc(tilesValue);
                if (winner === sides.ai) {
					tilesValue[i] = ""; 
					return i;
				}
				tilesValue[i] = "";
			}
		}


		for (let i = 0; i < tilesValue.length; i++) {
			if (tilesValue[i] === "") {
				tilesValue[i] = sides.player;
				const winner = winnerCalc(tilesValue);
                if (winner === sides.player) {
					tilesValue[i] = "";
					return i; 
				}
				tilesValue[i] = "";
			}
		}

		const emptyTiles = tilesValue
			.map((tile, index) => (tile === "" ? index : null))
			.filter((index) => index !== null);

		if (emptyTiles.length > 0) {
			const randomIndex = Math.floor(Math.random() * emptyTiles.length);
			return emptyTiles[randomIndex];
		}

		return 0; 
	}


	for (let i = 0; i < tilesValue.length; i++) {
		if (tilesValue[i] === "") {
			tilesValue[i] = sides.ai;
			let score = minimax(tilesValue, 0, false, sides, difficulty);
			tilesValue[i] = "";
			if (score > bestScore) {
				bestScore = score;
				move = i;
			}
		}
	}
	return move;
};
