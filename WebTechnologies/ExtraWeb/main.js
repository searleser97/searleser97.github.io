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

hexagramDescription = {}

hexagramDescription[1] = '1. Cielo. Lo creativo. El principio generador'
hexagramDescription[2] = '2. Tierra. Lo receptivo. El principio pasivo'
hexagramDescription[3] = '3. Acumular. El obstáculo inicial. La dificultad del comienzo'
hexagramDescription[4] = '4. Juventud. El joven necio. La inmadurez.'
hexagramDescription[5] = '5. Esperar. La espera. La maduración.'
hexagramDescription[6] = '6. Disputar. El conflicto. El pleito.'
hexagramDescription[7] = '7. Ejército. La legión.'
hexagramDescription[8] = '8. Solidaridad. La unión'
hexagramDescription[9] = '9. Animalito doméstico. La pequeña fuerza'
hexagramDescription[10] = '10. Caminar. El porte. El paso cauteloso'
hexagramDescription[11] = '11. Prosperidad. La paz. La armonía.'
hexagramDescription[12] = '12. Cierre. El estancamiento. Lo inerte.'
hexagramDescription[13] = '13. Hombres Reunidos. La unión comunitaria'
hexagramDescription[14] = '14. Gran dominio. La gran posesión. Lo que se tiene de más.'
hexagramDescription[15] = '15. Condescendencia. La modestia. La humildad'
hexagramDescription[16] = '16. Ocuparse. El entusiasmo. La algarabía.'
hexagramDescription[17] = '17. Conformarse. La continuidad. El seguimiento.18. Destrucción. La reconstrucción. La labor en lo corrompido.'
hexagramDescription[18] = '18. Destrucción. La reconstrucción. La labor en lo corrompido.'
hexagramDescription[19] = '19. Acercarse. Lo que va llegando.'
hexagramDescription[20] = '20. Observar. La contemplación.'
hexagramDescription[21] = '21. Quebrar mordiendo. La dentellada. La filosa mordedura'
hexagramDescription[22] = '22. Adornar. La elegancia. La gracia.'
hexagramDescription[23] = '23. Resquebrajar. La desintegración. El derrumbe'
hexagramDescription[24] = '24. Regresar. El retorno. Lo que vuelve.'
hexagramDescription[25] = '25. Sinceridad. La inocencia. La naturalidad.'
hexagramDescription[26] = '26. Fuerza educadora. El poder de lo fuerte. La gran acumulación.'
hexagramDescription[27] = '27. Nutrirse. La alimentación. Las fauces.'
hexagramDescription[28] = '28. Excesos. La preponderancia de lo grande.'
hexagramDescription[29] = '29. Peligro. Lo abismal. La caida.'
hexagramDescription[30] = '30. Distinguir. El resplandor. Lo adherente.'
hexagramDescription[31] = '31. Unir. La influencia.La atracción.'
hexagramDescription[32] = '32. Luna Creciente. La duración. La permanencia.'
hexagramDescription[33] = '33. Retirarse. EL repliegue.'
hexagramDescription[34] = '34. Gran fuerza. El gran vigor.'
hexagramDescription[35] = '35. Progresar. El avance.'
hexagramDescription[36] = '36. Luz que se apaga. El oscurecimiento.'
hexagramDescription[37] = '37. Gente de familia. El clan.'
hexagramDescription[38] = '38. Contraste. La oposición. El antagonismo.'
hexagramDescription[39] = '39. Dificultad. El obstáculo. El impedimento.'
hexagramDescription[40] = '40. Explicar. La liberación. El alivio.'
hexagramDescription[41] = '41. Perder. La disminución.'
hexagramDescription[42] = '42. Evolución. El aumento. La ganancia.'
hexagramDescription[43] = '43. Decidir. El desbordamiento. La resolución.'
hexagramDescription[44] = '44. Encontrarse. El acoplamiento.'
hexagramDescription[45] = '45. Cosechar. La reunión. La convergencia.'
hexagramDescription[46] = '46. Subir. El ascenso. La escalada.'
hexagramDescription[47] = '47. Angustia. La pesadumbre. El agotamiento.'
hexagramDescription[48] = '48. El pozo de agua. La fuente.'
hexagramDescription[49] = '49. Renovar. La revolución. El cambio'
hexagramDescription[50] = '50. La caldera. Lo alquímico'
hexagramDescription[51] = '51. Trueno. La conmoción. Lo suscitativo.'
hexagramDescription[52] = '52. Cimientos. La quietud. La detención.'
hexagramDescription[53] = '53. Evolución. El progreso gradual.'
hexagramDescription[54] = '54. Desposar a la hija menor. La doncella.'
hexagramDescription[55] = '55. Abundancia. La plenitud.'
hexagramDescription[56] = '56. Viajero. El andariego'
hexagramDescription[57] = '57. Viento. Lo penetrante. Lo suave.'
hexagramDescription[58] = '58. Recogerse. La serenidad. La satisfacción.'
hexagramDescription[59] = '59. Confusión. La dispersión. La disolución'
hexagramDescription[60] = '60. Moderación. La restricción. La limitación'
hexagramDescription[61] = '61. Fe Interior. La verdad interior. La sinceridad interna.'
hexagramDescription[62] = '62. Pequeñas cosas importantes. La pequeña preponderancia.63. Conclusiones. Después de la realización.'
hexagramDescription[63] = '63. Conclusiones. Después de la realización.'
hexagramDescription[64] = '64. Inconcluso. Antes de la realización.'

