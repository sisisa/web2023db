const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  const message = "ジャニの表示をするページです";
  res.render('show2', {mes:message});
});

app.get("/team", (req, res) => {
    db.serialize( () => {
        db.all("select team_id, team, funs, debut from team;", (error, row) => {
            if( error ) {
                res.render('show2', {mes:"エラーです"});
            }
            res.render('select2', {data:row});
        })
    })
})

app.get("/team/:team_id", (req,res) => {
  db.serialize( () => {
    let sql = "select id, name from jidol inner join team on jidol.team_id=team.team_id where team.team_id="+ req.params.team_id +";";
    console.log(sql);
    db.all(sql, (error, row) => {
      if(error){
        res.render('show2', {mes:"エラーです"});
      }
      console.log(row);
      res.render('select4', {data:row});
    })
  })
})

app.get("/jidol", (req, res) => {
    db.serialize( () => {
      db.all("select id, name, birthday, birthplace, team from jidol inner join team on jidol.team_id=team.team_id;", (error, row) => {
        if(error){
          res.render('show2', {mes:"エラーです"});
        }
        res.render('select3', {data:row});
      })
    })
})


app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
