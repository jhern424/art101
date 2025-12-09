# Lab 6 Refactoring Documentation

## Overview
This document shows three meaningful refactoring improvements to `lab6.js` without changing functionality.

---

## Refactor 1: Extract Mood Configuration into a Data Object

### BEFORE:
```javascript
function showMood() {
  let randomScore = Math.floor(Math.random() * 10) + 1;
  let moodResult = checkMood(randomScore);

  $("#mood-display").html(
    "Score: " + randomScore + "<br>Your mood is: <b>" + moodResult + "</b>"
  );

  // Change background color based on mood
  if (moodResult === "excited") {
    $("body").css("background-color", "#FFD700");
    $("#mood-display").append("<br><img src='images/happy_baby.webp' width='200px' />");
  } else if (moodResult === "calm") {
    $("body").css("background-color", "#87CEEB");
    $("#mood-display").append("<br><img src='images/sleepy-baby.webp' width='200px' />");
  } else {
    $("body").css("background-color", "#B0C4DE");
    $("#mood-display").append("<br><img src='images/crying-baby.webp' width='200px' />");
  }
}
```

### AFTER:
```javascript
// Mood configuration object - easier to maintain and modify
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

function showMood() {
  let randomScore = Math.floor(Math.random() * 10) + 1;
  let moodResult = checkMood(randomScore);
  
  $("#mood-display").html(
    "Score: " + randomScore + "<br>Your mood is: <b>" + moodResult + "</b>"
  );
  
  // Get mood configuration
  let moodData = MOOD_CONFIG[moodResult];
  $("body").css("background-color", moodData.bgColor);
  $("#mood-display").append("<br><img src='" + moodData.image + "' width='200px' />");
}
```

### Why This Is Better:
- **DRY Principle**: Eliminates repeated if-else structure
- **Maintainability**: All mood data in one place - easy to add new moods or change colors
- **Readability**: Clear separation of data and logic
- **Flexibility**: Easy to add new properties (like sounds, animations, etc.)

---

## Refactor 2: Use Array Destructuring and Modern JavaScript

### BEFORE:
```javascript
function checkMood(score) {
  if (score > 7) {
    return "excited";
  } else if (score > 4) {
    return "calm";
  } else {
    return "sad";
  }
}
```

### AFTER:
```javascript
// More declarative approach using array of threshold objects
const MOOD_THRESHOLDS = [
  { minScore: 8, mood: "excited" },
  { minScore: 5, mood: "calm" },
  { minScore: 0, mood: "sad" }
];

function checkMood(score) {
  // Find the first mood that matches the score threshold
  return MOOD_THRESHOLDS.find(threshold => score >= threshold.minScore).mood;
}
```

### Why This Is Better:
- **Declarative**: Describes WHAT we want, not HOW to get it
- **Scalable**: Easy to add more mood levels without nested if-else
- **Testable**: Threshold data can be tested independently
- **Modern**: Uses ES6 `.find()` method - more functional programming style

---

## Refactor 3: Extract DOM Manipulation into Helper Functions

### BEFORE:
```javascript
$("#mood-button").click(function () {
  showMood();
});

$("#reset-button").click(function () {
  $("#mood-display").html("");
  $("body").css("background-color", "white");
});
```

### AFTER:
```javascript
// Helper function for resetting display
function resetDisplay() {
  $("#mood-display").html("");
  $("body").css("background-color", "white");
}

// Event handlers - now more readable and testable
$("#mood-button").click(showMood);
$("#reset-button").click(resetDisplay);
```

### Why This Is Better:
- **Single Responsibility**: Each function does one thing
- **Reusability**: `resetDisplay()` can be called from anywhere
- **Testability**: Logic is separated from event handling
- **Readability**: Event handlers are one-liners, easier to scan
- **Maintainability**: If reset logic changes, update in one place

---

## Summary of Benefits

1. **Configuration Object** → Centralized data, easier to modify
2. **Threshold Array** → Declarative, scalable mood detection
3. **Helper Functions** → Better separation of concerns, reusability

All three refactors maintain the **exact same functionality** while improving:
- Code organization
- Maintainability
- Readability
- Scalability
- Testability

---

## Testing Checklist
- ✅ Click "Check Mood" → Random score displays with correct mood
- ✅ Excited mood (8-10) → Gold background, happy baby image
- ✅ Calm mood (5-7) → Sky blue background, sleepy baby image
- ✅ Sad mood (1-4) → Light steel blue background, crying baby image
- ✅ Click "Reset Mood" → Clears display, white background
- ✅ All images load correctly
- ✅ Button states work as before
