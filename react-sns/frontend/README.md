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


# 로그인폼 만들기, 커스텀훅 재사용하기
- 리액트에서 가장 많이하는 실수는 한가지 컴포넌트에서 만드는것
    - 불필요한 부분까지 리랜더링이 일어나기때문에 컴포넌트별로 분리하는것이 중요하다.
    - 컴포넌트로 분리하는 기준 ?
        - 반복문과, 조건문이다.
        - 반복문과 조건문을 사용할경우 복잡도가 증가하기때문에 컴포넌트로 분리하여 복잡도를 낮춰준다.
    - useCallback을 사용하는 기준 ?
        - 자식컴포넌트로 넘기는 함수는 useCallback으로 래핑해준다.

# 메인화면 만들기
- 게시글 등록폼, 게시글 더미데이터 활용 화면 구성

```javascript
import React from 'react';
import {Button, Card, Form, Input, Icon, Avatar } from "antd";

const dummy = {
    isLoggedIn: true,
    imagePaths: [],
    mainPosts: [{
        user: {
            id: 1,
            nickname: '준영',
        },
        content: '첫번째 게시글',
        img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExIVFRUXGB0YGBgYGBceFxgXHRcXHRodGB0aHSggGBolHRofITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGi0mICUtLS8uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIANgA6QMBEQACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABQYEBwIDCAH/xABKEAABAwICBgYFBQ4FBQEAAAABAAIDBBEFIQYHEjFBYRMiUXGBkRQycqGxI0JSwdEIMzRDRFNic4KSk7LS4RUXVIPCFiRjs/Ci/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAQFAQMGAv/EADURAAICAQEGAQsEAwADAAAAAAABAgMEEQUSITFBUWETFBUiMlJxgZGhsULB4fAjM9EkNPH/2gAMAwEAAhEDEQA/AN3rBgIAgCAIAgCAIAgCAwcaxaGkhfUTvDI2C5J9wA4uJyAQGk6/WBi+KPIoG+i04Nts22j7TyDnyYMu0qNkZlVHtvj26m+rHnZ7KMI6J4kes7Fptv25ree39SrntqGvs8Pj/BLWz5aczKotNcYwh7fTCaulJA2si4ey+20HW4PuDy3qxx8uq9eo/kRbcedftI3ThOkNNU07KmKZhieMnEgWPEOvucOIUkjmBW6e4XF69fT37GvDj4hlyhkjpNa2Dj8sB7mS/wBCAR61cHP5Y0d7Jf6UBK0Om2GzECOupyTuBkaHHwdYoNCcila4XaQ4doII9yGDrrauOGN0sr2sYwXc5xs0DmUMmpsY11F8hiw2jfUW/GO2gDzDAL25uI7l5nOMFrJ6HqMHLgkRzNaeNxdabDmOZ2NZI0+e074LVDKpm9IzR7dM0tXFl00K1q0WIOETr085yEchFnHLJj9xPI2PJSDUX1YMBAEAQBAEAQBAEAQBAEAQBAEAQGkNdFc+sxGlwtptG20kntOvmfZYD+8tWRaqqpTfQ20w35qJO0tMyJjY2NDWNFgBuAC4uVk7JuT4tnQRiorRdCs45p5S05LGEzydkdi0Hm7d5XVjRsq6zjL1URbM2uPBcSBmqMXxFjmNhbBC7I7QIuD2lwLj3gKfFYWG9d7V/X8EaXnF6000X0O2h1YDZtPUuI37MYs0HkXb++wXizbXuR+p6js/3pEzTavKBu9j383PP/Gw9yhy2vkPsvgiRHBqXdmezQ+hH5NH43P1rS9o5HvHvzSrscZNDaA/kzB3XHwKLaOQv1DzSrsR9Vq5oX+q2SP2X/1grfDbOQuej+X8mqWBU+/9+RgN0FqaY7dDXyROG4Fzmg95Zw5FtiplW2ot+vH6GmezmvZkROmtdjUkTIa4vkgY7aLow2zuby0ZkDdtBWdWXVcvUktexDnROv2lwLJobpBh5Y2GC0LvoPsHOPbtbnn38lQZ2LlKTnPiu6/50LPGupcVGPDwLcqsmlY0s0Qiq2l7AI6gZteMtojg+2/v3hWmDtCdUtyb1j+CFk4qmt5cy26ldMJK2nfTVBJqKazSXes9huAT2uBBafDtXTlKbIQwEAQBAEAQBAEAQBAEAQBAEAQHnrTfE46TSGeaa+yIxawuSTG2wCi5tErqnCJIx7FXPeZG9LX4uTs3p6S+/Prd/F55CwUD/wAbAXHjP+/Ql/5cl9kWzAdEqWkF2M2n/nH2LvDg3wVVkZ91/N6LsibVjV18ieUI3hAfboD4UAQBAEATiuRhrUrOkGhFLU3cG9DJ9NgABP6Tdx9xVnjbTtq4S4oi24cJ8VwZXIMYrcLeIqsGanJs2QG5Hsk8vmnwU2eNj5sd+l6S7fx+5GV1lD3bOKL/AIbiEU7BJE8PaeI4ciOB5KktqnVLdmtGixhNTWqILVi4t0iq2NyaY3kgbr3jPxJXYYzbqi32KG5JTehvRbjSEAQBAEAQBAEAQBAEAQBAEBX9N9LYMMpzPLm45Rxg9aR/YOwdp4IZNI4Zg8+K1BxHEPVd6kdrBzR6oy3RgeJ+NRn7SVWtdfPq+38lhjYm960+Rf42BoDQAAMgBkAOQ4LnG23qy1SS5HJDIWAEAQBAEAQBAEAQHVV0zJWGORoc1wsWncV7qtnXLeg9GeJwjNaNGucRw+oweX0inJkpXHrMPzeTvqf4Hn0FdlOfXuz4SRWyjZjS1jxiXTUFhz5X1eJSDOV3Rs8y5/h6oHcVbxiopJFfJ6vU3IsnkIAgCAIAgCAIAgCAIAgCAx8QrY4InzSuDY2NLnOO4AIDz3A+THa59bUAimjOzFEd1hubz+k49ptuVbtHM8jDcj7T+yJ2Jj78t58kXPFa9lNA+ZwOywbmgX7AAudpplfNQT4vuWtk1XHeZTv80oP9PL5sVp6Fn7yIfpCHZga0af8AMS+bPtT0LP3kPSEezO0az6TjFP5R/wBa8+hbekl9/wDhn0hDs/78y0YHjEVXEJYidm5BBFnAjeCq3Ix50T3JkyqyNkdUSC0HsIAgIfGtJ6WkcGTSEOI2gA0k2vvNhl/YqZj4N18d6C4eJotya63pIjv8wcP/ADr/AOG/7FI9E5HZfU1ef1eP0PrdP8PP4538N/2LD2Tkdl9TKzamZdLphQyODW1DbuNgCCLk8MwtM9n5EE248Ee45NUuTJ1QjecJomvaWuAc0ixB3EHtXqE5QlvR5mHFSWjKTo/ij8AxDZJcaGoOfHZtx9phOfa0rsMTJWRXvdeqKG+l1y0PQkbw4BwIIIuCNxB3EKSaDkgCAIAgCAIAgCAIAgCAIDTevPHHzSQ4RAetKQ+Xuv1GnlkXHuC8WWKuLm+hsrg5SSRmYVhzKeJkMYs1gt3niTzJzXGX3Susc5dToK4KuKijImia9pa5oc05EEAgjsIORXiM3F6xejPTSktGRn/TNF/pYf4bfsW/zzI99/Vmrzer3UcXaLUR/JYf3AFnz3I99/Vjzer3V9DrdohQn8mj8j9RXtbQyV+o8vFpf6STw+hjgZ0cTGsaM7NFs+J5lR7bZ2y3pvVm6EIwWkTJWo9BAEBEY1ozS1bg+aPac0WBDi02vuNjn/dTKM66mO7B8PgabMeux6yRHf5f4f8AmnfxH/atvpXJ977I1eZU9vucXavaD828f7j/AKys+lchdfsh5lT2ONPq9omPa8CS7SHAF/VJG6+V7eKS2tfKLi9OIjhVqSZbFWkthDBEaVYK2spnxG2160Z7Hjd57jyKnbPyXRbq+T5kbKp8pDhzJTUVpQ6eldRTH5alNhfeYr2Hi03b3bK60o2bQQwEAQBAEAQBAEAQBAEBwmlDGue42DQXE8gLlAeetDXmur6vEpM7vLY+V9w8GADxVNti7dgq114llgV6tz7F7K50tAhkIGUHTDTySnqHQQxtOxbbc++ZIBsAOAB3q9w9lwnXv2PmV1+Y4y3YFj0Rx8VsHS7Oy4O2XDeAbA5HsIKrszF83s3ea6ErHu8rDXQm1ENwWDIQBAEBXdLdLY6HZaWGSRwuGg2s29rk2Ns+XBWOHs6WQt7XRfUiZGUquGmrOzRPSiOua4taWPZ6zCb2B3EGwuPBa8zCljNavVPqe6MhWrgTyhG/UIZYQBGYKRDU/wCG49BOMoqmzH/tkNd5O2XLrtn3O2hN81wKTLrULNF1PQimkQIAgCAIAgCAIAgCAICn63MS6DCap3F7OiH+4dk+4lDJr/V7QiKhi7X3kP7Ry9wC5Tadm/kS8OBe4cd2pePEsZVeSQsALJgpmlWgTauYzsl6NzrbYLdoEgAXGYsbBXGLtV1V7ko66eOhBuwlOWqehP6NYGyjhELCXZ7TnH5zss7cBluUHLyJZFm++HZEmipVR3USiim4IAgCAICl6e6HvrHMmhc0Pa3YLXEgObckEHgRcq52ftCFMNywr8nFdkt6J36A6Kvog98rgZH2Fm5hrRz4m61bRzY5DSiuCNuLjupNvmy2qrJYQBAEBSda1JtUrJRk6KQZ8QHXGX7WyrzY1mkpQZXbQhwUjd+i2I+k0dNP+chY88bEtFx4G48FflUSiGAgCAIAgCAIAgCAIDU/3RtQRQQRg+vUA27Q2N/nmQsoyjnhsHRwxM+jG1vk0BcPbNzslJ9zpILSKRkLWegsALICamCJ0h0ggo2bcpzPqsHrOPIcBzKmYuJZkP1eXc0W3xqXErVPpLi1T16TDXOj4OcyRwI5OBa2/IXVxDY1KXrSevhp/wAIMs+bfqpFM0n0hrpJnNnMkDmZGEbbNk2G8E3ud+fap9GHTVHSK+pGsvnN6tnfotpRXskEcQkqr3+SIe93e213C3kteRs+m5cVo+6PVeVZX11LXLppWwWdV4bNEy/rFkjPLpG2PmoNmxYaepJ6+JIhtB6+si24NjENVGJIXXG4g5Oaexw4FUl+PZRLdmiwrtjYtYmetJtCyAsAIAgCAgtN4dugqB2M2vIgqy2VLTIXzImataWXLUtVGTB6a/zdtng2RwC6kpC8IYCAIAgCAIAgCAIAgNPfdFHqUI/8zvg1YfJnqPMk2bh3fUuGfNnSo+rACwAsgAJpqCm6AYOzFsXqJqhu3DTeqw5tJDrMBHFuRcRxXaYtUaqlFHPXzc5ts381gAAAAAyAG4Dkt5pNf6x9V8WJvE7JOgqANku2bte0btoZG44H+1smdTM1c6u4cKa5230s7xZ0hFgG5dVgzsL533lYBcZ4GvaWPaHNcLFrgCCOwg5EIYNAYrhIwjGxDDlT1LQQ36N7i37LxlycoG06lPHb6riTMKbViXcuxC5MuwsmAsGQgCAICL0nH/ZVP6iT+Qqds7/2IkfL/wBLJ3UM6+EM5SyD/wDV/rXXFCzYiwYCAIAgCAIAgCAIAgNP/dHMtT0kn0ZiPNt/+KaamUSMTrtB7QD7lwsubOmXI5LACwAsgBAUfR3GRgmLSGYH0Wq3uA9W7rh3PZNwQM7G/Yuxw743VJooMitwm0zflFiEMzBJFKx7CLhzXAix5hSiOa81q6y2UcRgo5Wuq3EC7dl4iGRJcDcFxGQGfahlImdV+mrMSpGl8jfSWDZmbkHEj54aPmuGeWV7hAXCeZrGlz3BrRmXOIAA5k7kMHn/ABfFRi2OCWHOnpgAH59YC+fi8m3Jqr9p2qvHa6vgTMODlZquhdiuULoLICwZCAIAgIfTCTZoak/+Jw88vrU/Zi1yURcx/wCJlm1GRFuEQ3FrvkPgZDZdaUbL+sGAgCAIAgCAIAgCAIDXGvzD+lwovAJMMrJPDrMPucsmSF0YqulpIH9sbQe8DZPvC4zNhuXyj4nQ0S3q0yUUY2hYAWQFkGHiuFw1MZjmYHt357we1p3grdRkWUS3oM1WVRsWkiov1aQgno6mZjTwyPwtdWa23Z7iIb2fHuS+j2hdLSEPaDJINz32NvZFrD4qLkbRuu4cl4EirErr482YOM6v4ZZDLBI6neczs+rftAyI8CpFG15wSjNa/k02YMZPWL0MN2r+aWwnxCWVg+ado+W08geSkT20tPUhx8TXHZ7/AFSLdguDw0sfRwt2RxO9zj2uPEqmyL53z3psn11RrWkUZ60GwLJgLBkIAgCAqWs2r6Ohc2+cj2sHntH3NKuNjQ1tcuy/JBz3pXp3Nsau6EwYZRxkWIhY5wO8OcNog8wTbwXRlOWJDAQBAEAQBAEAQBAEBF6UYWKqkqKf87E5o5OLTsnwNigNIarK09BJTPyfDIcuIB3jwcCuc2zVu2KfdFzgTbg12LsqcnBAEAQBAEAQBAEAQBAEAQBAEAQwUTS+I1uJUWHNzBeHP5Bxu7yY0nxXT7Jp3Kd7qyozp6z3ex6HYwAADcBYdwVoQD6gCAIAgCAIAgCAj8VxylprekVEUN93SPa2/dcoZO7DsShqGbcErJWfSY4OHmEMGUgNBac0f+E40KkC1NV3Lrbg4/fPJ1neJUTOx/L0uK59CTjW+TsTLgD4rkHwL4LACAIAgCAIAgCAIAgCAIAgCAx8QrGQxPmebNY3aP2d5OXit1FLusUF1NdtihByIrUZg76ieoxaYZuJji7yRtEdwAaPFdnGCjFRXQ5+Um3qzdS9HgIAgCAIAgCAIDHxGqEUUkp3Rsc89zWk/Uhk836M4L/iz5q6te97nSEAA23AHwaAQAB2Kq2jnzx5KMNNSbjY8bE3IkMBDsGxinbE93o9SWse0neCdnPtLXEEHmQpODlPIq3pczVk0+SlouR6IUwjFZ1h6JsxOjfAbCQdeJ30ZAMr8iMj3oZNSaA44/rUFSCyohJaA7JzgL3b7TfeFzu1cPcflYLh18C3w8neW5LmXRUxPCAIAgCAIAgCAIAgCAIAgCAoGkE0uK1ceF0hu3avK8ZtFsySR81vvcQF1GzcPyMN+S9ZlLl5HlHouRv7A8KjpII6eIWZG0NHae0ntJOZPNWZDM5DAQBAEAQBAEAJQGptPdbNMGzUVJE6qkex0Rc372C4Fp2SLl5F+AtzWG0lqz0k3yNa6N1mKUUJZHRFzC4v68cm3cgA2AcOzsVZk1Yl89ZWcfiibVO+uOij9jqxPSb0qsonSRGB0UzdsE5WMjDfMAi1uKkYeKqE916pmrIudrWq0aPVF1MIoQGs9bGr11Xauo+pWR5kDLpQN2f5wDceIyPC2JRUlo+R6jJp6oqeh+lzan5Cf5OpbcOaRbaIyNgdzu1q5nO2dKl78OMfwXONlKz1Zcy1qrJgQBAEAQBAEAQBAEAQBZS15GCjaR6Ry1Mow/DgZJXnZc9vAcQ08Ob9wC6DZ+zt3Sy1fBFXlZSfqw+ptbVvoPFhcGyLPnfYyydpG5reIYL+O9XZXFwWDAQBAEAQBAEAQGrNeek0sUMVBTkiWqJDiN4juBbltE27ge1YlJRTb6HqMW3oiL0Y0dioog1oBkI68lusTxAPBo4Bcjl5k75668OiL6iiNUdNOJNKGbiD0p0airIiCAJQOo+2YPYe1p7FOws2VE+L9XqR78eNkfEjdANb3oUYoq+OR4iJY2VpBc0A22XtNr2ta4N92XFdanqtUUbWhs/C9ZWEzjqVsbTutJtRm/Z1wL+F0ME8zGaZwuKiEjlIz7UBr7WVofh1aDUMq4Kapbn0vSNDX23dIA7f+kMxzTTUym0a1wXT59O809WWyhh2RNG5rshuNxlIOYzVPlbJjN71XB9uhPpznHhPibBw3Eoahm3DI17eW8d43jxVDbRZU92a0ZZQsjNaxZlrUbAhhhDIQBAEAQBZS1BGY1j9PSC80gaeDRm89zR8TkpWPhW3P1Vw7mizIhXzZr+p0nlxOdtJHNHRwvNi+R1ri/znfBo39q6HF2dXRxfFlXflzs4Lgje+gehFLhkNoRtyPA25jbaf3fRZ2NHv3qeRC0AIYPqAIAgCAIAgCAIDQumj+m0max26FjR5QmQe9/uUPaEnHGm1/eKJWKtbUi2hcei9AWTJ9RmDW+FUkbsaqY3Ma5jmOu0gEXIYTv5/FdBkWSjgQkno9V+WVdUU8iUSx1mgmHyG/Q7B/Qc4Dy3DyUCO1MiPXX5El4dT6EbLqypDufK3xafiFvW2beyPHo+vuxDqyowes+V3i0fAJ6Zt7Iej6+7Jmi0PoYmlop2OuLEvu4nxccvCyiT2jkyeu9+DasOpdCAxDV5sO6WindC8bmkm3g4Zjxup1e1lJbt8dSPLCceNctDHGNYxSZT0/pDB89ouf3mfWLrY8XCv41y0/vieVdkV8JLX++Bl0esymJtLFLEeO5wHfuPuWiexrOcJJo2LPh+pMmINN8Pd+UAe01w+pRpbNyI/p1Nyy6X1Mpmk9Ed1VD4vaPitfmGT7jPXnNXvB+k9EN9VD4PB+CeYZHuMec1e8YVRp1QM/H7XstefqW6Gy8iX6dDy8yldSHqtZcROzBTySu4XsAfAXJ9ylQ2O1xsml/fEjyzk/YTMY1GNVvqsFLGeJ6pt3m7/ACAW3TBxufrP6/wef/Ju8F/fmSOD6vIGO6Spc6okvc3uGX5je7xKjX7Wskt2pbq+5trwYrjN6slsZ0Qo6ltnRBjrWD4+qR5ZHxUejaN1T56rszbZiwsXLQhcG0ir8AkbHKXVNC42H6OfzL+o62ezfZK6PFy68iOsefYqbqJVPRm+cHxSGqhZPA8PjeLtcPeD2EHIjgQpJHMxAEAQBAEAQBAEBonWVD6JpBBUuyjnY0E8LhpiPl1SoubX5THlFf3TiSMae5YmWlcaX/Q+rIOqpnbGxz3kNa0EuJ3ABe64OySjHmzxKW6m2ULV2x1RV1VcR1SS1veSD7mgeautqNVUQoRAwlvWOw2CqIsQsmQsAINQgCAxavDYJfvkMb/aY0/ELfDJth7Mn9TXKquXNIiajQugfvp2j2S5vwKkR2nkr9X4NTxKX0MV2r3Dz+LeO6R/1le/SuT3+yPPmVXY+t1fYePxTj3yP+orHpXJ977ILCp7GXT6G0DN1Mw+1d3xK8S2jky/Ue1iUr9JL01HFGLRxsYOxrQPgFElbZL2pN/M3KEVyR3rweggCA6K2kZMx0cjQ5jhYg//AG9babpVTU4muyuNkd1ld1VYrJhmJPwqVxdDObwk7g6xLSOzaF2m3zgF2NFyurU11KG2twk4s3stpqCAIAgCAIAgCAqGs7Q0YpSGNthPGS+Fx3bVs2k8GuGXeAeCGUap0W0rMbjQ1wMU8Z2LvyvbIBx4O57jl40G0NmyTdlS4dUWmLmLTcn9S8qj66Fiyg6QYbiNdO6AgQ0rXetcdYcCc7vPLIK8x7sXGrU1xnp/fgV91d1s93lEuWEYdHTQthjFmt8yeJPMqovuldNzkTaq1COiMtajYFkBYAQBAEMEjQ4PJKxz27huv87tsrCjZ9ltbsXyXcjWZcITUX/8I4i2R4KA1o9CVzACRi5PRGJNJaslKrA5I4hKf2m8WjgT9asL9nTqqVjfxXYi1ZkZz3PoRariWZ2F4W+fa2bAAbzuvwCm4uDO+LlHp9yPdkxqaTMSaFzHFrhYjeFElBxk4vmjdGSktUROMY7BSuibKSDK7ZbYX7Mz2DrDzW+nFsuhKceSNdl0YSUX1JNRjcEBQtaAdC6krGZOiktftIs9v8rvNdFsWzWEodv31KraEdJKR6Gp5Q9rXjc4Bw7iLq5K07EAQBAEAQBAEAQFY0z0Eo8Tb8uy0gFmysykby7HDkboZNX1WgGOYd+Bytq4RuZkDb2HnL9h11GuwqbuMo8e5vryZ18mRk2nNVTHZrMPkj4F3WaL8g5tj5qus2LF+xPT4rX9yXHaL/VEyYNZdG71mys72g/AlRZbGuXJpm2OfDqjv/zFoPpv/cK8eicjwPXn1R1zayKEbukd3Mt8SsrZF7fHQPOr6GEdZQedmno5ZXdl8/JrXFSI7Ef6p/b+TU9odo/cw8e0nxeKITOpTSxONmudGbk5mw2+7sUuvZFEfa1ZolnWvwLxo6ZvR4zUPD5CLucBYWJuNwAva3BUGXueVfk1oi1q391b/MnMMojNI1g3cT2N4r1h43l7VHp1PGRb5ODZsCKINAa0WAFgOS66MVFaIoG9XqyB0jwbbvLGOt84fSHb3hU+0dn73+Stceq7lhh5W76kuR1aNYPumkGfzAf5j9S9bOwdz/LPn08BmZO96keRZHMvv3FXDSa0ZXp6FQrtHniUNYOo7cfo9t/qXOWbKl5fdj7L69i2hmryWsuaLVRUrYmBjdw954kroK641xUY8irnNzerIbSvDw5vStHWbkebf7FVG1sbWPlVzXMm4N27LcfJmkNbh2fQ3jMh8lh226IheNj6Srmn1/4bc56SjoWLRTEaycPNVTiEZdHvBO++RN/Hmq/Npx62lTLXuSsedk1rNaFgUEkFJ1tEehs/Wi37rldbE135/L9yt2h7Mfn+xvPR0EUlODv6GO/fsNXQlWSCGAgCAIAgCAIAgCAID45oORF0BHVGj1G83fSU7j2mKMnzshkxf+jcO/0NN/CZ9iDU7odGKFnq0dMP9mP7EGpJRQtaLNa1o7AAB7kMGq/uivwCL9eP5HrJk5YcPko/Yb8AuHu/2S+J0dfsouuh9LZjpCM3Gw7h/f4Lotk1btTk+bKrPs3p7vYsKtSAEAQBAEAQHXURB7XNO4gha7oKdbi+x6hJxkmjzxrgZb0VvESSD/1qo2St2Ni7N/gs816ygy+MOQ7h8FQS5lijksGSg6fMNZWUeHxnrOfd1uG0QAfBocfFdJserdqc+/8Af3KjPmnNRXQ9ExsDQGjcBYdwVuV5yQBAEAQBAEAQBAEAQBAEAQBAEBqf7ov8Ah/Xj+RyyZOeH/eY/Yb8AuHuWtkvidJX7CNlYRDsQxttbqi/ecyuyohu1pHPWy3ptmWtprCAIAgCAID4U5g8+a5W/wDdUrO2aT3uiVRhx3Vc13f4LK96+T+RdgFzjZa6ELpPpNDRMu87Uh9SMHrE8+xvNTsLBlfLVrgRb8mNa06mVqa0RmdK7F6wfKy36FpGbWm4L7H1bjqt/Rv2rq4xUVurkiklJvizbyyeQgCAIAgCAIAgCAIAgCAIAgCAIDU/3Rv4BB+vH8jlkyc8P+8x+w34BcRZ/ta8To4+wvgbSgFmtHIfBdqlwOcfM5rJgIAgCAIAgPhR8gec9bs7zX04Y0ve1znNaASXHpBYADM32eCrcGO/XPXq3+6Jt8t2UfBIzYqTSKtIEVN6Mw/PdsssO993fui691bNx4cdNWYlmWtaalw0N1PwwSek10npU99oA36NrudzeQjtNhyU9JJaIit6s2eEMH1DAQBAEAQBAEAQBAEAQBAEAQBAEBqf7o38Ag/X/wDByGTnh4+Rj9hv8oXE2P8Ayv4nRx9lG0KV12NPa0fBdpB6xTOdktGztXo8hAEAQBAEBwnk2WuceAJ9y13T3K5PwPUFvSSNCwfL6S0rN/RjadyIjfJc+Y9yjbOjpQn31/LJOZJOzRdNPwjfqmkQIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAr2m2iEGKQthndI0NeHgxlodexFusCLWPYhk7JNFobAMLmWAAzuMu9VluyaJvVaomRzrFz4krQ05jjawna2Ra/LgrCuG5FRIkpbz1MhezyEAQBAEAQHRXU/SMcza2doWutV9Stg4N8zZXPckpdinaP6vG0uJzYh0xftt2WMLc2XDQ65vnk2wy3Feq61XBRXQxObk3Jl4Xs8BAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAf/2Q==',
    }],
};

const Home = () => {
  return (
      <>
          {dummy.isLoggedIn && <Form encType="multipart/form-data">
              <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
              <div>
                  <input type="file" multiple hidden />
                  <Button>이미지 업로드</Button>
                  <Button type="primary" style={{ float: 'right' }} htmlType="submit" >짹짹</Button>
              </div>
              <div>
                  {dummy.imagePaths.map((v, i) => {
                      return (
                          <div key={v} style={{ display: 'inline-block' }}>
                              <img src={'http://localhost:3065/' + v} style={{ width: '200px' }} alt={v}/>
                              <div>
                                  <Button>제거</Button>
                              </div>
                          </div>
                      )
                  })}
              </div>
          </Form>}
          {dummy.mainPosts.map((c) => {
              return (
                  <Card
                    key={+c.createdAt}
                    cover={c.img && <img alt="example" src={c.img} />}
                    actions={[
                        <Icon type="retweet" key="retweet" />,
                        <Icon type="heart" key="heart" />,
                        <Icon type="mesage" key="message" />,
                        <Icon type="ellipsis" key="ellipsis" />,

                    ]}
                    extra={<Button>팔로우</Button>}
                  >
                      <Card.Meta
                          avatar={<Avatar>{c.user.nickname[0]}</Avatar>}
                          title={c.user.nickname}
                          description={c.content}
                      />
                  </Card>
              )
          })}
      </>
  )
};
export default Home;
```

