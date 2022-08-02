const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the records.
recordRoutes.route('/plans').get(async function (_req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection('Cell_Comparison')
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

recordRoutes.route('/:brand').get(async function (req, res) {
	const dbConnect = dbo.getDb();
	const query = req.params.brand;
	
	console.log(query)
  
	dbConnect
	  .collection('Cell_Comparison')
	  .find({"Brand":`${query}`})
	  .limit(50)
	  .toArray(function (err, result) {
		if (err) {
		  res.status(400).send('Error fetching listings!');
		} else {
		  res.json(result);
		}
	  });
  });


  recordRoutes.route('/plans').get(async function (req, res) {
	const dbConnect = dbo.getDb();
	const query = parseInt(req.params.id);

	console.log("This is req",req)

	console.log(query)
  
	dbConnect
	  .collection('Cell_Comparison')
	  .find({})
	  .limit(50)
	  .toArray(function (err, result) {
		if (err) {
		  res.status(400).send('Error fetching listings!');
		} else {
		  res.json(result);
		}
	  });
  });

recordRoutes.route('/').get(async function (_req, res) {
	res.json({"Add /(whatever carrier you want) to the path to see the database":"or go /plans to see everything"})
});


module.exports = recordRoutes;