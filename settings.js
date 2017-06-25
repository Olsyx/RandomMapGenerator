
var _mapWidth = 2
var _mapHeight = 2
var _squareSize = 5
var _squareColor =  '#6d6d6d'

function emptySettings() {	
	var settings = {
		fillProportion: 50,
		passes: 5,
		passType: "",
		rule: "",
		ruleValue: 1,
		neighborhood: "",
		range: 1,
		river: false,
	}
	
	return settings
}

function updateGlobalSettings() {	
	_mapWidth = document.getElementById('width').value
	_mapHeight = document.getElementById('height').value
    _squareSize = parseInt(document.getElementById('squareSize').value)
}


function getDocumentSettings() {
	var settings = emptySettings()
	
	settings.fillProportion = parseFloat(document.getElementById('fillProportion').value)
	settings.passes = parseInt(document.getElementById('passes').value)

	settings.passType = document.getElementById('pass_type').value
	
	settings.rule = document.getElementById('rule').value
	settings.ruleValue = parseFloat(document.getElementById('ruleValue').value)
	
	settings.neighborhood = document.getElementById('neighborhood').value
	
	settings.range = parseInt(document.getElementById('range').value)
	settings.range = Math.min(settings.range, settings.width)
	settings.range = Math.min(settings.range, settings.height)
	
	settings.river =  document.getElementById('river').checked
	
	return settings
}