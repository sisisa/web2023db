const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

let sqls = [
  'insert into team ("team_id", "team", "funs", "debut") values (1, "嵐", 3070000, "1999/5/23");',
  'insert into team ("team_id", "team", "funs", "debut") values (2, "関ジャニ∞", 780000, "2004/9/22");',
  'insert into team ("team_id", "team", "funs", "debut") values (3, "なにわ男子", 564000, "2021/11/12");',
  'insert into team ("team_id", "team", "funs", "debut") values (4, "King&Prince", 930000, "2018/5/23");',
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