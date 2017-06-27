


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
	var startX = Math.floor((canvas.width - _mapWidth * _squareSize)/2)
	var startY = Math.floor((canvas.height - _mapHeight * _squareSize)/2)
			
	for (var row = 0; row < _mapHeight; row++) {
		var y = startY + row * _squareSize
		
		for (var col = 0; col < _mapWidth; col++) {
			var x = startX + col * _squareSize
			
			if (targetMap[row][col] != 0) {				
				drawSquare(ctx, x, y, squareColor)
			} else if (noSquareColor != null) {
				drawSquare(ctx, x, y, noSquareColor)
			}
		}		
	}
}

// --- Maths --- //

function lerp (a,  b,  step) {
    return (1 - step) * a + step * b;
}

function lerpColors (c1, c2, step) {
	var c3 = { r: 0, g: 0, b: 0}
	c3.r = lerp(c1.r, c2.r, step)
	c3.g = lerp(c1.g, c2.g, step)
	c3.b = lerp(c1.b, c2.b, step)
	return c3	
}

// --- https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}