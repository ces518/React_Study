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
const { Strategy, LocalStrategry } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
    passport.use(new LocalStrategry({
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
