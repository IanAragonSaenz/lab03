var express = require('express');
var app = express();
app.use(express.json());

app.route('/Products').get(function(req, res){
    res.send("<h1>Products</h1>");
});

app.get('/Clients', (req,res) => {
// app.route('/Clients').get(function(req, res){
    res.send("<h1>Clients</h1>");
});

app.route('/Reports').get(function(req, res){
    res.send("<h1>Reports</h1>");
});


app.route('/clients/register').post(function(req, res){
    console.log(req.query.name);
    console.log(req.body.name);    
    res.send("not found");
});

const portNumber = 3000;
var server = app.listen(portNumber, function(){
    console.log('server running');
})