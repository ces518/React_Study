import React, { useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import {Button, Checkbox, Form, Input} from "antd";

const Signup = () => {
    const [id, setId] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);

    const onSubmit = () => {

    };

    const onChangeId = (e) => {
        setId(e.target.value);
    };

    const onChangeNick = (e) => {
        setNick(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
    };

    const onChangeTerm = () => {
        setTerm((prevTerm) => !prevTerm);
    };

    return (
        <>
            <Head>
                <title>React-SNS</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js"></script>
            </Head>
            <AppLayout>
                <Form onSubmit={onSubmit} style={{ padding: 10 }}>
                    <div>
                        <label htmlFor="user-id">아이디</label>
                        <br />
                        <Input name="user-id" value={id} required onChange={onChangeId}/>
                    </div>
                    <div>
                        <label htmlFor="user-nick">닉네임</label>
                        <br />
                        <Input name="user-nick" value={nick} required onChange={onChangeNick}/>
                    </div>
                    <div>
                        <label htmlFor="user-password">패스워드</label>
                        <br />
                        <Input name="user-password" type="password" value={password} required onChange={onChangePassword}/>
                    </div>
                    <div>
                        <label htmlFor="user-password-check">패스워드 체크</label>
                        <br />
                        <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck}/>
                    </div>
                    <div>
                        <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
                    </div>
                    <div>
                        <Button type="primary" htmlType="submit">가입하기</Button>
                    </div>
                </Form>
            </AppLayout>
        </>
    )
};

export default Signup;
