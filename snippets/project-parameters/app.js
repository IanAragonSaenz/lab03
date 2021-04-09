var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.route('/clients').get(function(req, res){
    res.end('List of clients');
});

app.route('/clients/register').post(function(req, res){
    let nameParam = req.body.name;
    let ageParam = req.body.age;
    let phoneParam = req.body.phone;
    if (!nameParam || !ageParam || !phoneParam)
        res.end('Not all parameters were received');
    else
        res.end('Registering a client ' + nameParam + ', ' + ageParam + ', ' + phoneParam);
});

const portNumber = 3000;
var server = app.listen(portNumber, function(){
    console.log('Server ready and running');
})