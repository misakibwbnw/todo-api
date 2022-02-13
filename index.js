// expressモジュールを読み込む
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// mysql
const mysql = require('mysql')


// expressアプリを生成する
const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(bodyParser.json());
const todoList = []
let todoItemIds = 0

app.get('/api/v1/list', (req, res) => {
    res.json(todoList)
})

app.get('/api/v1/list/:id', (req, res) => {
    const index = todoList.findIndex((item) => item.id === Number(req.params.id))
    res.json(todoList[index])
})

app.post('/api/v1/list', (req, res) => {
    todoItemIds = todoItemIds + 1
    const todoItem = {
        id: todoItemIds,
        title: req.body.title,
        checked: false
    }
    todoList.push(todoItem)

    res.json(todoItem)
})

app.delete('/api/v1/list/:id', (req, res) => {
    const index = todoList.findIndex((item) => item.id === Number(req.params.id))

    // 値の更新
    if (index >= 0) {
        const deleted = todoList.splice(index, 1)
    }

    res.sendStatus(200)
})

app.put('/api/v1/list/:id', (req, res) => {
    const index = todoList.findIndex((item) => item.id === Number(req.params.id))
    
    // 値の更新
    if (index >= 0) {
        const item = todoList[index]
        Object.keys(req.body).forEach((key) => {
            item[key] = req.body[key]
        })
    }

    res.json(todoList[index])
})

// ポート8080でサーバを立てる
app.listen(8080, () => console.log('Listening on port 8080'))


// sql
const connection = mysql.createClient({
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



