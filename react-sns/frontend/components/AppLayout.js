import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Menu, Input, Button, Row, Col, Card, Avatar,Form} from "antd";

import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';

// 서버로 부터 받을 더미 데이터를 사용
const dummy = {
    isLoggedIn: false,
    nickname: '박준영',
    post: [],
    following: [],
    follower: [],
};

/*
 children: props이다.
 */
const AppLayout = ({ children }) => {

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>노드버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {dummy.isLoggedIn
                        ? <UserProfile/>
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
        </div>
    )
};

AppLayout.proptypes = {
  children: PropTypes.node,
};

export default AppLayout;
