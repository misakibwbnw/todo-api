// expressモジュールを読み込む
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

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
    const index = todoList.findIndex((item) => item.id === req.params.id)
    console.log(req)

    // 値の更新
    if (index > 0) {
        const deleted = todoList.splice(index, 1)
    }

    res.sendStatus(200)
})

app.put('/api/v1/list/:id', (req, res) => {
    const index = todoList.findIndex((item) => item.id === req.params.id)
    

    // 値の更新
    if (index > 0) {
        const item = todoList[index]
        Object.keys(req).forEach((key) => {
            item[key] = req[key]
        })
    }
    // const todoItem = {
    //     id: todoItemIds + 1,
    //     title: req.body.title,
    //     checked: false
    // }
    // todoList.push(todoItem)

    res.json(todoList)
})

// ポート8080でサーバを立てる
app.listen(8080, () => console.log('Listening on port 8080'))







