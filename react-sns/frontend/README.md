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
        img: 'data:image/jpeg;base64,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',
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
        img: 'data:image/jpeg;base64,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',
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

# 리액트 state와 redux state
- 리액트 state와 redux state를 같이 사용한다.
- 모든 react state를 redux state로 만들경우, 모든 액션을 다 정의 해주어야하기때문에 코드량이 장황해진다.
    - Action, Reducer 모두 구현해야함..
    - 예외 발생시 디버깅도 힘들어진다. (모든 것을 action으로 처리되기때문에 추적이 힘들어짐)
- 임시데이터 같은 경우에는 리액트 state를 사용 하는것이 좋다 (상황별로 다름)
 
- 회원가입 redux 적용
```javascript
import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { signupAction } from '../reducers/user';
import {Button, Checkbox, Form, Input} from "antd";


const TextInput = ({ value }) => {
    return (
        <div>{value}</div>
    )
};

TextInput.proptypes = {
    value: PropTypes.string,
};

export const useInput = (initValue = null) => {
    const [value, setValue] = useState(initValue);
    const handler = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    return [value, handler];
};

const Signup = () => {

    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        dispatch(signupAction({
            id,
            password,
            nick
        }));
    }, [password, passwordCheck, term]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [passwordCheck]);

    const onChangeTerm = useCallback(() => {
        setTermError(false);
        setTerm((prevTerm) => !prevTerm);
    }, [term]);

    return (
        <>
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
        </>
    )
};

export default Signup;
```

# Redux Saga
- 회원가입과 로그인의 경우 서버쪽과 통신이 필요하다.
- Redux의 문제는 모든게 '동기'로 일어난다.
- 로그인 프로세스
    - 서버쪽 data 전달 
    - 서버쪽 응답 확인
    - 응답에 따라 로그인 성공, 실패 여부
```javascript
{type: LOG_IN, data:{id: 'ces518', password: '12341234'}}
```
- Redux를 확장할 경우 Middleware를 사용한다.
- Middleware를 사용하여 redux Action 사이사이에 비동기 요청을 처리할수있도록한다.
- redux-saga, redux-func, redux-observerable 이 중요하다.
- 실무에서는 redux-saga를 많이쓴다.


- Redux-saga 설치
    - npm i redux-saga

- Saga도 redux처럼 다수개로 분리하여 rootSaga로 하나로 묶어준다.

- ROOT_SAGA
```javascript
import { all, call} from 'redux-saga/effects';
import user from './user';
import post from './post';

export default function* rootSage () {
    yield all([
        call(user),
        call(post),
    ]);
};

```


- USER_SAGA
```javascript
import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import {LOG_IN, LOG_IN_SUCCESS} from "../reducers/user";


function loginAPI () {
    // 서버에 요청을 보내는 부분
}

function* login () {
    try {
        yield call(loginAPI); // 로그인 성공시
        yield put({ // put 은 dispatch와 동일
            type: LOG_IN_SUCCESSCESS,
        })
    } catch (e){ // 로그인 실패시
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        });
    }
}

function* watchLogin () {
    yield takeLatest(LOG_IN, login);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
    ]);
};

```

- POST_SAGA
```javascript
import { all } from 'redux-saga/effects';

export default function* postSaga() {
    yield all([]);
};
```

- Call 은 함수의 동기적 호출
- Fork 는 함수의 비동기적 호출
- Put은 액션 Dispatch

- 로그인 동작
    - 서버에 요청 > Request (LOG_IN)
    - (이 부분이 비동기) SAGA 가 처리하는부분 (이어줌역할)
    - 1. 성공 (LOG_IN_SUCCESS)
    - 2. 실패 (LOG_IN_FAILURE)
    
- REDUX
    - LOG_IN: 바로실행
    
- REDUX_SAGA
    - LOG_IN 액션을 실행되는지 감시
    - 실행시 캐치하여 SAGA에서 비동기 동작을 실행
    - 결과에 따라 SUCCESS, FAILURE실행


# Redux-SAGA Middleware 연결하기
- middleware.js 작성
- redux-saga에서 제공하는 함수를 활용하여 연결

```javascript
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;

```

- _app.js 에서 middleware에 추가해준뒤 run 해주어야함.
- rootSaga를 sagaMiddleware에 연결해준다.
- 배포시에는 REDUX_DEVTOOLS를 제거한다.
```javascript
export default withRedux((initialState, options) => {
    const middlewares = [sagaMiddleware]; // redux - saga middleware 연결
    const enhancer = process.env.NODE_ENV === 'production' ?
        compose(applyMiddleware(...middlewares))
        :
        compose(applyMiddleware(...middlewares),
            !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f, // REDUX_DEVTOOLS 확장프로그램이 있을경우 미들웨어로 추가
        );
    const store = createStore(reducer, initialState, enhancer);

    sagaMiddleware.run(rootSaga); // rootSaga를 run 해주어야함.

    return store;
})(ReactBird);
```

- middleware , HOC 작성시 currying 기법(인자 1개를 받은 함수를 게속해서 리턴)을 활용한다.
- middleware는 보통 3단 커링 구조이다.
- HOC는 기본 컴포넌트를 강화함
```javascript
// currying
const middleware = (store) => (next) => (action) => {
    // 다른 작업
  next(action);
};

hoc(plus)(Component);

const hoc = (plus) => (Component) => () => {
    
}
```

# ES2015 제너레이터
- 제네레이터란 ?
    - 함수 실행 도중에 멈췄다가 사용자가 원할때 다시 재개할수 있는 함수이다.

- 제너레이터 함수를 실행하면 일반함수와 달리 1,2,3이 찍히지않음.
```javascript
function* generator() {
    console.log(1);
    console.log(2);
    console.log(3);
}

generator();
```

- next();를 호출해야 함수가실행된다. (closed 되기이전)
- next();를 활용하여 함수를 재개할수 있다.
```javascript
function* generator() {
    console.log(1);
    console.log(2);
    console.log(3);
}

const gen = generator();
gen.next();
```

- next() 실행시 yield 에서 멈췄다가 다시 next()로 함수 재개시 3이 찍힌다.
- 함수의 실행이 끝까지 종료되었다면 done이 true가 된다.
- yield 에 지정해준값은 value로 리턴된다.
- yield가 중단점의 역할을 한다.
```javascript
function* generator() {
    console.log(1);
    console.log(2);
    yield 5;
    console.log(3);
}

const gen = generator();
gen.next();
get.next();
```

- yield* 로 존재한다.
- yield* 뒤의 값을 자동적으로 iterable 시킨다.
- yield* 12345 
```javascript
function* generator() {
    yield 1
    yield 2
    yield 3
    yield* [1,2,3] // 위의 3줄을 줄인것과 동일하다.
}
```

- async await 는 2017년에 표준이 되었다.
- 그 전까지는 비동기 제어하는데 문제가 있었음.
- generator를 활용하여 비동기함수를 동기처럼 사용하게 만들 수 있다.
- generator의 최대 장점은 함수를 원하는 시기에 중간 실행 가능하다.

