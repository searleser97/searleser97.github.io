
function getY(perimetro, x)
{
    var res = -perimetro + ((x*Math.PI).toFixed(1)/2) + parseFloat(x);
    return (res/(-2)).toFixed(1);
}
function onChangeArea(x,y)
{
    var area =  x*y + (Math.PI * Math.pow(x/2,2))/2;
    $("#area").val(area.toFixed(1));
    return area;
}
function onChangeX(perimetro, x)
{
    $("#input_x").val(x);
    $("#lbl_x").html(x);
    $("#lbl_y").html(getY(perimetro, x));
    onChangeArea(x, getY(perimetro, x));
}
function onChangePer(perimetro, x)
{
    if(perimetro < (((x*Math.PI).toFixed(1)/2) + parseFloat(x)))
        return false;
    $("#input_per").val(perimetro);
    onChangeX(perimetro, x);
    onChangeArea(x, getY(perimetro, x));
}
function responsive(JQueryObject, widthPer, heightPer)
{
    JQueryObject.width($(window).width()*(widthPer/100));
    JQueryObject.height($(window).height()*(heightPer/100));
    $("#infoBox").css({
        top: ($(window).height()/2)-($("#infoBox").height()/2)
    });
}
$(document).ready(function(){
    //info
    var count = 1;
    $("#infoBox").css({
        top: ($(window).height()/2)-($("#infoBox").height()/2)
    });
    $("#infoBtn").on("click", function()
    {
        if(Math.pow(-1, count) > 0){
             $("#infoBox").animate({
                left: 0
            }, "fast", function(){count++});
        }else
        {
            $("#infoBox").animate({
                left: ((-1) * ($("#infoBox").width()+20)).toString()
            }, "fast", function(){count++});
        }
    });
    $(document).on("click", function(){
        if(Math.pow(-1, count) < 0){
             $("#infoBox").animate({
                left: ((-1) * ($("#infoBox").width()+20)).toString()
            }, "fast", function(){count++});
        }
    });
    
    //Resize
    responsive($("#mySVG"), 90, 50);
    $(window).resize(function(){
        responsive($("#mySVG"), 90, 50);
        console.log($(window).width() + "x" + $(window).height());
    });
    //Vars
    var perimetro = $("#mySlider_per").val(); $("#input_per").val(perimetro);
    var x = $("#mySlider_x").val(); $("#input_x").val(x);
    var y = getY(perimetro, x);
    var A = (x * y) + ( ( Math.PI * Math.pow(x/2, 2) ) / 2 );
    //Startup
    onChangeX(perimetro,x);
    //Events
    $("#mySlider_x").on("input", function()
    {
        onChangeX(perimetro, x);
        x = $("#mySlider_x").val();
    });
    $("#mySlider_per").on("input", function()
    {
        onChangePer(perimetro, x);
        perimetro = $("#mySlider_per").val();
    });
    $("body").animate({
        opacity: "1",
    }, 1000, function(){
        //$(this).css("transform", "rotate(180deg)");
    });
   
});