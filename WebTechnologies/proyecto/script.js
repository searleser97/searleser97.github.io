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
    this.onChangeTurn = null;
    this.onIncorrectTurn = null;
    this.onIncorrectMove = null;
    this.onGameOver = null;
    this.onUserDraws = null;
    this.onPCDraws = null;
    this.onSuccessPC = null;

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
                if (this.onSuccessUser) this.onSuccessUser();
                if (this.userCards.length == 0) {
                    console.log(user + " wins!");
                    this.playing = false;
                    this.winner = 1;
                    if (this.onGameOver) this.onGameOver();
                } else {
                    //now it's pc's turn
                    this.turn *= -1;
                    if (this.onChangeTurn) this.onChangeTurn();
                }
            } else {
                console.log("Invalid movement");
                if (this.onIncorrectMove) this.onIncorrectMove();
            }
        } else {
            //it isn't the user's turn
            console.log("It is not your turn " + this.user + "!");
            if (this.onIncorrectTurn) this.onIncorrectTurn();
        }
    }

    //the user draws one card from the deck
    this.drawUser = function() {
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
            if (this.onIncorrectTurn) this.onIncorrectTurn();
        }
    }

    //the computer wants to play
    this.playComputer = function() {
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
                this.pile.push(this.computerCards.splice(pos, 1)[0]);
                console.log("Successfull play from the PC");
                if (this.onSuccessPC) this.onSuccessPC(pos);
            }
            if (this.computerCards.length == 0) {
                console.log("PC wins!");
                this.playing = false;
                this.winner = -1;
                if (this.onGameOver) this.onGameOver();
            } else {
                this.turn *= -1;
                if (this.onChangeTurn) this.onChangeTurn();
            }
        } else {
            console.log("It's not the turn of the PC");
            if (this.onIncorrectTurn) this.onIncorrectTurn();
        }
    }
}


// -----------------------------------------------------

var partida;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function actualizarTodo(arg) {
    if (partida.playing) {
        document.getElementById("ultima_pila").src = partida.pile.top().url();
        document.getElementById("disponibles_mazo").innerHTML = partida.deck.length;
        document.getElementById("disponibles_pila").innerHTML = partida.pile.length;
        document.getElementById("user_txt").innerHTML = partida.user;
        document.getElementById("turno_txt").innerHTML = (partida.turn == 1 ? "Es tu turno" : "Es turno de la computadora");
        actualizarCartas(partida.userCards, "cartas_usuario");
        actualizarCartas(partida.computerCards, "cartas_pc");
    } else if (partida.winner != 2) {
        alert("Game over, status: " + partida.winner);
    }
}

function actualizarCartas(cartas, id) {
    var elem = document.getElementById(id);
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
    for (let i = 0; i < cartas.length; i++) {
        var div = document.createElement("div");
        div.className = "card";
        var imagen = document.createElement("img");
        imagen.src = cartas[i].url();
        // if (cartas[i].matches(partida.pile.top())) {
        //     imagen.style.border = "5px solid black";
        // }

        if (id == "cartas_usuario") {
            imagen.onclick = function() {
                partida.goUser(i);
            }
            if (i != 0)
                div.style["margin-left"] = "-40px";
        } else {
            if (i != cartas.length - 1)
                div.style["margin-left"] = "-40px";
        }
        div.appendChild(imagen);
        elem.appendChild(div);
    }
}

function nueva(usuario) {
    document.forms["form_juego"].elements["btn_jugar"].enabled = false;
    document.getElementById("juego").style.display = "";
    partida = new game(usuario);
    partida.onGiveUserCards = actualizarTodo;
    partida.onGiveComputerCards = actualizarTodo;
    partida.onInitialCard = actualizarTodo;
    partida.onSuccessUser = actualizarTodo;
    partida.onChangeTurn = actualizarTodo;
    partida.onIncorrectTurn = actualizarTodo;
    partida.onIncorrectMove = actualizarTodo;
    partida.onGameOver = actualizarTodo;
    partida.onUserDraws = actualizarTodo;
    partida.onPCDraws = actualizarTodo;
    partida.onSuccessPC = actualizarTodo;
    partida.init();
}

function robar() {
    partida.drawUser();
}

function pc_juega() {
    partida.playComputer();
}

nueva('searleser');