// load the things we need
let async    = require('async');
let debug    = require("debug")("img-feed:index");
let gImage   = require('google-images');
let monk     = require('monk');

// Query search term > pull in environment variable TERM
var query = process.env.SEARCH_TERM || "";

// Google API values >> See the readme.md
var API_KEY = "";  // Google API Key
var CSE_KEY = "";  // Custom Search Engine

 // Setup Google Image API library
let gImageAPI = gImage( CSE_KEY, API_KEY );

// Mongo connection to local mongo DB on db='imgstore'
var db = monk('localhost:27017/imgstore');

// Search Options
var opts = {
    page: process.env.PAGE || 1,  // Page of results
    size: process.env.SIZE || ""  // Image size
}

// get Mongo collection
var coll = db.get("images");

// get feed from Google
gImageAPI.search( query, opts )
    .then( function ( images ) {

    // Loop over images list
    async.eachSeries( images , function( img, cb ) {

        // Put them in DB
        // NOTE: this does not remove duplicates or check to see if you already have the image
        coll.insert( img, function( err, item ) {
            debug( "Inserted item", err, item )
            cb( err, item );
        });
    }, function( err ) {
        process.exit()
    });

}).catch( function( err ) {
    debug( "Error", err );
    process.exit();
});
