// Flashlight position (in percentage of viewport)
let posX = 50; // Start at center (50%)
let posY = 50; // Start at center (50%)

// Movement step size (in percentage)
const step = 5;

// Calculate image boundaries
function getImageBounds() {
    let img = $("#background-img")[0];
    let container = $(".container");
    
    let containerWidth = container.width();
    let containerHeight = container.height();
    
    let imgNaturalWidth = img.naturalWidth;
    let imgNaturalHeight = img.naturalHeight;
    
    // Calculate the actual rendered size of the image (object-fit: contain)
    let imgAspect = imgNaturalWidth / imgNaturalHeight;
    let containerAspect = containerWidth / containerHeight;
    
    let renderedWidth, renderedHeight, offsetX, offsetY;
    
    if (containerAspect > imgAspect) {
        // Container is wider - image is limited by height
        renderedHeight = containerHeight;
        renderedWidth = containerHeight * imgAspect;
        offsetX = (containerWidth - renderedWidth) / 2;
        offsetY = 0;
    } else {
        // Container is taller - image is limited by width
        renderedWidth = containerWidth;
        renderedHeight = containerWidth / imgAspect;
        offsetX = 0;
        offsetY = (containerHeight - renderedHeight) / 2;
    }
    
    // Convert to percentages
    let minX = (offsetX / containerWidth) * 100;
    let maxX = ((offsetX + renderedWidth) / containerWidth) * 100;
    let minY = (offsetY / containerHeight) * 100;
    let maxY = ((offsetY + renderedHeight) / containerHeight) * 100;
    
    return { minX, maxX, minY, maxY };
}

// Update flashlight position using CSS mask
function updateFlashlight() {
    let maskStyle = "radial-gradient(circle 100px at " + posX + "% " + posY + "%, transparent 100%, black 100%)";
    $("#overlay").css({
        "-webkit-mask-image": maskStyle,
        "mask-image": maskStyle
    });
}

// Move up
$("#up-button").click(function() {
    let bounds = getImageBounds();
    posY = Math.max(bounds.minY, posY - step);
    updateFlashlight();
});

// Move down
$("#down-button").click(function() {
    let bounds = getImageBounds();
    posY = Math.min(bounds.maxY, posY + step);
    updateFlashlight();
});

// Move left
$("#left-button").click(function() {
    let bounds = getImageBounds();
    posX = Math.max(bounds.minX, posX - step);
    updateFlashlight();
});

// Move right
$("#right-button").click(function() {
    let bounds = getImageBounds();
    posX = Math.min(bounds.maxX, posX + step);
    updateFlashlight();
});

// Initialize position after image loads
$("#background-img").on('load', function() {
    updateFlashlight();
});

// Initialize position
updateFlashlight();

// Environment variables, arrays, and objects for the info text
let environmentTitle = "Santa Cruz Beach Explorer";
let instructions = "Use the buttons to move the flashlight around the image.";

// Array of scene elements
let sceneElements = ["ocean waves", "sandy beach", "beach umbrella", "boardwalk", "seagulls"];

// Array of people in the scene
let peopleInScene = ["turists", "families", "pets"];

// Object describing the location
let locationInfo = {
    name: "Santa Cruz",
    state: "California",
    atmosphere: "peaceful and inviting",
    rating: 10
};

// Populate the info text div using append
$("#info-text").append("<h3>" + environmentTitle + "</h3>");
$("#info-text").append("<p><em>" + instructions + "</em></p>");

$("#info-text").append("<h4>Scene Elements:</h4>");
$("#info-text").append("<ul>");
for (let i = 0; i < sceneElements.length; i++) {
    $("#info-text").append("<li>" + sceneElements[i] + "</li>");
}
$("#info-text").append("</ul>");

$("#info-text").append("<h4>People in Scene:</h4>");
$("#info-text").append("<ul>");
for (let i = 0; i < peopleInScene.length; i++) {
    $("#info-text").append("<li>" + peopleInScene[i] + "</li>");
}
$("#info-text").append("</ul>");

$("#info-text").append("<h4>Location Info:</h4>");
$("#info-text").append("<p><strong>Place:</strong> " + locationInfo.name + ", " + locationInfo.state + "</p>");
$("#info-text").append("<p><strong>Atmosphere:</strong> " + locationInfo.atmosphere + "</p>");
$("#info-text").append("<p><strong>Rating:</strong> " + locationInfo.rating + "/10</p>");
