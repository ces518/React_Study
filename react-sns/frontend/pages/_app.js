import React from 'react';
import Head from "next/head";
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import AppLayout from "../components/AppLayout";
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import sagaMiddleware from "../sagas/middleware";
import rootSaga from '../sagas/index';

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
    store: PropTypes.object,
};

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
