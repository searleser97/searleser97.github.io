var pandas = '<div class="myPanda">' +
    '<img src="panda.png" alt="" class="pandaImg">' +
    '</div>';

var numberOfPandas = 10000;
var limit = 0;
var interval = setInterval(createPandas, 200);

function createPandas () {
    $('body').append(pandas);
    limit++;
    if (limit == numberOfPandas)
        clearInterval(interval);
}