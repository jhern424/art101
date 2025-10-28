
let count = 0;
let number = 1;
let colors = ["Orchid", "Coral", "HotPink", "Plum"];
let mood;

function makeImage(imageName) {
    // Show the image when color is Orchid
    if (colors[count] === "Orchid") {
        // Only add image if it doesn't already exist
        if ($("img").length === 0) {
            $("body").append("<img width='50px' src='images/" + imageName + ".png' />");
        }
    } else {
        // Remove image for other colors
        $("img").remove();
    }
}

function setBackgroundColor(color) {
    $("body").css("background-color", color);
}

function moody(moodyCount) {
    let mood="";
    // Determine mood based on click count
    if (moodyCount < 5) {
        mood = "fresh and happy";
    } else if (moodyCount >= 5 && moodyCount < 10) {
        mood = "keep pushing";
    } else {
        mood = "so tired!";
    }
    return mood;
}

$('.color-button').click(function() {
    setBackgroundColor(this.id);
});
 

$("#needy-button").click(function(){
    let moodMessage = moody(number);

    // Display the current click number and mood
    $("#needy-button").html("Clicks: " + number + " Mood: " + moodMessage);

    makeImage("jellies");

    setBackgroundColor(colors[count]);

    // Increment the click number (keeps counting forever)
    number = number + 1;
    
    // Increment count and wrap around for colors (cycles through 0-3)
    count = count + 1;
    if (count >= colors.length) {
        count = 0;
    }
});