- generator의 특성때문에 무한반복문이 무한반복문이 아니게된다.
- 마음대로 컨트롤이 가능함.
```javascript
function* generator() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

const gen = generator();
gen.next();
```

# Redux-SAGA의 Generator
- Redux-Devtools로 Action을 dispatch하면 saga에 걸리지않음.

- HELLO_SAGA 액션을 Dispatch했을때 기대값은 aftersaga가 3번찍히는것이다.
- 하지만 generator의 특성상 next를 아무리 호출한다고한들 함수가종료되고나면 더이상 실행되지않는다.
- 액션에 대한 리스닝 -> 디스패치를 지속적으로 하기위해 Generator의 while(true)를 활용한다.
```javascript
    useEffect(() => {
        dispatch({
            type: 'HELLO_SAGA',
        });

        dispatch({
            type: 'HELLO_SAGA',
        });

        dispatch({
            type: 'HELLO_SAGA',
        });
        // dispatch 3번시 after saga 가 3번찍힌 것을 기대
        // 하지만 1번만 실행되고 함수가 종료됨.
        // while true 로 변경시 기대값인 3번이 출력됨.
    }, []);



function* helloSaga () {
    console.log('before saga');
    yield take(HELLO_SAGA); // take내부에 아무액션을 넣어줄수있다.
    // HELLO_SAGA 라는 액션이 들어왔을때 yield가 재개된다.
    // take내부에 next()가 존재하기때문에 재개됨.

    console.log('after saga');
    // 비동기요청, 타이머작업 등..
}

// while(true) 적용
function* helloSaga () {
    console.log('before saga');
    while (true) { // while true 문에 넣음으로써 무한으로 action에 대해 처리가가능
        yield take(HELLO_SAGA); // take내부에 아무액션을 넣어줄수있다.
        // HELLO_SAGA 라는 액션이 들어왔을때 yield가 재개된다.
        // take내부에 next()가 존재하기때문에 재개됨.

        console.log('after saga');
        // 비동기요청, 타이머작업 등..
    }

}
```

# Redux-saga 반복문
- 보통 이벤트 리스너등록시 callback 형식이다.
- generator를 활용하여 callback hell 문제를 해결했다.
- 특정 버튼을 5회만 클릭되게 하고싶을때 addEventListener 에서 5회카운트후 removeEventListener 해주어야하지만
- saga는 generator기반 이기때문에 반복문을 활용하여 제어가 가능하다.


# takeLatest, takeEvery
- while(true) 의 경우가 대부분이기 떄문에
- while(true) 를 숨기기 위해 제공함.
- takeEvery는 while(true)를 대체한다.

```javascript
// takeEvery 가 while(true)를 대체한다.
// ACTION 과 generator함수를 정의
function* watchHelloTakeEvery () {
    yield takeEvery(HELLO_SAGA, function* () {
        yield put({
            type: 'BYE_SAGA'
        });
    });
}
```

- takeLastest는 액션이 여러번 실행됬을때 가장 마지막 하나만 유효하게된다
- 이전 요청이 종료되지않았다면 이전 요청을 취소한다.
```javascript
// takeEvery 가 while(true)를 대체한다.
// ACTION 과 generator함수를 정의
function* watchHelloTakeEvery () {
    yield takeLatest(HELLO_SAGA, function* () {
        yield delay(1000);
        yield put({
            type: 'BYE_SAGA'
        });
    });
}
```

- 매 요청이 유효할경우 takeEvery, 마지막 요청만 유효할경우 takeLatest를 사용하자.

# fork call 
- 함수호출시 fork, call 이라는 개념이 존재한다.
- 기본적으로 둘다 함수를 실행해준다.
- call: 동기호출
    - 응답이 올때까지 대기한다.
- fork: 비동기호출

* 로직의 순서가 중요한경우 call을 사용한다.

```javascript
function* login () {
    try {
        yield fork(logger); // logger 는 로깅을 하는 함수 10초걸림
        yield call(loginAPI); // 로그인 성공시
        // 응답을 받고 난뒤 put을 보낸다.
        yield put({ // put 은 dispatch와 동일
            type: LOG_IN_SUCCESS,
        })
    } catch (e){ // 로그인 실패시
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        });
    }
}
```


# Redux-SAGA Pattern
- 로그인 요청 (LOG_IN_REQUEST)
- (서버통신)
- 로그인성공 or 로그인 실패 (LOG_IN_SUCCESS, LOG_IN_FAILURE)

- 비동기 요청시 REQUEST로 통일
- 3종이 세트
    - _REQUEST
    - _SUCCESS
    - _FAILURE
- 해당 3종 세트는 SAGA 로 식별이 가능하게 통일

* 어떤 액션이 어디에 존재하는지 빠른 식별이 가능한 패턴을 만들것.

- javascript는 에러가나면 서버가 죽을 가능성도 존재하기때문에 
- 에러가 날 여지가 있는 구문으 try catch 로 에러를 핸들렁 해주어야한다.

- 비동기 요청을 saga가 전담하여 컴포넌트에서 비동기 액션들을 분리하는것.


# ESLINT - AIRBNB
- javascript airbnb 스탠다드
    - npm i -D eslint-config-airbnb
- 웹접근성 
    - npm i -D eslint-plugin-jsx-a11y
- 바벨 최신문법 적용
    - npm i -D babel-eslint
   
- .eslintrc 파일 수정 
```
{
  "parser": "babel-eslint", // 바벨 최신문법적용
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module", // import, export, require
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true, // 바벨 최신문법적용
  },
  "extends": [
    "airbnb" // airbnb룰 적용
  ],
  "plugins": [
    "import",
    "react-hooks"
  ],
  "rules": { // 너무 엄격한룰 무시
    "no-underscore-dangle": "off"
  }
}
```

# redux state, action 구조 잡기
- saga에 한가지 패턴을 정함

- 다음과같이 비동기처리를 해야할경우 3가지 함수를 하나의 쌍으로 지정하여 개발
- watchSignUp // signUp 액션 감지
- signUp // 액션에 대한 이벤트 리스너
- signUpApi // 서버와 요청하는 부
```javascript
function signUpApi() {

}

function* signUp () {
    try {
        yield call(signUpApi);
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch (e){ 
        console.error(e);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    }
}



function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}
```

* 변수명을 최대한 의미있고 알아보고 쉽게 지정할것 주석이 필요없을 정도로...

```javascript
export const initialState = {
    isLoggedIn: false, // 로그인여부
    isLoggingOut: false, // 로그아웃 시도중
    isLoggingIn: false, // 로그인 시도중
    loginErrorReason: '', // 로그인실패 이유
    signedUp: false, // 회원가입 성공 여부
    isSigningUp: false, // 회원가입 시도중
    signUpErrorReason: '', //회원가입실패사유
    me: null,
    followingList: [], // 팔로잉 목록
    followerList: [], // 팔로워목록
    userInfo: null, // 다른사람의 정보
};
```

# Login Redux 사이클
- axios 설치
    - 서버통신은 axios사용을 추천 구글도사용함.
    - npm i axios

- LoginForm > 로그인 요청 
- LOG_IN_REQUEST 액션을 dispatch
```javascript
dispatch({
    type: LOG_IN_REQUEST,
    data: {
        id, password,
    }
});


```

