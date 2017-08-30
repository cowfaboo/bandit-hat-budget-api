const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();

const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
	if (err) {
	console.log(err);
	process.exit(1);
	}

	require('./app/routes')(app, {});

	var server = app.listen(process.env.PORT || port, () => {
	  console.log('We are live on ' + server.address().port);
	});
});