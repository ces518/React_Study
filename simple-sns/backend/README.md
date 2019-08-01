#### 2019 08 01
- backend 환경 세팅
- 설치모듈
    - npm i express
    - npm i express-session
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

- sequelize 설정
- 명령어 등록
    - sudo npm i -g sequelize-cli
    - 전역에서 sequelize 명령어 사용가능
 
 - config.js 작성
    - dotenv활용 민감 데이터 분리
```javascript
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    "development": {
        "username": "reactbird",
        "password": process.env.DB_PASSWORD,
        "database": "reactbird",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "reactbird",
        "password": process.env.DB_PASSWORD,
        "database": "reactbird",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "reactbird",
        "password": process.env.DB_PASSWORD,
        "database": "reactbird",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
};
```

- models/index.js 설정 변경
```javascript
'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
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
```

- mysql2 설치 (mysql db 사용)
    - npm i mysql2 

- db 연결 설정
- 유저 엔티티생성
