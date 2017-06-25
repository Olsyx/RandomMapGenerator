
var baseMap = [[]]
var baseSettings = { }

var forestMap = [[]]
var forestSettings = { }

function generateMap() {
	generateBase()
	generateForest() 
	drawMaps()
}

function nextPass() {
	applyPass(baseMap, baseSettings)
	
	if (_generateForest) {
		applyPass(forestMap, forestSettings)
	}
	
	drawMaps()
}

function drawMaps() {	
	draw(baseMap, _groundColor, _seaColor)
	
	if (_generateForest) {
		addDraw(forestMap, _forestColor)
	}
}



function generateBase() {
	baseSettings = getDocumentSettings()
	baseMap = newLayer(baseSettings)
	
}

function generateForest() {
	forestSettings = emptySettings()
	
	forestSettings.passType = "async"
	forestSettings.passes = 5
	forestSettings.rule = "random"
	forestSettings.ruleValue = 50
	forestSettings.neighborhood = "moore"
	forestSettings.range = 2
	
	
	forestMap = newLayer(forestSettings)
	
	forestMap = isolateMap(forestMap, baseMap)	
}


// --- Generating --- //

function newLayer(settings) {	
	map = fillMapWithRandomness(settings)
	
	map = fillSides(map)
	
    for (var i = 0; i < settings.passes; i++) {
		applyPass(map, settings)		
	}	
	
	return map
}

// --- Filling --- //

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

function isolateMap(targetMap, maskMap) {	
	var result = [[]]
	
	for (var row = 0; row < _mapHeight; row++) {
		result[row] = []
		for (var col = 0; col < _mapWidth; col++) {
			var value = maskMap[row][col] ? targetMap[row][col] : false
			result[row][col] = value
		}
	}
		
	return result
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
