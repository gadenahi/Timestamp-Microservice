// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var date = new Date()

console.log(date.getTime());
console.log(date.toUTCString());
// app.use(express.logger('dev'));

console.log(Date.UTC(1969,11,31, 23, 59, 59, 59))


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:stamp?", function (req, res) {
  if (req.params.stamp.match(/(\d{4})-(\d{2})-(\d{2})/)) {
    var data = req.params.stamp.split('-')
    var unixDate = Date.UTC(data[0],data[1]-1,data[2])
    var utcDate = new Date(unixDate)    
    
    res.json({unix: unixDate, utc: utcDate});    
  } else if (!isNaN(req.params.stamp)) {
    console.log(Number(req.params.stamp))
        console.log(typeof(req.params.stamp))
    var utcDate = new Date(Number(req.params.stamp))       
    console.log(utcDate)
    res.json({unix: req.params.stamp, utc: utcDate});    
  } else {
    res.json({"error" : "Invalid Date" })
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

