const express = require('express');
const app = express();
var cors = require('cors');
const port = 3000;
const axios = require('axios').default;
app.use(cors());
var MongoClient = require('mongodb').MongoClient
var collection;

const uri = "mongodb+srv://wanderer:holajaja9889@cluster0.6qswt.mongodb.net/pokemonDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});
client.connect(err => {
	collection = client.db("pokemonDB").collection("pokemons"); 
});

app.get('/queryForm', (req, res) => {
    res.sendFile("./page.html", {root: __dirname});
});

app.route('/pokemons').get(async function(req, res){  
    let pokemons = await collection.find().toArray();
    res.send(pokemons);
});

app.post('/queryForm/pokemon', function (req, res) {

    let nameParam = req.query.name;
	collection.deleteOne({
		name: nameParam
	}, function(err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
	});
})

app.get('/queryForm/pokemon', function (req, res) {

    let nameParam = req.query.name;
    const URL = 'https://pokeapi.co/api/v2/pokemon/';
	const prefixImage = "https://pokeres.bastionbot.org/images/pokemon/";

    axios.get(URL+nameParam)
    .then(pokemon_response => {
		var pokemonData = pokemon_response.data;

		var type = pokemonData.types["0"].type.name;
		var weigth =  pokemonData.weight;
		var img = prefixImage + pokemonData.id + ".png";
		var name = pokemonData.name;
		
		var str = JSON.stringify({name: name, img: img, weigth: weigth, type: type});
		collection.insertOne({
			name: name,
			img: img,
			weigth: weigth,
			type: type
		}, function(err, res) {
			if (err) throw err;
			console.log("1 document inserted");
		});
		
        console.log("I am making a request to " + URL);
        res.send(str);
    }).catch(function(error){
        console.log(error);
        res.status(404).send('the pokemon does not exist');
    });
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

