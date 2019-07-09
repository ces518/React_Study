import React, { useState, useCallback } from 'react';
import { Button, Checkbox, Form, Input } from "antd";

const Signup = () => {
    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [term, setTerm] = useState(false);
    const [termError, setTermError] = useState(false);

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if (!term) { // 개인정보 제공 동의
            return setTermError(true);
        }

        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
    }, [password, passwordCheck, term]);

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);

    const onChangeNickname = useCallback((e) => {
        setNickname(e.target.value);
    }, []);

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(password !== e.target.value);
        setPasswordCheck(e.target.value);
    }, [password]);

    const onChangeTerm = useCallback(() => {
        setTermError(false);
        setTerm(prevTerm => !prevTerm);
    }, []);
    return (
        <>
            <Form onSubmit={onSubmit} style={{ padding: 10 }}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br />
                    <Input name="user-id" value={id} required onChange={onChangeId}/>
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br />
                    <Input name="user-nick" value={nickname} required onChange={onChangeNickname}/>
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
                    {passwordError && <div style={{ color: 'red' }}>패스워드가 일치하지 않습니다.</div>}
                </div>
                <div>
                    개인정보 제공에 동의하십니까 ? <br />
                    <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
                    {termError && <div style={{ color: 'red' }}>개인정보 제공에 동의하셔야 가입이 가능합니다.</div>}
                </div>
                <div>
                    <Button type="primary" htmlType="submit">가입하기</Button>
                </div>
            </Form>
        </>
    )
};
export default Signup;
