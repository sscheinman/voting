var express = require('express');
var router = express.Router();
// Load the data model
var dbtools = require('../models/databaseModels');

var candidatesList = [];

//*************************************************//
// All of these routes are relative to /users      //
//*************************************************//

// GET to Add Candidates page
router.get('/addcandidate', indexCreateBallot2Function);

// POST data from
router.post('/record', record_data);

router.post('/search', searchByUser);

//
// Functions responding to HTTP requests
//
router.get('/createBallot2', indexCreateBallot2Function);

function indexCreateBallot2Function(req, res, next) {
	// parameters for res.render(par1, par2)
	// par1 : a view in the views folder
	// par2 : data to be used when rendering the view
  console.log(candidatesList);

  res.render(
  	'createBallot2',
  	{ title: 'Admin View',
  	  candidates: candidatesList
  	}
  	);
}

function record_data(req, res, next) {
	console.log(req.body); // show in the console what the user entered
	//usersModel.push(req.body); // Add the user data to the users_data dataset
  dbtools.saveBallot(req.body, () => {
	   res.redirect('createBallot2');	// reload the page
  });

}

function searchByUser(req, res, next) {
  //console.log(req.body);
  data = dbtools.searchByName( req.body, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);

    if (rows) {
      console.log(rows);
      candidatesList.push(rows);
      res.redirect('createBallot2');
    }
  });

}

// Export the router, required in app.js
module.exports = router;
