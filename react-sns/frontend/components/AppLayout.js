import React, { useEffect }from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Menu, Input, Button, Row, Col, Card, Avatar,Form} from "antd";
import Router from 'next/router';
import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';
import { useSelector, useDispatch } from 'react-redux';

/*
 children: props이다.
 */
const AppLayout = ({ children }) => {
    const { isLoggedIn, me } = useSelector(state => state.user);

    const onSearch = (value) => {
        // 앞쪽이 내부 주소 , 뒤쪽이 실제 보이는 주소
        // 이유 ?
        // 서버주소와 실제 프론트앤드주소가 다르기때문..
        Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
    };

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>리액트버드</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile" prefetch><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search
                        enterButton
                        style={{ verticalAlign: 'middle' }}
                        onSearch={onSearch}
                    />
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me
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
