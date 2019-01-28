require("dotenv").config();
var moment = require("moment");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var value = process.argv.slice(3).join(" ");

Action(action, value);

function Action(action, value) {
    if (action == "concert-this") {
        console.log("concert-this")
        concertThis(value);
    }
    else if (action == "spotify-this-song") {
        console.log("spotify-this-song")
        spotifyThisSong(value);
    }
    else if (action == "movie-this") {
        console.log("movie-this")
        movieThis(value);
    }
    else if (action == "do-what-it-says") {
        console.log("do-what-it-says")
        doWhatItSays();
    }
    else {
        console.log("I am lost and don't know what to do")

    }
}
function concertThis(value) {
    // Run the axios.get function...
    // The axios.get function takes in a URL and returns a promise (just like $.ajax)
    var URL = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

    axios.get(URL).then(
        function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            //console.log(response.data);
            for (var i=0; i < response.data.length;  i++){
                console.log("Name of Venue: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city);
                console.log("Date of Event: " + moment(response.data[i].datetime, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YYYY"));
            }
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    );
}

function spotifyThisSong(value) {
    var sQuery = "The Sign";
    if (value != "") {
        sQuery = value;
    }
    spotify.search({ type: 'track', query: sQuery }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } 
        else {
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        }
        
    });
     
}

function movieThis(value) {
    var sQuery = "Mr. Nobody";
    var isBlank = false;
    if (value != "") {
        sQuery = value;
    }
    else {
        isBlank = true;
    }
    // Run the axios.get function...
    // The axios.get function takes in a URL and returns a promise (just like $.ajax)
    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + sQuery;
    axios.get(URL).then(
        function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            //console.log(response.data);
            console.log("Title: " + response.data.Title);
            console.log("Year of Movie: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomato Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            if (isBlank) {
                console.log("If you haven't watched " + sQuery + ", then you should: <http://www.imdb.com/title/tt0485947/>");
                console.log("It's on Netflix!")
            }
            
        })
        .catch (function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    );
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
        var action = dataArr[0];
        var value = dataArr[1];

        Action(action, value);

    });
}

