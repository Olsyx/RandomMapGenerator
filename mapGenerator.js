
var baseMap = [[]]
var baseSettings = { }

var heightMap = [[]]
var heightSettings = [[]]

var forestMap = [[]]
var forestSettings = { }

function generateMap() {
	generateBase()
	generateHeight()
	generateForest() 
	
	drawMaps()
}

function nextPass() {
	baseMap = applyPass(baseMap, baseSettings)
		
	if (_generateHeight) {
		heightMap = applyPass(heightMap, heightSettings)
	}
	
	if (_generateForest) {
		forestMap = applyPass(forestMap, forestSettings)
		forestMap = isolateMap(forestMap, baseMap)
		forestMap = substractMap(forestMap, heightMap)
	}
	
	drawMaps()
}

function drawMaps() {	
	draw(baseMap, _groundColor, _seaColor)
	
	if (_generateHeight) {
		addDraw(heightMap, _mountainColor)
	}
	
	if (_generateForest) {
		addDraw(forestMap, _forestColor)
	}
}

function generateBase() {
	baseSettings = getDocumentSettings()
	baseMap = newLayer(baseSettings)
}

function generateHeight() {
	if (!_generateHeight) {
		return
	}
		
	heightSettings = emptySettings()
	
	heightSettings.passType = "async"
	heightSettings.passes = 5
	heightSettings.rule = "fixed"
	heightSettings.ruleValue = 12
	heightSettings.neighborhood = "moore"
	heightSettings.range = 2
	
	
	heightMap = newLayer(heightSettings)
	
	for (var i = 0; i < 4; i++) {
		heightSettings.ruleValue++
		
		var nextStep = applyPass(heightMap, heightSettings)		
		heightMap = addMap(heightMap, nextStep, true)
	}
	
	heightMap = isolateMap(heightMap, baseMap)	
}

function generateForest() {
	if (!_generateForest) {
		return
	}
	
	forestSettings = emptySettings()
	
	forestSettings.passType = "async"
	forestSettings.passes = 5
	forestSettings.rule = "random"
	forestSettings.ruleValue = 50
	forestSettings.neighborhood = "moore"
	forestSettings.range = 2
	
	
	forestMap = newLayer(forestSettings)
	
	forestMap = isolateMap(forestMap, baseMap)	
	forestMap = substractMap(forestMap, heightMap)
}


// --- Generating --- //

function newLayer(settings) {	
	map = fillMapWithRandomness(settings)
	
	map = fillSides(map)
	
    for (var i = 0; i < settings.passes; i++) {
		map = applyPass(map, settings)		
	}	
	
	return map
}

// --- Filling --- //

function fillMapWithRandomness(settings) {
    var randomMap = [[]]
	for (var row = 0; row < _mapHeight; row++) {
		randomMap[row] = []
		for (var col = 0; col < _mapWidth; col++) {	
			var value = (Math.round((Math.random() * 100)) + 1 >= settings.fillProportion) ? 1 : 0
			randomMap[row].push(value)
		}
    }
	return randomMap
}

function fillSides(targetMap) {
	for (var row = 0; row < _mapHeight; row++) {
		targetMap[row][0] = 1
		targetMap[row][_mapHeight-1] = 1
    }
	for (var col = 0; col < _mapWidth; col++) {	
		targetMap[0][col] = 1
		targetMap[_mapWidth-1][col] = 1
	}
	
	return targetMap
}



// --- Utils --- //

function addMap(baseLayer, addLayer, excludeZeros) {	
	if (baseLayer == undefined || baseLayer.length <= 0) {
		return addLayer
	}
	
	if (addLayer == undefined || addLayer.length <= 0) {
		return baseLayer
	}

	var result = [[]]
	
	for (var row = 0; row < _mapHeight; row++) {
		result[row] = []
		for (var col = 0; col < _mapWidth; col++) {
			var value = 0
			if (!excludeZeros || (excludeZeros && baseLayer[row][col] != 0)) {
				value = baseLayer[row][col] + addLayer[row][col]
			}
			
			result[row][col] = value
		}
	}
		
	return result
}

function substractMap(targetMap, maskMap) {	
	var result = [[]]
	
	for (var row = 0; row < _mapHeight; row++) {
		result[row] = []
		for (var col = 0; col < _mapWidth; col++) {
			var value = maskMap[row][col] >= 1 ? 0 : targetMap[row][col]
			result[row][col] = value
		}
	}
		
	return result
}

function isolateMap(targetMap, maskMap) {	
	var result = [[]]
	
	for (var row = 0; row < _mapHeight; row++) {
		result[row] = []
		for (var col = 0; col < _mapWidth; col++) {
			var value = maskMap[row][col] >= 1 ? targetMap[row][col] : 0
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

function printMap(targetMap) {
	var s = "Size: " + _mapWidth + "x" + _mapHeight
	
	for (var row = 0; row < _mapHeight; row++) {
		s += "\n"
		for (var col = 0; col < _mapWidth; col++) {
			s += targetMap[row][col] + " " 
		}
	}
	
	alert(s)
}
