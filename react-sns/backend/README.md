# backend


#### 백엔드 서버 구동에 필요한 모듈들
- Node는 서버가 아니라 자바스크립트 실행기이다
- 노드가 http모듈을 제공한다 (서버역할)
- 기존 노드서버만으로는 한계가 있기때문에 프레임워크를 하나 올려서 사용한다.

- express (간단하면서 인기가 많음)

- 설치모듈
    - npm i express
    - npm i axios
    - npm i bcrypt (암호화)
    - npm i cookie-parser
    - npm i express-session
    - npm i dotenv (환경변수)
    - npm i cors (크로스도메인)
    - npm i helmet hpp (보안)
    - npm i morgan (로깅)
    - npm i multer (파일업로드)
    - npm i passport passport-local (로그인관련)
    - npm i sequelize sequlize-cli (ORM)
    
    - npm i -D eslint-plugin-jsx-a11y
    - npm i -D eslint eslint-config-airbnb
    - npm i -D nodemon (서버 변경점 감지 자동 재기동 spring-boot-devtools)

- nodemon 설정
    - watch 목록에 존재하는 파일들이 수정될경우
    - exec 에 해당하는 커맨드를실행 (재시작)
```javascript
{
  "watch": [
    "index.js",
    "routes",
    "config",
    "passport",
    "models",
    "nodemon.json"
  ],
  "exec": "node index.js",
  "ext": "js json"
}
```


# http 요청 주소체계 이해
- index.js 가 서버의 실행점이 됨
- express 모듈을 사용한다.
- express 모듈로 app 객체를 생성하여 8080 포트로 서버 시작.
- get '/' 으로 요청을 보내면 'Hello Express' 라는 문자열을 리턴한다.
```javascript
const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send('Hello Express');
});

// 8080 포트로 서버 기동
app.listen(8080, () => {
    console.log(`server is running on localhost:8080`);
});

```

- 프론트, 백엔드 통신시 RESTAPI, GRAPH_QL 방식을 가장 많이 사용한다.

# Sequelize, ERD
- 시퀄라이즈 명령어 등록
    - npm i -g sequelize-cli
- sequelize init 
    - config.json 에 데이터베이스 연결설정
    - models/index.js 설정 변경
````javascript
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

// config.json develop 부분을 불러와서 초기화해준다. (설정 적용)
let sequelize = new Sequelize(config.database, config.username, config.password, config);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
````

- models 디렉터리에 존재하는것이 테이블이라 생각
- 각 테이블에 해당하는 모델 생성
    - comment.js
    - hashtag.js
    - image.js
    - post.js
    - user.js 

- user 엔티티 정의
```javascript
module.exports = (sequelize, DataTypes) => {

    // user 엔티티 정의
    const User = sequelize.define('User', {
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf-_general_ci',
    });

    // user 엔티티의 관계 정의
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
    };

    return User;
};
```

# 엔티티 의 관계 
- 엔티티의 관계정의
    - Post의 관계를 정의한다
    - User와 N:1
    - Comment와 1:N
```javascript
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
    };
```

- 다대다 관계의 경우에는 조금 특이하다.
    - 관계 테이블이 존재하기 때문에 through 로 관계테이블을 정의해주어야한다.
```javascript
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.User, { through: 'PostHashtag'}); // 다대다 관계의 경우 관계사이의 테이블정의
    };
```

- user 엔티티의 관계 
```javascript
    // user 엔티티의 관계 정의
    User.associate = (db) => {
        db.User.hasMany(db.Post, { as: 'Posts' }); // 관계 조합이 같을경우 as 로 구분을 지어줄것.
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 게시글 좋아요 관계
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers' }); // 팔로잉, 팔로우 관계
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings' }); // 본인과의 관계일경우 두번 명시해줘야함.
    };
```

