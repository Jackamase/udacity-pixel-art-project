//Define variables for global access of Canvas, Draw and Erase.
const pixelCanvas = document.getElementById('pixelCanvas');
const drawMode = document.getElementById('draw_mode');
const eraseMode = document.getElementById('erase_mode');
const colorPicker = document.getElementById('colorPicker');

//The function to make different size grids according to user input.
function makeGrid() {
    let inputRows = document.getElementById('inputWidth').value;
    let inputColumns = document.getElementById('inputHeight').value;
    while (pixelCanvas.firstChild) {
        pixelCanvas.removeChild(pixelCanvas.firstChild);
        }
    pixelCanvas.style.setProperty('--grid-rows', inputRows);
    pixelCanvas.style.setProperty('--grid-cols', inputColumns);
    for (i=0; i < (inputColumns*inputRows); i++) {
        let pixel = document.createElement('div');
        pixelCanvas.appendChild(pixel).className = 'pixel';
    }
}

//Implement function to drag and draw (set as default).
let mouseDown = false;

function drawingMode() {
    const color = colorPicker.value;
    pixelCanvas.addEventListener('mousedown', function (pointer) {
        if (pointer.target.tagName = 'PIXEL') {
            pointer.target.style.backgroundColor = color;
        };
    });
    pixelCanvas.addEventListener('mousedown', function(pointer) {
        mouseDown = true;
        this.addEventListener('mouseup', function(){
            mouseDown = false;
        });
        this.addEventListener('mouseleave', function() {
            mouseDown = false;
        });
        this.addEventListener('mouseover', function(pointer) {
            if (mouseDown) {
                if (pointer.target.tagName = 'PIXEL') {
                    pointer.target.style.backgroundColor = color;
                };
            };
        });
    });
}

colorPicker.addEventListener('change', function() {
    drawingMode();
})

//Allow return to drawing mode.
drawMode.addEventListener('click', function() {
    drawingMode();
})

//Implement function to move into erase mode.
eraseMode.addEventListener('click', function() {
    pixelCanvas.addEventListener('mousedown', function(pointer) {
        if (pointer.target.tagName = 'PIXEL') {
            pointer.target.style.backgroundColor = null;
        };
    });
    pixelCanvas.addEventListener('mousedown', function(pointer){
        mouseDown = true;
        this.addEventListener('mouseup', function(){
            mouseDown = false;
        });
        this.addEventListener('mouseleave', function() {
            mouseDown = false;
        });
        this.addEventListener('mouseover', function(pointer) {
            if(mouseDown) {
                if (pointer.target.tagName = 'PIXEL') {
                    pointer.target.style.backgroundColor = null;
                };
            };
        });
    });
})

//reseting the values for grid size to default.
function resetValue() {
    document.getElementById("sizePicker").reset();
}

//fill the canvas with current selection of color.
function fillBackground() {
    const color = colorPicker.value;
    pixelCanvas.querySelectorAll('.pixel').forEach(pixel => pixel.style.backgroundColor = color);
} 

//remove all drawing in canvas.
function eraseDrawing() {
    makeGrid();
}

//setting the default for pixel art maker.
function defaultMode() {
    makeGrid();
    drawingMode();
};

defaultMode()
