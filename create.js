const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('readinglist.db');

//readingテーブル
let schema = `
create table reading(
  id integer primary key,
  title text,
  genre text,
  tag text,
  review integer,
  url text
);
`
//finished readingテーブル
let schema2 = `
create table finished (
  id integer primary key,
  finished integer,
  content text,
  impress text,
  want_read text
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

db.serialize( () => {
	db.run( schema2, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "テーブルを作成しました" );
	});
});