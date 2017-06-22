
function generateMap() {
	fillMap()
	fillSides()
	
    for (var i = 0; i < settings.passes; i++) {
		applyPass()		
	}	
}

function nextPass() {
	applyPass()
	draw()
}

// --- Map --- //

function fillSides() {
	for (var row = 0; row < settings.height; row++) {
		map[row][0] = true
		map[row][settings.width-1] = true
    }
	for (var col = 0; col < settings.width; col++) {	
		map[0][col] = true
		map[settings.height-1][col] = true
	}
}

function fillMap() {
    map = []
	for (var row = 0; row < settings.height; row++) {
		map[row] = []
		for (var col = 0; col < settings.width; col++) {	
			var value = Math.round((Math.random() * 100)) + 1 >= settings.fillProportion ? true : false
			map[row].push(value)
		}
    }
}


// --- Neighbours --- //

function getNeighborhood(targetMap, row, col) {
	switch(settings.neighborhood) {
		case "moore":
			return getMooreNeighborhood(targetMap, row, col)
			break;
			
		case "vnm":
			return getVonNeumannManhattanNeighborhood(targetMap, row, col)
			break;		
		
	}
	
	
}

function getMooreNeighborhood(targetMap, row, col) {
	var wallCount = 0

	var startRow = row > 0 ? row - 1 : row
	var endRow = row < settings.height - 1 ? row + 1 : row

	var startCol = col > 0 ? col - 1 : col
	var endCol = col < settings.width - 1 ? col + 1 : col

	for (var r = startRow; r <= endRow; r++) {
		for (var c = startCol; c <= endCol; c++) {
			if (!(r == row && c == col)) {
				wallCount += targetMap[r][c]? 1 : 0
			}
		}
	}

	return wallCount
}

function getVonNeumannManhattanNeighborhood(targetMap, row, col) {
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
			if (InMap(r, c)) {
				wallCount += targetMap[r][c] ? 1 : 0
			}
		}
	}
	
	return wallCount
}

function InMap(row, col) {	
	if (row < 0 || col < 0) {
		return false;
	}
	
	if (row >= settings.height || col >= settings.width) {
		return false;
	}
	
	return true;
}


// --- Generations --- //

function applyPass(row, col) {	
	switch (settings.passType) {
		case "simple":
			simplePass()
			break;
		case "async":
			asyncPass()
			break;
		default:
			break;		
	}
}

function simplePass() {	
	for (var row = 0; row < settings.height; row++) {
		for (var col = 0; col < settings.width; col++) {
			map[row][col] = applyRule(map, row, col)
		}
	}
}

function asyncPass() {
	var updateMap = [[]]
	
	for (var row = 0; row < settings.height; row++) {
		updateMap[row] = []
		for (var col = 0; col < settings.width; col++) {
			updateMap[row][col] = map[row][col]
		}
	}
	
	
	for (var row = 0; row < settings.height; row++) {
		for (var col = 0; col < settings.width; col++) {
			targetMap[row][col] = applyRule(map, row, col)
		}
	}	
	
	
	map = updateMap
}

// -- Rules -- //

function applyRule(lookupMap, row, col) {	
	switch (settings.rule) {
		case "four":
			return fourRule(lookupMap, row, col)
			break;
		default:
			return lookupMap[row][col]
			break;		
	}
}

function fourRule(lookupMap, row, col) {	
	var neighbourWalls = getNeighborhood(lookupMap, row, col)
	
	if (neighbourWalls > 4) {
		return true
	} else if (neighbourWalls < 4) {
		return false
	}	
	
	return lookupMap[row][col]
}