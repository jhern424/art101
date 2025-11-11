// Function to check mood based on score
function checkMood(score) {
  // Use conditionals to determine mood
  if (score > 7) {
    return "excited";
  } else if (score > 4) {
    return "calm";
  } else {
    return "sad";
  }
}

function showMood() {
  let randomScore = Math.floor(Math.random() * 10) + 1;
  let moodResult = checkMood(randomScore);

  // Display the result
  $("#mood-display").html(
    "Score: " + randomScore + "<br>Your mood is: <b>" + moodResult + "</b>"
  );

  // Change background color based on mood
  if (moodResult === "excited") {
    $("body").css("background-color", "#FFD700"); // Gold
    // Image for excited mood
    $("#mood-display").append("<br><img src='images/happy_baby.webp' width='200px' />");
  } else if (moodResult === "calm") {
    $("body").css("background-color", "#87CEEB"); // Sky Blue
    // Image for calm mood
    $("#mood-display").append("<br><img src='images/sleepy-baby.webp' width='200px' />");
  } else {
    $("body").css("background-color", "#B0C4DE"); // Light Steel Blue
    // Image for sad mood
    $("#mood-display").append("<br><img src='images/crying-baby.webp' width='200px' />");
  }

}

// Check mood button
$("#mood-button").click(function () {
  showMood();
});

// Reset button - clears the screen
$("#reset-button").click(function () {
  $("#mood-display").html("");
  $("body").css("background-color", "white");
});