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