* as 를 사용할 경우
- 관계가 같을경우 구분이 가지않기때문에 as로 구분을 지어준다.
- as를 사용할경우 해당 관계의 엔티티를 as의 이름으로 가져오게된다.
```javascript
// as 를 사용할경우 그 관계에 해당하는 데이터를 as의 이름으로 가져온다.
 const user = {
   id: 1,
   nickname: 'park',
   Liked: [{게시글}, {게시글2}],
 };

```

* mysql2 설치  (mysql 사용)
    - npm i mysql2

- sequelize 와 각 엔티티들을 연결
- models/index.js
```javascript
/**
 *  각 엔티티들을 sequelize 와 연결
 */
db.Comment = require('./comment')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
```

- 연결후 index.js 에서 시퀄라이즈 싱크설정
```javascript
const express = require('express');
const db = require('./models');
const app = express();
db.sequelize.sync(); // 테이블자동 생성

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

``` 

# 백엔드서버 API 만들기
- handler Function을 미리 설계 (라우터)
- 각 해당 엔티티 별로 컨트롤러를 만드는것이좋음.
- import, export는 사용비추. 
- require, module.exports 를 사용한다고 생각.

- index.js 파일 하나에 모든 라우터들을 생성하게되면 가독성도 좋지않고 유지보수가 힘들기때문에
- 코드를 분리한다.
    - routes/{name}.js 로 한 관련 라우터들을 한파일에 집중
    - index.js 에서 모듈을 불러와서 사용한다.
    - app.use('url'); 에서 url에 해당하는 부분이 해당 라우터의 공통 url이 된다. (@RequestMapping 의 개념)
- index.js
```javascript
const userAPIRouter = require('./routes/user');
app.use('/api/users', userAPIRouter);
```

- routes/user.js
```javascript
const express = require('express');
const router = express.Router();

// 유저목록 조회
router.get('/', (req, res) => {

});

// 유저 상세조회
router.get('/:id', (req, res) => { // :id 은 파라메터를 의미한다. pathvariable개념

});

// 회원가입
router.post('/', (req, res) => {

});

// 로그아웃
router.post('/logout', (req, res) => {

});

// 로그인
router.post('/login', (req, res) => {

});
// 팔로우목록
router.get('/:id/follow', (req, res) => {

});
// 팔로우등록
router.post('/:id/follow', (req, res) => {

});
// 팔로우 취소
router.delete('/:id/follow', (req, res) => {

});
// 팔로워 취소
router.delete('/:id/follower', (req, res) => {

});
// 게시글 가져오기
router.get('/:id/posts', (req, res) => {

});

module.exports = router;
```

- 회원가입 컨트롤러 만들기
- GET /user
- POST /user -> 데이터가 필요
    - 요청(req) 헤더, 본문같이 보낼수있다.
    - 응답(res)

- routes/user.js
```javascript
// 회원가입
router.post('/', async (req, res, next) => {
    try {
        const exUser = await db.User.findOne({ // 하나만 찾는 api
            where: {
                userId: req.body.userId,
            },
        }); // 비동기 프로미스기때문에 await로 잡아주어야함.

        if (exUser) { // 해당 사용자가 있을경우
            return res.status(400).send('이미 사용중인 아이디입니다.');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12); // 보통 10 ~ 12 사이로 많이 설정함. salt가 증가할수록 찾기힘들어지지만 해시화하는데 시간이 더오래걸림
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });// 유저 생성

        console.log(newUser);
        return res.status(200).json(newUser); // json으로 생성된 유저객체를 응답
    } catch (e) {
        console.error(e);
        /*

        에러처리 위치

        * */
        return next(e); // 에러가 났을경우 많이사용한다.
    }
});
```

- req.body를 사용하려면 index.js에 express 에서 제공하는 모듈을 활성화해주어야함.
```javascript
// form 데이터를 처리하는 부분
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//
```

# 회원가입 과 미들웨어
- 요청에 대한 로깅 처리를 하기위해 morgan 미들웨어 활성화

