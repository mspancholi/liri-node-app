# liri-node-app
Week 10 Nodejs

LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.  LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.  To retrieve the data that will power this app, requests will be sent using the `axios` package to the Bands in Town, Spotify and OMDB APIs.  Here is a link to the video of the app:  https://drive.google.com/file/d/1D5acqNnUzPRvGyqcAO4qnglc5OX_i66l/view?usp=sharing

There are four commands entered in node and print out the following:

1. `node liri.js concert-this <artist/band name here>`

    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + Cher + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

    * Name of the venue

    * Venue location

    * Date of the Event 

2. `node liri.js spotify-this-song '<song name here>'`
This will show the following information about the song in your terminal/bash window

    * Artist(s)

    * The song's name

    * A preview link of the song from Spotify

    * The album that the song is from

    * If no song is provided then your program will default to "The Sign" by Ace of Base.

The [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package will be used in order to retrieve song information from the Spotify API.


3. `node liri.js movie-this '<movie name here>'`
This will output the following information to your terminal/bash window:

```
    * Title of the movie.
    * Year the movie came out.
    * IMDB Rating of the movie.
    * Rotten Tomatoes Rating of the movie.
    * Country where the movie was produced.
    * Language of the movie.
    * Plot of the movie.
    * Actors in the movie.
```

If the user doesn't type a movie in, the program will output data for the movie "Mr. Nobody," along with the following test, "If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>  It's on Netflix!"

The `axios` package will retrieve data from the OMDB API. 


4. `node liri.js do-what-it-says`

 Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.


