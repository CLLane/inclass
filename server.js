const express = require('express');
const app = express();
const cors = require('cors')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.NODE_ENV || 3001);
app.use(cors());

app.listen(app.get('port'), () => {
  console.log(`App is listening on port ${app.get('port')}`)
});


app.get('/', (request, response) => {
  database('papers').select()
    .then((papers) => {
      response.status(200).json(papers);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});
