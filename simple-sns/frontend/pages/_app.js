import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import withRedux from 'next-redux-wrapper';
import { createStore } from 'redux';
import { Provider } from "react-redux";

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
    const store = createStore(reducer, initialState);
    return store;
})(App);
