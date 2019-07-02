import React from 'react';
import Document, { Main, NextScript } from 'next/document';

// main = app.js
/*
* next에서는 Document 상속
* */
class MyDocument extends Document {
    static getInitialProps (context) {
        return { helmet: Helmet.renderStatic() };
    }

    render () {
        const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
        const htmlAttrs = htmlAttributes.toComponent();
        const bodyAttrs = bodyAttributes.toComponent();
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

// htmlAttributes html 속성
// bodyAttributes body 속성