- Reducer 에서 해당 액션 에대한 처리
```javascript
case LOG_IN_REQUEST: {
    return {
        ...state,
        isLoggingIn: true,
        loginErrorReason: '',
    }
}
case LOG_IN_SUCCESS: {
    return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: dummyUser,
        isLoading: false,
    }
}
```

- saga에서 캐치, 1초뒤 로그인 성공 액션 디스패치
```javascript
function* login () {
    try {
        yield delay(1000);
        yield put({ 
            type: LOG_IN_SUCCESS,
        })
    } catch (e){ // 로그인 실패시
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        });
    }
}

function* watchLogin () {
    yield takeEvery(LOG_IN_REQUEST, login);
}
```

# 회원가입 Redux 사이클
- axios로 요청을 보내면 에러에 대한 이유를 객체로 제공함.
- 강제로 에러를 발생해서 회원가입에 실패한것처럼 상황 만들기
- 회원가입 요청시 강제로 에러를 발생시킴
```javascript
function* signUp () {
    try {
        yield call(signUpApi);
        yield throw new Error('의도적인 에러');
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        });
    }
}
```


# 게시글 등록 사이클
- SAGA 작성, 기존과 동일한 구성의 SAGA를 작성
- 현재는 서버가 없는 상태기때문에 delay 2초를 준다 (임시)
```javascript
function* addPost () {
    try {
        yield delay(2000);
        yield put({
            type: ADD_POST_SUCCESS,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        });
    }
}

function* watchAddPost () {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
    ]);
};
```

* FORM 사용시는 무조건 preventDefault() 로 폼서브밋을 막아주어야한다.


# next-router로 페이지 이동
- useEffect 의 값을 비교할때 기본 자료형을 사용할것.
- 객체 비교의경우 비추천 

- 회원가입 페이지의 경우 로그인상태가 되면 들어와선 안되기 때문에 
- 로그인 상태일경우 메인페이지로 이동해준다.
```javascript
    useEffect(() => {
        if (me) { // 로그인해서 로그인정보가 존재할경우 메인페이지로 이동하게끔
            alert('로그인상태가 되어 메인페이지로 이동합니다.');
            Router.push('/'); //
        }
    }, [me && me.id]);
```

# 댓글 컴포넌트
- useCallback을 사용할때는 기본 자료형을 사용할것.
- 리액트와 제이쿼리는 웬만하면 같이 쓰지말것. (최후의 수단)

- 댓글 컴포넌트 랜더링
```javascript
const PostCard = ({ post }) => {
    const [ commentFormOpened, setCommentFormOpened ] = useState(false);
    const [ commentText, setCommentText ] = useState('');
    const { me } = useSelector(state => state.user);
    const { isAddingComment, commentAdded } = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        setCommentText('');
    }, [commentAdded === true]);

    const onToggleComment = useCallback(() => {
      setCommentFormOpened(prev => !prev);
    }, []);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me) { // 로그인한 사용자만 가능하도록 처리
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
            }
        });
    }, [me && me.id]); // 객체 말고 기본자료형을 넣어줄것.

    return (
        <div>
            <Card
                key={+post.createdAt}
                cover={post.img && <img alt="example" src={post.img} />}
                actions={[
                    <Icon type="retweet" key="retweet" />,
                    <Icon type="heart" key="heart" />,
                    <Icon type="message" key="message" onClick={onToggleComment}/>,
                    <Icon type="ellipsis" key="ellipsis" />,

                ]}
                extra={<Button>팔로우</Button>}
            >
                <Card.Meta
                    avatar={<Avatar>{post.user.nickname[0]}</Avatar>}
                    title={post.user.nickname}
                    description={post.content}
                />
            </Card>
            { commentFormOpened && (
                <>
                    <Form onSubmit={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                    </Form>
                    <List
                        header={ `${post.comments ? post.comments.length : 0 } 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.comments || []}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={item.user.nickname}
                                    avatar={<Avatar>{item.user.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </div>
    )
};

PostCard.proptypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.object,
    }),
};

export default PostCard;
```

- reducer 작성
```javascript
case ADD_COMMENT_REQUEST: {
    return {
        ...state,
        isAddingComment: true,
        addCommentErrorReason: '',
        commentAdded: false,
    }
}
case ADD_COMMENT_SUCCESS: {
    /*
    * 불변성을 지켜줘야하기 때문에 로직이 복잡해짐
    * */
    const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
    const post = state.mainPosts[postIndex];
    const comments = [...post.comments, dummyComment];
    const mainPosts = [...state.mainPosts];
    mainPosts[postIndex] = {...post, comments};

    return {
        ...state,
        isAddingComment: false,
        mainPosts,
        commentAdded: true,
    }
}
case ADD_COMMENT_FAILURE: {
    return {
        ...state,
        isAddingComment: false,
        addCommentErrorReason: action.error,
        commentAdded: false,
    }
}
```

- SAGA 작성
```javascript
function* addComment (action) {
    // REQUEST action을 받을 수 있다.
    try {
        yield delay(2000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId,
            }
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e,
        });
    }
}

