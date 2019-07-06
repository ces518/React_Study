const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
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
    // server.use(express.static('/', path.join(__dirname, 'public')))
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

    server.get('/post/:id', (req, res) => {
        return app.render(req, res, '/post', { id: req.params.id });
    });

    server.get('/hashtag/:tag', (req, res) => { // next가 동적인 파라메터를 처리할수 없기때문에  express로 처리를해주는것
       return app.render(req, res, '/hashtag', { tag: req.params.tag });
    });

    server.get('/user/:id', (req, res) => {
        return app.render(req, res, '/user', { id: req.params.id });
    });

    server.get('*', (req, res) => { // 모든 get요청 처리
        return handle(req, res); // 요청을 next로 넘긴다.
    }); // next와 동작이 같기때문에 동적인 요청을 처리할수 없다.

    server.listen(3060, () => {
       console.log('next express is running on 3060');
    });
});
