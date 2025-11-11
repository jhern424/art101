// ========================================
// MAGICAL NIGHT GARDEN - Interactive Environment
// Using: .hover(), .animate(), .click(), .fadeIn(), .fadeOut(), .slideUp(), etc.
// ========================================

let isDayMode = false;
let firefliesCount = 5;

// ========================================
// MOON INTERACTIONS
// ========================================

// Moon hover effect - grows and glows
$(".moon").hover(
    function() {
        // Mouse enter
        $(this).animate({
            fontSize: "120px"
        }, 300);
        
        // Make fireflies glow brighter
        $(".firefly").animate({
            opacity: 1
        }, 300);
    },
    function() {
        // Mouse leave
        $(this).animate({
            fontSize: "80px"
        }, 300);
        
        // Return fireflies to normal
        $(".firefly").animate({
            opacity: 0.8
        }, 300);
    }
);

// Click moon to make it pulse
$(".moon").click(function() {
    $(this).animate({ fontSize: "140px" }, 200)
           .animate({ fontSize: "80px" }, 200)
           .animate({ fontSize: "120px" }, 200)
           .animate({ fontSize: "80px" }, 200);
    
    // Scatter all creatures
    $(".creature").each(function(index) {
        let randomX = Math.random() * 200 - 100;
        let randomY = Math.random() * 200 - 100;
        
        $(this).animate({
            left: "+=" + randomX + "px",
            bottom: "+=" + randomY + "px"
        }, 800, function() {
            // Return to original position
            $(this).animate({
                left: "-=" + randomX + "px",
                bottom: "-=" + randomY + "px"
            }, 800);
        });
    });
});

// ========================================
// STARS INTERACTIONS
// ========================================

// Star click - toggle pulsing and make flowers grow
$(".star").click(function() {
    $(this).toggleClass("clicked");
    
    // Random flower grows
    let randomFlower = $(".flower").eq(Math.floor(Math.random() * $(".flower").length));
    
    randomFlower.animate({
        fontSize: "90px"
    }, 400).animate({
        fontSize: "60px"
    }, 400);
    
    // Play with opacity
    $(this).fadeTo(200, 0.3).fadeTo(200, 1);
});

// Star double-click - creates a shooting effect
$(".star").dblclick(function() {
    let star = $(this);
    let originalPos = star.position();
    
    // Shoot across the screen
    star.animate({
        left: "+=800px",
        top: "+=200px",
        opacity: 0
    }, 1500, function() {
        // Return to original position
        star.css({
            left: originalPos.left,
            top: originalPos.top,
            opacity: 0.7
        });
    });
});

// ========================================
// FIREFLIES INTERACTIONS
// ========================================

// Firefly hover - they scatter away from mouse
$(".firefly").hover(
    function() {
        let randomX = Math.random() * 100 - 50;
        let randomY = Math.random() * 100 - 50;
        
        $(this).animate({
            left: "+=" + randomX + "px",
            top: "+=" + randomY + "px",
            fontSize: "35px"
        }, 500);
    },
    function() {
        $(this).animate({
            fontSize: "25px"
        }, 300);
    }
);

// ========================================
// CREATURES INTERACTIONS
// ========================================

// Butterfly - flies in circles when hovered
$("#butterfly").hover(
    function() {
        $(this).addClass("spinning");
        $(this).animate({
            bottom: "+=150px"
        }, 1000).animate({
            bottom: "-=150px"
        }, 1000);
    },
    function() {
        $(this).removeClass("spinning");
        $(this).stop(true);
    }
);

// Bee - bounces when clicked
$("#bee").click(function() {
    $(this).animate({ bottom: "+=80px" }, 150)
           .animate({ bottom: "-=80px" }, 150)
           .animate({ bottom: "+=60px" }, 150)
           .animate({ bottom: "-=60px" }, 150)
           .animate({ bottom: "+=40px" }, 150)
           .animate({ bottom: "-=40px" }, 150);
});

// Ladybug - walks left and right when double-clicked
$("#ladybug").dblclick(function() {
    $(this).animate({ left: "-=200px" }, 1500)
           .animate({ left: "+=400px" }, 3000)
           .animate({ left: "-=200px" }, 1500);
});

// All creatures - hide/show on hover
$(".creature").hover(
    function() {
        // Show all flowers when hovering a creature
        $(".flower").each(function(index) {
            $(this).delay(index * 100).animate({
                opacity: 1,
                fontSize: "70px"
            }, 300);
        });
    },
    function() {
        $(".flower").animate({
            fontSize: "60px"
        }, 300);
    }
);