# 프로필 화면 만들기
- 리액트의 컴포넌트 분리기준은 조건문과, 반복문 (최적화시 필요함)
- 닉네임 수정화면
- 팔로잉, 팔로워 목록 더보기 기능 
- List 컴포넌트의 옵션
    - style: 스타일
    - grid: 그리드 옵션
    - size: 크기
    - header: 타이틀
    - bordered: 테두리 유무
    - dataSource: 랜더링할 데이터
    - renderItem: 랜더링할 컴포넌트

```javascript
import React from 'react';
import { Form, Button, List, Input, Card, Icon } from 'antd';

const Profile = () => {
    return (
        <>
            <div>
                <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
                    <Input addonBefore="닉네임"/>
                    <Button type="primary">수정</Button>
                </Form>
                <List
                    style={{ marginBottom: '20px' }}
                    grid={{ gutter: 4, xs: 2, md: 3 }}
                    size="smail"
                    header={<div>팔로워 목록</div>}
                    loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
                    bordered
                    dataSource={['준영', 'ㅋㅋ', 'ㅇㅇㅇㅇ']}
                    renderItem={item => (
                        <List.Item style={{ marginTop: '20px' }}>
                            <Card actions={[<Icon key="stop" type="stop" />]}>
                                <Card.Meta description={item}/>
                            </Card>
                        </List.Item>
                    )}
                ></List>
                <List
                    style={{ marginBottom: '20px' }}
                    grid={{ gutter: 4, xs: 2, md: 3 }}
                    size="smail"
                    header={<div>팔로잉 목록</div>}
                    loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
                    bordered
                    dataSource={['준영', 'ㅋㅋ', 'ㅇㅇㅇㅇ']}
                    renderItem={item => (
                        <List.Item style={{ marginTop: '20px' }}>
                            <Card actions={[<Icon key="stop" type="stop" />]}>
                                <Card.Meta description={item}/>
                            </Card>
                        </List.Item>
                    )}
                ></List>
            </div>
        </>
    )
};

export default Profile;
``` 


