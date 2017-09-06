const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
	useMongoClient: true
  });

require('./app/routes')(app);

var server = app.listen(process.env.PORT || port, () => {
	console.log('We are live on ' + server.address().port);
  });