- index.js
```javascript
const morgan = require('morgan'); // 로깅
// 요청에 대한 로깅
app.use(morgan('dev'));
```
- 미들웨어
    - 미들웨어는 요청과 응답사이에 존재하며 요청, 응답을 변조한다.
    - app.use(); 로 활성화한다.
    - app.use('url', func); // url별로 미들웨어를 사용할수있지만 모든 요청에 사용하는경우 url을 생략.

* CORS 이슈 발생
- 아무런 설정을 하지않았기때문에 CORS문제가 발생.
    - 서로다른 도메인간에 통신을 제한
    - 해당 요청을 허용해야 통신이 가능하다.
```javascript
const cors = require('cors'); // CORS
app.use(cors()); // CORS 미들웨어 활성화
```

* sequelize 는 생성일, 수정일을 자동으로 갱신해준다.


# 로그인을 위한 미들웨어
- 프론트서버와 백엔드가 분리되어있기때문에 로그인상태는 백엔드서버만이 알고있음.
- 프론트서버는 이를 모르기때문에 서로간의 인증상태를 알아야함.
- 보통 쿠키로 한다.
- 사용자 정보는 서버의 세션에 저장, 프론트에는 세션을 조회할수 있는 쿠키를 전달

- cookie, session 활성화
- 중요한 환경변수들은 dotenv를 활용하여 관리 (소스코드에 직접 노출하지않는다.)
- .env파일에 키, 벨류 쌍으로 정의한다 (.properties개념)
```javascript
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv'); // .env파일에서 읽어온 환경변수를 process.env에 넣어준다.
dotenv.config();
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
```

# passport와 쿠키, 세션
- 로그인 처리시 쿠키와 세션을 이용하여 통신을 하는데 이 과정이 복잡하고 번거롭기때문에
- 이를 자동화 해주는 passport를 사용함
```javascript
const passport = require('passport');
```
- 서버쪽에 사용자 데이터를 모두 가지고있으면 데이터가 너무 많기때문에 서버쪽 메모리에 무리가온다.
- 서버쪽에는 최소한의 사용자데이터 (PK값 등 고유 식별자) 와 쿠키를 이용하여 세션을 관리하고
- 클라이언트에서 쿠키를 보내면 해당 쿠키와 연관된 고유 식별자를 활용하여 사용자정보를 DB에서 불러오는 형태이다.
 
- passport/index.js, passport/local.js 생성
- index.js
```javascript
const passport = require('passport');
const db = require('../models');

module.exports = () => {
    // 사용자 정보가 너무많기때문에 id값만 가지고있음.
  passport.serializeUser((user ,done) => { // 서버쪽에 [{ id: 3, cookie: `asdfgh` }] 형태로 저장해둔다.
      return done(null, user.id);
  });

  passport.deserializeUser(async (id ,done) => { // cookie를 프론트에서 보내면 해당 쿠키와 연관된 id를 기반으로 유저정보를 조회해온다.
     try {
         const user = await db.User.findOne({
             where: { id },
         });
        return done(null, user);
     } catch (e) {
         console.error(e);
         return done(e);
     }
  });
};

```


# passport 로그인 전략
- 로그인 전략은 크게 2가지로 나뉜다.
- LOCAL: 아이디 패스워드를 통한 로그인 
- SOCIAL(kakao, naver 등): 소셜로그인

- 로컬전략을 사용하기위해 local.js에 전략을 작성
    - passport에서의 done은 3개의 인자가 존재한다.
    - 1번째인자는 서버에러이다. 서버에러가 발생하면 1을 넣어준다.
    - 2번째인자는 성공시이다. 로그인이 성공하면 유저객체를 넣어준다.
    - 3번째인자는 로그인프로세스중 실패할경우 로직실패 이유를 넣어준다.
