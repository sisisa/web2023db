const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

let sqls = [
  'insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (11, "大西流星", "2001/8/7", "兵庫県", 3);',
  'insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (12, "大橋和也", "1997/8/9", "福岡県", 3);',
  'insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (13, "高橋恭平", "2000/2/28", "大阪府", 3);',
   'insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (14, "長尾謙杜", "2002/8/15", "大阪府", 3);',
   'insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (15, "西畑大吾", "1997/1/9", "大阪府", 3);',
   'insert into jidol ("id", "name", "birthday", "birthplace", "team_id") values (17, "道枝駿佑", "2002/7/25", "大阪府", 3);'
  
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