# 컴포넌트 분리하기
- Form은 state가있기때문에 분리하는것을 권장
- 분리시 Protypes로 props 검증


# Redux
- state들을 관리하는 방법
    - redux
    - mobx
    - graphQL Client
 
```javascript
{
    isLoggedIn: false, // 로그인여부
    user: {}, //로그인한 사용자 
    mainPosts: [] // 게시글 .. 
} -> store
```
- 하나의 State를 각 필요한 컴포넌트들에게 분배하는역할
- java의 Context에서 관리하고 해당 Context에서 객체를 받아 사용하는것과 유사
- Redux: 복잡한 상태 제어
- React: 간단한 상태 제어

- Redux
    - Action: state를 바꾸는 행동 
        - ex) 로그인액션
    - Dispatch: Action을 실행 
        - ex) 로그인액션 Dispatch
    - Reducer: Action의 결과로 state를 어떻게 바꿀지 정의 
        - ex) 로그인액션 dispatch시 isLoggedIn = true
    - 리액트와 별개이며, Vue, Node 등에 사용가능함.

# Redux 적용하기
- npm i redux react-redux
    - redux와 react를 연결해주기위해 react-redux를 설치해줌
    
- Action이 기록이 남고, 역추적이 가능함 타임머신 기능
- 에러 디버깅이 쉽다.
- 코드량이 많아지지만, 예외 발생이 적다.
- store를 따로 분리가능함.