var isFirstTime = true;

function createTrigramTable() {
    var animation = '';
    if (!isFirstTime)
        animation = 'animation: none;';
    isFirstTime = false;
    var table = document.getElementById('trigramTable');
    htmlTable = '<table style="border-collapse: collapse; ' + animation + '">' +
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
        '<div style="display: flex; width:50%; height:50px; background: url(images/trigrams/' + i + '.svg) no-repeat; background-size: 100% 100%;"></div>' +
        '<div style="display: flex; width: 50%; align-items: center; flex-direction: column;">' + trigramNames[i] + '</div></td>' +
        '</td>';
        for (var j = 0; j < 8; j++) {
            htmlTable += '<td style="color: darkblue; font-weight: bold;" ><div class="td" id="hexId_' + hexagramNumbers[i][j] + '">' + hexagramNumbers[i][j] + '</div></td>';
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
        this.description = undefined;
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
                this.lowerTrigram = parseInt(this.lines[2].id + '' + this.lines[1].id + '' + this.lines[0].id);
                console.log(this.upperTrigram)
                console.log(this.lowerTrigram)
                this.id = hexagramNumbers[trigram[this.lowerTrigram]][trigram[this.upperTrigram]];
                this.name = hexagramNames[this.id];
                this.description = hexagramDescription[this.id];
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
        this.upperTrigram = undefined;
        this.lowerTrigram = undefined;
        this.description = '';
        return true;
    }

    getTopLine() {
        return this.lines[this.lines.length - 1];
    }

    reset() {
        this.isMutant = false;
        this.lines = [];
        this.id = undefined;
        this.name = undefined;
        this.upperTrigram = undefined;
        this.lowerTrigram = undefined;
        this.isComplete = false;
        this.numberOfMutantLines = 0;
        this.description = '';
    }
};

var hexagram = new Hexagram();
var alternative1 = new Hexagram();
var alternative2 = new Hexagram();

