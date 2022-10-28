const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

let schema = `
create table team(
  team_id integer primary key,
  team text,
  funs integer,
  debut text
);
`

db.serialize( () => {
	db.run( schema, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "テーブルを作成しました" );
	});
});