```javascript
const passport = require('passport');
const { Strategy: LocalStrategry } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'userId',
        passwordField: 'password',
    }, async (userId, password, done) => {
        try {
            const user = await db.User.findOne({
                where: {
                    userId,
                }
            });

            if (!user) {
                // done의 1번 인자 : 서버에러 , 서버에러발생시 1을 넣어줌
                // 2번 인자: 성공여부
                // 3번 인자: 로직상에 에러가 나는경우.. 강제로 중단해야할때 3번인자 사용
                return done(null, false, { reason: '존재하지않는 사용자입니다.' });
            }

            const result = await bcrypt.compare(password, user.password); // 패스워드 비교
            if (result) {
                return done(null, user); // 성공시 2번째 인수를 사용한다.
            }
            return done(null, false, { reason: '비밀번호가 올바르지 않습니다.' }); // 로그인 실패
        } catch (e) {
            console.error(e);
            return done(e);
        }
    }));
};
```

- 로컬전략을 작성해준후 passport/index.js에 연결해준다
```javascript
module.exports = () => {
    // 사용자 정보가 너무많기때문에 id값만 가지고있음.
  passport.serializeUser((user ,done) => { // 서버쪽에 [{ id: 3, cookie: `asdfgh` }] 형태로 저장해둔다.
      return done(null, user.id);
  });

  passport.deserializeUser(async (id ,done) => { // cookie를 프론트에서 보내면 해당 쿠키와 연관된 id를 기반으로 유저정보를 조회해온다.
     try {
         const user = await db.User.findOne({
             where: { id },
         });
        return done(null, user);
     } catch (e) {
         console.error(e);
         return done(e);
     }
  });
  local();
};
```

- express의 index.js에서 passport모듈을 불러와 활성화 시켜준다.
```javascript
const passport = require('passport');
passport.config();
```

- 사용자가 로그인을 요청할경우 routes/user.js 의 핸들러로 요청을 받는다.
- passport전략을 사용하도록 핸들러코드 작성

- routes/user.js
    - passport.authenticate의 첫번째 인자는 전략
        - local, kakako, naver 등 전략을 매핑해준다.
        - 2번째 인자는 passport전략에서 done으로 보내준 값들이다.
        - 첫번째인자는 서버에러
        - 두번째인자는 성공시 유저정보
        - 세번째인자는 로직 실패이유
        
- 로그인에 성공한다면 유저객체를 json형태로 클라이언트로 보내주는데
- 그대로 보낸다면 패스워드가 존재하여 보안삼 위험하다
- password부분을 제거한후 보내준다.
```javascript
// 로그인
router.post('/login', (req, res) => { // 로그인 전략을 실행해주어야한다.
    // 로컬전략으로 실행
    passport.authenticate('local', (err, user, info) => { // passport에서 done으로 넘긴정보를 인자로받음.
        // err: 서버에러
        // user: 로그인성공시 유저정보
        // info: 로직실패 정보
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user ,(loginErr) => {
            if (loginErr) { // 로그인 실패시
                return next(loginErr);
            }
            // 로그인 유저정보에는 패스워드가포함되어 있기 때문에 보안상 위험하다.
            const filteredUser = Object.assign({}, user); // 얕은복사후
            delete filteredUser.password; // 패스워드 부분삭제
            return res.json(filteredUser); // 클라이언트로 전송
        });
    });
});
```

# passport 정리 및 로그인 구현
- 로그인 프로세스
    - 프론트에서 req.body 를통해 아이디와 패스워드를 보내준다
    - 서버에서 받아 passport의 로컬전략으로 실행한다.
    - 에러가 없다면 로그인에 성공
    - req.login 시 serializedUser 부분이 실행됨. (서버쪽에 보관) => 익스프레스 세션에 저장됨


- 로그아웃 구현
```javascript
// 로그아웃
router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('로그아웃 성공');
});
```
- axios 베이스 URL 기능 제공
```javascript
axios.defaults.baseURL = 'http://localhost:3065/api';
```

# 다른 도메인간에 쿠키 주고받기
- 보안적인 부분 때문에 https 가 필수이다.
- 프론트와 서버간의 쿠키통신

