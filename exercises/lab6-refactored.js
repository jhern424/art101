// ========================================
// LAB 6 - REFACTORED VERSION
// Three meaningful refactoring improvements applied
// See lab6-REFACTORING.md for detailed documentation
// ========================================

// REFACTOR 1: Configuration object for mood data
// Centralizes all mood-related data in one place
const MOOD_CONFIG = {
  excited: {
    bgColor: "#FFD700",
    image: "images/happy_baby.webp"
  },
  calm: {
    bgColor: "#87CEEB",
    image: "images/sleepy-baby.webp"
  },
  sad: {
    bgColor: "#B0C4DE",
    image: "images/crying-baby.webp"
  }
};

// REFACTOR 2: Threshold-based mood detection
// More declarative and scalable approach
const MOOD_THRESHOLDS = [
  { minScore: 8, mood: "excited" },
  { minScore: 5, mood: "calm" },
  { minScore: 0, mood: "sad" }
];

// Function to check mood based on score
function checkMood(score) {
  // Find the first mood that matches the score threshold
  return MOOD_THRESHOLDS.find(threshold => score >= threshold.minScore).mood;
}

// Main function to display mood
function showMood() {
  let randomScore = Math.floor(Math.random() * 10) + 1;
  let moodResult = checkMood(randomScore);

  // Display the result
  $("#mood-display").html(
    "Score: " + randomScore + "<br>Your mood is: <b>" + moodResult + "</b>"
  );

  // Apply mood configuration (background color and image)
  let moodData = MOOD_CONFIG[moodResult];
  $("body").css("background-color", moodData.bgColor);
  $("#mood-display").append("<br><img src='" + moodData.image + "' width='200px' />");
}

// REFACTOR 3: Helper function for reset functionality
// Separates DOM manipulation logic
function resetDisplay() {
  $("#mood-display").html("");
  $("body").css("background-color", "white");
}

// Event handlers - cleaner and more readable
$("#mood-button").click(showMood);
$("#reset-button").click(resetDisplay);
