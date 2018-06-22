hexagramNumbers = [
    [1, 34, 5, 26, 11, 9, 14, 43],
    [25, 51, 3, 27, 24, 42, 21, 17],
    [6, 40, 29, 4, 7, 59, 64, 47],
    [33, 62, 39, 52, 15, 53, 56, 31],
    [12, 16, 8, 23, 2, 20, 35, 45],
    [44, 32, 48, 18, 46, 57, 50, 28],
    [13, 55, 63, 22, 36, 37, 30, 49],
    [10, 54, 60, 41, 19, 61, 38, 58]
];


trigram = {};
trigram[777] = 0;
trigram[887] = 1;
trigram[878] = 2;
trigram[788] = 3;
trigram[888] = 4;
trigram[778] = 5;
trigram[787] = 6;
trigram[877] = 7;


trigramNames = {};
trigramNames[0] = "Ch'ien";
trigramNames[1] = "Chen";
trigramNames[2] = "K'an";
trigramNames[3] = "Ken";
trigramNames[4] = "K'un";
trigramNames[5] = "Sun";
trigramNames[6] = "Li";
trigramNames[7] = "Tui";


hexagramNames = {};
hexagramNames[1] = "Ch'ien";
hexagramNames[2] = "K'un";
hexagramNames[3] = "Chun";
hexagramNames[4] = "Meng";
hexagramNames[5] = "Hs&uuml;"
hexagramNames[6] = "Sung";
hexagramNames[7] = "Shih";
hexagramNames[8] = "Pi";
hexagramNames[9] = "Hsiao Ch'u";
hexagramNames[10] = "L&uuml;";
hexagramNames[11] = "T'ai";
hexagramNames[12] = "P'i";
hexagramNames[13] = "T'ung Jen";
hexagramNames[14] = "Ta Yu";
hexagramNames[15] = "Ch'ien";
hexagramNames[16] = "Y&uuml";
hexagramNames[17] = "Sui";
hexagramNames[18] = "Ku";
hexagramNames[19] = "Lin";
hexagramNames[20] = "Kuan";
hexagramNames[21] = "Shih Ho";
hexagramNames[22] = "Pi";
hexagramNames[23] = "Po";
hexagramNames[24] = "Fu";
hexagramNames[25] = "Wu Wang";
hexagramNames[26] = "Ta Ch'u";
hexagramNames[27] = "I";
hexagramNames[28] = "Ta Kuo";
hexagramNames[29] = "K'an";
hexagramNames[30] = "Li";
hexagramNames[31] = "Hsien";
hexagramNames[32] = "Heng";
hexagramNames[33] = "Tun";
hexagramNames[34] = "Ta Chuang";
hexagramNames[35] = "Chin";
hexagramNames[36] = "Ming I";
hexagramNames[37] = "Chia Jen";
hexagramNames[38] = "K'uei";
hexagramNames[39] = "Chien";
hexagramNames[40] = "Hsieh";
hexagramNames[41] = "Sun";
hexagramNames[42] = "I";
hexagramNames[43] = "Kuai";
hexagramNames[44] = "Kou";
hexagramNames[45] = "Ts'ui";
hexagramNames[46] = "Sheng";
hexagramNames[47] = "K'un";
hexagramNames[48] = "Ching";
hexagramNames[49] = "Ko";
hexagramNames[50] = "Ting";
hexagramNames[51] = "Chen";
hexagramNames[52] = "Ken";
hexagramNames[53] = "Chien";
hexagramNames[54] = "Kuei Mei";
hexagramNames[55] = "Feng";
hexagramNames[56] = "L&uuml";
hexagramNames[57] = "Sun";
hexagramNames[58] = "Tui";
hexagramNames[59] = "Huan";
hexagramNames[60] = "Chieh";
hexagramNames[61] = "Chung Fu";
hexagramNames[62] = "Hsiao Kuo";
hexagramNames[63] = "Chi Chi";
hexagramNames[64] = "Wei Chi";


function createTrigramTable() {
    var table = document.getElementById('trigramTable');
    htmlTable = '<table style="border-collapse: collapse;">' +
        '<tr style="border-bottom: 3px solid black;">' +
        '<td>Trigrama Superior</td>';

    for (var i = 0; i < 8; i++) {
        htmlTable += '<td style="padding: 5px;">' +
        '<div style="display: flex; width:50px; height:50px; background: url(images/trigrams/' + i + '.svg) no-repeat; background-size: 100% 100%;"></div>' +
        '<div style="display: flex; width: 100%; align-items: center; flex-direction: column;">' + trigramNames[i] + '</div></td>';
    }
    htmlTable += '' +
        '</tr>' +
        '<tr><td style="display: flex; border-right: 3px solid black; padding: 5px; align-items: center;">Trigrama Inferior</td></tr>';

    for (var i = 0; i < 8; i++) {

        htmlTable += '<tr>';
        htmlTable += '<td style="display: flex; align-items: center; border-right: 3px solid black; padding: 5px;">'+
        '<div style="display: flex; width:50px; height:50px; background: url(images/trigrams/' + i + '.svg) no-repeat; background-size: 100% 100%;"></div>' +
        '<div style="display: flex; width: 100%; align-items: center; flex-direction: column;">' + trigramNames[i] + '</div></td>' +
        '</td>';
        for (var j = 0; j < 8; j++) {
            htmlTable += '<td style="color: darkblue; font-weight: bold;" id="hexId_' + hexagramNumbers[i][j] + '">' + hexagramNumbers[i][j] + '</td>';
        }
        htmlTable += '</tr>';
    }
    htmlTable += '</table>';
    table.innerHTML = htmlTable;
}

createTrigramTable();

