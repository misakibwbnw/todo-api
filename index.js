const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

// express
const app = express()

// express setting
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
}))
app.use(bodyParser.json());

// data
const todoList = []
let todoItemIds = 0

app.get('/api/v1/list', (req, res) => {
    // mysql setting
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "misaki1445",
        database: 'list_app'
    })
    connection.connect();
    connection.query(
        'SELECT * FROM users',
        (error, results) => {
            if (error) throw error
            res.json(results)
            connection.end()
        }
    );
})

app.get('/api/v1/list/:id', (req, res) => {
    const index = todoList.findIndex((item) => item.id === Number(req.params.id))
    res.json(todoList[index])
})

app.post('/api/v1/list', (req, res) => {
    // mysql setting
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "misaki1445",
        database: 'list_app'
    })
    connection.connect();
    connection.query(
        'INSERT INTO users set ?',
        {
            title: req.body.title,
            checked: false
        },
        (error, results) => {
            if (error) throw error
            res.json(results.insertId)
            connection.end()
        }
    );
})

app.delete('/api/v1/list/:id', (req, res) => {
    // mysql setting
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "misaki1445",
        database: 'list_app'
    })
    connection.connect();
    connection.query(
        'DELETE FROM users WHERE id=?',
            req.params.id,
        (error, results) => {
            if (error) throw error
            res.sendStatus(200)
            connection.end()
        }
    );
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

