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
    });

  if (callback) {
    callback();
  }
};

/*
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
  db.close();
});
*/

dbtools.searchByName = function(data, callback) {
  console.log(data.name);


  db.each('SELECT LName lastname, FName firstname FROM STUDENT WHERE LNAME = ?',
    [data.name],
    (err, row) => {
      if (err) {
        throw err;
      }
      console.log(row);
      //console.log(row.firstname + ", " + row.lastname);

      if (callback) {
        callback(err, row);
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
      console.log(`A row has been inserted with rowid ${this.lastID}`);
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
