var inn = '' +
    'A 0 A\n' +
    'A 1 A\n' +
    'A 0 B\n' +
    'A 1 C\n' +
    'B 0 D\n' +
    'C 1 D\n' +
    'D 0 D\n' +
    'D 1 D';
var file = '' +
    '00\n' +
    '000\n' +
    '01\n' +
    '1101\n' +
    '10101\n' +
    '0\n' +
    '11\n' +
    '1\n' +
    '10\n' +
    '110';
var acceptedStatesStr = 'D';
document.getElementById('linesToEval').value = file;
document.getElementById('fsm').value = inn;
document.getElementById('acStates').value = acceptedStatesStr;
document.getElementById('startPoint').value = 'A';
// global variables needed
var lineNumber = 0;
var acceptedOrRejected = [];
var way = [];
var interval;
var interval2;
var symbolPos = 0;
var fsm = {};
var nodesIds = {};
var color = 'blue';
var acceptedStates = {}
var nodes = [];
var edges = [{}];
var startPoints;
var lines;
var symbolsToPrint = [];
var lineSpan;
var nMaxlineNumberDigits;
var lineIsPending;
var isStartPoint = {};
var output = document.getElementById('output');
var stringOrChar = 2;
var isPDA = false;
var stacks = [];
var actualStatesWithItsStacks = [];

// end of global variables needed
function createFSM() {
    clearInterval(interval);
    fsm = {};
    nodesIds = {};
    acceptedStates = {}
    nodes = [];
    var edges = [{}];
    isStartPoint = {};
    startPoints = document.getElementById('startPoint').value.split(' ');
    var acceptedStatesArr = (document.getElementById('acStates').value).split('\n');
    for (var i in acceptedStatesArr)
        acceptedStates[acceptedStatesArr[i]] = true;
    for (st in startPoints)
        isStartPoint[startPoints[st]] = true;
    var fromTo = {};
    var lines = (document.getElementById('fsm').value).split('\n');
    for (var i in lines) {
        var line = lines[i];
        var values = line.split(' ');
        var from = values[0];
        var symbol = values[1];
        var to = values[2];
        if (nodesIds[from] === undefined) {
            var background = 'white';
            if (isStartPoint[from])
                background = 'lightgreen';
            if (acceptedStates[from])
                nodes.push({
                    id: from,
                    label: from,
                    color: {
                        background: background,
                        border: 'black'
                    },
                    borderWidth: 8,
                    physics: false,
                    value: 5
                });
            else
                nodes.push({
                    id: from,
                    label: from,
                    color: {
                        background: background,
                        border: 'black'
                    },
                    physics: false,
                    value: 5
                });
            nodesIds[from] = true;
        }
        if (nodesIds[to] === undefined) {
            var background = 'white';
            if (isStartPoint[to])
                background = 'lightgreen';
            if (acceptedStates[to])
                nodes.push({
                    id: to,
                    label: to,
                    color: {
                        background: background,
                        border: 'black'
                    },
                    borderWidth: 8,
                    physics: false,
                    value: 5
                });
            else
                nodes.push({
                    id: to,
                    label: to,
                    color: {
                        background: background,
                        border: 'black'
                    },
                    physics: false,
                    value: 5
                });
            nodesIds[to] = true;
        }
        if (fromTo[from] === undefined)
            fromTo[from] = {};
        if ((typeof fsm[from]) != 'object')
            fsm[from] = {};
        var stackOps = ['\\e', '\\e'];
        if (isPDA) {
            symbol = symbol.split(',');
            stackOps = [symbol[1], symbol[2]];
            symbol = symbol[0];
        }
        if (symbol[0] == '\\') {
            if (symbol[1] == 's') {
                symbol = ' ';
                if (fsm[from][symbol] == undefined)
                    fsm[from][symbol] = [];
                fsm[from][symbol].push([to, stackOps[0], stackOps[1]]);
                symbol = '\\s'
            } else if (symbol[1] == 'e') {
                symbol = '\\e';
                if (fsm[from][symbol] == undefined)
                    fsm[from][symbol] = [];
                fsm[from][symbol].push([to, stackOps[0], stackOps[1]]);
            } else {
                var start = symbol[2];
                var end = symbol[4];
                for (var i = start.charCodeAt(0); i < end.charCodeAt(0) + 1; i++) {
                    if (fsm[from][String.fromCharCode(i)] == undefined)
                        fsm[from][String.fromCharCode(i)] = [];
                    fsm[from][String.fromCharCode(i)].push([to, stackOps[0], stackOps[1]]);
                }
            }
        } else {
            if (fsm[from][symbol] == undefined) fsm[from][symbol] = [];
            fsm[from][symbol].push([to, stackOps[0], stackOps[1]]);
        }
        if (symbol[0] == '\\' && symbol[1] == '[')
            symbol = symbol.substr(1, 5);
        if (fromTo[from][to] === undefined) {
            if (isPDA)
                fromTo[from][to] = '{' + symbol + ',' + stackOps[0] + ',' + stackOps[1] + '}';
            else
                fromTo[from][to] = symbol;
        } else {
            if (isPDA)
                fromTo[from][to] = fromTo[from][to] + ',' + '{' + symbol + ',' + stackOps[0] + ',' + stackOps[1] + '}';
            else
                fromTo[from][to] = fromTo[from][to] + ',' + symbol;
        }
    }
    for (var from in fromTo) {
        for (var to in fromTo[from]) {
            // var randcolor = getRandomColor();
            var randcolor = randomColor({
                luminosity: 'dark'
            });
            var label = fromTo[from][to];
            edges.push({
                from: from,
                to: to,
                label: label,
                arrows: 'to',
                color: {
                    color: randcolor
                },
                font: {
                    strokeWidth: 5,
                    strokeColor: randcolor,
                    color: 'whitesmoke'
                },
                shadow: true,
                value: 0
            });
        }
    }
    // freeing space
    fromTo = undefined;
    nodesIds = undefined;
    /*console.log(fsm);
    console.log(acceptedStates);
    console.log(startPoint);
    console.log(nodes);
    console.log(edges);*/
    //create a network
    var container = document.getElementById('mynetwork');
    nodes = new vis.DataSet(nodes);
    edges = new vis.DataSet(edges);
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        // nodes: { borderWidth: 3 },
        // interaction: { hover: true }
        // edges: {
        //     smooth: {
        //         type: 'diagonalCross'
        //     }
        // }
    };
    var network = new vis.Network(container, data, options);
}

