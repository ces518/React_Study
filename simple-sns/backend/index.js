const express = require('express'); // express
const morgan = require('morgan'); // 로깅
const cors = require('cors'); // CORS
const cookieParser = require('cookie-parser'); // cookie-parser
const expressSession = require('express-session'); // express-session
const dotenv = require('dotenv'); // .env파일에서 읽어온 환경변수를 process.env 에 넣어줌
const passport = require('passport'); // passport
const db = require('./models');
db.sequelize.sync(); // 테이블 자동 생성

const app = express();

app.get('/', (req, res) => {
    res.send('express test !!');
});

app.listen(8080, () => {
   console.log(`server is running on localhost:8080`);
});