- Reducer 
    - reducers > index.js (root Store)
    - 액션의 이름과, 액션을 정의해주고 switch문에서 해당 reducer를 정의
```javascript
const initialState = {
    isLoggedIn: false,
    user: {},
};

const LOG_IN = 'LOG_IN'; // action의 이름
const LOG_OUT = 'LOG_OUT';

const loginAction = {
  type: LOG_IN,
  data: {
      nickname: '박준영',
  }
};

const logoutAction = {
    type: LOG_OUT,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
    }
};
```

# 불변성 
- 객체는 참조를 기준으로 판단하기때문에 ...state 와 같은 문법으로 새로운 객체를 생성해서 상태를 변경해주어야
- redux도 상태의변경을 감지한다.
- 각 리듀서들을 하나의 루트 리듀서로 묶어준다
- reducers > index.js
```javascript
// index.js
import { combineReducers } from "redux";
import user from './user';
import post from './post';

const rootReducer = combineReducers({
    user,
    post,
});

export default rootReducer;


// post.js
export const initialState = {
  mainPosts: [],
};

const ADD_POST = 'ADD_POST';
const ADD_DUMMY = 'ADD_DUMMY';

const addPost = {
  type: ADD_POST,
};
const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: 'Hello',
        userId: 1,
        user: {
            nickname: '준영',
        },
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
            }
        }
        case ADD_DUMMY: {
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            }
        }
    }
};

export default reducer;


// user.js
export const initialState = {
    isLoggedIn: false,
    user: {},
};

const LOG_IN = 'LOG_IN'; // action의 이름
const LOG_OUT = 'LOG_OUT';

const loginAction = {
    type: LOG_IN,
    data: {
        nickname: '박준영',
    }
};

const logoutAction = {
    type: LOG_OUT,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
    }
};

export default reducer;
```


# React, Redux 연결하기
- Provider = redux state를 제공해준다.
- 최상위 루트가 Provider이기 떄문에 하위 컴포넌트들은 redux state를 받을 수 있게됨
- next에 redux를 적용하려면 next-redux-wrapper를 설치해 주어야 한다.
    - npm i next-redux-wrapper
