
function stepValue (originalValue, attenuation, rangeStart, rangeEnd, numberOfSteps) {
	if (rangeEnd <= rangeStart) {
		return 0
	}
	
	var stepLength = (rangeEnd - rangeStart) / numberOfSteps
	
	var steppedValue = Math.round((originalValue * attenuation) / stepLength) * stepLength
	
	return steppedValue
}

function ruleOfThree (compareStart, compareEnd, rangeData) {
	return compareEnd*rangeData/compareStart
}