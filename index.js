'use strict'

var squareColor =  '#6d6d6d'
var boardWidth = 0
var boardHeight = 0

var map = [[]]

var settings = {
	width: 2,
	height: 2,
    squareSize: 5
}


function start() {
    addEventListeners()
    resizeCanvas()
	generateMap()
	draw()
}


function generateMap() {
	fillMap()
	
    for (var i = 0; i < settings.width; i++) {
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
    boardWidth = document.body.offsetWidth / settings.squareSize
    boardHeight = document.body.offsetHeight / settings.squareSize
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
        settings.squareSize * x,
        settings.squareSize * y,
        settings.squareSize,
        settings.squareSize)
}

function draw() {
    clearCanvas()
    var ctx = getCanvasContext()
	
	var startX = (boardWidth - width*settings.squareSize)/2
	var startY = (boardHeight - height*settings.squareSize)/2
			
	for (var row = 0; row < settings.height; row++) {
		var y = startY + row * settings.squareSize
			alert(y)
		for (var col = 0; col < settings.width; col++) {
			var x = startX + col * settings.squareSize
			
			if (map[row][col]) {
				drawSquare(ctx, x, y)
			}
		}		
	}
}


// --- Map Generation --- // 

function fillMap() {
    map = []
	for (var row = 0; row < settings.height; row++) {
		map[row] = []
		for (var col = 0; col < settings.width; col++) {	
			var value = Math.round(Math.random()) === 1 ? true : false
			map[row].push(value)
		}
    }
}

function smoothMap() {
		
	for (var row = 0; row < settings.height; row++) {
		for (var col = 0; col < settings.width; col++) {
			
			var neighbourWalls = GetSurroundingWallCount(row, col)

			if (neighbourWalls > 4) {
				map[row][col] = 1
			} else if (neighbourWalls < 4) {
				map[row][col] = 0
			}

		}
	}
	
}

function GetSurroundingWallCount(row, col) {
	var wallCount = 0

	var startRow = row > 0 ? row - 1 : row
	var endRow = row < height - 1 ? row + 1 : row

	var startCol = col > 0 ? col - 1 : col
	var endCol = col < width - 1 ? col + 1 : col

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
