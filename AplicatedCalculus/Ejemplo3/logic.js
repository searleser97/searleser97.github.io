function f(x, coefs) {
    var ans = 0;
    var n = coefs.length - 1;
    coefs.forEach(function (a) {
        ans += a * Math.pow(x, n);
        n -= 1;
    });

    return ans;
}

function df(x, coefs) {
    var ans = 0;
    coefs = coefs.slice(0, -1);
    var n = coefs.length;
    coefs.forEach(function (a) {
        ans += a * n * Math.pow(x, n - 1);
        n -= 1;
    });

    return ans;
}

function dx(x, coefs) {
    return Math.abs(0 - f(x, coefs));
}

function newtons_method(x0, e, coefs) {
    var delta = dx(x0, coefs);
    var count = 0;
    while (delta > e) {
        x0 = x0 - f(x0, coefs) / df(x0, coefs);
        delta = dx(x0, coefs);
        count += 1;
    }
    return x0;

}
// [1, 0, -1 * CircleDiameter^2, 0, area^2];

$(document).ready(function() {
    var inputUserCircleD = document.getElementById('tlado');
    var inputRectangleH = document.getElementById('rheight');
    var slider = document.getElementById('slider');
    var inputArea = document.getElementById('area');
    // var theight = document.getElementById('theight');
    var circleD;
    var userCircleD;
    var maxArea;

    noUiSlider.create(slider, {
        start: 7.07,
        connect: [true, false],
        step: 0.01,
        range: {
            'min': 0,
            'max': 10
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
        var aux = $('.container').width() * 0.7;
        $('.square').height(aux);
        $('.square').width(aux);

        circleD = $('.square').width();


        userCircleD = inputUserCircleD.value;

        maxArea = Math.pow(userCircleD, 2) / 2;

        $('#theight').val(userCircleD);

        $('.myrangeslider').css({ 'margin-top': circleD / 3 });
    }

    init();

    slider.noUiSlider.on('update', function(values, handle) {

        var rectangleH = values[handle];
        var rectangleW = Math.sqrt(Math.pow(userCircleD, 2) - Math.pow(rectangleH, 2));
        var rectangleHpercentage = rectangleH / userCircleD * 100;
        $('.verticall').css({ 'height': rectangleHpercentage + '%' });

        $('.rectangle').css({
            'width': rectangleW / userCircleD * 100 + '%',
            'height': rectangleHpercentage + '%'
        });


        inputArea.value = (rectangleH * rectangleW).toFixed(2);
        inputRectangleH.value = values[handle];
    });

    inputRectangleH.addEventListener('change', function() {
        slider.noUiSlider.set(this.value);
    });

    inputUserCircleD.addEventListener('change', function() {
        if (this.value === '0')
            inputUserCircleD.value = 0.01;

        userCircleD = inputUserCircleD.value;
        maxArea = Math.pow(userCircleD, 2) / 2;

        slider.noUiSlider.updateOptions({
            range: {
                'min': 0,
                'max': parseFloat(userCircleD)
            }
        });
    });

    $('#area').keydown(function(e) {
        if (e.which == 13 || e.which == 9) {
            var areaVal = inputArea.value;
            if (areaVal > maxArea) {
                inputArea.value = maxArea;
                areaVal = maxArea;
            }
            var rH = Math.abs(newtons_method(1, 1e-5, [1,0,-1 * Math.pow(userCircleD, 2),0,Math.pow(areaVal, 2)]));
            slider.noUiSlider.set(rH);
            return false;
        }
    });

    $('#tlado, #theight, #rheight, #area').keyup(function(event) {
        if (!this.value.trim().match(/^\d+([,.]\d+)?/)) {
            $(this).val('');
        }
    });
    $(window).resize(function() { init(); });

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
    
    $('.container').css({ 'opacity': '1' });
});
