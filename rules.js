
function applyRule(lookupMap, settings, row, col) {	
	switch (settings.rule) {
		case "fixed":
			return fixedRule(lookupMap, settings, row, col)
			break;
		case "random":
			return randomRule(lookupMap, settings, row, col)
			break;
		default:
			return lookupMap[row][col]
			break;		
	}
}

function fixedRule(lookupMap, settings, row, col) {	
	var neighbourWalls = getNeighborhood(lookupMap, settings, row, col)
	
	var threshold = parseInt(settings.ruleValue)
	
	if (neighbourWalls > threshold) {
		return true
	} else if (neighbourWalls < threshold) {
		return false
	}	
	
	return lookupMap[row][col]
}

function randomRule(lookupMap, settings, row, col) {	
	var neighbourWalls = getNeighborhood(lookupMap, settings, row, col)
	
	var threshold = Math.min(settings.ruleValue, 100)
	threshold = neighbourWalls/10 * settings.ruleValue 
	
	var choice = Math.round((Math.random() * 100)) + 1 
	
	return choice >= threshold
}