- ReactBird 컴포넌트의 store props를 넣어주는 역할을 next-redux-wrapper가 해준다.
```javascript
import React from 'react';
import Head from "next/head";
import PropTypes from 'prop-types';
import AppLayout from "../components/AppLayout";
import { Provider } from 'react-redux';
import reducer from '../reducers';

const ReactBird = ({ Component, store }) => {
  return (
      <Provider store={store}>
          <Head>
              <title>React-SNS</title>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
          </Head>
          <AppLayout>
            <Component/>
          </AppLayout>
      </Provider>
    )
};

ReactBird.proptypes = {
  Component: PropTypes.elementType, // JSX에 랜더링 할 수 있는 데이터 타입
};

export default ReactBird;
```

- withRedux로 ReactBird를 감싸준다. props로 store를 넣어준다.
- 하이오더펑션
- state, reducer가 합쳐져있는것이 store

```javascript
import withRedux from 'next-redux-wrapper';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';


export default withRedux((initialState, options) => {
    const store = createStore(reducer, initialState);
    return store;
})(ReactBird);
```
- reducer 정의시 default 도 지정해주어야한다.
- default가 실행될 이유는 없지만, 코드상 불변성을 유지해주기위해서 ...state 문법으로 새로운객체를 리턴해준다.
```javascript
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
};
```

# Redux DevTools 
- DevTools 를 사용하려면 코드로 연결해주어야한다.
- 미들웨어 : 리덕스 사가도 미들웨어이다
    - 스토어에서 액션, 스테이트, 리듀서 과정에 껴서 변조 및 추가로직을 수행한다.
    - Redux에 없는 기능을 추가하고싶을때 사용
- 미들웨어를 합성해서 store에 함께 넣어줌.
```javascript
import { createStore, compose, applyMiddleware } from 'redux';

export default withRedux((initialState, options) => {
    const middlewares = [];
    const enhancer = compose(applyMiddleware(...middlewares),
        typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f, // REDUX_DEVTOOLS 확장프로그램이 있을경우 미들웨어로 추가
        ); // 미들웨어들을 합성해서 store에 넣어준다
    const store = createStore(reducer, initialState, enhancer);

    return store;
})(ReactBird);
```

- typeof 대신 options 에 server인지 판단이 가능하다.
- !options.isServer => typeof window 를 대체할수있다. 
- next에서 제공하는 속성. 


# React - Redux 훅 사용하기.
- redux에서는 훅을 지원하지않는데 후에 지원이됨. 7.1ver 이상일경우 @next 제거
- 7.1ver부터 react hooks 사용가능
- npm i react-redux@next

- reducers에서 액션도 export 해주어야 컴포넌트상에서 사용이 가능해진다.
- useEffect(componenetDidMounted) 에 이벤트를 dispatch 해보기
    - react-redux의 useDispatch 함수를 활용해서 action을 dispatch 할수있다.
    - 1. dispatch 함수에 ACTION type을 활용해서 dispatch
    - 2. dispatch 함수에 action을 직접 dispatch (코드상 더 깔끔하다.)
- 함수 컴포넌트들은 모두 Hooks 로 사용, Hooks가 훨씬 편리하다.
- useDispatch 함수로 action 을 dispatch 
- useSelector로 state를 가져옴.
    - 이때 useSelector로 가져오는 것은 user.js, post.js 이다
    - 구조 분해 문법으로 isLoggedIn, user를 사용할수있음.
