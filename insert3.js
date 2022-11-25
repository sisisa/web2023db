const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (16, "道枝駿佑", "2002/7/25", "大阪府", 3);
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
