
var baseMap = [[]]
var baseMapSettings = { }

var forest = [[]]

function generateMap() {
	baseMapSettings = getDocumentSettings(baseMapSettings)
	
	baseMap = fillMapWithRandomness(baseMapSettings)
	
	baseMap = fillSides(baseMap)
	
    for (var i = 0; i < settings.passes; i++) {
		applyPass(baseMap, baseMapSettings)		
	}	
	
	draw(baseMap, _squareColor)
}

function nextPass() {
	applyPass(baseMap, baseMapSettings)
	draw(baseMap, _squareColor)
}


// --- Map --- //

function fillMapWithRandomness(settings) {
    var randomMap = [[]]
	for (var row = 0; row < _mapHeight; row++) {
		randomMap[row] = []
		for (var col = 0; col < _mapWidth; col++) {	
			var value = Math.round((Math.random() * 100)) + 1 >= settings.fillProportion ? true : false
			randomMap[row].push(value)
		}
    }
	return randomMap
}

function fillSides(targetMap) {
	for (var row = 0; row < _mapHeight; row++) {
		targetMap[row][0] = true
		targetMap[row][_mapHeight-1] = true
    }
	for (var col = 0; col < _mapWidth; col++) {	
		targetMap[0][col] = true
		targetMap[_mapWidth-1][col] = true
	}
	
	return targetMap
}


// --- Utils --- //

function printMap() {
	var s = "Size: " + _mapWidth + "x" + _mapHeight
	
	for (var row = 0; row < _mapHeight; row++) {
		s += "\n"
		for (var col = 0; col < _mapWidth; col++) {
			s += baseMap[row][col] + " " 
		}
	}
	
	alert(s)
}

function copyMap(targetMap) {	
	var copy = [[]]
	
	for (var row = 0; row < _mapHeight; row++) {
		copy[row] = []
		for (var col = 0; col < _mapWidth; col++) {
			copy[row][col] = targetMap[row][col]
		}
	}
		
	return copy
}

function IsInMap(row, col) {	
	if (row < 0 || col < 0) {
		return false;
	}
	
	if (row >= _mapHeight || col >= _mapWidth) {
		return false;
	}
	
	return true;
}
