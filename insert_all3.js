const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

let sqls = [
  'insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (2, "大野智", "1980/11/26", "東京都", 1);',
  'insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (4, "二宮和也", "1983/6/17", "東京都", 1);',
  'insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (5, "松本潤", "1983/8/30", "東京都", 1);',
  
]

for(let sql of sqls){
  db.serialize( () => {
	  db.run( sql, (error, row) => {
		  if(error) {
			  console.log('Error: ', error );
			  return;
		  }
		  console.log( "データを追加しました" );
  	});
  });
}