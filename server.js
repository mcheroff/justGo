var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

var PORT = 3000;
// process.env.PORT || 
var options = {
    method: 'POST',
    url: 'https://ws.homeaway.com/oauth/token',
    headers: {
        'postman-token': '940e960b-01e8-9a90-b5ca-130cfe8d4c26',
        'cache-control': 'no-cache',
        authorization: 'Basic Y2QyZGQyM2MtYmUwMy00OTk4LTg4NWItYjg0ZDY4ODg4ZjEyOmU4ZjcyZjUzLTRlMTMtNDYyNy04NDQ4LTBhYjQzNDVlYWYyMw=='
    }
};

var options2 = {
    method: 'GET',
    url: 'https://ws.homeaway.com/public/search',
    qs: { minSleeps: '3', q: 'london', maxNightlyPrice: '300' },
    headers: {
        'postman-token': '6c3a6488-22a3-b3df-3842-a7571a4fac34',
        'cache-control': 'no-cache',
        authorization: 'Bearer NTZlNjYzZGYtNTYxNS00NWViLWFjZTQtOWY0ZDVlMmMwZjIz'
    }
};

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res, next) {
    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    })


});

app.listen(PORT, function() {
    console.log('Listening on: ' + PORT);
});
