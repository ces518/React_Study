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