function getLineDiv(lineType, isLast, action) {
    var widths = ['0', '50%'];
    var value = '';
    var values = { 6: 'X', 9: 'O', 7: '', 8: '' };
    var border = '';
    if (lineType != 7) {
        widths[0] = '10%';
        widths[1] = '45%';
    }
    if (lineType == 9)
        border = 'border-bottom: 2px solid black';
    var style = '';
    if (isLast) {
        if (action == 'add')
            style = 'animation-name: newLine;animation-duration: 1s;';
    }
    html = '' +
        '<div class="line" style="' + style + '">' +
        '<div class="line_left" style="width: ' + widths[1] + ';"></div>' +
        '<div class="line_center" style="width: ' + widths[0] + ';' + border + '">' + values[lineType] + '</div>' +
        '<div class="line_right" style="width: ' + widths[1] + ';"></div>' +
        '</div>';
    return html;
}

function updateHexagramView(action) {
    var hex1 = document.getElementById('hex1');
    var hex2 = document.getElementById('hex2');
    var hex3 = document.getElementById('hex3');
    hex1.style['display'] = 'flex';
    var htmlhex1 = '';
    var htmlhex2 = '';
    var htmlhex3 = '';
    for (var i = 0; i < hexagram.lines.length; i++) {
        var isLast = i == (hexagram.lines.length - 1);
        htmlhex1 = getLineDiv(hexagram.lines[i].id, isLast, action) + htmlhex1;
        if (hexagram.isMutant) {
            hex2.style['display'] = 'flex';
            hex3.style['display'] = 'flex';
            htmlhex2 = getLineDiv(alternative1.lines[i].id, isLast, action) + htmlhex2;
            htmlhex3 = getLineDiv(alternative2.lines[i].id, isLast, action) + htmlhex3;
        } else {
            hex2.style['display'] = 'none';
            hex3.style['display'] = 'none';
        }
    }
    if (hexagram.isComplete) {
        // createTrigramTable();
        var nameStyle = 'display: flex; margin-top: 20px; font-weight: bold;';
        var border = '3px solid green';
        var border_radius = '30%';
        var background = 'lightgreen';
        if (hexagram.isMutant) {
            htmlhex2 += '<div class="hexname" style="' + nameStyle + '">' + alternative1.id + '.' + alternative1.name + '</div>';
            htmlhex3 += '<div class="hexname" style="' + nameStyle + '">' + alternative2.id + '.' + alternative2.name + '</div>';
            
            document.getElementById('hexId_' + alternative1.id).style['border'] = border;
            document.getElementById('hexId_' + alternative1.id).style['background-color'] = background;
            document.getElementById('hexId_' + alternative1.id).style['border-radius'] = border_radius;

            document.getElementById('hexId_' + alternative2.id).style['border'] = border;
            document.getElementById('hexId_' + alternative2.id).style['background-color'] = background;
            document.getElementById('hexId_' + alternative2.id).style['border-radius'] = border_radius;
        } else {
            htmlhex1 += '<div style="' + nameStyle + '">' + hexagram.id + '.' + hexagram.name + '</div>';
            document.getElementById('hexId_' + hexagram.id).style['border'] = border;
            document.getElementById('hexId_' + hexagram.id).style['background-color'] = background;
            document.getElementById('hexId_' + hexagram.id).style['border-radius'] = border_radius;
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
        updateHexagramView('add');
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
    alternative1.pop();
    alternative2.pop();
    updateHexagramView('pop');
}

function reset() {
    hexagram = new Hexagram();
    alternative1 = new Hexagram();
    alternative2 = new Hexagram();
    isFirstTime = true;
    updateHexagramView('reset');
}

var description = '<center>DESCRIPCI&Oacute;N</center><br>';

//desc - short for description
desc = document.getElementById('description');
function hex1Desc() {
    if (hexagram.description != '' && hexagram.description != undefined)
        desc.innerHTML = description + hexagram.description;
    else
        desc.innerHTML = description;
}

function hex2Desc() {
    if (alternative1.description != '' && alternative1.description != undefined)
        desc.innerHTML = description + alternative1.description;
    else
        desc.innerHTML = description;
}

function hex3Desc() {
    if (alternative2.description != '' && alternative2.description != undefined)
        desc.innerHTML = description + alternative2.description;
    else
        desc.innerHTML = description;
}