
var _mapWidth = 100
var _mapHeight = 100
var _squareSize = 5
var _generateHeight = true
var _generateForest = true


var _seaColor =  '#6B93B4'
var _groundColor =  '#748647'
var _forestColor =  '#406F4C'
var _mountainColor =  '#8F624C'

function emptySettings() {	
	var settings = {
		fillProportion: 50,
		totalPasses: 5,
		currentPass: 0,
		passType: "",
		rule: "",
		ruleValue: 1,
		neighborhood: "",
		range: 1,
	}
	
	return settings
}

function updateGlobalSettings() {	
	_mapWidth = document.getElementById('width').value
	_mapHeight = document.getElementById('height').value
	_squareSize = document.getElementById('squareSize').value
	_generateHeight =  document.getElementById('heightMap').checked
	_generateForest =  document.getElementById('forest').checked
	
    _seaColor = "#" + document.getElementById('seaColor').value
    _groundColor = "#" + document.getElementById('groundColor').value
    _mountainColor = "#" + document.getElementById('mountainColor').value
    _forestColor = "#" + document.getElementById('forestColor').value
}


function getDocumentSettings() {
	var settings = emptySettings()
	
	settings.fillProportion = parseFloat(document.getElementById('fillProportion').value)
	settings.totalPasses = parseInt(document.getElementById('passes').value)

	settings.passType = document.getElementById('pass_type').value
	
	settings.rule = document.getElementById('rule').value
	settings.ruleValue = parseFloat(document.getElementById('ruleValue').value)
	
	settings.neighborhood = document.getElementById('neighborhood').value
	
	settings.range = parseInt(document.getElementById('range').value)
	settings.range = Math.min(settings.range, _mapWidth)
	settings.range = Math.min(settings.range, _mapHeight)
	
	return settings
}