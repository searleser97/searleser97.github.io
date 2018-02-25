var arrUniverso = document.getElementById('universo').innerHTML.split(',');
var a = [];
var b = [];
var c = [];
var d = [];

function assignvars() {
    varsArr = [];
    varsArr.push(document.getElementById('a').value.trim().split(' '));
    varsArr.push(document.getElementById('b').value.trim().split(' '));
    varsArr.push(document.getElementById('c').value.trim().split(' '));
    varsArr.push(document.getElementById('d').value.trim().split(' '));
    console.log(varsArr);
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < varsArr[i].length; j++) {
          if(varsArr[i][j] !== '') {
            if (arrUniverso.indexOf(varsArr[i][j]) === -1) {
                switch (i) {
                    case 0:
                        alert("Todos los elementos del subconjunto A deben pertenecer al universo");
                        break;
                    case 1:
                        alert("Todos los elementos del subconjunto B deben pertenecer al universo");
                        break;
                    case 2:
                        alert("Todos los elementos del subconjunto c deben pertenecer al universo");
                        break;
                    case 3:
                        alert("Todos los elementos del subconjunto D deben pertenecer al universo");
                        break;
                }
                return false;
            }
          }
        }
        if (!checkduplicates(varsArr[i])) {
            switch (i) {
                case 0:
                    alert('El subconjunto A no debe tener elementos duplicados');
                    break;
                case 1:
                    alert('El subconjunto B no debe tener elementos duplicados');
                    break;
                case 2:
                    alert('El subconjunto C no debe tener elementos duplicados');
                    break;
                case 3:
                    alert('El subconjunto D no debe tener elementos duplicados');
                    break;
            }
            return false;
        }
    }

    a = varsArr[0];
    b = varsArr[1];
    c = varsArr[2];
    d = varsArr[3];

    return true;
}

function checkduplicates(array) {
    for (var i = 0; i < array.length; i++) {
        var count = 0;
        for (var j = 0; j < array.length; j++) {
            if (array[i] == array[j]) {
                count++;
            }
        }
        if (count > 1) {
            return false;
        }
    }
    return true;
}

function uno() {
    return union(complemento(union(a, b)), complemento(union(c, d)));
}

function dos() {
    return interseccion(union(a, b), complemento(interseccion(c, d)));
}

function tres() {
    return interseccion(a, union(union(c, b), d));
}

function union(conjuntoA, conjuntoB) {
    var result = [];
    for (var j = 0; j < conjuntoA.length; j++) {
        result.push(conjuntoA[j]);
    }
    for (var i = 0; i < conjuntoB.length; i++) {
        if (conjuntoA.indexOf(conjuntoB[i]) === -1) {
            result.push(conjuntoB[i]);
        }
    }
    return result;
}

function complemento(conjuntoX) {
    var result = [];
    for (var i = 0; i < arrUniverso.length; i++) {
        if (conjuntoX.indexOf(arrUniverso[i]) === -1) {
            result.push(arrUniverso[i]);
        }
    }
    return result;
}

function interseccion(conjuntoA, conjuntoB) {
    var result = [];
    for (var i = 0; i < conjuntoA.length; i++) {
        if (conjuntoB.indexOf(conjuntoA[i]) !== -1) {
            result.push(conjuntoA[i]);
        }
    }
    return result;
}
function calcular() {
    if (assignvars()) {
        var varuno = document.getElementById('uno');
        var vardos = document.getElementById('dos');
        var vartres = document.getElementById('tres');
        varuno.innerHTML = '{ ' + uno() + ' }';
        vardos.innerHTML = '{ ' + dos() + ' }';
        vartres.innerHTML = '{ ' + tres() + ' }';
        $("html, body").animate({
            scrollTop: $(document).height()
        }, "slow");
    }
}