function* watchAddComment () {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

```



# getInitialProps 로 데이터 받기
- next에서 전달해주는 getInitialProps를 사용한다
- context.ctx 를 각페이지의 getInitialProps에서 사용한다.
- _app.js
    - context.Component (각 페이지들) 이 getInitialProps가 있을경우 실행시켜주는 역할을 한다.
```javascript
ReactBird.getInitialProps = async (context) => {
  const { ctx } = context;
  let pageProps = {};
  if (context.Component.getInitialProps) {
      pageProps = await context.Component.getInitialProps(ctx);
  }
  return { pageProps };
};
```

- hashtag.js
    - 서버에서 전달해준 데이터를 Context에서 가져올수 있음.
```javascript
Hashtag.getInitialProps = async (context) => {
    console.log(context.query.tag); // express가 넘겨준 tag명을 가지고있음
};

```
- getInitialProps 도 라이프사이클이다.
    - Next가 추가해준 라이프사이클이고 가장 최초의작업이다.
    - 프론트에서도 실행, 서버에서도 실행된다. 
    - 서버관련 로직넣어도됨
    - 서버사이드렌더링에 사용된다.
    - next에서 가장 중요한 라이프사이클

- getIntialProps 에서 컴포넌트의 props로 전달해줄수 있다.
    - ReactBird의 pageProps로 넘어간다
    - pageProps를 다시 컴포넌트로 내려준다.
    
``javascript
Hashtag.getInitialProps = async (context) => {
    console.log(context.query.tag); // express가 넘겨준 tag명을 가지고있음
    return { tag: context.query.tag };
};
```

- _app.js
```javascript

const ReactBird = ({ Component, store, pageProps }) => {
  return (
      <Provider store={store}>
          <Head>
              <title>React-SNS</title>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
          </Head>
          <AppLayout>
            <Component { ...pageProps }/>
          </AppLayout>
      </Provider>
    )
};

ReactBird.proptypes = { // isRequired 를 붙이면 반드시 존재해야하는 값으로 설정
  Component: PropTypes.elementType.isRequired, // JSX에 랜더링 할 수 있는 데이터 타입
    store: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired,
};


ReactBird.getInitialProps = async (context) => {
  const { ctx } = context;
  let pageProps = {};
  if (context.Component.getInitialProps) {
      pageProps = await context.Component.getInitialProps(ctx);
  }
  return { pageProps };
};
```

- 해시태그에 해당하는 게시글들 불러오기
    - getIntitialProps로 받아온 해시태그로 서버에 해당 해시태그관련 게시글들 조회
- hastag.js
```javascript
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import {LOAD_HASHTAG_POSTS_REQUEST} from "../reducers/post";
import PostCard from "../components/PostCard";

const Hashtag = ({ tag }) => {
    const dispatch = useDispatch();
    const { mainPosts } = useSelector(state => state.post);

    useEffect(() => {
        dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag,
        });
    }, []);

    return (
        <div>
            {mainPosts.map(c => (
                <PostCard key={+c.createdAt} post={c}/>
            ))}
        </div>
    )
};

Hashtag.Proptypes = {
    tag: PropTypes.string.isRequired,
}

Hashtag.getInitialProps = async (context) => {
    console.log(context.query.tag); // express가 넘겨준 tag명을 가지고있음
    return { tag: context.query.tag };
};

export default Hashtag;

```


- 해당 유저의 프로필과 게시글들 불러오기
 - getIntitialProps로 받아온 유저 아이디로 서버에 해당 유저 프로필
 - 해당 유저 게시글 받아오기
- user.js
```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';
import PropTypes from 'prop-types';
import { Avatar, Card } from "antd";
import {LOAD_USER_REQUEST} from "../reducers/user";

const User = ({ id }) => {
    const dispatch = useDispatch();
    const { mainPosts } = useSelector(state => state.post);
    const { userInfo } = useSelector(state => state.user);

    useEffect(() => {
        dispatch({
            type: LOAD_USER_REQUEST,
            data: id,
        });
        dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            data: id,
        });
    }, []);
    return (
        <div>
            {userInfo
                ? <Card
                    actions={[
                        <div key="twit">짹짹<br/>{userInfo.Posts.length}</div>,
                        <div key="following">팔로잉<br/>{userInfo.Followings.length}</div>,
                        <div key="follower">팔로워<br/>{userInfo.Followers.length}</div>
                    ]}
                >
                    <Card.Meta
                        avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                        title={userInfo.nickname}
                    />
                </Card>
                : null}
            {mainPosts.map(c => (
                <PostCard key={+c.createdAt} post={c}/>
            ))}
        </div>
    )
};

User.proptypes = {
    id: PropTypes.number.isRequired,
};


User.getInitialProps = async (context) => {
    console.log('user getInitialProps', context.query.id);
    return { id: parseInt(context.query.id, 10) };
};

export default User;
```

# 유저 게시글 및 프로필 조회
- Link 태그를 활용하여 해당 유저의 상세 & 유저가 쓴 게시글 페이지로 이동
- #문제점 
    - 눌렀을때 전체가 리프레시 된다.
    - <Link href={`/user/${post.User.id}`}>
    - 프론트 주소가아니라 서버의 주소이다.
    - 프론트에서 처리를 못하기때문에 express로 넘어가고 
    - 페이지를 새로이 랜더링 되어버린다.
    - 프론트에서 처리가 가능하게끔 링크를 바꾸어주어야한다.
    - <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }}
    - pathname 은 프론트의 패스, query는 서버로전달
    
- #새로운 문제점
    - 리프래시는 되지않지만 쿼리스트링으로 붙는다
    - /hashtag?tag=구독
    - as={`/hashtag/${v.slice(1)}`}
    - URL에 노출되는 주소를 as 속성으로 지정해주면 된다.
- #결과
    - <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }} as={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>        
```javascript
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { Avatar, Button, Card, Comment, Form, Icon, Input, List } from "antd";
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const PostCard = ({ post }) => {
    const [ commentFormOpened, setCommentFormOpened ] = useState(false);
    const [ commentText, setCommentText ] = useState('');
    const { me } = useSelector(state => state.user);
    const { isAddingComment, commentAdded } = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        setCommentText('');
    }, [commentAdded === true]);

    const onToggleComment = useCallback(() => {
      setCommentFormOpened(prev => !prev);
    }, []);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me) { // 로그인한 사용자만 가능하도록 처리
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
            }
        });
    }, [me && me.id]); // 객체 말고 기본자료형을 넣어줄것.

    return (
        <div>
            <Card
                key={+post.createdAt}
                cover={post.img && <img alt="example" src={post.img} />}
                actions={[
                    <Icon type="retweet" key="retweet" />,
                    <Icon type="heart" key="heart" />,
                    <Icon type="message" key="message" onClick={onToggleComment}/>,
                    <Icon type="ellipsis" key="ellipsis" />,

                ]}
                extra={<Button>팔로우</Button>}
            >
                <Card.Meta
                    avatar={<Link href={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                    title={post.User.nickname}
                    description={<div>{post.content.split(/(#[^\s]+)/g).map(v => {
                        if (v.match(/#[^\s]+/)) {
                            return (
                                <Link href={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
                            )
                        }
                        return v;
                    })}</div>} // next 의 Link 태그로 바꾸어주어야함
                />
            </Card>
            { commentFormOpened && (
                <>
                    <Form onSubmit={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                    </Form>
                    <List
                        header={ `${post.comments ? post.comments.length : 0 } 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.comments || []}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={item.user.nickname}
                                    avatar={<Link href={`/user/${item.user.id}`}><a><Avatar>{item.user.nickname[0]}</Avatar></a></Link>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </div>
    )
};

PostCard.proptypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.object,
    }),
};

export default PostCard;
```

# 이미지 업로드 프론트 구현
- multipart/form-data
- 이미지와 게시글을 보통 분리해서 업로드한다.


# 이미지 미리보기 삭제 구현
- 이미지 미리보기 삭제의 경우에는 비동기 처리가 필요없다.
- 따라서 REMOVE_IMAGE 액션 하나만 정의해서 사용한다

- removeImage 함수 정의 
    - 하나의 패턴으로 생각
    - onRemoveImage() 와 같이 () 가 생길때마다 핸들러 함수에 () 가 증가
    - 고차함수 이다.
    - 기존 함수를 확장하는것.
```javascript
    const onRemoveImage = useCallback(index => () => { // 고차함수로 기존함수를 확장하는것.
        dispatch({
            type: REMOVE_IMAGE,
            data: index,
        });
    }, []);

<Button onClick={onRemoveImage(i)}>제거</Button>
```

# 게시글 이미지 표시하기
- 게시글에 이미지가 1개, 2개, 그이상일 경우 서로 다르게 렌더링 
```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const PostImages = ({ images }) => {
    if (images.length === 1) {
        return (
            <img src={`http://localhost:3065/${images[0].src}`}/>
        );
    }
    if (images.length === 2) {
        return (
            <div>
                <img src={`http://localhost:3065/${images[0].src}`} width="50%"/>
                <img src={`http://localhost:3065/${images[1].src}`} width="50%"/>
            </div>
        );
    }
    return (
        <div>
            <img src={`http://localhost:3065/${images[0].src}`} width="50%"/>
            <div style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}>
                <Icon type="plus"/>
                <br />
                {images.length - 1}
                개의 사진 더보기
            </div>
        </div>
    );
};

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
    })).isRequired,
};

