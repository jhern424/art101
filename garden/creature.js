// Store creature name variable
let creatureName = "";

// When the button is clicked, save and display the name
$("button").click(function() {
    // Get the creature name from input
    creatureName = $("#creature-name").val();

    // Clear any previous error messages
    $("#error-message").remove();

    if (creatureName == "") {
        alert("Please enter a creature name.");
        $("#creature-form").append("<p id='error-message' style='color: red; font-weight: bold;'>⚠️ Please enter a creature name.</p>");
        return;
    } else if (creatureName.length > 12) {
        alert("Creature name is too long. Please limit to 12 characters.");
        $("#creature-form").append("<p id='error-message' style='color: red; font-weight: bold;'>⚠️ Creature name is too long. Please limit to 12 characters.</p>");
        return;
    } else {
        // Add the name to the creature list
        $("#creature-list").append("<p>" + creatureName + "</p>");
    }


    // Clear the input field
    $("#creature-name").val("");
});