/*
   Utility Functions

*/

var player    = new Thing( "player", "Look in the mirror.", "second", "the" );
var kitchen   = new Location( "kitchen", "nice stuff" );

var locations = new Array(
    kitchen,
    new Location( "pantry", "lots of cupboards" ),
    new Location( "library", "books, books and more books" )
    );

locations[0].set_move( { n: locations[2], s: locations[1] } );
locations[1].set_move( { n: locations[0] } );
locations[2].set_move( { s: locations[0] } );

player.location = kitchen;

console.log( player );

function StartGame() {

    var input = document.getElementById("input");

    input.addEventListener("keydown", function(e) {
        if (!e) { var e = window.event; }

        // Enter is pressed
        if (e.keyCode == 13) { playerInput(); }

    }, false);

    playerOutput( "<b>"+player.location.brief()+"</b>" );

    input.focus();
}

var pronoun_list = {
    male   : 0,
    female : 1,
    it     : 2,
    self   : 3,
    second : 4,
    plural : 5,
    
//  gender :    male       female     it        self      second      plural
    i      : [ "he",      "she",     "it",     "I",      "you",      "they"  ],
    me     : [ "him",     "her",     "it",     "me",     "you",      "them"  ],
    my     : [ "his",     "her",     "its",    "my",     "your",     "their" ],
    mine   : [ "his",     "hers",    "its",    "mine",   "yours",    "theirs"],
    myself : [ "himself", "herself", "itself", "myself", "yourself", "themselves"],

//  to be  :    male       female     it        self      second    
    was    : [ "was",     "was",     "was",    "am",     "were",    ],
};


// What to do with the player input
function playerInput() {

    var input   = document.getElementById("input");
    var list    = input.value.split( " " );
    rawOutput( "> " + input.value );

    var action  = list[0];
    var found = 0;
    console.log( "action: "+action );
    for (var c = 1; c < list.length; c++) {
        var subject = player.find( list[c] );
        console.log( "subject: "+subject );
        
        if (subject === undefined) { next; }
        
        if (action in subject) {
            playerOutput( subject[action]( list ) );
            found = 1;
            break;
        }
    }
    if (!found) {
        console.log( "testing alternates" );
        if (action in player.location) {
            playerOutput( player.location[action]( list ) );
        }
        else if (action in player) {
            playerOutput( player[action]( list ) );
        }
        else {
            playerOutput( "I don't know what you mean." );
        }
    }

    input.value = "";

    playerOutput( "<b>"+player.location.brief()+"</b>" );
}

function rawOutput(string) {
    var output  = document.getElementById("display");
    var content = document.createTextNode(string);

    output.appendChild( content );
    trimOutput();
}

// Output information to the player
function playerOutput(string) {
    var output  = document.getElementById("display");
    var content = document.createElement("p");
    content.innerHTML = string;

    output.appendChild( content );
    trimOutput();
}

function trimOutput() {
    var output  = document.getElementById("display");

    // Remove oldest children until we have less than 50 remaining
    var kids    = output.childNodes;
    while( kids.length > 50 ) {
	output.removeChild( kids.shift() );
    }

    output.scrollTop = output.scrollHeight;
}

// Capitalize the first letter of the sentence
function sentence(string) {

    // Trim any leading spaces
    while (string.charAt(0) === " " ) {
        string = string.slice(1);
    }

    if (string.indexOf(".") != -1) {
        var ind = string.split(".");
        var out = new Array();
        while (ind.length > 0) {
            var line = ind.shift();
            out.push( sentence( line ) );
        }

        return out.join(". ");
    }
    
    return string.charAt(0).toUpperCase() + string.slice(1);
}
