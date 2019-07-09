import React from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Menu, Row } from "antd";
import Link from "next/link";

import Profile from './Profile';
import LoginForm from './LoginForm';

// 로그인 여부 임시 플래그변수
const login = false;

const Layout = ({ children }) => {
    return (
        <>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>Simple-SNS</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                </Menu.Item>
            </Menu>
            <Row>
                <Col xs={24} md={6}>
                    {login ?
                        <Profile />
                        :
                        <LoginForm />
                    }
                </Col>
                <Col xs={24} md={12}>
                    { children }
                </Col>
                <Col xs={24} md={6}>

                </Col>
            </Row>
        </>
    )
};

Layout.propTypes = {
    children: PropTypes.node,
};


export default Layout;
