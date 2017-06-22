'use strict'

var squareColor =  '#6d6d6d'

var map = [[]]

var settings = {
	width: 2,
	height: 2,
    squareSize: 5,
	fillProportion: 50,
	passes: 5,
}


function start() {
    addEventListeners()
    resizeCanvas()
	getSettings() 
	generateMap()
	draw()
}


function generateMap() {
	fillMap()
	fillSides()
	
    for (var i = 0; i < settings.passes; i++) {
		smoothMap()		
	}	
}


// --- Form handling --- //

function addEventListeners() {
    document.getElementById('form')
        .addEventListener('submit', generateButtonHandler)
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

function getSettings() {
	settings.width = document.getElementById('width').value
	settings.height = document.getElementById('height').value
    settings.squareSize = parseInt(document.getElementById('squareSize').value)
	settings.fillProportion = parseFloat(document.getElementById('fillProportion').value)
	settings.passes = parseInt(document.getElementById('passes').value)
}


// --- Canvas --- //

function getCanvas() {
    return document.getElementById('canvas')
}

function clearCanvas() {
    var canvas = getCanvas()
    getCanvasContext().clearRect(0, 0, canvas.width, canvas.height)
}

function resizeCanvas() {
    var canvas = getCanvas()
    canvas.width = document.body.offsetWidth
    canvas.height = document.body.offsetHeight
}

function getCanvasContext() {
    return getCanvas().getContext('2d')
}

// --- Drawing --- //

function drawSquare(ctx, x, y) {
    ctx.fillStyle = settings.squareColor
    ctx.fillRect(
        x,
        y,
        settings.squareSize,
        settings.squareSize)
}

function draw() {
    clearCanvas()
    var ctx = getCanvasContext()
	
	var startX = (canvas.width - settings.width*settings.squareSize)/2
	var startY = (canvas.height - settings.height*settings.squareSize)/2
			
	for (var row = 0; row < settings.height; row++) {
		var y = startY + row * settings.squareSize
		for (var col = 0; col < settings.width; col++) {
			var x = startX + col * settings.squareSize
			
			if (map[row][col]) {
				drawSquare(ctx, x, y)
			}
		}		
	}
}


// --- Map Generation --- // 

function fillSides() {
	for (var row = 0; row < settings.height; row++) {
		map[row][0] = true
		map[row][settings.width-1] = true
    }
	for (var col = 0; col < settings.width; col++) {	
		map[0][col] = true
		map[settings.height-1][col] = true
	}
}

function fillMap() {
    map = []
	for (var row = 0; row < settings.height; row++) {
		map[row] = []
		for (var col = 0; col < settings.width; col++) {	
			var value = Math.round((Math.random() * 100)) + 1 >= settings.fillProportion ? true : false
			map[row].push(value)
		}
    }
}

function smoothMap() {
		
	for (var row = 0; row < settings.height; row++) {
		for (var col = 0; col < settings.width; col++) {
			
			var neighbourWalls = getSurroundingWallCount(row, col)

			if (neighbourWalls > 4) {
				map[row][col] = true
			} else if (neighbourWalls < 4) {
				map[row][col] = false
			}

		}
	}
	
}

function getSurroundingWallCount(row, col) {
	var wallCount = 0

	var startRow = row > 0 ? row - 1 : row
	var endRow = row < settings.height - 1 ? row + 1 : row

	var startCol = col > 0 ? col - 1 : col
	var endCol = col < settings.width - 1 ? col + 1 : col

	for (var r = startRow; r <= endRow; r++) {
		for (var c = startCol; c <= endCol; c++) {
			if (!(r == row && c == col)) {
				wallCount += map[r][c]
			}
		}
	}

	return wallCount
}


start()
