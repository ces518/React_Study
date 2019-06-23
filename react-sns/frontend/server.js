const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');

// next 코드
const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next( { dev });
const handle = app.getRequestHandler();
//

dotenv.config();

app.prepare().then(() => {
    const server = express();
    server.use(morgan('dev'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true}));
    server.use(cookieParser(process.env.COOKIE_SECRET));
    server.use(expressSession({
        resave: false,
        saveUninitialized: false,
        secret: '',
        cookie: {
            httpOnly: true,
            secure: false,
        }
    }));


    server.get('*', (req, res) => { // 모든 get요청 처리
        return handle(req, res); // 요청을 next로 넘긴다.
    });

    server.listen(3060, () => {
       console.log('next express is running on 3060');
    });
});
