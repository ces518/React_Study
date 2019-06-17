const express = require('express');
const db = require('./models');
const app = express();
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
db.sequelize.sync(); // 테이블 생성

// form 데이터를 처리하는 부분
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//

app.use('/api/users', userAPIRouter);
app.use('/api/posts', postAPIRouter);

// 3065 포트로 서버 기동
app.listen(3065, () => {
    console.log(`server is running on localhost:3065`);
});
