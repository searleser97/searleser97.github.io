var db = openDatabase('uno', '1.0', 'my first database', 2 * 1024 * 1024);
db.transaction(function(tx) {
    // tx.executeSql('drop table scores');
    tx.executeSql('CREATE TABLE IF NOT EXISTS scores (username unique, wins int(11) default 0, losses int(11) default 0)');
});
var users = {};

function rnd(a, b) {
    return Math.floor(a + Math.random() * (b - a + 1));
}

Array.prototype.top = function() {
    return this[this.length - 1];
}

Array.prototype.popRandom = function() {
    return this.splice(rnd(0, this.length - 1), 1)[0];
}

function card(tipo, numero) {
    this.tipo = tipo;
    this.numero = numero;
    this.id = "card_" + tipo + "_" + numero;
    this.matches = function(cartaB) {
        return this.tipo == cartaB.tipo || this.numero == cartaB.numero;
    }
    this.getValidCards = function(cards) {
        var positions = [];
        for (var i = 0; i < cards.length; ++i) {
            if (cards[i].matches(this)) {
                positions.push(i);
            }
        }
        return positions;
    }
    this.url = function() {
        return "deck/" + this.numero + "_" + this.tipo + ".png";
    }
}

function game(user) {
    this.playing = false;
    this.winner = 2;
    this.user = user;
    this.turn = 1; //1:user, -1:computer
    this.deck = [];
    this.pile = [];
    this.userCards = [];
    this.computerCards = [];

    //callbacks
    this.onGiveUserCards = null;
    this.onGiveComputerCards = null;
    this.onInitialCard = null;
    this.onSuccessUser = null;
    this.onGameOver = null;
    this.onUserDraws = null;
    this.onPCDraws = null;

    //create the 52 cards
    for (var i = 0; i < 4; ++i) {
        for (var j = 1; j <= 13; ++j) {
            this.deck.push(new card(i, j));
        }
    }
    //shuffle all the cards
    for (var i = 0; i < 51; ++i) {
        var pos = rnd(i + 1, 51);
        var tmp = this.deck[i];
        this.deck[i] = this.deck[pos];
        this.deck[pos] = tmp;
    }

    this.init = function() {
        //give to the user and to the pc 3 cards each
        for (var i = 0; i < 3; ++i) {
            this.userCards.push(this.deck.popRandom());
        }
        console.log("Successfull giving card to the user");
        if (this.onGiveUserCards) this.onGiveUserCards();
        for (var i = 0; i < 3; ++i) {
            this.computerCards.push(this.deck.popRandom());
        }
        console.log("Successfull giving card to the PC");
        if (this.onGiveComputerCards) this.onGiveComputerCards();
        //put the initial card from the deck to the pile
        this.pile.push(this.deck.pop());
        console.log("Successfull putting the initial card");
        //begin the game!
        this.playing = true;
        if (this.onInitialCard) this.onInitialCard();
    }

    //the user wants to play with the given card
    this.goUser = function(indexCard) {
        //it is the user's turn
        if (this.turn == 1) {
            //check if the card matches with the current card
            if (this.userCards[indexCard].matches(this.pile.top())) {
                //move the card to the to pof the pile
                var c = this.userCards.splice(indexCard, 1)[0];
                this.pile.push(c);
                console.log("Successfull play from the user");
                // if (this.onSuccessUser) this.onSuccessUser();
                if (this.userCards.length == 0) {
                    console.log(user + " wins!");
                    this.playing = false;
                    this.winner = 1;
                    if (this.onGameOver) this.onGameOver();
                    if (users[user] == undefined)
                        users[user] = [0, 0];
                    if (users['pc'] == undefined)
                        users['pc'] = [0, 0];
                    db.transaction(function(tx) {
                        tx.executeSql('update scores set wins=? where username=?', [users[user][0] + 1, user]);
                    });
                    db.transaction(function(tx) {
                        tx.executeSql('insert into scores (username, wins) values (?, ?)', [user, users[user][0] + 1]);
                    });
                    db.transaction(function(tx) {
                        tx.executeSql('update scores set losses=? where username=?', [users['pc'][1] + 1, 'pc']);
                    });
                    db.transaction(function(tx) {
                        tx.executeSql('insert into scores (username, losses) values (?, ?)', ['pc', users['pc'][1] + 1]);
                    });
                } else {
                    //now it's pc's turn
                    this.turn *= -1;
                }
            } else {
                console.log("Invalid movement");
                return false;
            }
        } else {
            //it isn't the user's turn
            console.log("It is not your turn " + this.user + "!");
            return false;
        }
        return true;
    }

    //the user draws one card from the deck
    this.drawUser = function() {
        if(this.winner != 2) return;
        if (this.turn == 1) {
            if (this.deck.length > 0) {
                this.userCards.push(this.deck.pop());
                console.log("User draws one card");
                if (this.onUserDraws) this.onUserDraws();
            } else if (this.deck.length == 0 && this.pile.top().getValidCards(this.userCards).length == 0) {
                console.log("There is a draw! Nobody wins!");
                this.playing = false;
                this.winner = 0;
                if (this.onGameOver) this.onGameOver();
            }
        } else {
            console.log("It is not your turn " + this.user + "!");
        }
    }

    //the computer wants to play
    this.playComputer = function() {
        var pcChosenCardId = undefined;
        if (this.turn == -1) {
            var positions = this.pile.top().getValidCards(this.computerCards);
            while (this.deck.length > 0 && positions.length == 0) {
                this.computerCards.push(this.deck.pop());
                console.log("PC draws one card");
                if (this.onPCDraws) this.onPCDraws();
                if (this.computerCards.top().matches(this.pile.top())) {
                    positions.push(this.computerCards.length - 1);
                }
            }
            if (positions.length > 0) {
                var pos = positions.popRandom();
                var pcChosenCard = this.computerCards.splice(pos, 1)[0];
                this.pile.push(pcChosenCard);
                pcChosenCardId = pcChosenCard.id;
                console.log("Successfull play from the PC");
            }
            if (this.computerCards.length == 0) {
                console.log("PC wins!");
                this.playing = false;
                this.winner = -1;
                if (this.onGameOver) this.onGameOver();
                if (users[user] == undefined)
                    users[user] = [0, 0];
                db.transaction(function(tx) {
                    tx.executeSql('update scores set wins=? where username=?', [users['pc'][0] + 1, 'pc']);
                });
                db.transaction(function(tx) {
                    tx.executeSql('insert into scores (username, wins) values (?, ?)', ['pc', users['pc'][0] + 1]);
                });
                db.transaction(function(tx) {
                    tx.executeSql('update scores set losses=? where username=?', [users[user][1] + 1, user]);
                });
                db.transaction(function(tx) {
                    tx.executeSql('insert into scores (username, losses) values (?, ?)', [user, users[user][1] + 1]);
                });
            } else {
                this.turn *= -1;
            }
        } else {
            console.log("It's not the turn of the PC");
        }
        return pcChosenCardId;
    }
}


