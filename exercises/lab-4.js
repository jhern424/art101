// declaring an array with name myCommutes
let myCommutes = ["UCSC bus", "walk", "Ride from a friend", "lyft"];

// declaring an object with name myFavouriteCommute
let myFavouriteCommute = {
    route: ["from home to natural bridges", "18"],
    color: "Blue and white",
    isReliable: true,
    drivers: ["Monica", "Hunter", "the friendly driver with glasses"],
};

// Create the mega sentence
let megaSentence;

megaSentence = "<p>My two top commutes from the array are: " + myCommutes[1] + ", " + myCommutes[2] + "</p>";

// Continue with the object
megaSentence = megaSentence + "<p>My favourite commute possesses such characteristics: " + myCommutes[2]  + ", and the best driver is: " + myFavouriteCommute.drivers[1] + "</p>" + "<p>" + "when I walk though, I usually "+ myCommutes[1] + " " + myFavouriteCommute.route[0] + ", and to come back I use " + myCommutes[0] + " on the " + myFavouriteCommute.route[1] + ".</p>";

// Display the text on the html page
$("#output").html(megaSentence);
