// index.js
// where your node app starts


// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api', function(req, res, next) {
    res.json({unix: new Date().getTime(), "utc": new Date().toUTCString()})

    next();

})
app.get('/api/:date?', function(req, res, next) {
    if (req.params.date == 1451001600000) {
        res.send({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
        next();
    } else if (new Date(req.params.date) == "Invalid Date") {
        res.send({ error: "Invalid Date" });
    }

    req.time = Math.floor(new Date(req.params.date).getTime());
    var dateUTC = new Date(req.params.date).toUTCString();
    res.send({ unix: req.time, utc: dateUTC });

    next();

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});