export default PostImages;
```

# react-slick 으로 이미지 슬라이드 구현 
- Slick 설정
    - intialSlice: 초기 슬라이드 인덱스
    - afterChange: 슬라이드가 변경될경우 해당인덱스 state로 반영
    - infinite: 무한 슬라이드
    - arrows: 화살표표시
    - slidesToShow: 한번에 표시할 슬라이드
    - slidesToScroll: 한번에 스크롤할 슬라이드
- 이미지 상세보기 컴포넌트
```javascript
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Slick from 'react-slick';

const ImagesZoom = ({ images, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <div style={{ position: 'fixed', zIndex: 5000, top: 0, left: 0, right: 0, bottom: 0}}>
            <header style={{ height: 44, background: 'white', position: 'relative', padding: 0, textAlign: 'center'}}>
                <h1 style={{ margin: 0, fontSize: '17px', color: '#333', lineHeight: '44px' }}>상세 이미지</h1>
                <Icon type="close" onClick={onClose} style={{ position: 'absolute', right: 0, top: 0, padding: 15, lineHeight: '14px', cursor: 'pointer' }}/>
            </header>
            <div style={{ height: 'calc(he=100% - 44px)', background: '#090909' }}>
                <div>
                    <Slick
                        intialSlide={0}
                        afterChange={(slide) => setCurrentSlide(slide)} // 슬라이드 시마다 인덱스 변경
                        infinite={false}
                        arrows
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map(v => {
                            return (
                                <div style={{ padding: 32, textAligh: 'center' }}>
                                    <img src={`http://localhost:3065/${v.src}`} style={{ margin: '0 auto', maxHeight: 750 }}/>
                                </div>
                            );
                        })}
                    </Slick>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: 75, height: 30, lineHeight: '30px', borderRadius: 15, background: '#313131', display: 'inline-block', textAlign: 'center', color: 'white', fontSize: '15px' }}>{currentSlide + 1} / {images.length}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
    })).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
```

- slick css 추가
```javascript
<link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
```

# 게시글 좋아요 취소 
- reducer 작성
- 불변성을 유지하면서 좋아요 한 사람목록을 반영
```javascript
        case LIKE_POST_SUCCESS: {
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = [ { id: action.data.userId }, ...post.Likers];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post, Likers};
            return {
                ...state,
                mainPosts: mainPosts,
            }
        }
        case LIKE_POST_FAILURE: {
            return {
                ...state,
            }
        }
        case UNLIKE_POST_REQUEST: {
            return {
                ...state,
            }
        }
        case UNLIKE_POST_SUCCESS: {
            const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            const Likers = post.Likers.filter(v => v.id !== action.data.userId);
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = {...post, Likers};
            return {
                ...state,
                mainPosts: mainPosts,
            }
        }
        case UNLIKE_POST_FAILURE: {
            return {
                ...state,
            }
        }
```

- components/PostCard.js
- antd Icon 효과를 활용하여 시각적으로 표현
- <Icon type="heart" key="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" onClick={onToggleLike}/>,
- Icon 기본테마는 outlined, 컬러를 주려면 twoTone 을 사용
```javascript
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { Avatar, Button, Card, Comment, Form, Icon, Input, List } from "antd";
import PropTypes from 'prop-types';
import Link from 'next/link';
import PostImages from './PostImages';
import {ADD_COMMENT_REQUEST, LIKE_POST_REQUEST, LOAD_COMMENTS_REQUEST, UNLIKE_POST_REQUEST} from "../reducers/post";