// -----------------------------------------------------

var partida;

function actualizarTodo(arg) {
    if (partida.playing) {
        document.getElementById("ultima_pila").src = partida.pile.top().url();
        document.getElementById("disponibles_mazo").innerHTML = partida.deck.length;
        document.getElementById("disponibles_pila").innerHTML = partida.pile.length;
        document.getElementById("user_txt").innerHTML = partida.user;
        document.getElementById("turno_txt").innerHTML = (partida.turn == 1 ? "Es tu turno " + partida.user : "Es turno de la computadora");
        actualizarCartas(partida.userCards, "cartas_usuario");
        actualizarCartas(partida.computerCards, "cartas_pc");
    } else if (partida.winner != 2) {
        actualizarCartas(partida.userCards, "cartas_usuario");
        if (partida.winner == 0){
            juego.innerHTML = "<h1>¡Empate!</h1>";
        }else{
            document.getElementById("ultima_pila").src = partida.pile.top().url();
            juego.innerHTML = "<h1>¡" + (partida.winner == 1 ? partida.user : "PC") + " gana!</h1>";
        }
    }
}

function actualizarCartas(cartas, id) {
    var elem = document.getElementById(id);
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
    for (let i = 0; i < cartas.length; i++) {
        var div = document.createElement("div");
        div.id = cartas[i].id;
        if (id == "cartas_usuario") {
            div.draggable = true;
            div.ondragstart = function(ev) {
                ev.dataTransfer.setData("text", i);
                if (!partida.userCards[i].matches(partida.pile.top())) {
                    incorrecto.style.display = "block";
                }
            };
            div.onmouseover = function() {
                this.style["z-index"] = "100";
                var audio = new Audio("sounds/pick.mp3");
                audio.play();
            };
            div.onmouseout = function() {
                this.style["z-index"] = i;
            }
            div.ondragend = function(ev) {
                incorrecto.style.display = "none";
            }
        }
        div.style["background-image"] = "url('" + cartas[i].url() + "')";
        div.style["z-index"] = i;
        div.classList.add("players_cards");
        elem.appendChild(div);
        if (partida.deck.length > 0)
            mazo.src = partida.deck[partida.deck.length - 1].url();
        else
            mazo.src = "wallpapers/wallpaper2.jpg";
    }
}

