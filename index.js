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

var mongo_doc = {
    term: "brown belt",
    pages: 0,
    complete: false
}

// get Mongo collection
var coll = db.get("images");


db.get("queries").find({complete:false}, function(err, queries) {

    // // Loop over terms
    queries.forEach(function( query ) {

        debug("query", query)

        // Loop over pages
        // for ( i=1; i <= 10; i++ ) {

            opts.page = 1;

            // get feed from Google
            gImageAPI.search( query.query, opts )
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
        // }

        db.get("queries").update({"_id": query._id}, {$set:{complete: true}})

    })

})