const PostCard = ({ post }) => {
    const [ commentFormOpened, setCommentFormOpened ] = useState(false);
    const [ commentText, setCommentText ] = useState('');
    const { me } = useSelector(state => state.user);
    const { isAddingComment, commentAdded } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const liked = me && post.Likers && post.Likers.find(v => v.id === me.id);

    useEffect(() => {
        setCommentText('');
    }, [commentAdded === true]);

    const onToggleComment = useCallback(() => {
      setCommentFormOpened(prev => !prev);
      if (!commentFormOpened) {
          dispatch({
              type: LOAD_COMMENTS_REQUEST,
              data: post.id,
          });
      }
    }, [post.id]);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me) { // 로그인한 사용자만 가능하도록 처리
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
                content: commentText,
            }
        });
    }, [me && me.id, commentText]); // 객체 말고 기본자료형을 넣어줄것.

    const onToggleLike = useCallback(() => {
        if (!me) {
            return alert('로그인이 필요합니다.');
        }

        if (liked) { // 좋아요 누른 상태
            dispatch({
                type: UNLIKE_POST_REQUEST,
                data: post.id,
            });
        } else { // 좋아요 안누른 상태
            dispatch({
                type: LIKE_POST_REQUEST,
                data: post.id,
            });
        }
    }, [me && me.id, post && post.id, liked]);

    return (
        <div>
            <Card
                key={+post.createdAt}
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <Icon type="retweet" key="retweet" />,
                    <Icon type="heart" key="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" onClick={onToggleLike}/>,
                    // Icon 기본테마는 outlined, 컬러를 주려면 twoTone 을 사용
                    <Icon type="message" key="message" onClick={onToggleComment}/>,
                    <Icon type="ellipsis" key="ellipsis" />,

                ]}
                extra={<Button>팔로우</Button>}
            >
                <Card.Meta
                    avatar={<Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                    title={post.User.nickname}
                    description={<div>{post.content.split(/(#[^\s]+)/g).map(v => {
                        if (v.match(/#[^\s]+/)) {
                            return (
                                <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }} as={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
                            )
                        }
                        return v;
                    })}</div>} // next 의 Link 태그로 바꾸어주어야함
                />
            </Card>
            { commentFormOpened && (
                <>
                    <Form onSubmit={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                    </Form>
                    <List
                        header={ `${post.comments ? post.comments.length : 0 } 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.comments || []}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </div>
    )
};

PostCard.proptypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.object,
    }),
};

export default PostCard;
```


# 리트윗 화면 만들기
- 게시글 내용 컴포넌트로 분리 및 분기

- PostCardContent.js
```javascript
import React from 'react';
import Link from "next/link";
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => {
    return (
        <div>{postData.split(/(#[^\s]+)/g).map(v => {
            if (v.match(/#[^\s]+/)) {
                return (
                    <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }} as={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
                )
            }
            return v;
        })}</div>
    );
};

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
};

export default PostCardContent;
``` 

- PostCard.js
    - 리트윗한경우 내 게시글 내부에 리트윗 게시글 띄워주기
```javascript
{post.RetweetId && post.Retweet ?
    (<Card>
        <Card.Meta // 리트윗한경우
            cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images}/>}
            avatar={<Link href={{ pathname: '/user', query: { id: post.Retweet.User.id } }} as={`/user/${post.Retweet.User.id}`}><a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a></Link>}
            title={post.Retweet.User.nickname}
            description={<PostCardContent postData={post.Retweet.content} />} // next 의 Link 태그로 바꾸어주어야함
        />
    </Card>)
    :
    (<Card.Meta // 리트윗안한경우
        avatar={<Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
        title={post.User.nickname}
        description={<PostCardContent postData={post.content} />} // next 의 Link 태그로 바꾸어주어야함
    />)
}
```


# 팔로우 언팔로우
```javascript
extra={!me || post.User.id === me.id
  ? null
  : me.Followings && me.Followings.find(v => v.id == post.User.id) // 내 팔로윙 목록에 존재할경우
      ? <Button onClick={onUnFollow(post.User.id)}>언팔로우</Button>
      : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
```
- 팔로우, 언팔로우를 구분 해서 버튼 랜더링
```javascript
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { Avatar, Button, Card, Comment, Form, Icon, Input, List } from "antd";
import PropTypes from 'prop-types';
import Link from 'next/link';
import PostImages from './PostImages';
import {
    ADD_COMMENT_REQUEST,
    LIKE_POST_REQUEST,
    LOAD_COMMENTS_REQUEST,
    RETWEET_REQUEST,
    UNLIKE_POST_REQUEST
} from "../reducers/post";
import PostCardContent from "./PostCardContent";
import {FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST} from "../reducers/user";

const PostCard = ({ post }) => {
    const [ commentFormOpened, setCommentFormOpened ] = useState(false);
    const [ commentText, setCommentText ] = useState('');
    const { me } = useSelector(state => state.user);
    const { isAddingComment, commentAdded } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const liked = me && post.Likers && post.Likers.find(v => v.id === me.id);

    useEffect(() => {
        setCommentText('');
    }, [commentAdded === true]);

    const onToggleComment = useCallback(() => {
      setCommentFormOpened(prev => !prev);
      if (!commentFormOpened) {
          dispatch({
              type: LOAD_COMMENTS_REQUEST,
              data: post.id,
          });
      }
    }, [post.id]);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me) { // 로그인한 사용자만 가능하도록 처리
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
                content: commentText,
            }
        });
    }, [me && me.id, commentText]); // 객체 말고 기본자료형을 넣어줄것.

    const onToggleLike = useCallback(() => {
        if (!me) {
            return alert('로그인이 필요합니다.');
        }

        if (liked) { // 좋아요 누른 상태
            dispatch({
                type: UNLIKE_POST_REQUEST,
                data: post.id,
            });
        } else { // 좋아요 안누른 상태
            dispatch({
                type: LIKE_POST_REQUEST,
                data: post.id,
            });
        }
    }, [me && me.id, post && post.id, liked]);

    const onRetweet = useCallback(() => {
        if (!me) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        });
    }, [me && me.id, post && post.id]);

    const onFollow = useCallback(userId => () => {
        dispatch({
            type: FOLLOW_USER_REQUEST,
            data: userId,
        });
    }, []);

    const onUnFollow = useCallback(userId => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId,
        });
    }, []);

    return (
        <div>
            <Card
                key={+post.createdAt}
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <Icon type="retweet" key="retweet" onClick={onRetweet} />,
                    <Icon type="heart" key="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" onClick={onToggleLike}/>,
                    // Icon 기본테마는 outlined, 컬러를 주려면 twoTone 을 사용
                    <Icon type="message" key="message" onClick={onToggleComment}/>,
                    <Icon type="ellipsis" key="ellipsis" />,

                ]}
                title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
                extra={!me || post.User.id === me.id
                    ? null
                    : me.Followings && me.Followings.find(v => v.id == post.User.id) // 내 팔로윙 목록에 존재할경우
                        ? <Button onClick={onUnFollow(post.User.id)}>언팔로우</Button>
                        : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
                }
            >
                {post.RetweetId && post.Retweet ?
                    (<Card
                        cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images}/>}
                    >
                        <Card.Meta // 리트윗한경우
                            avatar={<Link href={{ pathname: '/user', query: { id: post.Retweet.User.id } }} as={`/user/${post.Retweet.User.id}`}><a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a></Link>}
                            title={post.Retweet.User.nickname}
                            description={<PostCardContent postData={post.Retweet.content} />} // next 의 Link 태그로 바꾸어주어야함
                        />
                    </Card>)
                    :
                    (<Card.Meta // 리트윗안한경우
                        avatar={<Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                        title={post.User.nickname}
                        description={<PostCardContent postData={post.content} />} // next 의 Link 태그로 바꾸어주어야함
                    />)
                }

            </Card>
            { commentFormOpened && (
                <>
                    <Form onSubmit={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                    </Form>
                    <List
                        header={ `${post.comments ? post.comments.length : 0 } 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.comments || []}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </div>
    )
};

PostCard.proptypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.object,
    }),
};

export default PostCard;
```

# 다른 리듀서 데이터 조작
- 리듀서의 한계가 해당 리듀서의 데이터는 그 리듀서 내에서만 조작이 가능하다
- SAGA를 통해서 다른 리듀서의 데이터를 조작하는 액션을 디스패치해주어야함.


# 프로필 및 데이터 로딩
- 팔로워 목록, 팔로잉 목록, 내 게시글 목록 로드
- 팔로잉 취소 팔로워 끊기 
- profile.js  
```javascript
import React, { useEffect, useCallback } from 'react';
import { Button, List, Card, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import NicknameEditForm from "../components/NicknameEditForm";
import PostCard from '../components/PostCard';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';

const Profile = () => {
    const dispatch = useDispatch();
    const { me, followingList, followerList } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);
    useEffect(() => {
        if (me) {
            dispatch({
                type: LOAD_FOLLOWERS_REQUEST,
                data: me.id,
            });
            dispatch({
                type: LOAD_FOLLOWINGS_REQUEST,
                data: me.id,
            });
            dispatch({
                type: LOAD_USER_POSTS_REQUEST,
                data: me.id,
            });
        }
    }, [me && me.id]);

    const onUnfollow = useCallback(id => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: id,
        });
    }, []);

    const onRemoveFollower = useCallback(id => () => {
        dispatch({
            type: REMOVE_FOLLOWER_REQUEST,
            data: id,
        });
    }, []);

    return (
        <>
            <div>
                <NicknameEditForm/>
                <List
                    style={{ marginBottom: '20px' }}
                    grid={{ gutter: 4, xs: 2, md: 3 }}
                    size="smail"
                    header={<div>팔로잉 목록</div>}
                    loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
                    bordered
                    dataSource={followingList}
                    renderItem={item => (
                        <List.Item style={{ marginTop: '20px' }}>
                            <Card actions={[<Icon key="stop" type="stop" />]} onClick={onUnfollow(item.id)}>
                                <Card.Meta description={item.nickname}/>
                            </Card>
                        </List.Item>
                    )}
                />
                <List
                    style={{ marginBottom: '20px' }}
                    grid={{ gutter: 4, xs: 2, md: 3 }}
                    size="smail"
                    header={<div>팔로워 목록</div>}
                    loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
                    bordered
                    dataSource={followerList}
                    renderItem={item => (
                        <List.Item style={{ marginTop: '20px' }}>
                            <Card actions={[<Icon key="stop" type="stop" />]} onClick={onRemoveFollower(item.id)}>
                                <Card.Meta description={item.nickname}/>
                            </Card>
                        </List.Item>
                    )}
                />
                <div>
                    {mainPosts.map(c => (
                        <PostCard key={+c.createdAt} post={c} />
                    ))}
                </div>
            </div>
        </>
    )
};

