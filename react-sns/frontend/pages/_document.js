import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Document, { Main, NextScript } from 'next/document';

// main = app.js
/*
* next에서는 Document 상속
* */
class MyDocument extends Document {
    static getInitialProps (context) {
        const page = context.renderPage((App) => (props) => <App {...props}/>); // renderPage로 내부페이지를 랜더링 할수있게함
        return { ...page, helmet: Helmet.renderStatic() };
    }

    render () {
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();
        console.log(helmet);
        return (
            <html {...htmlAttrs}>
                <head>
                    {Object.values(helmet).map(el => el.toComponent())}
                </head>
                <body {...bodyAttrs}>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
};

MyDocument.propTypes = {
    helmet: PropTypes.object.isRequired,
}

export default MyDocument;
