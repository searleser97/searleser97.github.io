var verSerie = false;

function factorial(n) {
    if (n === 0) {
        return 1;
    }
    for (var i = n; i > 1; i--) {
        n = n * (i - 1);
    }
    return n;
}

function combinatoria(n1, n2) {
    var result = Math.round(factorial(n1) / (factorial(n1 - n2) * factorial(n2)));
    return result;
}

function potencia(a, b) {
    a = parseFloat(a, 10);
    b = parseFloat(b, 10);
    var result = 0;
    if (a === 0 && b === 0) {
        result = undefined;
    } else {
        result = Math.pow(a, b);
    }
    return result;
}

function coefnewtonbinomial() {
    var a = document.getElementById('a').value;
    var b = document.getElementById('b').value;
    var n = document.getElementById('n').value;
    var coef = 0;
    a = parseFloat(a, 10);
    b = parseFloat(b, 10);
    n = parseFloat(n, 10);
    if (n < 4) {
        return undefined;
    } else {
        coef = combinatoria(n, 4) * potencia(a, n - 4) * potencia(b, 4);
    }
    return coef;
}



function numeros(esec) {
    var tecla;
    if (window.event)
        tecla = esec.keyCode;
    else
    if (esec.which)
        tecla = esec.which;

    if (tecla === 8) {
        return true;
    } else if (tecla === 45) {
        var elemnt = document.getElementById(window.event.target.id).value;
        if (elemnt.indexOf('-') === -1) {
            return true;
        } else {
            return false;
        }
    } else if (tecla === 46) {
        var elemnt2 = document.getElementById(window.event.target.id).value;
        if (elemnt2.indexOf('.') === -1) {
            return true;
        } else {
            return false;
        }
    }

    var patron = /[0-9]/;
    var te = String.fromCharCode(tecla);
    return patron.test(te);
}

function numeros2(esec) {
    var tecla;
    if (window.event)
        tecla = esec.keyCode;
    else
    if (esec.which)
        tecla = esec.which;

    if (tecla === 8) {
        return true;
    }

    var patron = /[0-9]/;
    var te = String.fromCharCode(tecla);
    return patron.test(te);
}

function ainput() {
    verTodo();
    var result = document.getElementById('result');
    var a = document.getElementById('a').value;
    var b = document.getElementById('b').value;
    var n = document.getElementById('n').value;
    if (a !== '' && b !== '' && n !== '') {
        coef = coefnewtonbinomial();
        var error = document.getElementById('error');
        if (coef === undefined) {
            error.innerHTML = 'El exponente " <i>n</i> " NO debe ser menor a 4';
        } else if (isNaN(coef)) {
            error.innerHTML = 'El resultado es indefinido, causa: 0<span class="exponente">0</span> o no se introdujo un numero valido';
        } else {
            coef = coef.toFixed(2).toString();
            error.innerHTML = '';
            var dotindex = coef.indexOf('.');
            var numnextodot = coef.substring(dotindex + 1, dotindex + 3);
            if (numnextodot === '00') {
                result.innerHTML = '<span style="color: white;">' + Math.round(coef) + '</span>';
            } else {
                result.innerHTML = '<span style="color: white;">' + coef + '</span>';
            }

        }
    } else {
        result.innerHTML = 'c';
    }
}

function ninput() {
    var n = document.getElementById('n').value;
    var nf = document.getElementById('variable');
    if (n === '' || n < 4) {
        nf.innerHTML = 'n-4';
    } else {
        nf.innerHTML = '<span style="color: white;">' + (parseFloat(n, 10) - 4) + '</span>';
    }
    ainput();
}

function clean() {
    var elem = document.getElementById(window.event.target.id);
    elem.value = '';
}
$('#verTodoboton').click(function(e) {
    var verTodoboton = document.getElementById('verTodoboton');
    if (verSerie) {
        verSerie = false;
        verTodoboton.innerHTML = 'Ver toda la serie'
    } else {
        verSerie = true;
        verTodoboton.innerHTML = 'Ocultar Toda la serie'
    }
    $('#resultodo').slideToggle();
});

function verTodo() {
    var resultodo = document.getElementById('resultodo');
    var a = document.getElementById('a').value;
    var b = document.getElementById('b').value;
    var n = document.getElementById('n').value;
    var result = '';
    a = parseFloat(a, 10);
    b = parseFloat(b, 10);
    n = parseInt(n, 10);
    for (var j = 0; j < n + 1; j++) {
        result += (combinatoria(n, j) * potencia(a, n - j) * potencia(b, j)) +
            'x<span class="exponente">' + (n - j) +
            '</span>y<span class="exponente">' + j + '</span>';
        if (((n + 1) - j) !== 1) {
            result += ' + ';
        }
    }
    if (result.search("NaN") !== -1 || result === '') {
        resultodo.innerHTML = 'La serie no se puede mostrar con esos datos, intente con otros';
    } else {
        resultodo.innerHTML = result;
    }
}
// function newtonBinomial(a, b, n) {
//     var result = 0;
//     var coef = 0;
//     a = parseFloat(a, 10);
//     b = parseFloat(b, 10);
//     n = parseFloat(n, 10);
// for (var j = 0; j < n + 1; j++) {
//     result += combinatoria(n, j) * potencia(a, n - j) * potencia(b, j);
//     if (j === 4) {
//         coef = combinatoria(n, j) * potencia(a, n - j) * potencia(b, j);
//         console.log('coeficiente de (a^(n-4))*(b^4) = ' + coef);
//     }
// }
//     console.log('result: ' + result);
//     return result;
// }
