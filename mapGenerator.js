
function generateMap() {
	fillMap()
	fillSides()
	
    for (var i = 0; i < settings.passes; i++) {
		applyRule()		
	}	
}


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

function smoothMap() {
		
	for (var row = 0; row < settings.height; row++) {
		for (var col = 0; col < settings.width; col++) {
			
			var neighbourWalls = getSurroundingWallCount(row, col)

			if (neighbourWalls > 4) {
				map[row][col] = true
			} else if (neighbourWalls < 4) {
				map[row][col] = false
			}

		}
	}
	
}

function getSurroundingWallCount(targetMap, row, col) {
	var wallCount = 0

	var startRow = row > 0 ? row - 1 : row
	var endRow = row < settings.height - 1 ? row + 1 : row

	var startCol = col > 0 ? col - 1 : col
	var endCol = col < settings.width - 1 ? col + 1 : col

	for (var r = startRow; r <= endRow; r++) {
		for (var c = startCol; c <= endCol; c++) {
			if (!(r == row && c == col)) {
				wallCount += targetMap[r][c]
			}
		}
	}

	return wallCount
}



function applyRule(row, col) {	
	switch (settings.generator) {
		case "simple":
			simpleRule()
			break;
		case "async":
			asyncRule()
			break;
		default:
			break;		
	}
}


function simpleRule() {	
	for (var row = 0; row < settings.height; row++) {
		for (var col = 0; col < settings.width; col++) {
			
			var neighbourWalls = getSurroundingWallCount(map, row, col)

			if (neighbourWalls > 4) {
				map[row][col] = true
			} else if (neighbourWalls < 4) {
				map[row][col] = false
			}

		}
	}
}

function asyncRule() {
	var updateMap = [[]]
	
	for (var row = 0; row < settings.height; row++) {
		updateMap[row] = []
		for (var col = 0; col < settings.width; col++) {
			updateMap[row][col] = map[row][col]
		}
	}
	
	
	for (var row = 0; row < settings.height; row++) {
		for (var col = 0; col < settings.width; col++) {
			
			var neighbourWalls = getSurroundingWallCount(map, row, col)

			if (neighbourWalls > 4) {
				updateMap[row][col] = true
			} else if (neighbourWalls < 4) {
				updateMap[row][col] = false
			}

		}
	}	
	
	
	map = updateMap
}