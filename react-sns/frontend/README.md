# Front End

- npm init < npm 프로젝트로 생성
- npm i react react-dom next 
    - react, react-dom , next 설치
    - next: react 위에서 돌아가는 프레임워크 (SSR, 코드스플리팅을 편하게하기위함)
    
- npm i -D nodemon webpack
    - 개발시에만 nodemon, webpack 설치
- npm i -D eslint
    - eslint 설치 (코딩 스탠다드)
    - .eslintrc (eslint 설정)
    - npm i -D eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks
        - eslint 플러그인 설치
```
{
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module", // import, export, require
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true
  },
  "extends": [
    "eslint: recomended",
    "plugin: react/recomended"
  ],
  "plugins": [
    "import",
    "react-hooks"
  ]
}
```
- react-router 대신 next가 제공하는 router를 사용한다.
    - pages 폴더 생성
    - index.js 작성
    - npm i -g next (next 명령어 등록)
    - package.json 에 scripts 명령어 등록
    - 개발, 빌드, 배포를 next가 알아서 진행해주기때문에 next 명령어를 등록하여 편리하게 사용함.
```javascript
const Home = () => {
  return (
      <div>Hello, Next</div>
  )
};

export default Home;

  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
```

- npm run dev 명령어로 webpack dev server 와 비슷한 상태로 실행
    - webpack이 해주는 번들링과, dev-server 를 제공해줌
- http://localhost:3000/ 으로 접근하면 Hello, Next 출력확인.    
- next의 router 가 pages 내부의 경로가 url 경로와 동일하다.

* 코드스플리팅이 기본적으로 적용되어있음.

#### Link 사용하기
    - next/link 모듈을 사용
```javascript
import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
      <>
        <Link href="/about"><a>about</a></Link>
        <div>Hello, Next</div>
      </>
  )
};

export default Home;
```

#### Ant-Design 적용
- React, Angular, Vue 모두 제공
- Ant-Design 만으로 안되는경우 Styled-Component 를 사용.
- npm i antd
    - ant-design 설치
- layout용 components 폴더 생성
- AppLayout.js 작성 및 index.js 수정
- children 은 props로 부모로부터 받는다.
```javascript
import React from 'react';
import {Menu, Input} from "antd";

const AppLayout = ({ children }) => {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home">노드버드</Menu.Item>
                <Menu.Item key="profile">프로필</Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                </Menu.Item>
            </Menu>
            { children }
        </div>
    )
};

export default AppLayout;
```

- Head태그를 사용하고 싶을때는 next/head 컴포넌트를 사용하여 html형태로 작성해준다.

```javascript
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from "../components/AppLayout";

const Home = () => {
  return (
      <>
          <Head>
              <title>React-SNS</title>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
          </Head>
          <AppLayout>
              <Link href="/about"><a>about</a></Link>
              <div>Hello, Next</div>
          </AppLayout>
      </>
  )
};

export default Home;
```

- React에서 style은 객체형태로 정의하는것을 권장한다.
