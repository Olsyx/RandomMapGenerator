'use strict'

var settings = {
	width: 30,
	height: 30,
    squareSize: 5,
	fillProportion: 50,
	passes: 5,
	passType: "simple",
	rule: "fixed",
	ruleValue: 1,
	neighborhood: "moore",
	range: 1,
}

var defaultSettingsJSON = JSON.stringify(settings)

var map = [[]]


function start() {
	readSettingsFromHashStorage()
	setSettings()
    addEventListeners()
    resizeCanvas()
	getSettings() 
	generateMap()
	draw()
}


// --- Form handling --- //

function addEventListeners() {
    document.getElementById('form')
        .addEventListener('submit', generateButtonHandler)
    document.getElementById('nextPassButton')
        .addEventListener('click', nextPassButtonHandler)
}

function generateButtonHandler(e) {
    e.preventDefault()
	getSettings();
	
    clearCanvas()
    resizeCanvas()
    generateMap()
		
    setTimeout(function() {
        draw()
    }, 0)
}

function nextPassButtonHandler(e) {
    nextPass()
}

function getSettings() {
	settings.width = parseInt(document.getElementById('width').value)
	settings.height = parseInt(document.getElementById('height').value)
    settings.squareSize = parseInt(document.getElementById('squareSize').value)
	settings.fillProportion = parseFloat(document.getElementById('fillProportion').value)
	settings.passes = parseInt(document.getElementById('passes').value)

	settings.passType = document.getElementById('pass_type').value
	
	settings.rule = document.getElementById('rule').value
	settings.ruleValue = parseFloat(document.getElementById('ruleValue').value)
	
	settings.neighborhood = document.getElementById('neighborhood').value
	
	settings.range = parseInt(document.getElementById('range').value)
	settings.range = Math.min(settings.range, settings.width)
	settings.range = Math.min(settings.range, settings.height)

	if (defaultSettingsJSON !== JSON.stringify(settings)) {
		hashStorage.set(settings)
	} else {
		hashStorage.set(null)
	}
}

function readSettingsFromHashStorage() {
	var settingsFromStorage = hashStorage.get()
	if (settingsFromStorage) {
		settings = settingsFromStorage
	}
}

function setSettings() {
	document.getElementById('width').value = settings.width
	document.getElementById('height').value = settings.height
	document.getElementById('squareSize').value = settings.squareSize
	document.getElementById('fillProportion').value = settings.fillProportion
	document.getElementById('passes').value = settings.passes

	document.getElementById('pass_type').value = settings.passType
	
	document.getElementById('rule').value = settings.rule
	document.getElementById('ruleValue').value = settings.ruleValue

	document.getElementById('neighborhood').value = settings.neighborhood
	
	document.getElementById('range').value = settings.range
}

start()
