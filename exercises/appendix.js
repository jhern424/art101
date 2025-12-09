// ============================================================================
// APPENDIX: Complete JavaScript Code for "Rate A Classroom" Project
// ============================================================================

// ============================================================================
// FILE 1: site.js
// Purpose: Homepage animations using Web Animations API
// ============================================================================

window.addEventListener("load", () => {
    const welcome = document.getElementById("welcome");
    const logo = document.getElementById("logo");
    const button = document.getElementById("button")

    welcome.animate(
        [
            {opacity: 0, transform: "translateY(40px)"},
            {opacity: 1, transform: "translateY(0)"}
        ],
        {duration: 1000, easing: "ease", fill: "forwards"}
    );
    logo.animate(
        [
            { opacity: 0, transform: "translateY(40px)" },
            { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 1000, easing: "ease", fill: "forwards", delay: 300 }
    );
    button.animate(
        [
            { opacity: 0, transform: "translateY(40px)" },
            { opacity: 1, transform: "translateY(0)" }
        ],
        { duration: 1000, easing: "ease", fill: "forwards", delay: 500 }
    );
});


// ============================================================================
// FILE 2: map.js
// Purpose: Interactive map with clickable buildings, rating form, and
//          localStorage integration
// ============================================================================

const kresge = document.getElementById("kresge");
const porter = document.getElementById("porter");
const rcc = document.getElementById("rcc");
const oakes = document.getElementById("oakes");
const music = document.getElementById("music");
const elena = document.getElementById("elena");
const thim = document.getElementById("thim");
const phy = document.getElementById("phy");
const jbaskin = document.getElementById("jbaskin");
const jrl = document.getElementById("jrl");
const science = document.getElementById("science");
const earth = document.getElementById("earth");
const class12 = document.getElementById("class12");
const mchenry = document.getElementById("mchenry");
const cowell = document.getElementById("cowell");
const stev = document.getElementById("stev");
const huma = document.getElementById("huma");
const crown = document.getElementById("crown");
const merrill = document.getElementById("merrill");


$(document).ready(function() {
    const buildingNames = {
        "kresge": "Kresge College",
        "porter": "Porter College",
        "rcc": "Rachel Carson College",
        "oakes": "Oakes College",
        "music": "Music Center",
        "elena": "Elena Baskin Visual Arts",
        "thim": "Thimann Labs",
        "phy": "Physical Sciences",
        "jbaskin": "Jack Baskin Engineering",
        "jrl": "John R. Lewis College and Social Sciences",
        "science": "Science & Engineering Library",
        "earth": "Earth & Marine Sciences",
        "class12": "Classroom Unit",
        "mchenry": "McHenry Library",
        "cowell": "Cowell College",
        "stev": "Stevenson College",
        "huma": "Humanities",
        "crown": "Crown College",
        "merrill": "Merrill College"
    };

    // Populate the select dropdown
    const $buildingSelect = $("#building");
    Object.values(buildingNames).sort().forEach(name => {
        $buildingSelect.append(new Option(name, name));
    });

    // Building click handler
    $(".classrooms img").click(function() {
        const id = $(this).attr("id");
        const name = buildingNames[id] || id; // Fallback to ID if name not found

        $("#draggable-form").show(); // Show the form
        $buildingSelect.val(name); // Set the dropdown value
    });

    // Close form handler
    $("#close-form").click(function() {
        $("#draggable-form").hide();
    });

    $(".rating-group").each(function() {
        const $group = $(this);
        const inputId = $group.data("input-id");
        const $input = $("#" + inputId);
        let currentRating = 0;

        // Hover effect
        $group.find(".rate").hover(function() {
            let hoverValue = $(this).data("value");
            updateVisuals($group, hoverValue);
        }, function() {
            // Mouse leave - revert to current rating
            updateVisuals($group, currentRating);
        });

        // Click effect
        $group.find(".rate").click(function() {
            currentRating = $(this).data("value");
            $input.val(currentRating);
            updateVisuals($group, currentRating);
        });
    });

    function updateVisuals($container, value) {
        $container.find(".rate").each(function() {
            if ($(this).data("value") <= value) {
                $(this).addClass("filled");
            } else {
                $(this).removeClass("filled");
            }
        });
    }

    // Handle form submission
    $("#draggable-form").submit(function(e) {
        e.preventDefault();

        const entry = {
            building: $("#building").val(),
            room: $("#room").val(),
            rating: $("#rating").val(),
            lighting: $("#bulb-rating").val(),
            timestamp: new Date().toISOString()
        };

        // Get existing ratings or create empty array
        let allRatings = JSON.parse(localStorage.getItem("ratings")) || [];

        // Add new entry
        allRatings.push(entry);

        // Save back to localStorage
        localStorage.setItem("ratings", JSON.stringify(allRatings));

        alert("Your rating has been submitted!");
        $("#draggable-form").hide();
        $("#draggable-form")[0].reset();
    });
});

const dragElement = document.getElementById("draggable-form");

let offsetX = 0, offsetY = 0, isDragging = false;

dragElement.addEventListener("mousedown", function(e) {
    // Prevent dragging when interacting with form inputs
    if (['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON', 'LABEL'].includes(e.target.tagName)) {
        return;
    }

    isDragging = true;
    offsetX = e.clientX - dragElement.offsetLeft;
    offsetY = e.clientY - dragElement.offsetTop;
    dragElement.style.cursor = "grabbing";
});

document.addEventListener("mousemove", function(e) {
    if (!isDragging) return;
    dragElement.style.left = (e.clientX - offsetX) + "px";
    dragElement.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", function() {
    isDragging = false;
    dragElement.style.cursor = "move";
});


// ============================================================================
// FILE 3: submissions.js
// Purpose: Display all submitted ratings from localStorage
// ============================================================================

// Load ratings from localStorage
const ratings = JSON.parse(localStorage.getItem("ratings")) || [];
const listDiv = document.getElementById("list");

if (ratings.length === 0) {
    listDiv.innerHTML = "<p>No ratings have been submitted yet.</p>";
} else {
    ratings.forEach(rate => {
        const item = document.createElement("div");
        item.classList.add("rating-entry");

        item.innerHTML = `
            <div class="rating-card">
                <h3>${rate.building} — Room ${rate.room}</h3>
                <p><strong>Overall Rating:</strong> ${rate.rating}/5</p>
                <p><strong>Lighting:</strong> ${rate.lighting}/5</p>
                <p class="timestamp">${new Date(rate.timestamp).toLocaleString()}</p>
            </div>
        `;

        listDiv.appendChild(item);
    });
}
