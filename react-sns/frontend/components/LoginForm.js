import React, { useCallback } from 'react';
import Link from 'next/link';
import { Form, Input, Button } from 'antd';

import { useInput } from '../pages/signup';

const LoginForm = () => {
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        console.log({
            id, password,
        });
    }, [id, password]);

    return (
        <Form onSubmit={onSubmit}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br/>
                <Input name="user-id" value={id} onChange={onChangeId} requried/>
            </div>
            <div>
                <label htmlFor="user-password">패스워드</label>
                <br/>
                <Input name="user-password" value={password} onChange={onChangePassword} type="password" requried/>
            </div>
            <div>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </div>
        </Form>
    )
};

export default LoginForm;
