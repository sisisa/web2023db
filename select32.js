const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
select team_id, team, funs, debut from team;
`

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let data of row ) {
			console.log( data.team_id + ' : ' + data.team + ' ' + data.funs + '名 ' + data.debut);
		}
	});
});
