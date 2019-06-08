import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Checkbox, Form, Input} from "antd";


const TextInput = ({ value }) => {
    return (
        <div>{value}</div>
    )
};

TextInput.proptypes = {
    value: PropTypes.string,
};

export const useInput = (initValue = null) => {
    const [value, setValue] = useState(initValue);
    const handler = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    return [value, handler];
};

const Signup = () => {


    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useInput(false);

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
    }, [password, passwordCheck, term]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [passwordCheck]);

    const onChangeTerm = useCallback(() => {
        setTermError(false);
        setTerm((prevTerm) => !prevTerm);
    }, [term]);

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
                    {passwordError && <div style={{ color: 'red' }}>패스워드가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <Checkbox name="user-term" value={term} onChange={onChangeTerm}>동의합니다.</Checkbox>
                    {termError && <div style={{ color: 'red' }}>약관에 동의하셔야합니다. </div> }
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit">가입하기</Button>
                </div>
            </Form>
        </>
    )
};

export default Signup;
