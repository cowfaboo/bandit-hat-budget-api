const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();

const port = 8080;
var server = app.listen(process.env.PORT || port, () => {
  console.log('We are live on ' + server.address().port);
});