```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN, LOG_OUT, loginAction, logoutAction } from '../reducers/user';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const dummy = {
    isLoggedIn: true,
    imagePaths: [],
    mainPosts: [{
        user: {
            id: 1,
            nickname: '준영',
        },
        content: '첫번째 게시글',
        img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExIVFRUXGB0YGBgYGBceFxgXHRcXHRodGB0aHSggGBolHRofITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGi0mICUtLS8uLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIANgA6QMBEQACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABQYEBwIDCAH/xABKEAABAwICBgYFBQ4FBQEAAAABAAIDBBEFIQYHEjFBYRMiUXGBkRQycqGxI0JSwdEIMzRDRFNic4KSk7LS4RUXVIPCFiRjs/Ci/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAQFAQMGAv/EADURAAICAQEGAQsEAwADAAAAAAABAgMEEQUSITFBUWETFBUiMlJxgZGhsULB4fAjM9EkNPH/2gAMAwEAAhEDEQA/AN3rBgIAgCAIAgCAIAgCAwcaxaGkhfUTvDI2C5J9wA4uJyAQGk6/WBi+KPIoG+i04Nts22j7TyDnyYMu0qNkZlVHtvj26m+rHnZ7KMI6J4kes7Fptv25ree39SrntqGvs8Pj/BLWz5aczKotNcYwh7fTCaulJA2si4ey+20HW4PuDy3qxx8uq9eo/kRbcedftI3ThOkNNU07KmKZhieMnEgWPEOvucOIUkjmBW6e4XF69fT37GvDj4hlyhkjpNa2Dj8sB7mS/wBCAR61cHP5Y0d7Jf6UBK0Om2GzECOupyTuBkaHHwdYoNCcila4XaQ4doII9yGDrrauOGN0sr2sYwXc5xs0DmUMmpsY11F8hiw2jfUW/GO2gDzDAL25uI7l5nOMFrJ6HqMHLgkRzNaeNxdabDmOZ2NZI0+e074LVDKpm9IzR7dM0tXFl00K1q0WIOETr085yEchFnHLJj9xPI2PJSDUX1YMBAEAQBAEAQBAEAQBAEAQBAEAQGkNdFc+sxGlwtptG20kntOvmfZYD+8tWRaqqpTfQ20w35qJO0tMyJjY2NDWNFgBuAC4uVk7JuT4tnQRiorRdCs45p5S05LGEzydkdi0Hm7d5XVjRsq6zjL1URbM2uPBcSBmqMXxFjmNhbBC7I7QIuD2lwLj3gKfFYWG9d7V/X8EaXnF6000X0O2h1YDZtPUuI37MYs0HkXb++wXizbXuR+p6js/3pEzTavKBu9j383PP/Gw9yhy2vkPsvgiRHBqXdmezQ+hH5NH43P1rS9o5HvHvzSrscZNDaA/kzB3XHwKLaOQv1DzSrsR9Vq5oX+q2SP2X/1grfDbOQuej+X8mqWBU+/9+RgN0FqaY7dDXyROG4Fzmg95Zw5FtiplW2ot+vH6GmezmvZkROmtdjUkTIa4vkgY7aLow2zuby0ZkDdtBWdWXVcvUktexDnROv2lwLJobpBh5Y2GC0LvoPsHOPbtbnn38lQZ2LlKTnPiu6/50LPGupcVGPDwLcqsmlY0s0Qiq2l7AI6gZteMtojg+2/v3hWmDtCdUtyb1j+CFk4qmt5cy26ldMJK2nfTVBJqKazSXes9huAT2uBBafDtXTlKbIQwEAQBAEAQBAEAQBAEAQBAEAQHnrTfE46TSGeaa+yIxawuSTG2wCi5tErqnCJIx7FXPeZG9LX4uTs3p6S+/Prd/F55CwUD/wAbAXHjP+/Ql/5cl9kWzAdEqWkF2M2n/nH2LvDg3wVVkZ91/N6LsibVjV18ieUI3hAfboD4UAQBAEATiuRhrUrOkGhFLU3cG9DJ9NgABP6Tdx9xVnjbTtq4S4oi24cJ8VwZXIMYrcLeIqsGanJs2QG5Hsk8vmnwU2eNj5sd+l6S7fx+5GV1lD3bOKL/AIbiEU7BJE8PaeI4ciOB5KktqnVLdmtGixhNTWqILVi4t0iq2NyaY3kgbr3jPxJXYYzbqi32KG5JTehvRbjSEAQBAEAQBAEAQBAEAQBAEBX9N9LYMMpzPLm45Rxg9aR/YOwdp4IZNI4Zg8+K1BxHEPVd6kdrBzR6oy3RgeJ+NRn7SVWtdfPq+38lhjYm960+Rf42BoDQAAMgBkAOQ4LnG23qy1SS5HJDIWAEAQBAEAQBAEAQHVV0zJWGORoc1wsWncV7qtnXLeg9GeJwjNaNGucRw+oweX0inJkpXHrMPzeTvqf4Hn0FdlOfXuz4SRWyjZjS1jxiXTUFhz5X1eJSDOV3Rs8y5/h6oHcVbxiopJFfJ6vU3IsnkIAgCAIAgCAIAgCAIAgCAx8QrY4InzSuDY2NLnOO4AIDz3A+THa59bUAimjOzFEd1hubz+k49ptuVbtHM8jDcj7T+yJ2Jj78t58kXPFa9lNA+ZwOywbmgX7AAudpplfNQT4vuWtk1XHeZTv80oP9PL5sVp6Fn7yIfpCHZga0af8AMS+bPtT0LP3kPSEezO0az6TjFP5R/wBa8+hbekl9/wDhn0hDs/78y0YHjEVXEJYidm5BBFnAjeCq3Ix50T3JkyqyNkdUSC0HsIAgIfGtJ6WkcGTSEOI2gA0k2vvNhl/YqZj4N18d6C4eJotya63pIjv8wcP/ADr/AOG/7FI9E5HZfU1ef1eP0PrdP8PP4538N/2LD2Tkdl9TKzamZdLphQyODW1DbuNgCCLk8MwtM9n5EE248Ee45NUuTJ1QjecJomvaWuAc0ixB3EHtXqE5QlvR5mHFSWjKTo/ij8AxDZJcaGoOfHZtx9phOfa0rsMTJWRXvdeqKG+l1y0PQkbw4BwIIIuCNxB3EKSaDkgCAIAgCAIAgCAIAgCAIDTevPHHzSQ4RAetKQ+Xuv1GnlkXHuC8WWKuLm+hsrg5SSRmYVhzKeJkMYs1gt3niTzJzXGX3Susc5dToK4KuKijImia9pa5oc05EEAgjsIORXiM3F6xejPTSktGRn/TNF/pYf4bfsW/zzI99/Vmrzer3UcXaLUR/JYf3AFnz3I99/Vjzer3V9DrdohQn8mj8j9RXtbQyV+o8vFpf6STw+hjgZ0cTGsaM7NFs+J5lR7bZ2y3pvVm6EIwWkTJWo9BAEBEY1ozS1bg+aPac0WBDi02vuNjn/dTKM66mO7B8PgabMeux6yRHf5f4f8AmnfxH/atvpXJ977I1eZU9vucXavaD828f7j/AKys+lchdfsh5lT2ONPq9omPa8CS7SHAF/VJG6+V7eKS2tfKLi9OIjhVqSZbFWkthDBEaVYK2spnxG2160Z7Hjd57jyKnbPyXRbq+T5kbKp8pDhzJTUVpQ6eldRTH5alNhfeYr2Hi03b3bK60o2bQQwEAQBAEAQBAEAQBAEBwmlDGue42DQXE8gLlAeetDXmur6vEpM7vLY+V9w8GADxVNti7dgq114llgV6tz7F7K50tAhkIGUHTDTySnqHQQxtOxbbc++ZIBsAOAB3q9w9lwnXv2PmV1+Y4y3YFj0Rx8VsHS7Oy4O2XDeAbA5HsIKrszF83s3ea6ErHu8rDXQm1ENwWDIQBAEBXdLdLY6HZaWGSRwuGg2s29rk2Ns+XBWOHs6WQt7XRfUiZGUquGmrOzRPSiOua4taWPZ6zCb2B3EGwuPBa8zCljNavVPqe6MhWrgTyhG/UIZYQBGYKRDU/wCG49BOMoqmzH/tkNd5O2XLrtn3O2hN81wKTLrULNF1PQimkQIAgCAIAgCAIAgCAICn63MS6DCap3F7OiH+4dk+4lDJr/V7QiKhi7X3kP7Ry9wC5Tadm/kS8OBe4cd2pePEsZVeSQsALJgpmlWgTauYzsl6NzrbYLdoEgAXGYsbBXGLtV1V7ko66eOhBuwlOWqehP6NYGyjhELCXZ7TnH5zss7cBluUHLyJZFm++HZEmipVR3USiim4IAgCAICl6e6HvrHMmhc0Pa3YLXEgObckEHgRcq52ftCFMNywr8nFdkt6J36A6Kvog98rgZH2Fm5hrRz4m61bRzY5DSiuCNuLjupNvmy2qrJYQBAEBSda1JtUrJRk6KQZ8QHXGX7WyrzY1mkpQZXbQhwUjd+i2I+k0dNP+chY88bEtFx4G48FflUSiGAgCAIAgCAIAgCAIDU/3RtQRQQRg+vUA27Q2N/nmQsoyjnhsHRwxM+jG1vk0BcPbNzslJ9zpILSKRkLWegsALICamCJ0h0ggo2bcpzPqsHrOPIcBzKmYuJZkP1eXc0W3xqXErVPpLi1T16TDXOj4OcyRwI5OBa2/IXVxDY1KXrSevhp/wAIMs+bfqpFM0n0hrpJnNnMkDmZGEbbNk2G8E3ud+fap9GHTVHSK+pGsvnN6tnfotpRXskEcQkqr3+SIe93e213C3kteRs+m5cVo+6PVeVZX11LXLppWwWdV4bNEy/rFkjPLpG2PmoNmxYaepJ6+JIhtB6+si24NjENVGJIXXG4g5Oaexw4FUl+PZRLdmiwrtjYtYmetJtCyAsAIAgCAgtN4dugqB2M2vIgqy2VLTIXzImataWXLUtVGTB6a/zdtng2RwC6kpC8IYCAIAgCAIAgCAIAgNPfdFHqUI/8zvg1YfJnqPMk2bh3fUuGfNnSo+rACwAsgAJpqCm6AYOzFsXqJqhu3DTeqw5tJDrMBHFuRcRxXaYtUaqlFHPXzc5ts381gAAAAAyAG4Dkt5pNf6x9V8WJvE7JOgqANku2bte0btoZG44H+1smdTM1c6u4cKa5230s7xZ0hFgG5dVgzsL533lYBcZ4GvaWPaHNcLFrgCCOwg5EIYNAYrhIwjGxDDlT1LQQ36N7i37LxlycoG06lPHb6riTMKbViXcuxC5MuwsmAsGQgCAICL0nH/ZVP6iT+Qqds7/2IkfL/wBLJ3UM6+EM5SyD/wDV/rXXFCzYiwYCAIAgCAIAgCAIAgNP/dHMtT0kn0ZiPNt/+KaamUSMTrtB7QD7lwsubOmXI5LACwAsgBAUfR3GRgmLSGYH0Wq3uA9W7rh3PZNwQM7G/Yuxw743VJooMitwm0zflFiEMzBJFKx7CLhzXAix5hSiOa81q6y2UcRgo5Wuq3EC7dl4iGRJcDcFxGQGfahlImdV+mrMSpGl8jfSWDZmbkHEj54aPmuGeWV7hAXCeZrGlz3BrRmXOIAA5k7kMHn/ABfFRi2OCWHOnpgAH59YC+fi8m3Jqr9p2qvHa6vgTMODlZquhdiuULoLICwZCAIAgIfTCTZoak/+Jw88vrU/Zi1yURcx/wCJlm1GRFuEQ3FrvkPgZDZdaUbL+sGAgCAIAgCAIAgCAIDXGvzD+lwovAJMMrJPDrMPucsmSF0YqulpIH9sbQe8DZPvC4zNhuXyj4nQ0S3q0yUUY2hYAWQFkGHiuFw1MZjmYHt357we1p3grdRkWUS3oM1WVRsWkiov1aQgno6mZjTwyPwtdWa23Z7iIb2fHuS+j2hdLSEPaDJINz32NvZFrD4qLkbRuu4cl4EirErr482YOM6v4ZZDLBI6neczs+rftAyI8CpFG15wSjNa/k02YMZPWL0MN2r+aWwnxCWVg+ado+W08geSkT20tPUhx8TXHZ7/AFSLdguDw0sfRwt2RxO9zj2uPEqmyL53z3psn11RrWkUZ60GwLJgLBkIAgCAqWs2r6Ohc2+cj2sHntH3NKuNjQ1tcuy/JBz3pXp3Nsau6EwYZRxkWIhY5wO8OcNog8wTbwXRlOWJDAQBAEAQBAEAQBAEBF6UYWKqkqKf87E5o5OLTsnwNigNIarK09BJTPyfDIcuIB3jwcCuc2zVu2KfdFzgTbg12LsqcnBAEAQBAEAQBAEAQBAEAQBAEAQwUTS+I1uJUWHNzBeHP5Bxu7yY0nxXT7Jp3Kd7qyozp6z3ex6HYwAADcBYdwVoQD6gCAIAgCAIAgCAj8VxylprekVEUN93SPa2/dcoZO7DsShqGbcErJWfSY4OHmEMGUgNBac0f+E40KkC1NV3Lrbg4/fPJ1neJUTOx/L0uK59CTjW+TsTLgD4rkHwL4LACAIAgCAIAgCAIAgCAIAgCAx8QrGQxPmebNY3aP2d5OXit1FLusUF1NdtihByIrUZg76ieoxaYZuJji7yRtEdwAaPFdnGCjFRXQ5+Um3qzdS9HgIAgCAIAgCAIDHxGqEUUkp3Rsc89zWk/Uhk836M4L/iz5q6te97nSEAA23AHwaAQAB2Kq2jnzx5KMNNSbjY8bE3IkMBDsGxinbE93o9SWse0neCdnPtLXEEHmQpODlPIq3pczVk0+SlouR6IUwjFZ1h6JsxOjfAbCQdeJ30ZAMr8iMj3oZNSaA44/rUFSCyohJaA7JzgL3b7TfeFzu1cPcflYLh18C3w8neW5LmXRUxPCAIAgCAIAgCAIAgCAIAgCAoGkE0uK1ceF0hu3avK8ZtFsySR81vvcQF1GzcPyMN+S9ZlLl5HlHouRv7A8KjpII6eIWZG0NHae0ntJOZPNWZDM5DAQBAEAQBAEAJQGptPdbNMGzUVJE6qkex0Rc372C4Fp2SLl5F+AtzWG0lqz0k3yNa6N1mKUUJZHRFzC4v68cm3cgA2AcOzsVZk1Yl89ZWcfiibVO+uOij9jqxPSb0qsonSRGB0UzdsE5WMjDfMAi1uKkYeKqE916pmrIudrWq0aPVF1MIoQGs9bGr11Xauo+pWR5kDLpQN2f5wDceIyPC2JRUlo+R6jJp6oqeh+lzan5Cf5OpbcOaRbaIyNgdzu1q5nO2dKl78OMfwXONlKz1Zcy1qrJgQBAEAQBAEAQBAEAQBZS15GCjaR6Ry1Mow/DgZJXnZc9vAcQ08Ob9wC6DZ+zt3Sy1fBFXlZSfqw+ptbVvoPFhcGyLPnfYyydpG5reIYL+O9XZXFwWDAQBAEAQBAEAQGrNeek0sUMVBTkiWqJDiN4juBbltE27ge1YlJRTb6HqMW3oiL0Y0dioog1oBkI68lusTxAPBo4Bcjl5k75668OiL6iiNUdNOJNKGbiD0p0airIiCAJQOo+2YPYe1p7FOws2VE+L9XqR78eNkfEjdANb3oUYoq+OR4iJY2VpBc0A22XtNr2ta4N92XFdanqtUUbWhs/C9ZWEzjqVsbTutJtRm/Z1wL+F0ME8zGaZwuKiEjlIz7UBr7WVofh1aDUMq4Kapbn0vSNDX23dIA7f+kMxzTTUym0a1wXT59O809WWyhh2RNG5rshuNxlIOYzVPlbJjN71XB9uhPpznHhPibBw3Eoahm3DI17eW8d43jxVDbRZU92a0ZZQsjNaxZlrUbAhhhDIQBAEAQBZS1BGY1j9PSC80gaeDRm89zR8TkpWPhW3P1Vw7mizIhXzZr+p0nlxOdtJHNHRwvNi+R1ri/znfBo39q6HF2dXRxfFlXflzs4Lgje+gehFLhkNoRtyPA25jbaf3fRZ2NHv3qeRC0AIYPqAIAgCAIAgCAIDQumj+m0max26FjR5QmQe9/uUPaEnHGm1/eKJWKtbUi2hcei9AWTJ9RmDW+FUkbsaqY3Ma5jmOu0gEXIYTv5/FdBkWSjgQkno9V+WVdUU8iUSx1mgmHyG/Q7B/Qc4Dy3DyUCO1MiPXX5El4dT6EbLqypDufK3xafiFvW2beyPHo+vuxDqyowes+V3i0fAJ6Zt7Iej6+7Jmi0PoYmlop2OuLEvu4nxccvCyiT2jkyeu9+DasOpdCAxDV5sO6WindC8bmkm3g4Zjxup1e1lJbt8dSPLCceNctDHGNYxSZT0/pDB89ouf3mfWLrY8XCv41y0/vieVdkV8JLX++Bl0esymJtLFLEeO5wHfuPuWiexrOcJJo2LPh+pMmINN8Pd+UAe01w+pRpbNyI/p1Nyy6X1Mpmk9Ed1VD4vaPitfmGT7jPXnNXvB+k9EN9VD4PB+CeYZHuMec1e8YVRp1QM/H7XstefqW6Gy8iX6dDy8yldSHqtZcROzBTySu4XsAfAXJ9ylQ2O1xsml/fEjyzk/YTMY1GNVvqsFLGeJ6pt3m7/ACAW3TBxufrP6/wef/Ju8F/fmSOD6vIGO6Spc6okvc3uGX5je7xKjX7Wskt2pbq+5trwYrjN6slsZ0Qo6ltnRBjrWD4+qR5ZHxUejaN1T56rszbZiwsXLQhcG0ir8AkbHKXVNC42H6OfzL+o62ezfZK6PFy68iOsefYqbqJVPRm+cHxSGqhZPA8PjeLtcPeD2EHIjgQpJHMxAEAQBAEAQBAEBonWVD6JpBBUuyjnY0E8LhpiPl1SoubX5THlFf3TiSMae5YmWlcaX/Q+rIOqpnbGxz3kNa0EuJ3ABe64OySjHmzxKW6m2ULV2x1RV1VcR1SS1veSD7mgeautqNVUQoRAwlvWOw2CqIsQsmQsAINQgCAxavDYJfvkMb/aY0/ELfDJth7Mn9TXKquXNIiajQugfvp2j2S5vwKkR2nkr9X4NTxKX0MV2r3Dz+LeO6R/1le/SuT3+yPPmVXY+t1fYePxTj3yP+orHpXJ977ILCp7GXT6G0DN1Mw+1d3xK8S2jky/Ue1iUr9JL01HFGLRxsYOxrQPgFElbZL2pN/M3KEVyR3rweggCA6K2kZMx0cjQ5jhYg//AG9babpVTU4muyuNkd1ld1VYrJhmJPwqVxdDObwk7g6xLSOzaF2m3zgF2NFyurU11KG2twk4s3stpqCAIAgCAIAgCAqGs7Q0YpSGNthPGS+Fx3bVs2k8GuGXeAeCGUap0W0rMbjQ1wMU8Z2LvyvbIBx4O57jl40G0NmyTdlS4dUWmLmLTcn9S8qj66Fiyg6QYbiNdO6AgQ0rXetcdYcCc7vPLIK8x7sXGrU1xnp/fgV91d1s93lEuWEYdHTQthjFmt8yeJPMqovuldNzkTaq1COiMtajYFkBYAQBAEMEjQ4PJKxz27huv87tsrCjZ9ltbsXyXcjWZcITUX/8I4i2R4KA1o9CVzACRi5PRGJNJaslKrA5I4hKf2m8WjgT9asL9nTqqVjfxXYi1ZkZz3PoRariWZ2F4W+fa2bAAbzuvwCm4uDO+LlHp9yPdkxqaTMSaFzHFrhYjeFElBxk4vmjdGSktUROMY7BSuibKSDK7ZbYX7Mz2DrDzW+nFsuhKceSNdl0YSUX1JNRjcEBQtaAdC6krGZOiktftIs9v8rvNdFsWzWEodv31KraEdJKR6Gp5Q9rXjc4Bw7iLq5K07EAQBAEAQBAEAQFY0z0Eo8Tb8uy0gFmysykby7HDkboZNX1WgGOYd+Bytq4RuZkDb2HnL9h11GuwqbuMo8e5vryZ18mRk2nNVTHZrMPkj4F3WaL8g5tj5qus2LF+xPT4rX9yXHaL/VEyYNZdG71mys72g/AlRZbGuXJpm2OfDqjv/zFoPpv/cK8eicjwPXn1R1zayKEbukd3Mt8SsrZF7fHQPOr6GEdZQedmno5ZXdl8/JrXFSI7Ef6p/b+TU9odo/cw8e0nxeKITOpTSxONmudGbk5mw2+7sUuvZFEfa1ZolnWvwLxo6ZvR4zUPD5CLucBYWJuNwAva3BUGXueVfk1oi1q391b/MnMMojNI1g3cT2N4r1h43l7VHp1PGRb5ODZsCKINAa0WAFgOS66MVFaIoG9XqyB0jwbbvLGOt84fSHb3hU+0dn73+Stceq7lhh5W76kuR1aNYPumkGfzAf5j9S9bOwdz/LPn08BmZO96keRZHMvv3FXDSa0ZXp6FQrtHniUNYOo7cfo9t/qXOWbKl5fdj7L69i2hmryWsuaLVRUrYmBjdw954kroK641xUY8irnNzerIbSvDw5vStHWbkebf7FVG1sbWPlVzXMm4N27LcfJmkNbh2fQ3jMh8lh226IheNj6Srmn1/4bc56SjoWLRTEaycPNVTiEZdHvBO++RN/Hmq/Npx62lTLXuSsedk1rNaFgUEkFJ1tEehs/Wi37rldbE135/L9yt2h7Mfn+xvPR0EUlODv6GO/fsNXQlWSCGAgCAIAgCAIAgCAID45oORF0BHVGj1G83fSU7j2mKMnzshkxf+jcO/0NN/CZ9iDU7odGKFnq0dMP9mP7EGpJRQtaLNa1o7AAB7kMGq/uivwCL9eP5HrJk5YcPko/Yb8AuHu/2S+J0dfsouuh9LZjpCM3Gw7h/f4Lotk1btTk+bKrPs3p7vYsKtSAEAQBAEAQHXURB7XNO4gha7oKdbi+x6hJxkmjzxrgZb0VvESSD/1qo2St2Ni7N/gs816ygy+MOQ7h8FQS5lijksGSg6fMNZWUeHxnrOfd1uG0QAfBocfFdJserdqc+/8Af3KjPmnNRXQ9ExsDQGjcBYdwVuV5yQBAEAQBAEAQBAEAQBAEAQBAEBqf7ov8Ah/Xj+RyyZOeH/eY/Yb8AuHuWtkvidJX7CNlYRDsQxttbqi/ecyuyohu1pHPWy3ptmWtprCAIAgCAID4U5g8+a5W/wDdUrO2aT3uiVRhx3Vc13f4LK96+T+RdgFzjZa6ELpPpNDRMu87Uh9SMHrE8+xvNTsLBlfLVrgRb8mNa06mVqa0RmdK7F6wfKy36FpGbWm4L7H1bjqt/Rv2rq4xUVurkiklJvizbyyeQgCAIAgCAIAgCAIAgCAIAgCAIDU/3Rv4BB+vH8jlkyc8P+8x+w34BcRZ/ta8To4+wvgbSgFmtHIfBdqlwOcfM5rJgIAgCAIAgPhR8gec9bs7zX04Y0ve1znNaASXHpBYADM32eCrcGO/XPXq3+6Jt8t2UfBIzYqTSKtIEVN6Mw/PdsssO993fui691bNx4cdNWYlmWtaalw0N1PwwSek10npU99oA36NrudzeQjtNhyU9JJaIit6s2eEMH1DAQBAEAQBAEAQBAEAQBAEAQBAEBqf7o38Ag/X/wDByGTnh4+Rj9hv8oXE2P8Ayv4nRx9lG0KV12NPa0fBdpB6xTOdktGztXo8hAEAQBAEBwnk2WuceAJ9y13T3K5PwPUFvSSNCwfL6S0rN/RjadyIjfJc+Y9yjbOjpQn31/LJOZJOzRdNPwjfqmkQIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAr2m2iEGKQthndI0NeHgxlodexFusCLWPYhk7JNFobAMLmWAAzuMu9VluyaJvVaomRzrFz4krQ05jjawna2Ra/LgrCuG5FRIkpbz1MhezyEAQBAEAQHRXU/SMcza2doWutV9Stg4N8zZXPckpdinaP6vG0uJzYh0xftt2WMLc2XDQ65vnk2wy3Feq61XBRXQxObk3Jl4Xs8BAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAf/2Q==',
    }],
};

const Home = () => {
    const dispatch = useDispatch();
    // 전체 state에서 user 를 가져온다.
    // state는 전체를 의미한다.
    const { isLoggedIn ,user } = useSelector(state => state.user);
    useEffect(() => {
        // ACTION 타입을 사용하는 방법
        dispatch({
            type: LOG_IN,
            data: {
                nickname: '박준영',
            }
        });
        // ACTION을 직접 사용하는 방법
        dispatch(logoutAction);
        dispatch(loginAction);
    }, []);
    
  return (
      <>
          {user ? <div>로그인했습니다: {user.nickname}</div> : <div>로그아웃했습니다.</div>}
          {dummy.isLoggedIn && <PostForm dummy={dummy} />}
          {dummy.mainPosts.map((c) => {
              return (
                 <PostCard key={c} post={c}/>
              )
          })}
      </>
  )
};

export default Home;
```

