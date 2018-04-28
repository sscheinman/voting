const sqlite3 = require('sqlite3').verbose();

var num = 10;

// open the database
const path = require('path')
const dbPath = path.resolve(__dirname, 'Voting.db')
console.log(__dirname);
var db = new sqlite3.Database('./databases/Voting.db', sqlite3.OPEN_READWRITE, (err) => {
if (err) {
  console.error(err.message);
}
console.log('Connected to the Voting database.');
});

// Empty object
dbtools = {};
dbtools.db = db;

// Data must have fields data.BallotID data.Type data.StartTime data.EndTime data.VotingGrade data.NumChoices
dbtools.saveBallot = function(data, callback) {

  // Save to SQLite database
  db.run('INSERT INTO Ballot(Type, StartTime, EndTime, VotingGrade, NumChoices) VALUES(?, ?, ?, ?, ?)',
    [data.Type, data.StartTime, data.EndTime, data.VotingGrade, data.NumChoices], function(err) {
      if (err) {
          return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);

        if (callback) {
    callback(this.lastID);
  }

    });

};


dbtools.saveCandidate = function(userData, ballotID, callback){
  // first find ID of user
  var lastName = userData.name.split(",")[0];
  console.log("lastname:" + lastName);

  db.get("SELECT StudentID id FROM STUDENT WHERE LName = ?", [lastName],
    (err, studentID) => {
      if (err) {
        throw err;
      }

      console.log(studentID);
      console.log(ballotID);

      // save (studentID, ballotId) to candidate table
      db.run('INSERT INTO Candidate(StudentID, BallotID, LFname) VALUES(?, ?, ?)',
      [studentID.id, ballotID, userData.name], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A candidate has been inserted with rowid ${this.lastID}`);
      });
  });

}

/*
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
  db.close();
});
*/

dbtools.getAllUsers = function(callback) {

  db.all('SELECT LName lname, FName fname FROM STUDENT',
    (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach( function (row) {
        console.log(row.lname);
      });

      if (callback) {
        callback(err, rows);
      }

    });
}

dbtools.getBallots = function(data, callback) {
  console.log('Voting Grade: ' + data.position);
  db.all('SELECT * FROM Ballot WHERE VotingGrade = ? or VotingGrade = ?',
    [data.position, 'All'],
    (err, row) => {
      if (err) {
        throw err;
      }
      console.log(row);

      if (callback) {
        callback(err, row);
      }
});
}

dbtools.getCandidates = function(ballotID, callback) {
  console.log('BallotId: ' + ballotID);
  db.all('SELECT * FROM Candidate WHERE BallotID = ?',
    [ballotID],
    (err, rows) => {
      if (err) {
        throw err;
      }
      console.log('Candidates are ');
      console.log(rows);

      if (callback) {
        callback(err, rows);
      }
});
}

dbtools.castVote = function(callback){
  console.log('Vote Id Number: ' + data.VoteNum);
  db.run('INSERT INTO Votes(StudentID, BallotID) VALUES(?, ?)',
    [data.StudentID, data.BallotID], function(err) {
      if (err) {
          return console.log(err.message);
      }
      // get the last insert id
      console.log(`A vote row has been inserted with rowid ${this.lastID}`);
    });

  if (callback) {
    callback();
  }
};

/*
dbtools.gettotalVotes = function(callback){
  db.all('SELECT sum(BallotID) FROM Ballot');
  if (err) {
      return console.log(err.message);
  }
  // get the last insert id
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

if (callback) {
callback();
}

}
*/



dbtools.readUserData = function (callback) {
  db.all('select * FROM Ballot', [], callback);
}


module.exports = dbtools;
