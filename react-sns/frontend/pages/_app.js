import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import withReduxSaga from 'next-redux-saga';
import axios from 'axios';
import { Container } from 'next/app';
import { LOAD_USER_REQUEST } from "../reducers/user";
import AppLayout from "../components/AppLayout";
import reducer from '../reducers';
import rootSaga from '../sagas/index';

const ReactBird = ({ Component, store, pageProps }) => {
  return (
      <Container>
          <Provider store={store}>
              <Helmet
                title="React-SNS"
                htmlAttributes={{ lang: 'ko'}}
                meta={[{
                    charset: 'UTF-8',
                }, {
                    'http-equive': 'X-UA-Compatible', content: 'IE-edge',
                }, {
                    name: 'description', content: 'ces518의 ReactBird-SNS',
                }, {
                    property: 'og:type', content: 'website',
                }, {
                    property: 'og:description', content: 'ces518의 ReactBird-SNS'
                }, {
                    property: 'og:image', content: 'http://localhost:3060/favicon.io'
                }]}
                link={[{
                    rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
                }, {
                    rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css'
                }, {
                    rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
                }]}
                script={[{
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js'
                }]}
              />
              <AppLayout>
                <Component { ...pageProps }/>
              </AppLayout>
          </Provider>
      </Container>
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
      pageProps = await context.Component.getInitialProps(ctx) || {};
  }

  return { pageProps };
};

// 가독성이 안좋은것들은 변수로 따로 분리
const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware(); // middleware를 사용할때 문제가
    // 발생할 여지가 존재하기때문에 configureStore에서 생성하는것으로 변경

    const middlewares = [sagaMiddleware, (store) => (next) => (action) => {
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

export default withRedux(configureStore)(withReduxSaga(ReactBird));
