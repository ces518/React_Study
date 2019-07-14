import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import withReduxSaga from 'next-redux-saga';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';

import reducer from '../reducers';

import Layout from '../components/Layout';

const App = ({ Component, store }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>React-SNS</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
            </Head>
            <Layout>
                <Component />
            </Layout>
        </Provider>
    )
};

App.proptypes = {
    Component: PropTypes.elementType,
};

export default withRedux((initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production' ?
        compose(applyMiddleware(...middlewares))
        :
        compose(applyMiddleware(...middlewares),
            !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
        );
    const store = createStore(reducer, initialState, enhancer);

    store.sagaTask = sagaMiddleware.run(rootSaga); // rootSaga를 run 해주어야함.
    return store;
})(withReduxSaga(App));
