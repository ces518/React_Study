import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Menu, Input, Button, Row, Col, Card, Avatar,Form} from "antd";

import LoginForm from '../components/LoginForm';

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
            <Row>
                <Col xs={24} md={6}>
                    {dummy.isLoggedIn
                        ? <Card
                            actions={[
                                <div key="twit">짹짹 <br/> {dummy.post.length}</div>,
                                <div key="following">팔로잉 <br/> {dummy.following.length}</div>,
                                <div key="follower">팔로워 <br/> {dummy.follower.length}</div>
                            ]}
                        >
                            <Card.Meta
                                avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                                title={dummy.nickname}
                            />
                        </Card>
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
