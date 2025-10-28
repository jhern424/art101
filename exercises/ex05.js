var count=0;
var number=0;
var colors=["Orchid","Coral","HotPink","Plum"];

$("#needy-button").click(function(){
    $("#needy-button").html("Clicks: " + number + " Color: " + colors[(count)]);   
    number = (number + 1);
    count = (count + 1);
    if (count >= colors.length) {
        count = 0;
    }
    $("body").css("background-color", colors[count]);
});