// Flashlight position (in percentage of viewport)
let posX = 50; // Start at center (50%)
let posY = 50; // Start at center (50%)

// Movement step size (in percentage)
const step = 5;

// Track current image
let currentImage = "boardwalk"; // Start with boardwalk (santa_cruz_1.png)

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

// Toggle between images
$("#toggle-image").click(function() {
    if (currentImage === "boardwalk") {
        // Switch to Natural Bridges
        $("#background-img").attr("src", "images/natural-bridges.png");
        $("#toggle-image").text("Switch to Boardwalk");
        currentImage = "natural-bridges";
        updateInfoText();
    } else {
        // Switch to Boardwalk
        $("#background-img").attr("src", "images/santa_cruz_1.png");
        $("#toggle-image").text("Switch to Natural Bridges");
        currentImage = "boardwalk";
        updateInfoText();
    }
    
    // Reset flashlight position to center when switching images
    posX = 50;
    posY = 50;
    updateFlashlight();
});

// Initialize position after image loads
$("#background-img").on('load', function() {
    updateFlashlight();
});

// Initialize position
updateFlashlight();

// Data for both locations
let boardwalkData = {
    title: "Santa Cruz Beach Explorer",
    instructions: "Use the buttons to move the flashlight around the image.",
    sceneElements: ["ocean waves", "sandy beach", "beach umbrella", "boardwalk", "seagulls"],
    peopleInScene: ["tourists", "families", "pets"],
    locationInfo: {
        name: "Santa Cruz Boardwalk",
        state: "California",
        atmosphere: "peaceful and inviting",
        rating: 10
    }
};

let naturalBridgesData = {
    title: "Natural Bridges Explorer",
    instructions: "Use the buttons to move the flashlight around the image.",
    sceneElements: ["rock formations", "ocean", "natural arch", "sandy beach", "tide pools"],
    peopleInScene: ["nature lovers", "photographers", "students"],
    locationInfo: {
        name: "Natural Bridges State Beach",
        state: "California",
        atmosphere: "serene and natural",
        rating: 10
    }
};

// Function to update info text based on current image
function updateInfoText() {
    let data = currentImage === "boardwalk" ? boardwalkData : naturalBridgesData;
    
    // Clear existing content
    $("#info-text").empty();
    
    // Populate with new content
    $("#info-text").append("<h3>" + data.title + "</h3>");
    $("#info-text").append("<p><em>" + data.instructions + "</em></p>");
    
    $("#info-text").append("<h4>Scene Elements:</h4>");
    $("#info-text").append("<ul>");
    for (let i = 0; i < data.sceneElements.length; i++) {
        $("#info-text").append("<li>" + data.sceneElements[i] + "</li>");
    }
    $("#info-text").append("</ul>");
    
    $("#info-text").append("<h4>People in Scene:</h4>");
    $("#info-text").append("<ul>");
    for (let i = 0; i < data.peopleInScene.length; i++) {
        $("#info-text").append("<li>" + data.peopleInScene[i] + "</li>");
    }
    $("#info-text").append("</ul>");
    
    $("#info-text").append("<h4>Location Info:</h4>");
    $("#info-text").append("<p><strong>Place:</strong> " + data.locationInfo.name + ", " + data.locationInfo.state + "</p>");
    $("#info-text").append("<p><strong>Atmosphere:</strong> " + data.locationInfo.atmosphere + "</p>");
    $("#info-text").append("<p><strong>Rating:</strong> " + data.locationInfo.rating + "/10</p>");
}

// Initialize with boardwalk data
updateInfoText();
