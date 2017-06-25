


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

function drawSquare(ctx, x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(
        x,
        y,
        _squareSize,
        _squareSize)
}

function draw(targetMap, squareColor, noSquareColor) {
    clearCanvas()
    var ctx = getCanvasContext()
	drawMap(ctx, targetMap, squareColor, noSquareColor)
}

function addDraw(targetMap, squareColor, noSquareColor) {
    var ctx = getCanvasContext()
	drawMap(ctx, targetMap, squareColor, noSquareColor)
}

function drawMap(ctx, targetMap, squareColor, noSquareColor) {
	var startX = (canvas.width - _mapWidth * _squareSize)/2
	var startY = (canvas.height - _mapHeight * _squareSize)/2
			
	for (var row = 0; row < _mapHeight; row++) {
		var y = startY + row * _squareSize
		
		for (var col = 0; col < _mapWidth; col++) {
			var x = startX + col * _squareSize
			
			if (targetMap[row][col]) {
				drawSquare(ctx, x, y, squareColor)
			} else if (noSquareColor != null) {
				drawSquare(ctx, x, y, noSquareColor)
			}
		}		
	}
}