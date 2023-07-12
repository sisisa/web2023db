const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('readinglist.db');

let sql = `
delete from finished;
`
 // where id=1

db.serialize( () => {
	db.run( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "データを削除しました" );
	});
});
