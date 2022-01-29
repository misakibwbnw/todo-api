// expressモジュールを読み込む
const express = require('express');

// expressアプリを生成する
const app = express();

// ルート（http://localhost/）にアクセスしてきたときに「Hello」を返す
// app.get('/', (req, res) => res.send('Hello'));

app.get('/api/v1/list', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    
    // クライアントに送るJSONデータ
    const todoList = [
        { title: 'JavaScriptを勉強する', done: true },
        { title: 'Node.jsを勉強する', done: false },
        { title: 'Web APIを作る', done: false }
    ];

    // JSONを送信する
    res.json(todoList);
});


// ポート8080でサーバを立てる
app.listen(8080, () => console.log('Listening on port 8080'));







