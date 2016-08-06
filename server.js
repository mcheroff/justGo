var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

var PORT = 3000;
 // process.env.PORT || 

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req,res,next) {
    request('https://ws.homeaway.com/oauth/token', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(response, body)
      }
  	})
});

app.listen(PORT, function(){
    console.log('Listening on: ' + PORT);
});