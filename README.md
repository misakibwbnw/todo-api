# todo-api
## 開発
dev
```
npm run dev
```

デバッグ時のcurlコマンド例
```
curl -X POST http://localhost:8080/api/v1/list -H "Content-type: application/json" -d '{ "title" : "tanaka" }'
```

**db設計**
id,
title,
checked

mysqlの起動
```
brew services start mysql
mysql --user=root --password
```

## 参考
todoアプリ生成
https://sbfl.net/blog/2018/08/25/nodejs-express-webapi/
id生成
https://qiita.com/kawasima/items/6b0f47a60c9cb5ffb5c4