function nueva(usuario) {
    document.getElementById("options").style.display = "block";
    document.getElementById("juego").style.display = "";
    forma.style["display"] = "none";
    partida = new game(usuario);
    partida.onGiveUserCards = actualizarTodo;
    partida.onGiveComputerCards = actualizarTodo;
    partida.onInitialCard = actualizarTodo;
    partida.onSuccessUser = actualizarTodo;
    partida.onGameOver = actualizarTodo;
    partida.onUserDraws = actualizarTodo;
    partida.onPCDraws = actualizarTodo;
    partida.init();
    db.transaction(function(tx) {
        tx.executeSql('insert into scores (username, wins, losses) values (?, ?, ?)', [usuario, 0, 0]);
    });
}

function robar() {
    partida.drawUser();
}

function pc_juega() {
    partida.playComputer();
}

function load_scores() {
    db.transaction(function(tx) {
        tx.executeSql('select * from scores', [], function(tx1, results) {
            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
                var row = scores.insertRow();
                var cell1 = row.insertCell();
                var cell2 = row.insertCell();
                var cell3 = row.insertCell();
                cell1.innerHTML = results.rows[i].username;
                cell2.innerHTML = results.rows[i].wins;
                cell3.innerHTML = results.rows[i].losses;
                users[results.rows[i].username] = [results.rows[i].wins, results.rows[i].losses];
            }
            var header = scores.createTHead();
            var row = header.insertRow();
            var c1 = row.insertCell();
            var c2 = row.insertCell();
            var c3 = row.insertCell();
            c1.innerHTML = 'Usuario';
            c2.innerHTML = 'Victorias';
            c3.innerHTML = 'Derrotas';
        });
    });
}

/// nueva('searleser');

load_scores();

var pcChosenCardPos = { top: 0, left: 0 };
var deckOffSets = ultimaPila.getBoundingClientRect();
var clone = undefined;
var animation;
var yStep = 1;

var pcTop, pcLeft, deckTop, deckLeft;

function movePcCard() {
    console.log('deck top, left: ' + deckTop + ' ' + deckLeft);
    console.log('pc top, left: ' + pcTop + ' ' + pcLeft);
    if (pcTop >= deckTop && pcLeft == deckLeft) {
        actualizarTodo(0);
        document.body.removeChild(clone);
        clearInterval(animation);
        document.getElementById("ultima_pila").src = partida.pile.top().url();
        return;
    }
    if (pcTop != deckTop)
        pcTop += yStep;
    if (pcLeft != deckLeft) {
        if (pcLeft < deckLeft)
            pcLeft++;
        else
            pcLeft--;
    }
    clone.style['top'] = pcTop + 'px';
    clone.style['left'] = pcLeft + 'px';
}

document.getElementById("ultimaPila").ondragenter = function(ev) {
    ev.preventDefault();
}

document.getElementById("ultimaPila").ondragleave = function(ev) {
    ev.preventDefault();
}

document.getElementById("ultimaPila").ondragover = function(ev) {
    ev.preventDefault();
}

document.getElementById("ultimaPila").ondrop = function(ev) {
    ev.preventDefault();
    actualizarTodo(0);
    if (partida.goUser(ev.dataTransfer.getData("text")) && partida.winner == 2) {
        actualizarTodo(0);
        pcChosenCardId = partida.playComputer();
        setTimeout(function() {
            if (pcChosenCardId != undefined) {
                var pcChosenCardDiv = document.getElementById(pcChosenCardId);
                var deckPos = ultimaPila.getBoundingClientRect();
                var pcChosenCardPos = pcChosenCardDiv.getBoundingClientRect();
                deckLeft = Math.floor(deckPos.left + 50);
                deckTop = Math.floor(deckPos.top);
                pcLeft = Math.floor(pcChosenCardPos.left);
                pcTop = Math.floor(pcChosenCardPos.top);
                yStep = (deckTop - pcTop) / Math.abs(pcLeft - deckLeft);

                clone = pcChosenCardDiv.cloneNode();

                pcChosenCardDiv.style['opacity'] = '0';

                clone.style['position'] = 'fixed';
                clone.style['top'] = pcTop + 'px';
                clone.style['left'] = pcLeft + 'px';
                clone.style['border'] = '2px solid red';
                clone.style['z-index'] = '100';
                clone.id = 'pcChosenCard';

                document.body.appendChild(clone);
                animation = setInterval(movePcCard, 2);
            }else{
                actualizarTodo(0);
            }
        }, 1000);
    }
}


function instrucciones() {
    modal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

cerrar.onclick = function() {
    modal.style.display = "none";
}