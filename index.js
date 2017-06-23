'use strict'

var settings = {
	width: 2,
	height: 2,
    squareSize: 5,
	fillProportion: 50,
	passes: 5,
	passType: "",
	rule: "",
	ruleValue: 1,
	neighborhood: "",
	range: 1,
}

var map = [[]]


function start() {
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
	settings.width = document.getElementById('width').value
	settings.height = document.getElementById('height').value
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
	
}


start()
