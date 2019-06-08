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


#### 프로필, 회원가입 페이지 만들기
- page > profile.js, signup.js 생성
- 각 페이지별 js 작성
```javascript
import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

const Profile = () => {
    return (
        <>
            <Head>
                <title>React-SNS</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
            </Head>
            <AppLayout>
                <div>
                    프로필
                </div>
            </AppLayout>
        </>
    )
};

export default Profile;

import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

const Signup = () => {
    return (
        <>
            <Head>
                <title>React-SNS</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
            </Head>
            <AppLayout>
                <div>
                    회원가입
                </div>
            </AppLayout>
        </>
    )
};

export default Signup;
```
- 문제점
    - Head의 CSS부분, AppLayout 부분이 게속해서 중복이 발생한다..


#### 회원가입 폼 생성
- signup.js 수정
- 변수명은 약어 사용 지양 최대한 알아볼수 있도록 지정
- 리액트에서 폼 생성은 반복작업들이 많다...

```javascript
import React, { useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import {Button, Checkbox, Form, Input} from "antd";

const Signup = () => {
    const [id, setId] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);

    const onSubmit = (e) => {
        
    };

    const onChangeId = (e) => {
        setId(e.target.value);
    };

    const onChangeNick = (e) => {
        setNick(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
    };

    const onChangeTerm = () => {
        setTerm((prevTerm) => !prevTerm);
    };

    return (
        <>
            <Head>
                <title>React-SNS</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
            </Head>
            <AppLayout>
                <Form onSubmit={onSubmit} style={{ padding: 10 }}>
                    <div>
                        <label htmlFor="user-id">아이디</label>
                        <br />
                        <Input name="user-id" value={id} required onChange={onChangeId}/>
                    </div>
                    <div>
                        <label htmlFor="user-nick">닉네임</label>
                        <br />
                        <Input name="user-nick" value={nick} required onChange={onChangeNick}/>
                    </div>
                    <div>
                        <label htmlFor="user-password">패스워드</label>
                        <br />
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword}/>
                    </div>
                    <div>
                        <label htmlFor="user-password-check">패스워드 체크</label>
                        <br />
                        <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck}/>
                    </div>
                    <div>
                        <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
                    </div>
                    <div>
                        <Button type="primary" htmlType="submit">가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
};

export default Signup;

```

#### 회원가입폼 state 적용, 커스텀 훅
- [state, setState] 의 형태로 반복적인 형태가 나타난다.
- 커스텀훅 사용
    - 커스텀 훅이란? 기존 훅을 활용하여 커스터마이징한것
```javascript
const useInput = (initValue = null) => {
    const [value, setValue] useState(initValue);
    const handler = (e) => {
        setValue(e.target.value);
    };
    return [value, handler];
};
```    
```javascript

const Signup = () => {
    const useInput = (initValue = null) => {
        const [value, setValue] = useState(initValue);
        const handler = (e) => {
            setValue(e.target.value);
        };
        return [value, handler];
    };

    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useInput(false);
    const [termError, setTermError] = useInput(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        console.log({
            id,
            nick,
            password,
            passwordCheck,
            term,
        });
    };

    const onChangePasswordCheck = (e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    };

    const onChangeTerm = () => {
        setTermError(false);
        setTerm((prevTerm) => !prevTerm);
    };

    return (
        <>
            <Head>
                <title>React-SNS</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
            </Head>
            <AppLayout>
                <Form onSubmit={onSubmit} style={{ padding: 10 }}>
                    <div>
                        <label htmlFor="user-id">아이디</label>
                        <br />
                        <Input name="user-id" value={id} required onChange={onChangeId}/>
                    </div>
                    <div>
                        <label htmlFor="user-nick">닉네임</label>
                        <br />
                        <Input name="user-nick" value={nick} required onChange={onChangeNick}/>
                    </div>
                    <div>
                        <label htmlFor="user-password">패스워드</label>
                        <br />
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword}/>
                    </div>
                    <div>
                        <label htmlFor="user-password-check">패스워드 체크</label>
                        <br />
                        <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck}/>
                        {passwordError && <div style={{ color: 'red' }}>패스워드가 일치하지 않습니다.</div>}
                    </div>
                    <div>
                        <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
                        {termError && <div style={{ color: 'red' }}>약관에 동의하셔야합니다. </div> }
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit">가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
};

export default Signup;
``` 

# useCallback 적용
- Hooks의 특성상 리랜더링이 일어날때마다 함수가 재 실행되는데 
- 함수의 구성이 오래 걸리는 경우 그만큼 시간이 오래 소요된다.
- 이럴때 useCallback을 사용하여 함수를 기억해뒀다가 재사용한다.
- useCallback의 두번째인자인 [] 배열에는 useCallback으로 감싼 메서드의 내부에서 사용하는 state를 넣어줄것.
- 그래야 해당 state가 바뀔때마다 함수가 재구성됨.


#### 문제점
- 불필요한부분까지 리랜더링이 일어난다.
- 중복된 부분이 발생한다.
    - Head 부분을 분리해서 관리
