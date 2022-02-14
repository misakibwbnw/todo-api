// expressモジュールを読み込む
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// mysql
const mysql = require('mysql')

// expressアプリを生成する
const app = express()

// sql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "misaki1445",
    database: 'list_app'
})

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('success');
});

app.get('/', (req, res) => {
    connection.query(
      'SELECT * FROM users',
      (error, results) => {
        console.log(results);
        res.render('hello.ejs');
      }
    );
});
  
app.listen(8081);



