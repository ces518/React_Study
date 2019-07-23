### 2019 07 08
- 프로젝트 세팅

- react, react-dom next 설치
    - npm i react react-dom next 
- nodemon, webpack 설치
    - npm i -D nodemon webpack
- eslint 설치
    - npm i -D eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks
- antd 설치
    - npm i antd
- prop-types 설치
    - npm i prop-types
    
- 기본 프로젝트 구성
    - components
        - Layout.js (상단 메뉴 레이아웃 컴포넌트)
    - pages 
        - _app.js (모든 컴포넌트의 부모역할 공통 레이아웃 위치)
        - index.js (인덱스 페이지)
        - profile.js (프로필)


### 2019 07 09
- 회원가입 페이지 생성 
    - signup.js

- 로그인 폼 생성
    - LoginForm.js

- 회원상태 프로필 생성
    - Profile.js
    

### 2019 07 10
- styled-component 설치
    - npm i styled-components
- Redux 설치
    - npm i redux react-redux
- next에 redux를 적용 next-redux-wrapper 설치
    - npm i next-redux-wrapper
    

* 이슈
    - Redux 사용시 아무런 액션을 정의하지 않았더라도 Reducer에서 default reducer를 구현해주어야함
```javascript
export const initialState = {
    info: {
        id: 0,
        name: '준영',
    }, // 로그인 정보
};


const reducer = (state = initialState, action) => {
    switch (action) {
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;
```

### 2019 07 14
- Redux SAGA 적용
    - npm i redux-saga
- Redux devTools 적용
- 더미데이터 활용한 Login 구현
- 더미데이터 활용한 Logout 구현


### 2019 07 23
- 더미데이터 활용한 게시글 구현
- 더미데이터 활용한 게시글 등록 구현

* 이슈
    - useEffect 사용시 논리값체크의 경우 ComponentDidUpdate가 제대로 동작하지않음
    - postAdded 가 변경될때마다 호출됨
```javascript
// 최초 실행 : ComponentDidMounted
// deps [] 의 값이바뀔때마다 실행: ComponentDidUpdate
useEffect(() => {
    if (postAdded) {
        setText('');
    }
}, [postAdded === true]);
```
