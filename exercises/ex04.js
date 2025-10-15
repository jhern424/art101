// Initial position of the circle
let position = 0;

// Move left button
$("#left-button").click(function() {
  position = position - 50; // Move 50px to the left
  $("#circle").css("left", position + "px");
});

// Move right button
$("#right-button").click(function() {
  position = position + 50; // Move 50px to the right
  $("#circle").css("left", position + "px");
});
