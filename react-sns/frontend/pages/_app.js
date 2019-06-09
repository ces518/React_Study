import React from 'react';
import Head from "next/head";
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import AppLayout from "../components/AppLayout";
import { createStore } from 'redux';
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
    store: PropTypes.object,
};

export default withRedux((initialState, options) => {
    const store = createStore(reducer, initialState);
    return store;
})(ReactBird);