- 프론트쪽 활성화
```javascript
function loginAPI (data) {
    // 서버에 요청을 보내는 부분
    return axios.post('/users/login', data, {
        withCredentials: true, // 서로 쿠키를 주고받는 통신을 한다.
    });
}
```

- 서버쪽 활성화
```javascript
// 서버쪽 통신
app.use(cors({
    origin: true,
    credentials: true,
}));
```

- 서로 다른 서버간의 쿠키통신 확인
    - 브라우저 개발자도구 > 네트워크탭
    - 응답 헤더에 해당 정보가 존재해야한다.
    - connect.sid 가 서버에서 받아온 쿠키
    - express의 기본 정보기 때문에 어떤 서버를 사용하는지 노출됨.
```
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: http://localhost:3000
```

- 서버에서 쿠키명을 변경하는 설정해준다.
    - 쿠키에 유효기간을 설정하는듯 처리도 해주면 좋음.
```javascript
// 세션
app.use(expressSession({
    resave: false,// 매번 세션강제저장
    saveUninitialized: false, //빈값도저장
    secret: process.env.COOKIE_SECRET,
    cookie: { // js에서 쿠키에 접근하지못한다.
        httpOnly: true,
        secure: false, //https시 true
    },
    name: 'rbck'
}));
```

# include , as foreignKey
- db 관련 설정 변경
    - db객체에 엔티티들을 연결해두어야 associate함수 (관계) 를 호출이 가능해짐.
- 시퀄라이즈를 사용하면 사용자를 조회하면서 내 게시글 을 가져오는등 조인문까지 제어가 가능해짐.
```javascript
/**
 *  각 엔티티들을 sequelize 와 연결
 */
db.Comment = require('./comment')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => { // db객체내에 엔티티들을 연결해두어야 db에서 associate함수가 호출이 가능함.
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
```


- 로그인시 로직 변경
    - include // 관계를 정의해둔 엔티티정보 까지 가져올수있다.
    - as // 관계정의시 as 를 사용했다면 해당 as를 명시해주어야한다.
    - 엔티티를 가져올때 패스워드등 민감한 정보까지 클라이언트로 내보낸다면 보안상 위험하기때문에
    - 특정 속성만 내보낼때 attributes 속성을 사용한다.
```javascript
router.post('/login', (req, res, next) => { // 로그인 전략을 실행해주어야한다.
    // 로컬전략으로 실행
    passport.authenticate('local', (err, user, info) => { // passport에서 done으로 넘긴정보를 인자로받음.
        // err: 서버에러
        // user: 로그인성공시 유저정보
        // info: 로직실패 정보
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user , async (loginErr) => {
            if (loginErr) { // 로그인 실패시
                return next(loginErr);
            }
            const fullUser = await db.User.findOne({
                where: { id: user.id },
                include: [{ // include로 관계를 정의해둔 엔티티까지 가져올 수 있음.
                    model: db.Post, // 엔티티타입
                    as: 'Post',     // as 알리아스명
                    attributes: ['id'], // 모든 정보를 노출하면 보안상 위협이되기때문에 id속성만 가져온다.
                }, {
                    model: db.User,
                    as: 'Followings',
                }, {
                    model: db.User,
                    as: 'Followers',
                    attributes: ['id'],
                }],
                attributes: ['id', 'nickname', 'userId']
            });
            console.log(fullUser);
            return res.json(fullUser); // 클라이언트로 전송
        });
    })(req, res, next);
});
```


# 로그아웃과, 사용자정보 불러오기
- 새로고침시 로그아웃이 풀리기때문에 사용자정보를 불러와주어야한다.

