

function getNeighborhood(targetMap, settings, row, col) {
	switch(settings.neighborhood) {
		case "moore":
			return getMooreNeighborhood(targetMap, settings, row, col)
			break;
			
		case "vnm":
			return getVonNeumannManhattanNeighborhood(targetMap, settings, row, col)
			break;		
		
	}	
	
	return 0
}

function getMooreNeighborhood(targetMap, settings, row, col) {
	var wallCount = 0
	
	for (var r = row - settings.range; r <= row + settings.range; r++) {
		for (var c = col - settings.range; c <= col + settings.range; c++) {
			if (IsInMap(r, c) && !(r == row && c == col)) {
				wallCount += targetMap[r][c] >= 1 ? 1 : 0
			}
		}
	}

	return wallCount
}

function getVonNeumannManhattanNeighborhood(targetMap, settings, row, col) {
	var wallCount = 0
	
	for (var i = 1; i <= settings.range; i++) {
		wallCount += getDiagonalLineCount(targetMap, row-i, col, row, col + i, 1, 1)
		wallCount += getDiagonalLineCount(targetMap, row, col + i, row + i, col, 1, -1)
		wallCount += getDiagonalLineCount(targetMap, row + i, col, row, col - i, -1, -1)
		wallCount += getDiagonalLineCount(targetMap, row, col - i, row - i, col, 1, -1)
	}	
	
	return wallCount
}

function getDiagonalLineCount(targetMap, initRow, initCol, endRow, endCol, rowStep, colStep) {
	var wallCount = 0
	for (var r = initRow; r <= endRow; r = r + rowStep) {
		for (var c = initCol; c <= endCol; c = c + colStep) {
			if (IsInMap(r, c)) {
				wallCount += targetMap[r][c] >= 1 ? 1 : 0
			}
		}
	}
	
	return wallCount
}