var sqlite3 = require('sqlite3').verbose();
var check;
var db = new sqlite3.Database('Voting.db');



//db.run('INSERT INTO Student(StudentID, Grade, FName, LName) VALUES('9999999', 'Senior', 'Sammmy', 'Dienesch')';

db.run(`INSERT INTO Student(StudentID, Grade, FName, LName) VALUES(?,?,?,?)`, [7672679, 'Senior', 'Wendy', 'Wu'], function(err) {
if (err) {
  return console.log(err.message);
}
// get the last insert id
console.log(`A row has been inserted`);
});

db.run(`INSERT INTO Ballot(BallotID, Type, StartTime, EndTime, VotingGrade, NumChoices) VALUES(?,?,?,?,?,?)`, [9787, 'Speaker House', '3:00', '4:00', 'All', 1], function(err) {
if (err) {
  return console.log(err.message);
}
// get the last insert id
console.log(`A row has been inserted`);
});

/*
db.all("SELECT * FROM Student", function(err, rows) {
  console.log('All Students')
        rows.forEach(function (row) {
            console.log(row.StudentID, row.FName, row.LName);
        })
	});
  */

  db.all("SELECT * FROM Student WHERE Grade = 'Senior'", function(err, rows) {
    console.log('Seniors')
          rows.forEach(function (row) {
              console.log(row.FName, row.LName);
          })
  	});

    db.run(`INSERT INTO Student(StudentID, Grade, FName, LName) VALUES(?)`, [767267636, 'Junior', 'Brad', 'Pitt'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted`);
  });

  // var stmt = db.prepare('INSERT INTO Ballot VALUES (?)');
  // stmt.run(['9998', 'President', '3:00', '7:00','All', '1']);


  db.all("SELECT * FROM Ballot", function(err, rows) {
    console.log('All Ballots')
          rows.forEach(function (row) {
              console.log(row.BallotID, row.Type, row.VotingGrade);
          })
  	});










//  db.query("INSERT INTO Ballot (BallotID, Type, StartTime, EndTime, VotingGrade, NumChoices) VALUES ('1', 'President', '2009-01-01 00:00:00', '2009-01-01 00:00:00', 'All', '1'))";




db.close();