```javascript

const Signup = () => {
    const useInput = (initValue = null) => {
        const [value, setValue] = useState(initValue);
        const handler = useCallback((e) => {
            setValue(e.target.value);
        }, []);
        return [value, handler];
    };

    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useInput(false);
    const [termError, setTermError] = useInput(false);

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
    }, [password, passwordCheck, term]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    const onChangeTerm = useCallback(() => {
        setTermError(false);
        setTerm((prevTerm) => !prevTerm);
    }, [term]);

    return (
        <>
            <Head>
                <title>React-SNS</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
            </Head>
            <AppLayout>
                <Form onSubmit={onSubmit} style={{ padding: 10 }}>
                    <div>
                        <label htmlFor="user-id">아이디</label>
                        <br />
                        <Input name="user-id" value={id} required onChange={onChangeId}/>
                    </div>
                    <div>
                        <label htmlFor="user-nick">닉네임</label>
                        <br />
                        <Input name="user-nick" value={nick} required onChange={onChangeNick}/>
                    </div>
                    <div>
                        <label htmlFor="user-password">패스워드</label>
                        <br />
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword}/>
                    </div>
                    <div>
                        <label htmlFor="user-password-check">패스워드 체크</label>
                        <br />
                        <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck}/>
                        {passwordError && <div style={{ color: 'red' }}>패스워드가 일치하지 않습니다.</div>}
                    </div>
                    <div>
                        <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
                        {termError && <div style={{ color: 'red' }}>약관에 동의하셔야합니다. </div> }
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit">가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
};

export default Signup;
```

# _app.js
- Next에서는 이러한 중복 부분을 해결하기위한 방법을 제공한다.
- pages 폴더 내부에 _app.js 라는 명칭으로 파일을 생성한뒤 해당 파일에 컴포넌트를 구성하면
- 해당 컴포넌트는 다른 컴포넌트의 부모가 된다. 
- next에서 Component 라는 props를 전달해주는데, 이 Component는 index, profile, singup 과 같은 해당 페이지의 컴포넌트들이다.
- 나머지 페이지 컴포넌트들의 중복부분을 제거

```javascript
import React from 'react';
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const ReactBird = ({ Component }) => {
  return (
      <>
          <Head>
              <title>React-SNS</title>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
          </Head>
          <AppLayout>
            <Component/>
          </AppLayout>
      </>
  )
};

export default ReactBird;
```

- antd 의 컴포넌트들이 PureComponent가 아닌 Component 로 개발되어서 해당부분까지 최적화를 하고싶다면
- 새로운 컴포넌트를 만들어서 해당 부분을 memo로 감싸준다.
- 지나친 최적화이다.
```javascript
const TextInput = memo(({value, onChange}) => {
  return (
      <Input value={value} onChange={onChange} />
  )  
});
```

# Prop-types
- React는 자식컴포넌트가 부모로부터 받은 Props를 올바른 데이터 타입의 데이터를 받았는지 검증이 가능하다.
- Prop-Types 설치
    - npm i prop-types
```javascript
import React from 'react';
import Head from "next/head";
import PropTypes from 'prop-types';
import AppLayout from "../components/AppLayout";

const ReactBird = ({ Component }) => {
  return (
      <>
          <Head>
              <title>React-SNS</title>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
          </Head>
          <AppLayout>
            <Component/>
          </AppLayout>
      </>
  )
};

ReactBird.proptypes = {
  Component: PropTypes.elementType, // JSX에 랜더링 할 수 있는 데이터 타입
};

export default ReactBird;
```

### next 파일 구성
- document.js, _app.js, _error.js
```javascript
_document.js:   html, head, body
    _app.js:    root
        pages:  실제 컴포넌트들 
        
_error.js: 에러 페이지
```


# antd 그리드 시스템
- Boorstrap 과 같이 Row, Col 의 xs, md 등 화면 크기별 그리드 분할이 가능하다. 
- 기본적으로 반응형 제공
- Card 컴포넌트를 활용해 로그인 아바타 구현

* frontend 개발시 backend에서 받을 데이터를 dummy 로 정의해두고 개발하는것이 좋다.
* backend와 의 협업관계에서 서로 주고받을 데이터를 문서화 해둘것.

```javascript
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Menu, Input, Button, Row, Col, Card, Avatar} from "antd";

// 서버로 부터 받을 더미 데이터를 사용
const dummy = {
    nickname: '박준영',
    post: [],
    following: [],
    follower: [],
};

/*
 children: props이다.
 */
const AppLayout = ({ children }) => {
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                </Menu.Item>
            </Menu>
            <Row>
                <Col xs={24} md={6}>
                    <Card
                        actions={[
                            <div key="twit">짹짹 <br/> {dummy.post.length}</div>,
                            <div key="following">팔로잉 <br/> {dummy.following.length}</div>,
                            <div key="follower">팔로워 <br/> {dummy.follower.length}</div>
                        ]}
                    >
                        <Card.Meta
                            avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                            title={dummy.nickname}
                        />
                    <Link href="/signup"><a><Button>회원가입</Button></a></Link>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    { children }
                </Col>
                <Col xs={24} md={6}>

                </Col>
            </Row>
        </div>
    )
};

AppLayout.proptypes = {
  children: PropTypes.node,
};

export default AppLayout;
```