function setModeStringOrChar() {
    var textMode = document.getElementById("textMode");
    if (stringOrChar == 2) {
        textMode.innerHTML = '<b>STRING</b>';
        stringOrChar = 1;
    } else {
        textMode.innerHTML = '<b>CHARACTER</b>';
        stringOrChar = 2;
    }
}

getStateToken = {};

function getToken(lastMatchedState) {
    return getStateToken[lastMatchedState];
}

function evaluateLinesWithFSM(automata, str) {
    output.innerHTML = '';
    for (let i = 0; i < str.length; i++) {
        if (fsm.hasOwnPropert)
    }
}

function changeNodeColor(nodeId, color) {
    nodes.update([{
        id: nodeId,
        color: {
            background: color
        }
    }]);
}


function travelInStates() {
    if (lineIsPending) {
        printLineInterval();
        return;
    }

    if (symbolsToPrint[symbolPos] == '\0\0') {
        clearInterval(interval2);
        return;
    }
    lineSpan = document.createElement('span');
    lineSpan.id = 'line' + lineNumber;
    var nSpaces = nMaxlineNumberDigits - (parseInt(Math.log10(lineNumber)) + 1);
    var spaces = '';
    for (var i = 0; i < nSpaces; i++) {
        spaces += '&nbsp;&nbsp;';
    }
    lineSpan.innerHTML = spaces + lineNumber.toString() + ':&nbsp;';
    if (lineNumber > 0)
        output.innerHTML += '<br>';
    output.appendChild(lineSpan);
    output.scrollTop = output.scrollHeight;
    lineIsPending = true;
    printLineInterval();
}

function printLine() {
    if (symbolPos > 0) {
        var prevStates = way[symbolPos - 1];
        for (ps in prevStates) {
            if (isStartPoint[prevStates[ps][0]])
                changeNodeColor(prevStates[ps][0], 'lightgreen');
            else
                changeNodeColor(prevStates[ps][0], 'white');
        }
    }

    if (symbolsToPrint[symbolPos] == '\0') {
        var outputLine = document.getElementById('line' + lineNumber);
        if (acceptedOrRejected[lineNumber] != '') {
            outputLine.classList.add('highlightRed');
        } else {
            outputLine.classList.add('highlightGreen');
        }
        lineNumber += 1;
        symbolPos += 1;
        lineIsPending = false;
        clearInterval(interval2);
        travelInStates();
        return;
    }
    if (symbolsToPrint[symbolPos] == ' ')
        lineSpan.innerHTML += '&nbsp;';
    else
        lineSpan.innerHTML += symbolsToPrint[symbolPos];

    var states = way[symbolPos];
    for (s in states) {
        changeNodeColor(states[s][0], 'red');
    }
    symbolPos += 1;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function pause() {
    clearInterval(interval2);
}

function play() {
    travelInStates();
}

function printLineInterval() {
    interval2 = setInterval(function() {
        printLine()
    }, 1000);
}

function setPDA() {
    if (isPDA)
        isPDA = false;
    else
        isPDA = true;
}