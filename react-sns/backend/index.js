const express = require('express');
const morgan = require('morgan'); // 로깅
const cors = require('cors'); // CORS

const db = require('./models');
const app = express();
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
db.sequelize.sync(); // 테이블 생성

// form 데이터를 처리하는 부분
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS 처리
app.use(cors());
// 요청에 대한 로깅
app.use(morgan('dev'));

app.use('/api/users', userAPIRouter);
app.use('/api/posts', postAPIRouter);

// 3065 포트로 서버 기동
app.listen(3065, () => {
    console.log(`server is running on localhost:3065`);
});
