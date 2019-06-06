import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AppLayout from "../components/AppLayout";
import {Button} from "antd";

const Home = () => {
  return (
      <>
          <Head>
              <title>React-SNS</title>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
          </Head>
          <AppLayout>
          </AppLayout>
      </>
  )
};

export default Home;
