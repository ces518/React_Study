import React from 'react';
import Head from "next/head";
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import AppLayout from "../components/AppLayout";
import reducer from '../reducers';
import rootSaga from '../sagas/index';

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

// 가독성이 안좋은것들은 변수로 따로 분리
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

    sagaMiddleware.run(rootSaga); // rootSaga를 run 해주어야함.

    return store;
};

export default withRedux(configureStore)(ReactBird);