class Line {
    constructor(n1, n2, n3) {
        this.n1 = n1;
        this.n2 = n2;
        this.n3 = n3;
        this.id = n1 + n2 + n3;
        this.isMutant = false;
        if (this.id == 6 || this.id == 9) {
            this.isMutant = true;
        }
    }
};

class Hexagram {
    constructor() {
        this.isMutant = false;
        this.lines = [];
        this.id = undefined;
        this.name = undefined;
        this.upperTrigram = undefined;
        this.lowerTrigram = undefined;
        this.isComplete = false;
        this.numberOfMutantLines = 0;
    }

    add(line) {
        console.log('ADDING: ' + line.id)
        if (this.lines.length == 6 || (line.id != 6 && line.id != 7 && line.id != 8 && line.id != 9))
            return false;
        this.lines.push(line);
        if (line.isMutant) {
            this.numberOfMutantLines++;
            this.isMutant = true;
        }
        if (this.lines.length == 6) {
            this.isComplete = true;
            if (!this.isMutant) {
                this.upperTrigram = parseInt(this.lines[5].id + '' + this.lines[4].id + '' + this.lines[3].id);
                this.lowerTrigram = parseInt(this.lines[3].id + '' + this.lines[2].id + '' + this.lines[1].id);
                this.id = hexagramNumbers[trigram[this.lowerTrigram]][trigram[this.upperTrigram]];
                this.name = hexagramNames[this.id];
            }
        }
        return true;
    }

    pop() {
        if (this.lines.length == 0)
            return false;

        if (this.lines.pop().isMutant) {
            if (--this.numberOfMutantLines == 0) {
                this.isMutant = false;
            }
        }

        this.isComplete = false;
        this.id = undefined;
        this.name = undefined;
        return true;
    }

    getTopLine() {
        return this.lines[this.lines.length - 1];
    }

    reset() {
        this.principal = []
        this.alternative1 = []
        this.alternative2 = []
    }
};

var hexagram = new Hexagram();
var alternative1 = new Hexagram();
var alternative2 = new Hexagram();

function getLineDiv(lineType) {
    var widths = ['0', '50%'];
    var value = '';
    var values = { 6: 'X', 9: 'O', 7: '', 8: '' };
    if (lineType != 7) {
        widths[0] = '10%';
        widths[1] = '45%';
    }

    html = '' +
        '<div class="line">' +
        '<div class="line_left" style="width: ' + widths[1] + ';"></div>' +
        '<div class="line_center" style="width: ' + widths[0] + ';">' + values[lineType] + '</div>' +
        '<div class="line_right" style="width: ' + widths[1] + ';"></div>' +
        '</div>';
    return html;
}

function updateHexagramView() {
    var hex1 = document.getElementById('hex1');
    var hex2 = document.getElementById('hex2');
    var hex3 = document.getElementById('hex3');
    var htmlhex1 = '';
    var htmlhex2 = '';
    var htmlhex3 = '';
    for (var i = 0; i < hexagram.lines.length; i++) {
        htmlhex1 = getLineDiv(hexagram.lines[i].id) + htmlhex1;
        if (hexagram.isMutant) {
            htmlhex2 = getLineDiv(alternative1.lines[i].id) + htmlhex2;
            htmlhex3 = getLineDiv(alternative2.lines[i].id) + htmlhex3;
        }
    }
    if (hexagram.isComplete) {
        var nameStyle = 'display: flex; margin-top: 20px; font-weight: bold;';
        var border = '3px solid green';
        var background = 'lightgreen';
        if (hexagram.isMutant) {
            htmlhex2 += '<div style="' + nameStyle + '">' + alternative1.id + '.' + alternative1.name + '</div>';
            htmlhex3 += '<div style="' + nameStyle + '">' + alternative2.id + '.' + alternative2.name + '</div>';
            document.getElementById('hexId_' + alternative1.id).style['border'] = border;
            document.getElementById('hexId_' + alternative2.id).style['border'] = border;

            document.getElementById('hexId_' + alternative1.id).style['background-color'] = background;
            document.getElementById('hexId_' + alternative2.id).style['background-color'] = background;
        } else {
            htmlhex1 += '<div style="' + nameStyle + '">' + hexagram.id + '.' + hexagram.name + '</div>';
            document.getElementById('hexId_' + hexagram.id).style['border'] = border;
            document.getElementById('hexId_' + hexagram.id).style['background-color'] = background;
        }
    } else {
        createTrigramTable();
    }
    hex1.innerHTML = htmlhex1;
    hex2.innerHTML = htmlhex2;
    hex3.innerHTML = htmlhex3;
}

function add() {
    var in1 = parseInt(document.getElementById('in1').value);
    var in2 = parseInt(document.getElementById('in2').value);
    var in3 = parseInt(document.getElementById('in3').value);

    var line = new Line(in1, in2, in3);
    if (hexagram.add(line)) {
        if (line.id == 6) {
            alternative1.add(new Line(2, 3, 3));
            alternative2.add(new Line(2, 2, 3));
        } else if (line.id == 9) {
            alternative1.add(new Line(2, 2, 3));
            alternative2.add(new Line(2, 3, 3));
        } else {
            alternative1.add(line);
            alternative2.add(line);
        }
        updateHexagramView();
        if (hexagram.isComplete)
            console.log('id: ' + hexagram.id)
        if (alternative1.isComplete)
            console.log('id: ' + alternative1.id)
        if (alternative2.isComplete)
            console.log('id: ' + alternative2.id)
    }
}

function pop() {
    hexagram.pop();
    updateHexagramView();
}

function reset() {
    hexagram = new Hexagram();
    alternative1 = new Hexagram();
    alternative2 = new Hexagram();
    updateHexagramView();
}