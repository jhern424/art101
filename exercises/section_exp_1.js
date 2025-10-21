let count=0;
let colors=["red","orange","yellow","green"];

$("#needy-button").click(function(){
    $("#needy-button").html("Clicks: " + count + " Color: " + colors[count]);   
    $("body").css("background-color", colors[count]);
    count = (count + 1);
    if (count >= colors.length) {
        count = 0;
    }
});