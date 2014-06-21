/*

  Class: Location

  
  
*/

function Location ( name, description ) {
    this.name     = name;
    this.desc     = description;
    this.dir      = new Object();
    this.contains = new Array();
}

Location.prototype = {
/*    
    n: function () { return this.move( "n" ); },
    e: function () { return this.move( "e" ); },
    w: function () { return this.move( "w" ); },
    s: function () { return this.move( "s" ); },
*/
    move: function ( direction ) {
        if (typeof( direction ) === "object" && direction[0] === "move") {
            direction = direction[1];
        }
        
        if (direction in this.dir) {
            player.location = this.dir[direction];
            return player.location.look();
        }
        else {
            return "I don't understand.";
        }
    },

    set_move: function ( obj ) {
        this.dir = obj;

        for ( var name in obj ) {
            var test = new String( name );
            this[test] = function () { return this.move( test ); };
        }
        console.log( this );
    },

    brief: function () {
        return sentence( this.name );
    },
    
    look: function () {
        return sentence( this.desc );
    },

    inv: function () {
    }
    
};


// End Location
