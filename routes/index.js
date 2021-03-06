var express = require('express');
// Load the data model
var dbtools = require('../models/databaseModels');

var router = express.Router();

// Array of Ballots
var ballotList = [];

router.get('/', function(req, res, next) {
	res.render('index', {title: "Admin Portal"});
});

router.get('/results', resultsFunction);

function resultsFunction (req, res, next){
	res.render('results');
}

router.get('/createBallot', createBallotFunction);

function createBallotFunction (req, res, next){
	res.render('createBallot');
}

router.get('/viewBallot', viewBallotFunction);

function viewBallotFunction (req, res, next){
	res.render('viewBallot');
}

router.get('/logOut', logOutFunction);

function logOutFunction (req, res, next){
	res.render('logOut');
}

router.post('/generalVoting', generalVotingFunction);

function generalVotingFunction (req, res, next){
	console.log(req.body);
	dbtools.getBallots(req.body, function (err, rows) {
    if (err) {
      throw err;
    }
    //console.log(rows);

    if (rows) {
      console.log(rows);
      ballotList.push(rows);
			// Go get the candidates for entries in the ballotList
			dbtools.getCandidates(rows[7].BallotID, function (err, candidateList) {
				if (err) {
					throw err;
				}
				console.log(candidateList);

      	res.render('generalVoting', {candidates: candidateList});
		});
    }
  });

	res.render('generalVoting');
}

router.get('/createBallot2', createBallot2Function);

function createBallot2Function (req, res, next){
	res.render('createBallot2');
}

router.get('/studentView', studentViewFunction);

function studentViewFunction (req, res, next){
	res.render('studentView');
}

router.get('/candidateView', candidateViewFunction);

function candidateViewFunction (req, res, next){
	res.render('candidateView');
}

router.get('/electionPreview', electionPreviewFunction);

function electionPreviewFunction (req, res, next){
	res.render('electionPreview');
}

module.exports = router;
