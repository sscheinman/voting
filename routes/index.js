var express = require('express');
var router = express.Router();

/* GET users listing. */
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

router.get('/createBallot2', createBallot2Function);

function createBallot2Function (req, res, next){
	res.render('createBallot2');
}

module.exports = router;