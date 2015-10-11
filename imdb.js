// Import the fs module so that we can read in files.
var fs = require('fs');

// Import express to create and configure the HTTP server.
var express = require('express');

// Read in the text file and parse it for JSON.
var data = JSON.parse(fs.readFileSync('ratings.json','utf8'));

// Create a HTTP server app.
var app = express();

// When a user goes to /, return a small help string.
app.get('/', function(req, res) {
  res.send('Try http://127.0.0.1:8000/movie/id/123 or http://127.0.0.1:8000/movie/year/1900.');
});

// Send back the JSON for movie i at /movie/id/i.
app.get('/movie/id/:id', function(req, res) {
  res.json(data[req.params.id].title);
});

// Send back the JSON for movie i at /movie/year/i
app.get('/movie/year/:year', function(req, res){
  var result = [];

  for (var i = 0; i < data.length; i++) {
    if (data[i].year+"" === req.params.year+"") {
      result.push(data[i].title);
    }
  }

  res.json(result);
});

// random movie
app.get('/movie/random', function(req, res){
  var max = data.length;
  var min = 1;
  var rand;

  var nomovies = req.query.nomovies;
  if (nomovies > 0) {
    var result = [];

    for (var i = 0; i < nomovies; i++) {
      rand = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log(rand);
      result.push(data[rand].title);
    }
    res.json(result);
  }
  else {
    rand = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(rand);
    res.json(data[rand].title);
  }

});

// search route with part of title name
app.get('/movie/search/:search', function(req, res){
  var result = [];

  for (var i = 0; i < data.length; i++) {
    if (data[i].title.indexOf(req.params.search) >= 0) {
      console.log(data[i].title);
      result.push(data[i].title);
    }
  }

  res.json(result);
});

// Start the server.
var server = app.listen(8000);

console.log("Web Service running on local host port 8000");
