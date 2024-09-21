export function winnerCalc(tilesValue) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (tilesValue[a] && tilesValue[a] === tilesValue[b] && tilesValue[a] === tilesValue[c]) {
			return tilesValue[a];
		}
	}
	if (!tilesValue.includes("")) {
		return "draw";
	}
	return null;
}

export function winnerDirection(tilesValue) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (tilesValue[a] && tilesValue[a] === tilesValue[b] && tilesValue[a] === tilesValue[c]) {
			const winnerLine = i;
			let winnerDirection = "";
			switch (winnerLine) {
				case 0:
					winnerDirection = "top";

					break;
				case 1:
					winnerDirection = "horizontal";

					break;
				case 2:
					winnerDirection = "bottom";

					break;
				case 3:
					winnerDirection = "left";

					break;
				case 4:
					winnerDirection = "vertical";
					break;
				case 5:
					winnerDirection = "right";

					break;
				case 6:
					winnerDirection = "diagonal1";

					break;
				case 7:
					winnerDirection = "diagonal2";

					break;
				default:
					break;
			}
			return winnerDirection;
		}
	}
}
