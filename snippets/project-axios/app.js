const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios').default;

app.get('/', (req, res) => {
    const URL = 'https://pokeapi.co/api/v2/pokemon/dittosdkjfhasodfy';

    axios.get(URL)
    .then(pokemon_response => {
        let pokemon_data = pokemon_response.data;
        console.log("I am making a request to " + URL);
        res.send(pokemon_data);
    }).catch(function(error){
        console.log(error);
        res.status(404).send('the pokemon does not exist');
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});