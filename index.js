'use strict'

function start() {
    addEventListeners()
    resizeCanvas()
	updateGlobalSettings() 
	
	generateMap()
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
	
	updateGlobalSettings();
	
    clearCanvas()
    resizeCanvas()
	
    generateMap()
}

function nextPassButtonHandler(e) {
    nextPass()
}


// --- Main --- //

start()