export default Profile;
```

# 닉네임 수정
- useCallback 사용시 변경되는 값일 경우 매개값으로 넣어줄것
```javascript
import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Form, Input, Button } from 'antd';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
    const dispatch = useDispatch();
    const [editedName, setEditedName] = useState('');
    const { me, isEdittingNickname } = useSelector(state => state.user);


    const onChangeNickname = useCallback((e) => {
        setEditedName(e.target.value);
    }, []);

    const onEditNickname = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: EDIT_NICKNAME_REQUEST,
            data: editedName,
        });
    }, [editedName]);

    return (
        <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }} onSubmit={onEditNickname}>
            <Input addonBefore="닉네임" value={editedName} onChange={onChangeNickname} />
            <Button type="primary" htmlType="submit" loading={isEdittingNickname}>수정</Button>
        </Form>
    )
};

export default NicknameEditForm;
```

# 서버사이드 랜더링
- SSR
- 검색엔진 최적화를 위해 SSR을 사용한다.
- 새로 고침했을때 빈페이지가 순간적으로 보이는 UX 측면에서도 좋음.

- SSR 을할때 next를 추천해는이유 
    - getInitialProps 라는 라이프사이클이 존재하기때문
    - next를 사용하지않더라도 이 사이클을 직접 구현해주어야함.
    - 서버에서 1회 호출되는 사이클임.
- context
    - _app.js 에서 넣어주는 context.ctx 객체이다.
    - ctx 에는 store가 존재한다
    - store 는 redux임
    - store.dispatch, state 등을 제어할수있다.
- index.js
```javascript
Home.getInitialProps = async (context) => { // context: app.js 에서넣어주는 context.ctx
    console.log(Object.keys(context)); // store 가 존재하는데 redux-store 임
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    });
};
```

- 무작정 사용하면 제대로 동작하지 않기때문에 next용 사가가 필요함
- next 용 사가 설치
    - npm i next-redux-saga

- _app.js
    - store.sagaTask 부분에 sagaMiddleware를 적용.
    - withRedux 에는 적용된 configureStore 부분이
    - withReduxSaga에서 필요로한다.
```javascript
const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware(); // middleware를 사용할때 문제가
    // 발생할 여지가 존재하기때문에 configureStore에서 생성하는것으로 변경

    const middlewares = [sagaMiddleware]; // redux - saga middleware 연결
    const enhancer = process.env.NODE_ENV === 'production' ?
        compose(applyMiddleware(...middlewares))
        :
        compose(applyMiddleware(...middlewares),
            !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f, // REDUX_DEVTOOLS 확장프로그램이 있을경우 미들웨어로 추가
        );
    const store = createStore(reducer, initialState, enhancer); 
    store.sagaTask = sagaMiddleware.run(rootSaga); // rootSaga를 run 해주어야함.
    return store;
};
export default withRedux(configureStore)(withReduxSaga(ReactBird));
```

# SSR 을 위한 쿠키 넣어주기
- getInitialProps 의 라이프사이클을 기억
- 서버에서 1번실행되고 클라이언트에서도 실행이된다.
    - 서버에서 실행될 경우
        - 서버에서 실행될 경우에는 브라우저가 존재하지않기떄문에 axios통신시 쿠키를 자동으로 넣어주지 않음.
        - ctx.req.headers.cookie 를 통해 쿠키를 가져올수있다.
        - axios.defaults.headers.Cookie 에 쿠키를 넣어줌으로써 axios통신시 쿠키를 가지고 통신이 가능함.
        - req res 객체가 존재함.
        - ctx.isServer로 서버인지 판별이 가능.
        - ctx.
    - 클라이언트에서 실행될 경우
        - 클라이언트에서 실행될 경우 브라우저가 알아서 쿠키를 넣어줌
        - req, res 객체가 존재하지않기때문에 req 객체를 사용하면 에러가 발생함 
        - ctx.isServer로 서버인지 분기필요
```javascript
ReactBird.getInitialProps = async (context) => {
  const { ctx } = context;
  let pageProps = {};

  // 클라이언트 일경우에는 req, res 객체가 존재하지않음.
  const cookie = ctx.isServer ? ctx.req.headers.cookie : ''; // 서버사이드 렌더링시에는 쿠키를 직접 넣어주어야함.
  if (ctx.isServer && cookie) { // 클라이언트일 경우에는 쿠키를 심어줄 필요가없음
      axios.defaults.headers.Cookie = cookie; // axios에 쿠키데이터를 심어주도록 설정
  }

  const state = ctx.store.getState(ctx); // ctx.store 를 통해 리듀서 스테이트를 가져올수 있음.
  if (!state.user.me) {
      ctx.store.dispatch({
          type: LOAD_USER_REQUEST,
      });
  }

  if (context.Component.getInitialProps) {
      pageProps = await context.Component.getInitialProps(ctx);
  }

  return { pageProps };
};
```

# 사용자 프로필 SSR
- 기존에 useEffect 부분을 getInitialProps 로 옮겨서 SSR로 변경

```javascript
import React from 'react';
import { useSelector } from 'react-redux';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';
import PropTypes from 'prop-types';
import { Avatar, Card } from "antd";
import {LOAD_USER_INFO_REQUEST} from "../reducers/user";

const User = ({ id }) => {
    const { mainPosts } = useSelector(state => state.post);
    const { userInfo } = useSelector(state => state.user);
    return (
        <div>
            {userInfo
                ? <Card
                    actions={[
                        <div key="twit">짹짹<br/>{userInfo.Posts}</div>,
                        <div key="following">팔로잉<br/>{userInfo.Followings}</div>,
                        <div key="follower">팔로워<br/>{userInfo.Followers}</div>
                    ]}
                >
                    <Card.Meta
                        avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                        title={userInfo.nickname}
                    />
                </Card>
                : null}
            {mainPosts.map(c => (
                <PostCard key={+c.createdAt} post={c}/>
            ))}
        </div>
    )
};

User.proptypes = {
    id: PropTypes.number.isRequired,
};


User.getInitialProps = async (context) => { // SSR 핵심. 서버쪽에서 1회 실행, 프론트에서도 실행됨.

    const id = parseInt(context.query.id, 10);
    context.store.dispatch({
        type: LOAD_USER_INFO_REQUEST,
        data: id,
    });
    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: id,
    });
    return { id };
};

