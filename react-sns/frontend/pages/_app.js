import React from 'react';
import Head from "next/head";
import PropTypes from 'prop-types';
import AppLayout from "../components/AppLayout";

const ReactBird = ({ Component }) => {
  return (
      <>
          <Head>
              <title>React-SNS</title>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
          </Head>
          <AppLayout>
            <Component/>
          </AppLayout>
      </>
  )
};

ReactBird.proptypes = {
  Component: PropTypes.elementType, // JSX에 랜더링 할 수 있는 데이터 타입
};

export default ReactBird;
