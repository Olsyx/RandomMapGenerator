
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
	var resultMap = copyMap(targetMap)	
	
	for (var row = 0; row < _mapHeight; row++) {
		for (var col = 0; col < _mapWidth; col++) {
			resultMap[row][col] = applyRule(resultMap, settings, row, col)
		}
	}
	
	return resultMap
}

function asyncPass(targetMap, settings) {
	var resultMap = copyMap(targetMap)	
	
	for (var row = 0; row < _mapHeight; row++) {
		for (var col = 0; col < _mapWidth; col++) {
			resultMap[row][col] = applyRule(targetMap, settings, row, col)
		}
	}	
		
	return resultMap
}
