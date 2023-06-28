const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// データベースの接続とテーブルの作成
const db = new sqlite3.Database('readinglist.db');
db.run(`CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  author TEXT
)`);

// JSONデータのパースを設定
app.use(express.json());

// リーディングリストの取得
app.get('/books', (req, res) => {
  db.all('SELECT * FROM books', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// リーディングリストへの本の追加
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    res.status(400).json({ error: 'Title and author are required' });
    return;
  }

  db.run('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID });
    }
  });
});

// サーバーの起動
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
