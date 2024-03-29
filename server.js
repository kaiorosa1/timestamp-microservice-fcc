// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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


app.get("/api/timestamp/:datastring?",function(req,res){
  let value = req.params.datastring;
  let dateParsed = new Date(value);
  let time = dateParsed.getTime();
  let utcDate = dateParsed.toUTCString();
  if(value === undefined){
    time = new Date().getTime();
    utcDate = new Date().toUTCString();
    
  }
  res.json({unix: time, utc: utcDate});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});