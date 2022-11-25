const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
  const message = "ようこそ！！";
  res.render('show2', {mes:message});
});

app.get("/team", (req, res) => {
    db.serialize( () => {
        db.all("select team_id, team, funs, debut from team;", (error, row) => {
            if( error ) {
                res.render('show2', {mes:"エラーです"});
            }
            res.render('allgroup', {data:row});
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
      res.render('gmember', {data:row});
    })
  })
})

app.post("/gsort",(req, res) => {
  let desc = "";
  let rq = req.query;
  console.log({rq});
  if(req.query.order) desc = "desc";
  let sql = "select team_id, team, funs, debut from team order by " + req.query.sort_item + " " + desc + ";";
  console.log(sql);
  db.serialize( () => {
    db.all(sql, (error, data) => {
      if(error){
        res.render('show2', {mes:"エラーです"});
      }
      res.render('allgroup', {data:data});
    })
  })
})

app.get("/jidol", (req, res) => {
    db.serialize( () => {
      db.all("select id, name, birthday, birthplace, team from jidol inner join team on jidol.team_id=team.team_id;", (error, row) => {
        if(error){
          res.render('show2', {mes:"エラーです"});
        }
        res.render('allmember', {data:row});
      })
    })
})

app.get("/jidol/:id", (req,res) => {
  db.serialize( () => {
    let sql = "select id, name, birthday, birthplace, team from jidol inner join team on jidol.team_id=team.team_id where id=" + req.params.id + ";";
    console.log(sql);
    db.all(sql, (error, row) => {
      if(error){
        res.render('show2', {mes:"エラーです"});
      }
      res.render('member', {data:row});
    })
  })
})

app.post("/insert1", (req, res) => {
  let sql = 'insert into team (team, funs, debut) values ("'+ req.body.team +'","'+ req.body.funs +'","'+ req.body.debut +'");';
  console.log(sql);
  db.serialize( () => {
    db.run( sql, (error, row) => {
      console.log(error);
      if(error){
        res.render('show2', {mes:エラーです});
      }
      res.redirect('/team');
    })
  })
  console.log(req.body);
})

app.post("/insert2",(req, res) => {
  let nsql = 'select team_id from team where team.team="'+ req.body.team +'";'
  console.log(nsql);
  let sql = 'insert into jidol (name, birthday, birthplace, team_id) values ("'+ req.body.name + '","'+ req.body.birthday +'","'+req.body.birthplace+'",(select team_id from team where team.team="'+ req.body.team +'"));';
  console.log(sql);
  db.serialize( () => {
    db.run( sql, (error, row) => {
      console.log(error);
      if(error){
        res.render('show2', {mes:エラーです});
      }
      res.redirect('/jidol');
    })
  })
  console.log(req.body);
})

app.post("/select1", (req, res) => {
  let sql = 'select team_id, team, funs, debut from team where team="'+ req.body.team +'";';
  console.log(sql);
  db.serialize( () => {
    db.all( sql, (error, row) => {
      if(error){
        res.render('show2', {mes:エラーです});
      }
      console.log(row)
      res.render('group', {data:row});
    })
  })
})

app.post("/select2", (req, res) => {
  let sql = 'select id, name, birthday, birthplace, team from jidol inner join team on jidol.team_id=team.team_id where name="'+ req.body.name +'";';
  console.log(sql);
  db.serialize( () => {
    db.all( sql, (error, row) => {
      if(error){
        res.render('show2', {mes:エラーです});
      }
      console.log(row)
      res.render('member', {data:row});
    })
  })
})

app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(80, () => console.log("Example app listening on port 80!"));
