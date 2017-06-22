
var squareColor =  '#6d6d6d'


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