- 서버쪽 핸들러
```javascript
// 내 정보 조회
router.get('/', async (req, res, next) => {
    if (!req.user) {
        return res.status(401).send('로그인이 필요합니다.');
    }
    try {
        const user = req.user;
        const fullUser = await db.User.findOne({
            where: { id: user.id },
            include: [{ // include로 관계를 정의해둔 엔티티까지 가져올 수 있음.
                model: db.Post, // 엔티티타입
                as: 'Posts',     // as 알리아스명
                attributes: ['id'], // 모든 정보를 노출하면 보안상 위협이되기때문에 id속성만 가져온다.
            }, {
                model: db.User,
                as: 'Followings',
            }, {
                model: db.User,
                as: 'Followers',
                attributes: ['id'],
            }],
            attributes: ['id', 'nickname', 'userId']
        });
        return res.json(fullUser);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});
```

- 사용자 정보 로드 리듀서 정의
```javascript
case LOAD_USER_REQUEST: {
    return {
        ...state,
    }
}
case LOAD_USER_SUCCESS: {
    return {
        ...state,
        me: action.data,
    }
}
case LOAD_USER_FAILURE: {
    return {
        ...state,
    }
}
```

- SAGA 정의
    - javascript
```javascript
function loadUserApi() {
    return axios.get('/users/', {
        withCredentials: true,
    }); // 로그아웃시엔 데이터가 필요없음
}

function* loadUser () {
    try {
        const result = yield call(loadUserApi);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error: e,
        });
    }
}

function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}
```

# 게시글 작성과 데이터 관계 연결
- 게시글의 해시태그를 정규식으로 추출한다.
- 추출한 해시태그가 존재하면 해당 해시태그가 해시태그 테이블에 존재하는지 확인
    - 해시태그가 존재한다 > 해당 해시태그와 관계연결
    - 해시태그가 없다 > 새로이 해시태그 등록후 연결

- 시퀄라이즈가 associate 함수를보고 관계함수를 생성해준다.
    - as 를 보고 관계 함수를 생성해줌.
    - addComment, setComment, removeComment, getComment 등 .. 
    - add = 추가
    - set = 수정
    - remove = 제거
    - get = 조회
    
- 게시글을 등록하면 해당 게시글의 작성자정보까지 출력해야하기때문에 에러가발생
    - 해당 게시글의 작성자 정보는 id 값만 저장되어 있기때문에 추가 조회가필요하다.
    - 방법은 두가지
        - 1. 새로이 등록한 포스트의 관계함수를 활용하여 유저정보를 가져옴
        - 2. 등록한 포스트를 새로이 조회 -> 조회할떄 관계 엔티티정보까지 가져온다.
- routes/post.js
```javascript
// 게시글 등록
router.post('/', async (req, res, next) => {
    try {
        const hashTags = req.body.content.match(/#[^\s]+/g);
        // 보통 정규식으로 해시태그를 뽑아냄

        const newPost = await db.Post.create({
            content: req.body.content, // 컨텐츠 내용
            UserId: req.user.id, // 작성자
        });

        if (hashTags) { // 해시태그가 존재한다면 newPost와 관계를 이어준다.
            const result = await Promise.all(hashTags.map(tag => db.Hashtag.findOrCreate(
                {
                    where: {
                        name: tag.slice(1).toLowerCase() // 해당 해시태그가 없다면 생성, 있다면 아무일도 하지않음.
                        // slice(1) : # 제거
                    },
            }))); // 저장된 해시태그들이 RESult에 담긴다.
            console.log(result);
            await newPost.addHashtags(result.map(r => r[0] )); // post에 해시태그 생성된걸 연결해준다.
        }
        // 방법은 두가지
        // 관계함수를 사용해서 가져온다.
        //const User = await newPost.getUser();
        // newPost.User = User;
        // res.json(newPost);

        // 새롭게 관계엔티티까지 함께 가져옴
        const fullPost = await db.Post.findOne({
                where: { id: newPost.id },
                include: [{
                    model: db.User,
                }],
        });
        res.json(fullPost);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});
```

- 불러온 모듈은 공유가됨 (노드에서 캐싱을 함)
- 보통 공통 설정 부분은 index.js에 몰아둔다


