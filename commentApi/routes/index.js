var express = require('express');
var router = express.Router();
var connection = require('../database/connection.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	// res.callback({"data": "hello"});
	connection.connect();

	connection.query('select 1+1 as solution', function(err, rows, fields){
		if (err) throw err;
		console.log('The solution is: ', rows[0].solution);
	});

	connection.end();

	// res.json({"data": "hello"});
  res.render('index', { title: 'Express' });
});

module.exports = router;