# React-Redux Connect
- 기존에 훅이 없었을땐 하이오더 컴포넌트로 만들어서 사용했다.
- connect라는 컴포넌트를 활용해서 redux state의 user 를 react의 props의 user로 연결해준다.
- dispatch같은 경우도 connect로 연결해주고 props로 받아온뒤 사용했었음.
- 최대한 하이오더 컴포넌트를 피하고 훅스 활용 
```javascript
function mapStateToProps (state) {
    return {
        user: state.user,
    }
};

function mapDispatchToProps (dispatch) {
    return {
        login: () => dispatch(loginAction),
        logout: () => dispatch(logoutAction),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

# Dummy 데이터로 Redux 사용하기
- useSelector도 여러번 사용 가능하다.
- 자주 사용하면서 잘게 잘라서 가져오는것이 좋음.
- 성능최적화를 위해 매우 잘게 쪼개야하는 경우도 존재함.
- dummy 데이터들을 Redux로 변경

- AppLayout
```javascript
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Menu, Input, Button, Row, Col, Card, Avatar,Form} from "antd";

import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';
import { useSelector } from 'react-redux';
/*
 children: props이다.
 */
const AppLayout = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.user);
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {isLoggedIn
                        ? <UserProfile/>
                        :
                        <LoginForm />
                    }

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

