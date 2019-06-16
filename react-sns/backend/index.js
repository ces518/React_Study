const express = require('express');
const db = require('./models');
const app = express();
db.sequelize.sync(); // 테이블 생성

app.get('/', (req, res) => {
    res.send('Hello Express');
});

app.get('/about', (req, res) => {
   res.send('Hello, About');
});

// 8080 포트로 서버 기동
app.listen(3065, () => {
    console.log(`server is running on localhost:3065`);
});