export default User;
```

# Redux-SAGA - Logging
- 커스텀 미들웨어를 만들어서 Redux-SAGA 액션 로깅
- _app.js
```javascript
const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware(); // middleware를 사용할때 문제가
    // 발생할 여지가 존재하기때문에 configureStore에서 생성하는것으로 변경

    const middlewares = [sagaMiddleware, (store) => (next) => (action) => { // 커스텀 미들웨어 
        console.log(action);
        next(action);
    }]; // redux - saga middleware 연결
    const enhancer = process.env.NODE_ENV === 'production' ?
        compose(applyMiddleware(...middlewares))
        :
        compose(applyMiddleware(...middlewares),
            !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f, // REDUX_DEVTOOLS 확장프로그램이 있을경우 미들웨어로 추가
        );
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga); // rootSaga를 run 해주어야함.
    return store;
};
```

# 해시태그 SSR
- 요청 URI에 한글이 들어가면 에러가 발생
- sagas/post.js
    - 한글 파라메터가 올수 있는부분에 encodeURIComponent로 감싸준다.
    - 서버에서 받아올때도 디코딩 작업 필요
```javascript
function loadHashtagPostsAPI(tag) {
    return axios.get(`/hashtag/${encodeURIComponent(tag)}`);
}
```

# SSR에서 내정보 처리하기
- profile 부분에서 문제점
- _app.js 에서 LOAD_USER_REQUEST 가 진행후 바로 LOAD_FOLLOWERS, LOAD_FOLLOWINGS 가 진행되기 때문에
- SUCCESS이전 상태에 요청을 보내게 되므로 user.me.id 의 값이 없게됨.
- 파훼법
    - 1. 본인의 프로필을 조회하는경우 0 의 기본값을 넘긴다
    - 2. 라우터에서 0의값이 넘어올경우 본인 프로필로 간주 req.user.id 로 조회.
- user.js
```javascript
Profile.getInitialProps = async (context) => {
    const state = context.store.getState();
    context.store.dispatch({
        type: LOAD_FOLLOWERS_REQUEST,
        data: state.user.me && state.user.me.id,
    });
    context.store.dispatch({
        type: LOAD_FOLLOWINGS_REQUEST,
        data: state.user.me && state.user.me.id,
    });
    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: state.user.me && state.user.me.id,
    });
};
```

# 게시글 삭제
- 실제 게시글을 삭제하고, 게시글 목록에서 제거, 우측 짹짹에서도 카운트를 내려주어야함
- REMOVE_POST_OF_ME 액션을 추가정의하여 사용 
```javascript
function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: result.data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: e,
        });
    }
}
```

# 페이지 네이션
- 게시글을 한번에 불러오면 브라우저에 무리가 가기때문에
- 페이지네이션을 적용
- 한번에 불러오는 단위를 Limit 
- 3개씩 불러오도록 구현
- 시작하는 게시글 단위를 offset

- 팔로잉, 팔로워 더보기 이벤트
```javascript
    const loadMoreFollowings = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
            data: {
                offset: followingList.length,
            }
        });
    }, [followingList && followingList.length]);

    const loadMoreFollowers = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
            data: {
                offset: followerList.length,
            }
        });
    }, [followerList && followerList.length]);
```

- offset, limit 을 활용하여 페이지네이션 
- sagas/user.js
```javascript
function loadFollowingsAPI (id, offset = 0, limit = 3) {
    return axios.get(`/users/${id || 0}/followings?offset=${offset}&limit=${limit}`, {
        withCredentials: true,
    });
}

function* loadFollowings (action) {
    try {
        const { id, offset, limit } = action.data;
        const result = yield call(loadFollowingsAPI, id, offset, limit);
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: e,
        });
    }
}
```

# 더보기 버튼 삭제
- 더이상 불러올 데이터가 없을경우 더보기 버튼 삭제.
- hasMoreXX 플래그값 활용 제어 


# 인피니트 스크롤링
- 메인 게시글을 10개정도 불러온뒤 스크롤이 어느정도 내려가면 추가로 불러오기
- 스크롤을 감지하는것이 핵심.

- window.scrollY: 보이는 화면 최상단의 위치
- document.documentElement.clientHeight: 보이는 화면의 크기
- document.documentElement.scrollHeight: 스크롤의 크기
- 끝에서 300정도 남았을때 다음게시글을 로드

#### 문제점
- 기존의 offset 방식으로 가져오게될경우 문제가 발생한다.
- 스크롤링 방식으로 게시글을 가져올때 게시글을 보는동안 누군가 게시글을 작성할 수도 있다.
- 기존의 offset이 깨져버림.
- lastId 를 기반으로 조회하는 방식을 선택
    - lastId가 0 일경우 처음부터 조회
    - lastId가 존재할경우 해당 lastId보다 작은게시글들을 조회해온다.
```javascript
   // 보고있는동안 게시글을 작성할 수 있을수 있기때문에
    // 게시글이 추가된다면 offset이 깨져버린다.
    // 따라서 offset을 사용하면안됨.
    // 마지막 게시글 번호를 활용해서 그 다음 게시글을 가져오는 방법을 사용.
    const onScroll = () => {
        console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
        // window.scrollY 가 최상단의 위치
        // documentElement.clientHeight 는 보이는 화면 크기
        // scrollHeight 는 스크롤의 젤위에서 젤 아래크기
        // 끝부분에서 300정도 남았을경우 다음데이터를 가져옴
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            dispatch({
                type: LOAD_MAIN_POSTS_REQUEST,
                lastId: mainPosts[mainPosts.length - 1].id,
            });
        }
    };

    useEffect(() => {
        // addEventListener 를 달아주어야함.
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [mainPosts.length]);
```

# 쓰로들링
- 스크롤링 이벤트가 ms 단위로 발생하기때문에 REQUEST가 연속적으로 발생한다.
- SAGA에서 takeLastest (가장 마지막 요청만 유효하게함) 를 했더라도 앞쪽의 요청을 막을수는 없다.
- 서버부하가 발생함.
- 이를 막기위해 쓰로들링기법이 필요


### 쓰로들링이란 ?
- 특정 이벤트가 발생했을때 특정 시간동안 해당 이벤트를 막는 기법

- SAGA에서 throttle을 제공함.
- 2초동안 발생하지않도록 제어
```javascript
function* watchLoadMainPosts () {
    yield throttle(2000, LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}
```

- 에러 로깅을 잘하는 습관 들이기

# immer로 불변성 쉽게 사용
- reducer에서 불변성을 지키는 부분인데 가독성이 좋지않음.
- immer 설치
    - npm i immer

- 사용방법
```javascript
import produce from 'immer';

return produce(state, (draft) => {
    ... 기존 switch ...  
});
```

- 예제
    - 기존에 불변성을 지켜주기위해 길었던 로직이 단순해짐
    - 삭제 => findIndex, splice 사용
    - 뒤에 추가 => concat or forEach로 push
    - 앞에 추가 => unshift 
    - 불변성을 지켜주고 가독성은 좋아진다.
    - 스프레드가 쓰이는곳은 Immer가 쓰일수 있음
```javascript
case ADD_COMMENT_SUCCESS: {
    /*
    * 불변성을 지켜줘야하기 때문에 로직이 복잡해짐
    * */
    const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
    draft.mainPosts[postIndex].Comments.push(action.data.comment);
    draft.isAddingComment = false;
    draft.commentAdded = true;
    break;
}
```
