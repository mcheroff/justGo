//Dependencies===========================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var exphbs = require('express-handlebars');

//Configure the app======================================
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(process.cwd() + '/public'));


//MAKE THE CONNECTION=================================================
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Listening on: ' + PORT);
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//Obtains Athorization for HomeAway API  
var authorize = {
    method: 'POST',
    url: 'https://ws.homeaway.com/oauth/token',
    headers: {
        'cache-control': 'no-cache',
        authorization: 'Basic Y2QyZGQyM2MtYmUwMy00OTk4LTg4NWItYjg0ZDY4ODg4ZjEyOmU4ZjcyZjUzLTRlMTMtNDYyNy04NDQ4LTBhYjQzNDVlYWYyMw=='
    }
};



//===================================================================

app.get('/', function(req, res, next) {
    request(authorize, function(error, response, body) {
        if (error) throw new Error(error);
        // console.log(body);
    })
    res.render('index');
});

app.get('/city', function(req, res, body){
    res.render('city');
    });

app.get('/form', function(req, res, body){
    res.render('formTest');
});

app.get('/result', function(req, res, body){
    res.render('results');
})

app.post('/formResponse', function(req, res) {
    //GET Request Parameters------------------
    var city = req.body.city;
    var numBedrooms = req.body.numBedrooms;
    var max = req.body.maxRent;
    var min = req.body.minRent;

    var search = {
        method: 'GET',
        url: 'https://ws.homeaway.com/public/search',
        qs: { minBedrooms: numBedrooms, q: city, minNightlyPrice: min, maxNightlyPrice: max },
        headers: {
            'cache-control': 'no-cache',
            authorization: 'Bearer NTZlNjYzZGYtNTYxNS00NWViLWFjZTQtOWY0ZDVlMmMwZjIz'
        }
    };
    //Request---------------------------------
    // console.log(search);
    request(search, function(error, response, body){
        if (error) throw new Error(error);

        var results = JSON.parse(body);
        var resultArray = [];

        for(i=0; i<5; i++){
            var resultObject = {
                headline: results.entries[i].headline,
                image: results.entries[i].thumbnail.uri,
                listing: results.entries[i].listingUrl
            }
            resultArray.push(resultObject);
        }

        res.send(resultArray);
    });
});


