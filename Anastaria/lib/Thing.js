
/*

  Class: Thing

  A very basic class of objects
  
*/

function Thing ( name, description, gender, article ) {

    this.name      = name;
    this.desc      = description;
    this.article   = article;

    this.gender    = gender;
    this.location;
    this.contains  = new Array();

    this._init( this );
}

Thing.prototype = {
    thinglist: new Object(),
    type:      'thing',

    console.log("Yo, I'm a thing!"),

    find: function ( value ) {
        var found = new Array();
        var str   = new String( value.toLowerCase() );

        console.log( this.thinglist );

        // If we have an exact match
        if (str in this.thinglist && this.thinglist[str] != undefined) {
            for (var c = 0; c < this.thinglist[str].length; c++ ) {
                found.push( this.thinglist[str][c] );
            }

            return found;
        }

        // Otherwise
        for (var name in this.thinglist) {
            if (name.indexOf( str ) != -1) {
                for (var c = 0; c < this.thinglist[name].length; c++ ) {
                    found.push( this.thinglist[name][c] );
                }
            }
        }

        return found;
    },

    look: function () {
        return sentence( this.desc );
    },

    getObject: function (name) {
        var value = new String( name.toLowerCase() );

        if (value in this.thinglist) {
            return thinglist[value];
        }
    },

    getName: function() {
        return this.name;
    },

    setLocation: function ( object ) {
        // If we have a location
        if (this.location != undefined) {
            // If the location has a contains Array
            if (contains in this.location) {
                // Iterate through the array
                var cont = this.location.contains;
                for (var c = 0; c < contains.length; c++) {
                    // If we find ourself, remove ourself from the array
                    if (cont[c] == this) {
                        this.location.contains.splice( c, 1 );
                        continue;
                    }
                }
            }
        }
        
        if (contains in object) {
            object.contains.push( this );
        }
    },

    show: function ( str ) {
        var output   = new Array();
        var text     = str.split( " " );
        var start_sentence = 1;

        console.log( sentence );

        while (text.length > 0) {
            var word = text.shift();

            var pos = word.indexOf(".");
            var len = word.length - 1;

            if (pos != -1 && pos < len) {
                var temp   = word.split( "." );
                var obj    = temp[0];
                var action = temp[1];

                if (obj === "obj") {
                    obj = this;
                }
                else if (obj in this.thinglist) {
                    obj = this.thinglist[obj][0];
                }
                else {
                    output.push( "UNKNOWN OBJECT: "+word+" ABORTING!" );
                    break;
                }

                if (action in obj) {
                    word = obj[action]();
                }
                else {
                    output.push( "UNKNOWN ACTION: "+word+" ABORTING!" );
                    break;
                }
            }

            output.push( word );
        }

        return sentence( output.join(" ") );
    },

    // Handle Pronouns
    _pronoun: function ( pro ) {
        var type  = new String( pro.toLowerCase() );
        var index = pronoun_list[ this.gender ];

        return pronoun_list[ type ][ index ];
    },
    _i: function () {
        return this._pronoun( "I" );
    },
    _me: function () {
        return this._pronoun( "me" );
    },
    _my: function () {
        return this._pronoun( "my" );
    },
    _mine: function () {
        return this._pronoun( "mine" );
    },
    _myself: function () {
        return this._pronoun( "myself" );
    },
    _was: function () {
        return this._pronoun( "was" );
    },

    // Initialize the object
    _init: function () {
        var name = new String( this.name.toLowerCase() );
        
        if (name in this.thinglist) {
            this.thinglist[name].push( this );
        }
        else {
            this.thinglist[name] = new Array( this );
        }
    }
};

// End Thing


