$(document).ready(function() {
    var inputUserTriangleS = document.getElementById('tlado');
    var inputRectangleH = document.getElementById('rheight');
    var slider = document.getElementById('slider');
    var inputArea = document.getElementById('area');
    var sqrt3 = Math.sqrt(3);
    var isPlus = 0;
    var triangleS;
    var triangleH;
    var userTriangleS;
    var userTriangleH;

    noUiSlider.create(slider, {
        start: 4.33,
        connect: [true, false],
        step: 0.01,
        range: {
            'min': 0,
            'max': 8.66
        }
    });

    function init() {

        var w = $(window).width();
        var h = $(window).height();

        var r = w / h;
        r = r.toFixed(2);
        if (r > 0.8) {
            w = h * 0.8;
        }
        
        $('.container').width(w - 23);

        triangleS = $('.square').width();
        triangleH = ((triangleS / 2) * sqrt3).toFixed(2);


        userTriangleS = inputUserTriangleS.value;
        userTriangleH = (userTriangleS / 2) * sqrt3;

        $('.square').height(triangleH);

        $('.triangle').css({
            'border-width': '0 ' + triangleS / 2 + 'px ' + triangleH + 'px ' + triangleS / 2 + 'px'
        });

        $('#theight').val(userTriangleH.toFixed(2));

        $('.myrangeslider').css({ 'margin-top': triangleH / 3 });
    }

    init();

    slider.noUiSlider.on('update', function(values, handle) {

        var rectangleH = values[handle];
        var rectangleW = ((userTriangleS * (userTriangleH - rectangleH)) / userTriangleH);
        var rectangleHpercentage = rectangleH / userTriangleH * 100;

        $('.verticall').css({ 'height': rectangleHpercentage + '%' });

        $('.rectangle').css({
            'width': rectangleW / userTriangleS * 100 + '%',
            'height': rectangleHpercentage + '%'
        });

        inputArea.value = (rectangleH * rectangleW).toFixed(2);
        inputRectangleH.value = values[handle];
    });

    inputRectangleH.addEventListener('change', function() {
        slider.noUiSlider.set(this.value);
    });

    inputUserTriangleS.addEventListener('change', function() {
        if (this.value === '0')
            inputUserTriangleS.value = 0.01;

        userTriangleS = inputUserTriangleS.value;
        userTriangleH = (userTriangleS / 2) * sqrt3;
        $('#theight').val(userTriangleH.toFixed(2));

        slider.noUiSlider.updateOptions({
            range: {
                'min': 0,
                'max': userTriangleH
            }
        });
    });

    $('#area').keydown(function(e) {
        if (e.which == 13 || e.which == 9) {
            var areaVal = inputArea.value;
            var a = userTriangleS / userTriangleH;
            var b = -1 * userTriangleS;
            var c = areaVal;
            var PlusOrMinus = [-1, 1];
            var aux;
            if (isPlus) {
                aux = 1;
                isPlus = 0;
            } else {
                aux = 0;
                isPlus = 1;
            }
            var rH = (-1 * b + PlusOrMinus[aux] * (Math.sqrt(Math.pow(b, 2) - 4 * a * c))) / (2 * a);
            slider.noUiSlider.set(rH);
            return false;
        }
    });

    $('#tlado, #theight, #rheight, #area').keyup(function(event) {
        if (!this.value.trim().match(/^\d+([,.]\d+)?/)) {
            $(this).val('');
        }
    });

    $('#infoCircle').click(function (e) {
        e.stopPropagation();
        $('#description').css({
            'opacity': '1',
            'z-index': '11'
        })
    });

    $(document).click(function (e) {
        $('#description').css({
            'opacity': '0',
            'z-index': '-1'
        })
    })

    $(window).resize(function() { init(); });
    $('.container').css({ 'opacity': '1' });
});
