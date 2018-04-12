const sqlite3 = require('sqlite3').verbose();

// open the database
var db = new sqlite3.Database('./databases/Voting.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');
});

// Empty object
dbtools = {};

dbtools.db = db;

// Data must have fields data.name and data.lastname
dbtools.saveUser = function(data, callback) {

	// Save to SQLite database
	db.run('INSERT INTO People(firstName, lastName) VALUES(?, ?)', 
		[data.name, data.lastname], function(err) {
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

dbtools.readUserData = function (callback) {

	db.all('SELECT * FROM People',[], callback); 

}


/* 
db.serialize(() => {
  db.each(`SELECT name as name
           FROM People`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.name);
  });
});
 
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});

// Query: Select rows with name 
let sql = `SELECT DISTINCT Name name FROM People
           ORDER BY name`;
 
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.name);
  });
});

*/


module.exports = dbtools;