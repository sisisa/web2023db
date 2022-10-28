const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

let sqls = [
  'insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (3, "櫻井翔", "1982/1/25", "東京都", 1);',
  'insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (8, "村上信五", "1982/1/26", "大阪府", 2);',
  'insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (16, "藤原丈一郎", "1996/2/8", "大阪府", 3);',
  'insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (22, "平野紫耀", "1997/1/29", "愛知県", 4);'
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