# 게시글 불러오기
- 메인의 게시글 불러오기

- routes/post.js
    - 게시글 조회시 작성자 정보도 함께조회한다.
        - id, nickname만 포함
    - 오름차순으로 정렬
        - order: [['createdAt', 'DESC']]
    - order속성이 2차원배열인 이유 ?
        - 정렬 조건이 여러개 일수있다.
```javascript
// 게시글 목록조회
router.get('/', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            include:[{
                model: db.User,
                attribute: ['id', 'nickname'],
            }],
            order: [['createdAt', 'DESC']] // 등록일로 내림차순 정렬
        }); // 모든 게시글조회
        return res.json(posts); // 기본적으로는 .toJSON() 을 안붙여도됨
            // DB객체를 변형할경우 toJSON() 으로 변형해주어야한다.
    } catch (e) {
        console.error(e);
        return next(e);
    }
});
```

- 게시글 등록시 trim으로 공백제거를 해줄것.
    - 스페이스바만 치는 사람이 존재한다.
```javascript
const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if (!text || !text.trim()) {
        return alert('게시글을 작성해주세요.');
    }
    dispatch({
        type: ADD_POST_REQUEST,
        data: {
            content: text.trim(),
        }
    });
}, [text]);
```


# 해시태그 링크로 만들기
- 게시글 안에 존재하는 해시태그를 next의 Link태그로 변형해주어야함
- 정규표현식
    - /(#[^\s]+)/g 으로 정규표현식을 걸면 // '#좋아요', '#구독' 으로 # 이포함
    - /#[^\s]+/ 으로 정규표현식을 걸면 // #이 미포함이다.
```javascript
<Card.Meta
    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
    title={post.User.nickname}
    description={<div>{post.content.split(/(#[^\s]+)/g).map(v => {
        if (v.match(/#[^\s]+/)) {
            return (
                <Link href="/hashtag" key={v}><a>{v}</a></Link>
            )
        }
        return v;
    })}</div>} // next 의 Link 태그로 바꾸어주어야함
/>
```

- next에서는 동적 url 이 구성이 안됨
- 프론트서버에도 express연결을 해주어야함

# next, express 연결하기
- 프론트 패키지에 server.js 생성
- 의존성 설치
    - npm i express
    - npm i morgan
    - npm i cookie-parser
    - npm i express-session
    - npm i nodemon
    
```javascript
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
```

- nodemon.json 생성
```javascript
{
  "watch": [
    "serverjs",
    "nodemon.json"
  ],
  "exec": "node server.js",
  "ext": "js json jsx"
}
```
- .env 생성
    - COOKIE_SECRET 값 서버와 동일하게 설정
    
- package.json
    - scripts 명령어 변경
    - dev: nodemon 
    - 프론트서버도 nodemon을 통해서 expresss + next로 구동함


# hashtag 라우터 
- 한글, 특수문자의 경우에는 URIComponent로 처리되어 넘어오기때문에
- 서버쪽에서 정상적으로 처리하려면 디코딩 작업이필요하다.

- join된 엔티티의 조건으로 검색을 하는경우 include내의 where절로 검색을 해야한다.
```javascript
const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:tag', async (req, res, next) => {
    try {
        const posts = db.Post.findAll({
            include: [{
                model: db.Hashtag,
                where: {
                    name: decodeURIComponent(req.params.name), // 한글, 특수문자는 URIComponent 로 변형되서넘어오기때문에 처리가필요
                },
            }],
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
```

# user 게시글 조회 라우터
```javascript
// 게시글 가져오기
router.get('/:id/posts', async (req, res, next) => {
    try {
        console.log(`req.params.id = ${req.params.id}`);
        const posts = await db.Post.findAll({
            include: [{
                model: db.User,
                where: {
                    id: req.params.id,
                },
                attributes: ['id', 'nickname']
            }]
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});
```
