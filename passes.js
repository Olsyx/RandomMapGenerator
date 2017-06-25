
function applyPass(targetMap, settings) {	
	switch (settings.passType) {
		case "simple":
			return simplePass(targetMap, settings)
			break;
		case "async":
			return asyncPass(targetMap, settings)
			break;
		default:
			break;		
	}
}

function simplePass(targetMap, settings) {	
	for (var row = 0; row < _mapHeight; row++) {
		for (var col = 0; col < _mapWidth; col++) {
			targetMap[row][col] = applyRule(targetMap, row, col)
		}
	}
	
	return targetMap
}

function asyncPass(targetMap, settings) {
	var updateMap = copyMap(targetMap)	
	
	for (var row = 0; row < _mapHeight; row++) {
		for (var col = 0; col < _mapWidth; col++) {
			updateMap[row][col] = applyRule(targetMap, settings, row, col)
		}
	}	
		
	return updateMap
}
