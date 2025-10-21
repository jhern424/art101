let count=0;
let colors=["Orchid","Coral","HotPink","Plum"];

$("#needy-button").click(function(){
    $("#needy-button").html("Clicks: " + count + " Color: " + colors[count]);   
    count = (count + 1);
    if (count >= colors.length) {
        count = 0;
    }
    $("body").css("background-color", colors[count]);
});