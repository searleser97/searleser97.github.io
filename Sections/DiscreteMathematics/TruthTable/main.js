var unodos = 1;
var p = [];
var q = [];
var r = [];
var s = [];
var primerp = [];
var segundap = [];
var miniuno = [];
var minidos = [];
var minitres = [];
var mayoruno = [];
var mayordos = [];
var rys = [];
var subminitres = [];
for (var i = 0; i < 16; i++) {
    var valorp;
    var valorq;
    var valorr;
    var valors;
    if (i < 8) {
        valorp = 'V';
    } else {
        valorp = 'F';
    }
    if (i < 4 || (i > 7 && i < 12)) {
        valorq = 'V';
    } else {
        valorq = 'F';
    }
    if (unodos === 1 || unodos === 2) {
        valorr = 'V';
    } else {
        valorr = 'F';
        if (unodos === 4) {
            unodos = 0;
        }
    }
    unodos++;
    if (i % 2 === 0) {
        valors = 'V';
    } else {
        valors = 'F';
    }

    p.push(valorp);
    q.push(valorq);
    r.push(valorr);
    s.push(valors);
    if (r[i] === 'V' && s[i] === 'V') {
        rys.push('V');
    } else {
        rys.push('F');
    }
    $('#letters').append('' +
        '<tr id="row' + i + '">' +
        '<td class="bordes" id="p' + i + '">' + valorp + '</td>' +
        '<td class="bordes" id="q' + i + '">' + valorq + '</td>' +
        '<td class="bordes" id="r' + i + '">' + valorr + '</td>' +
        '<td class="bordes" id="s' + i + '">' + valors + '</td>' +
        '</tr>');
}


function primeraEval() {
    result = [];
    var dropdown = document.getElementById("negacion1");
    var selectedopt = dropdown.options[dropdown.selectedIndex].value;
    if (selectedopt === '2') {
        for (var i = 0; i < 16; i++) {
            if (p[i] === 'V') {
                result.push('F');
            } else {
                result.push('V');
            }
        }
    }
    return result;
}

function checkps() {
    var p1 = document.getElementById("negacion1");
    var p1opt = p1.options[p1.selectedIndex].value;
    var p2 = document.getElementById("negacion2");
    var p2opt = p2.options[p2.selectedIndex].value;
    if (p1opt === '2') {
        primerp = [];
        for (var i = 0; i < 16; i++) {
            if (p[i] === 'V') {
                primerp.push('F');
            } else {
                primerp.push('V');
            }
            console.log(primerp[i]);
        }
    } else {
        primerp = [];
        for (var j = 0; j < 16; j++) {
            primerp.push(p[j]);
        }
    }

    if (p2opt === '2') {
        segundap = [];
        for (var k = 0; k < 16; k++) {
            if (p[k] === 'V') {
                segundap.push('F');
            } else {
                segundap.push('V');
            }
        }
    } else {
        segundap = [];
        for (var l = 0; l < 16; l++) {
            segundap.push(p[l]);
        }
    }
}

function opminiuno() {
    miniuno = [];
    var opmini = document.getElementById("opmini1");
    var opminiopt = opmini.options[opmini.selectedIndex].value;

    switch (opminiopt) {
        case '1':
            for (var i = 0; i < q.length; i++) {
                if (q[i] === 'V' && primerp[i] === 'V') {
                    miniuno.push('V');
                } else {
                    miniuno.push('F');
                }
            }
            break;
        case '2':
            for (var j = 0; j < q.length; j++) {
                if (q[j] === 'V' || primerp[j] === 'V') {
                    miniuno.push('V');
                } else {
                    miniuno.push('F');
                }
            }
            break;
        case '3':
            for (var k = 0; k < q.length; k++) {
                if (primerp[k] === 'V' && q[k] === 'F') {
                    miniuno.push('F');
                } else {
                    miniuno.push('V');
                }
            }
            break;
        case '4':
            for (var l = 0; l < q.length; l++) {
                if (q[l] === primerp[l]) {
                    miniuno.push('V');
                } else {
                    miniuno.push('F');
                }
            }
            break;

    }
}

function opminidos() {
    minidos = [];
    var opmini = document.getElementById("opmini2");
    var opminiopt = opmini.options[opmini.selectedIndex].value;

    switch (opminiopt) {
        case '1':
            for (var i = 0; i < q.length; i++) {
                if (rys[i] === 'V' && segundap[i] === 'V') {
                    minidos.push('V');
                } else {
                    minidos.push('F');
                }
            }
            break;
        case '2':
            for (var j = 0; j < q.length; j++) {
                if (rys[j] === 'V' || segundap[j] === 'V') {
                    minidos.push('V');
                } else {
                    minidos.push('F');
                }
            }
            break;
        case '3':
            for (var k = 0; k < q.length; k++) {
                if (segundap[k] === 'V' && rys[k] === 'F') {
                    minidos.push('F');
                } else {
                    minidos.push('V');
                }
            }
            break;
        case '4':
            for (var l = 0; l < q.length; l++) {
                if (rys[l] === segundap[l]) {
                    minidos.push('V');
                } else {
                    minidos.push('F');
                }
            }
            break;

    }
}

