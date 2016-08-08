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


// //these are for querying the API.  "options" grants authorization, options2 is an example of a request.  
var options = {
    method: 'POST',
    url: 'https://ws.homeaway.com/oauth/token',
    headers: {
        'postman-token': '940e960b-01e8-9a90-b5ca-130cfe8d4c26',
        'cache-control': 'no-cache',
        authorization: 'Basic Y2QyZGQyM2MtYmUwMy00OTk4LTg4NWItYjg0ZDY4ODg4ZjEyOmU4ZjcyZjUzLTRlMTMtNDYyNy04NDQ4LTBhYjQzNDVlYWYyMw=='
    }
};



//===================================================================

app.get('/', function(req, res, next) {
    request(options, function(error, response, body) {
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

app.post('/formResponse', function(req, res) {
  // res.send('You entered the city "' + req.body.city + '".');//This is printed on /formRequest
  res.redirect('/form');
  // console.log("this should be the entered city, ", req.body.city);//This is logged to the console

  //GET Request Parameters----------------------
  var city = req.body.city;
  var search = {
    method: 'GET',
    url: 'https://ws.homeaway.com/public/search',
    qs: { minSleeps: '3', q: city, minNightlyPrice: '500' },
    headers: {
        'postman-token': '6c3a6488-22a3-b3df-3842-a7571a4fac34',
        'cache-control': 'no-cache',
        authorization: 'Bearer NTZlNjYzZGYtNTYxNS00NWViLWFjZTQtOWY0ZDVlMmMwZjIz'
    }
    };
    //Request
    request(search, function(error, response, body){
        if (error) throw new Error(error);
        console.log(body);
    });
    
});



