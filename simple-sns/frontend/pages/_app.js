import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';

const App = ({ Component }) => {
    return (
        <>
            <Head>
                <title>React-SNS</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
            </Head>
            <Layout>
                <Component />
            </Layout>
        </>
    )
};

App.proptypes = {
    Component: PropTypes.elementType,
};

export default App;
