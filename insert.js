const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('readinglist.db');

let sql = `
insert into reading ("title","genre") values ("十角館の殺人","小説");
`

db.serialize( () => {
	db.run( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "データを追加しました" );
	});
});
