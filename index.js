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

// functions
app.get('/api/v1/list', (req, res) => {
    // mysql setting
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "misaki1445",
        database: 'list_app',
        typeCast: function(field, next) {
            if (field.type === 'TINY' && field.length === 1) {
              return field.string() === '1';
            }
            return next();
        }
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
    // mysql setting
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "misaki1445",
        database: 'list_app',
        typeCast: function(field, next) {
            if (field.type === 'TINY' && field.length === 1) {
              return field.string() === '1';
            }
            return next();
        }
    })
    connection.connect();
    connection.query(
        'SELECT * FROM users WHERE id=?',
        req.params.id,
        (error, results) => {
            if (error) throw error
            res.json(results)
            connection.end()
        }
    );
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
     // mysql setting
     const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "misaki1445",
        database: 'list_app',
        typeCast: function(field, next) {
            if (field.type === 'TINY' && field.length === 1) {
              return field.string() === '1';
            }
            return next();
        }
    })
    connection.connect();
    connection.query(
        'UPDATE users SET checked=? WHERE id=?',
        [
            req.body.checked,
            req.params.id,
        ],
        (error, results) => {
            if (error) throw error
            res.sendStatus(200)
            connection.end()
        }
    );
})

// ポート8080でサーバを立てる
app.listen(8080, () => console.log('Listening on port 8080'))

