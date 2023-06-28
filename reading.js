const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// EJSテンプレートエンジンの設定
app.set('view engine', 'ejs');

// データベースの作成と接続
const db = new sqlite3.Database('booklist.db');

// データベースのテーブルを作成
db.serialize(() => {
db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT)');
});

app.use(express.urlencoded({ extended: false }));

// 読書リストの一覧を表示するエンドポイント
app.get('/', (req, res) => {
db.all('SELECT * FROM books', (err, rows) => {
if (err) {
res.status(500).json({ error: err.message });
return;
}

res.render('index', { books: rows });


});
});

// 新しい本を追加するエンドポイント
app.post('/add', (req, res) => {
const { title, author } = req.body;

if (!title || !author) {
res.status(400).json({ error: 'title and author are required' });
return;
}

db.run('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], function(err) {
if (err) {
res.status(500).json({ error: err.message });
return;
}

```
res.redirect('/');

```

});
});

// 本を更新するエンドポイント
app.post('/update/:id', (req, res) => {
const { id } = req.params;
const { title, author } = req.body;

if (!title || !author) {
res.status(400).json({ error: 'title and author are required' });
return;
}

db.run('UPDATE books SET title = ?, author = ? WHERE id = ?', [title, author, id], function(err) {
if (err) {
res.status(500).json({ error: err.message });
return;
}

```
res.redirect('/');

```

});
});

// 本を削除するエンドポイント
app.get('/delete/:id', (req, res) => {
const { id } = req.params;

db.run('DELETE FROM books WHERE id = ?', id, function(err) {
if (err) {
res.status(500).json({ error: err.message });
return;
}


res.redirect('/');
});
});

// サーバーを起動
app.listen(port, () => {
console.log(`Server started on port ${port}`);
});