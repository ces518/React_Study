import React, { useState, useCallback } from 'react';
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN_REQUEST } from "../reducers/user";


const LoginForm = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const { isLoggingIn } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: LOGIN_REQUEST,
        });
    }, []);

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    return (
        <Form onSubmit={onSubmit} style={{ padding: '10px' }}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br/>
                <Input name="user-id" value={id} onChange={onChangeId} required />
            </div>
            <div>
                <label htmlFor="user-password">패스워드</label>
                <br/>
                <Input name="user-password" value={password} onChange={onChangePassword} type="password" required />
            </div>
            <div style={{ marginTop: '10px' }}>
                <Button type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </div>
        </Form>
    )
};

export default LoginForm;