- LoginForm
    - 로그인 시도시 dummy유저 데이터로 로그인 (redux의 loginAction을 Dispatch)
```javascript
import React, { useCallback } from 'react';
import Link from 'next/link';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers/user';
import { useInput } from '../pages/signup';

const LoginForm = () => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const dispatch = useDispatch();
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(loginAction);
    }, [id, password]);

    return (
        <Form onSubmit={onSubmit} style={{ padding: '10px' }}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br/>
                <Input name="user-id" value={id} onChange={onChangeId} required />
            </div>
            <div>
                <label htmlFor="user-password">패스워드</label>
                <br/>
                <Input name="user-password" value={password} onChange={onChangePassword} type="password" required />
            </div>
            <div style={{ marginTop: '10px' }}>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </div>
        </Form>
    )
};

export default LoginForm;
```

- PostForm
```javascript
import React from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';

const PostForm = () => {
    const { imagePaths } = useSelector(state => state.post);
    return (
      <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data">
          <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
          <div>
              <input type="file" multiple hidden />
              <Button>이미지 업로드</Button>
              <Button type="primary" style={{ float: 'right' }} htmlType="submit" >짹짹</Button>
          </div>
          <div>
              {imagePaths.map((v, i) => {
                  return (
                      <div key={v} style={{ display: 'inline-block' }}>
                          <img src={'http://localhost:3065/' + v} style={{ width: '200px' }} alt={v}/>
                          <div>
                              <Button>제거</Button>
                          </div>
                      </div>
                  )
              })}
          </div>
      </Form>
    )
};

export default PostForm;
```

- UserProfile
    - 로그인시 Dummy 유저로 로그인, 로그아웃시 유저가 null
```javascript
import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch(logoutAction);
    }, []);
    return (
        <Card
            actions={[
                <div key="twit">짹짹 <br/> {user.post.length}</div>,
                <div key="following">팔로잉 <br/> {user.following.length}</div>,
                <div key="follower">팔로워 <br/> {user.follower.length}</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{user.nickname[0]}</Avatar>}
                title={user.nickname}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    )
};

export default UserProfile;
```
