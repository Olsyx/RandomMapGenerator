
function applyRule(lookupMap, settings, row, col) {	
	switch (settings.rule) {
		case "fixed":
			return fixedRule(lookupMap, settings, row, col)
			
		case "random":
			return randomRule(lookupMap, settings, row, col)
		
		case "latitude":
			return latitudeRule(lookupMap, settings, row, col)
						
		case "randomLatitude":
			return randomLatitudeRule(lookupMap, settings, row, col)
			
		default:
			return lookupMap[row][col]
			
	}
}

function fixedRule(lookupMap, settings, row, col) {	
	var neighbourWalls = getNeighborhood(lookupMap, settings, row, col)
	var threshold = parseInt(settings.ruleValue)
	
	if (neighbourWalls > threshold) {
		return 1
	} else if (neighbourWalls < threshold) {
		return 0
	}
	return lookupMap[row][col]
}

function randomRule(lookupMap, settings, row, col) {	
	var neighbourWalls = getNeighborhood(lookupMap, settings, row, col)
	
	var threshold = Math.min(settings.ruleValue, 100)
	threshold = neighbourWalls/10 * settings.ruleValue 
	
	var choice = Math.round((Math.random() * 100)) + 1 
	
	return choice >= threshold ? 1 : 0
}

function latitudeRule(lookupMap, settings, row, col) {
	if (settings.currentPass > 0) {
		settings.rule = "fixed"
		settings.ruleValue = settings.range * 3.5 + 1 
		
		return randomRule(lookupMap, settings, row, col)
	}
	
	var neighbourWalls = getNeighborhood(lookupMap, settings, row, col)
	
	var thresholdRow = Math.floor(_mapHeight * settings.ruleValue/100)	
	var distance = Math.abs(thresholdRow - row)
	
	var distancePercentage = distance/_mapHeight * 100
	
	var steppedThreshold = stepValue(distancePercentage, 1, 0, 100, 8)
	
	var randomValue = Math.round((Math.random() * 100)) + 1
		
	return randomValue >= steppedThreshold + (100/3)
}

function randomLatitudeRule(lookupMap, settings, row, col) {
	settings.ruleValue = Math.round((Math.random() * 100)) + 1
	return latitudeRule(lookupMap, settings, row, col)	
}