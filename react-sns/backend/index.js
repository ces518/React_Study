const express = require('express');
const morgan = require('morgan'); // 로깅
const cors = require('cors'); // CORS
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv'); // .env파일에서 읽어온 환경변수를 process.env에 넣어준다.

const db = require('./models');
const app = express();
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
db.sequelize.sync(); // 테이블 생성

dotenv.config();

// form 데이터를 처리하는 부분
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS 처리
app.use(cors());
// 쿠키파싱
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키암호화 키
// 세션
app.use(expressSession({
    resave: false,// 매번 세션강제저장
    saveUninitialized: false, //빈값도저장
    secret: process.env.COOKIE_SECRET,
    cookie: { // js에서 쿠키에 접근하지못한다.
        httpOnly: true,
        secure: false, //https시 true
    }
}));
// 요청에 대한 로깅
app.use(morgan('dev'));

app.use('/api/users', userAPIRouter);
app.use('/api/posts', postAPIRouter);

// 3065 포트로 서버 기동
app.listen(3065, () => {
    console.log(`server is running on localhost:3065`);
});
