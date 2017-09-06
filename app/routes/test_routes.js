var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	
	app.post('/notes', (req, res) => {
			const note = { text: req.body.body, title: req.body.title };
			db.collection('notes').insert(note, (err, result) => {
				if (err) { 
					res.send({ 'error': 'An error has occurred' }); 
				  } else {
					res.send(result.ops[0]);
				  }
			});
		  });
	
	app.get('/notes/:id', (req, res) => {
		const id = req.params.id;
		const objectID = { '_id': new ObjectID(id) };
		db.collection('notes').findOne(objectID, (err, note) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(note);
			}
		});
	});

	app.put('/notes/:id', (req, res) => {
		const id = req.params.id;
		const objectID = { '_id': new ObjectID(id) };
		const note = {text: req.body.body, title: req.body.title };
		db.collection('notes').update(objectID, note, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(note);
			}
		});
	});

	app.delete('/notes/:id', (req, res) => {
		const id = req.params.id;
		const objectID = { '_id': new ObjectID(id) };
		db.collection('notes').remove(objectID, (err, note) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send('Note ' + id + ' deleted!');
			}
		});
	});
};