function opminitres() {
    minitres = [];
    var opmini = document.getElementById("opmini3");
    var opminiopt = opmini.options[opmini.selectedIndex].value;

    switch (opminiopt) {
        case '1':
            for (var i = 0; i < 16; i++) {
                if (s[i] === 'V' && p[i] === 'V') {
                    minitres.push('V');
                } else {
                    minitres.push('F');
                }
            }
            break;
        case '2':
            for (var j = 0; j < 16; j++) {
                if (s[j] === 'V' || p[j] === 'V') {
                    minitres.push('V');
                } else {
                    minitres.push('F');
                }
            }
            break;
        case '3':
            for (var k = 0; k < 16; k++) {
                if (s[k] === 'V' && p[k] === 'F') {
                    minitres.push('F');
                } else {
                    minitres.push('V');
                }
            }
            break;
        case '4':
            for (var l = 0; l < 16; l++) {
                if (s[l] === p[l]) {
                    minitres.push('V');
                } else {
                    minitres.push('F');
                }
            }
            break;

    }
}

function opsubminitres() {
    subminitres = [];
    for (var i = 0; i < 16; i++) {
        if (r[i] === 'V' && minitres[i] === 'F') {
            subminitres.push('F');
        } else {
            subminitres.push('V');
        }
    }
}

function opmayoruno() {
    mayoruno = [];
    var opmini = document.getElementById("opmayor1");
    var opminiopt = opmini.options[opmini.selectedIndex].value;

    switch (opminiopt) {
        case '1':
            for (var i = 0; i < 16; i++) {
                if (miniuno[i] === 'V' && minidos[i] === 'V') {
                    mayoruno.push('V');
                } else {
                    mayoruno.push('F');
                }
            }
            break;
        case '2':
            for (var j = 0; j < 16; j++) {
                if (miniuno[j] === 'V' || minidos[j] === 'V') {
                    mayoruno.push('V');
                } else {
                    mayoruno.push('F');
                }
            }
            break;
        case '3':
            for (var k = 0; k < 16; k++) {
                if (miniuno[k] === 'V' && minidos[k] === 'F') {
                    mayoruno.push('F');
                } else {
                    mayoruno.push('V');
                }
            }
            break;
        case '4':
            for (var l = 0; l < 16; l++) {
                if (miniuno[l] === minidos[l]) {
                    mayoruno.push('V');
                } else {
                    mayoruno.push('F');
                }
            }
            break;

    }
}
function opmayordos() {
    mayordos = [];
    var opmini = document.getElementById("opmayor2");
    var opminiopt = opmini.options[opmini.selectedIndex].value;

    switch (opminiopt) {
        case '1':
            for (var i = 0; i < 16; i++) {
                if (mayoruno[i] === 'V' && subminitres[i] === 'V') {
                    mayordos.push('V');
                } else {
                    mayordos.push('F');
                }
            }
            break;
        case '2':
            for (var j = 0; j < 16; j++) {
                if (mayoruno[j] === 'V' || subminitres[j] === 'V') {
                    mayordos.push('V');
                } else {
                    mayordos.push('F');
                }
            }
            break;
        case '3':
            for (var k = 0; k < 16; k++) {
                if (mayoruno[k] === 'V' && subminitres[k] === 'F') {
                    mayordos.push('F');
                } else {
                    mayordos.push('V');
                }
            }
            break;
        case '4':
            for (var l = 0; l < 16; l++) {
                if (mayoruno[l] === subminitres[l]) {
                    mayordos.push('V');
                } else {
                    mayordos.push('F');
                }
            }
            break;

    }
}

function calcular() {
    $('#operationsT').find("tr:gt(0)").remove();
    checkps();
    opminiuno();
    opminidos();
    opminitres();
    opsubminitres();
    opmayoruno();
    opmayordos();
    for (var i = 0; i < 16; i++) {
        $('#operationsT').append('' +
            '<tr>' +
            '<td class="bordes">' + primerp[i] + '</td>' +
            '<td style="background: blue;" class="bordes">' + miniuno[i] + '</td>' +
            '<td class="bordes">' + q[i] + '</td>' +
            '<td style="background: red;" class="bordes">' + mayoruno[i] + '</td>' +
            '<td class="bordes">' + segundap[i] + '</td>' +
            '<td style="background: blue;" class="bordes">' + minidos[i] + '</td>' +
            '<td class="bordes">' + rys[i] + '</td>' +
            '<td style="background: green;" class="bordes">' + mayordos[i] + '</td>' +
            '<td class="bordes">' + r[i] + '</td>' +
            '<td style="background: red;" class="bordes">' + subminitres[i] + '</td>' +
            '<td class="bordes">' + s[i] + '</td>' +
            '<td style="background: blue;" class="bordes">' + minitres[i] + '</td>' +
            '<td class="bordes">' + p[i] + '</td>' +
            '</tr>');
    }

}
