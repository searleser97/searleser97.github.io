var onclicktype = 'onclick';
var isTouchDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
if (isTouchDevice)
    onclicktype = 'ontouchstart';

var multiplier = [1, 8, 4, 2, 1];
var ledMatrix = [];
var hexOutput = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
var finalOutput = '';
$('#container').prepend('<br>' +
        '<button ' + onclicktype + '="insertToFinal()">Insert to Final Output</button>' +
        '<button ' + onclicktype + '="clearMat()">Clear Box</button>' +
        '<button ' + onclicktype + '="resetMat()">Reset All</button>');
function createMarix() {
    ledMatrix = [];
    hexOutput = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
    var table = '<div id="table"><table id="ledMatrix">';
    for (var i = 0; i < 5; i++) {
        var ledRow = [];
        table += '<tr>';
        for (var j = 0; j < 5; j++) {
            ledRow.push(0);
            table += '' +
                '<td>' +
                '<div class="led" ' + onclicktype + '="toggleLed(\'' + i + ',' + j + '\')" id="' + i + ',' + j + '"/>' +
                '</td>';
        }
        ledMatrix.push(ledRow);
        table += '</tr>';
    }

    table += '</table></div>';

    $('#container').prepend(table);
}

function removeMatrix() {
    $('#ledMatrix').remove();
}

function printMatrix(matrix) {
    out = '';
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            out += matrix[i][j] + ' ';
        }
        out += '\n';
    }
    console.log(out);
}

function toggleLed(id) {
    toggleLedColor(id);
    ledPos = id.split(',');
    y = ledPos[0];
    x = ledPos[1];
    var left = y * 2;
    var right = left + 1;
    ledMatrix[y][x] = ledMatrix[y][x] ^ 1;
    if (x == 0)
        hexOutput[left] = ledMatrix[y][0].toString(16).toUpperCase();
    else {
        if (ledMatrix[y][x] == 1) {
            hexOutput[right] = (parseInt(hexOutput[right], 16) + multiplier[x]).toString(16).toUpperCase();
        } else {
            hexOutput[right] = (parseInt(hexOutput[right], 16) - multiplier[x]).toString(16).toUpperCase();
        }
    }

    console.log(hexOutput);
    $('#hexOutput').html(hexOutput.join(''));
    printMatrix(ledMatrix);
}

function toggleLedColor(id) {
    document.getElementById(id).classList.toggle('red');
}

function insertToFinal() {
    finalOutput += $('#hexOutput').text() + '00';
    $('#finalHexOutput').text(finalOutput);
}

function clearMat() {
    removeMatrix();
    createMarix();
    $('#hexOutput').html(hexOutput.join(''));
}

function resetMat() {
    clearMat();
    finalOutput = '';
    $('#finalHexOutput').html(finalOutput);
}
createMarix();