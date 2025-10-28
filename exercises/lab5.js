// Function that asks user to guess a number
function askNumber(whatNumber) {
    // Ask user for a number
    let userNumber = prompt("Guess 1-10?");
    
    // Check if user's guess matches the target number
    if (userNumber == whatNumber) {
        $("#output").html("You got it!");
    } else {
        $("#output").html("No, please try again.");
    }
}

// Attach click event listener to the button
$("#good-button").click(function () {
    askNumber(5);
});