// ========================================
// FLOWERS INTERACTIONS
// ========================================

// Flower click - bloom effect
$(".flower").click(function() {
    $(this).animate({
        fontSize: "100px",
        opacity: 0.5
    }, 400).animate({
        fontSize: "60px",
        opacity: 1
    }, 400);
});

// Flower hover - sway animation
$(".flower").hover(
    function() {
        $(this).animate({ marginTop: "-20px" }, 200);
    },
    function() {
        $(this).animate({ marginTop: "0px" }, 200);
    }
);

// ========================================
// CONTROL BUTTONS
// ========================================

// Day/Night Toggle
$("#day-night-toggle").click(function() {
    isDayMode = !isDayMode;
    
    if (isDayMode) {
        $("body").addClass("day-mode");
        $(this).html("🌙 Toggle Day/Night");
        $(".moon").html("☀️");
        
        // Hide fireflies during day
        $(".firefly").fadeOut(500);
        
        // Make stars less visible
        $(".star").animate({ opacity: 0.2 }, 500);
    } else {
        $("body").removeClass("day-mode");
        $(this).html("☀️ Toggle Day/Night");
        $(".moon").html("🌕");
        
        // Show fireflies at night
        $(".firefly").fadeIn(500);
        
        // Make stars visible
        $(".star").animate({ opacity: 0.7 }, 500);
    }
});

// Spawn new firefly
$("#spawn-firefly").click(function() {
    firefliesCount++;
    
    let newFirefly = $("<div class='firefly'>✨</div>");
    newFirefly.css({
        left: Math.random() * 90 + "%",
        top: Math.random() * 300 + "px",
        opacity: 0
    });
    
    $(".fireflies-container").append(newFirefly);
    
    // Fade in the new firefly
    newFirefly.fadeIn(1000);
    
    // Add hover effect to new firefly
    newFirefly.hover(
        function() {
            let randomX = Math.random() * 100 - 50;
            let randomY = Math.random() * 100 - 50;
            
            $(this).animate({
                left: "+=" + randomX + "px",
                top: "+=" + randomY + "px",
                fontSize: "35px"
            }, 500);
        },
        function() {
            $(this).animate({
                fontSize: "25px"
            }, 300);
        }
    );
    
    // Button feedback
    $(this).text("+ Added! (" + firefliesCount + ")").delay(1000).queue(function(next) {
        $(this).text("+ Add Firefly");
        next();
    });
});

// Reset Garden
$("#reset-button").click(function() {
    // Remove extra fireflies
    $(".firefly").slice(5).fadeOut(500, function() {
        $(this).remove();
    });
    firefliesCount = 5;
    
    // Reset all stars
    $(".star").removeClass("clicked").css({
        opacity: 0.7,
        left: "",
        top: ""
    }).stop(true, true);
    
    // Reset creatures to original positions
    $(".creature").stop(true, true).css({
        left: "",
        bottom: ""
    }).removeClass("spinning");
    
    // Reset flowers
    $(".flower").stop(true, true).css({
        fontSize: "60px",
        opacity: 1,
        marginTop: "0px"
    });
    
    // Reset moon
    $(".moon").stop(true, true).css({
        fontSize: "80px"
    });
    
    // Show everything
    $(".firefly, .star, .creature, .flower").fadeIn(500);
    
    // Return to night mode
    if (isDayMode) {
        $("#day-night-toggle").click();
    }
    
    // Button feedback
    $(this).html("✓ Reset!").delay(1000).queue(function(next) {
        $(this).html("🔄 Reset Garden");
        next();
    });
});

// ========================================
// EXTRA: Body click creates temporary sparkle
// ========================================
$(".garden-container").click(function(e) {
    // Don't trigger on button clicks
    if ($(e.target).is("button, a, .button")) return;
    
    let sparkle = $("<div style='position:absolute; font-size:30px; pointer-events:none;'>✨</div>");
    sparkle.css({
        left: e.pageX - 15,
        top: e.pageY - 15,
        opacity: 1
    });
    
    $("body").append(sparkle);
    
    sparkle.animate({
        fontSize: "60px",
        opacity: 0,
        top: "-=50px"
    }, 1000, function() {
        $(this).remove();
    });
});